// importscan — リポジトリ内の「非テスト .go ファイル」から import 文を go/parser で
// 直接抽出する。**ビルド制約は一切適用しない**（go list がビルドタグで落とす依存を
// 検出するのが目的なので、ここで同じフィルタをかけては検証にならない）。
//
// 出力: JSON Lines  {"path":<importPath>,"file":<relPath>,"line":<n>,"build":<bool>}
//   build = そのファイルがビルド制約を持つか
//           (//go:build / // +build 行、または _windows.go 等のファイル名サフィックス)
//
// 走査から除外するのは「go ツール自体が構造的に無視する」ものだけ:
//   vendor/, testdata/, "." or "_" で始まるディレクトリ, ネストした別モジュール(go.mod を持つ)
// これらを除かないと go list との差分が偽陽性だらけになる。
package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"go/build"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

type imp struct {
	Path  string `json:"path"`
	File  string `json:"file"`
	Line  int    `json:"line"`
	Build bool   `json:"build"`
	// 制約の中身（"//go:build windows" 行、または "_windows" 等のファイル名サフィックス）。
	Cons string `json:"cons"`
	// ★ このファイルが linux/amd64 のビルドに含まれるか を go/build に判定させた結果。
	//   正規表現で "windows" 等を探すのではなく Go 本体の制約評価を用いるので、
	//   "//go:build !windows" や "linux || darwin" のような式も正しく扱える。
	//   LinuxOK=false のファイルからのみ import される外部モジュールこそが
	//   「GT-imported が取りこぼしうる」真の危険対象。
	LinuxOK bool `json:"linuxOK"`
	// linux/amd64 で除外された場合の理由（MatchFile の再評価で判定。文字列マッチではない）
	OtherPlat bool `json:"otherPlat"` // 他の GOOS/GOARCH でなら含まれる → platform
	CgoOff    bool `json:"cgoOff"`    // cgo 無効なら含まれる → cgo 制約
}

var goosList = map[string]bool{"aix": true, "android": true, "darwin": true, "dragonfly": true,
	"freebsd": true, "hurd": true, "illumos": true, "ios": true, "js": true, "linux": true,
	"nacl": true, "netbsd": true, "openbsd": true, "plan9": true, "solaris": true,
	"wasip1": true, "windows": true, "zos": true}

var goarchList = map[string]bool{"386": true, "amd64": true, "amd64p32": true, "arm": true,
	"armbe": true, "arm64": true, "arm64be": true, "loong64": true, "mips": true, "mipsle": true,
	"mips64": true, "mips64le": true, "mips64p32": true, "mips64p32le": true, "ppc": true,
	"ppc64": true, "ppc64le": true, "riscv": true, "riscv64": true, "s390": true, "s390x": true,
	"sparc": true, "sparc64": true, "wasm": true}

// ファイル名サフィックスによる暗黙のビルド制約 (_windows.go, _linux_amd64.go 等)
func suffixConstrained(name string) string {
	base := strings.TrimSuffix(name, ".go")
	parts := strings.Split(base, "_")
	if len(parts) < 2 {
		return ""
	}
	last := parts[len(parts)-1]
	if len(parts) >= 3 && goosList[parts[len(parts)-2]] && goarchList[last] {
		return "_" + parts[len(parts)-2] + "_" + last
	}
	if goosList[last] || goarchList[last] {
		return "_" + last
	}
	return ""
}

// ファイル先頭(package 節より前)に //go:build / // +build があるか
func headerConstrained(path string) string {
	f, err := os.Open(path)
	if err != nil {
		return ""
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	sc.Buffer(make([]byte, 1024*1024), 1024*1024)
	for sc.Scan() {
		line := strings.TrimSpace(sc.Text())
		if strings.HasPrefix(line, "package ") {
			return ""
		}
		if strings.HasPrefix(line, "//go:build") || strings.HasPrefix(line, "// +build") {
			return line
		}
	}
	return ""
}

// linux/amd64 のビルド文脈（ReleaseTags 等は既定から引き継ぐ）。
// MatchFile は cgo 制約（//go:build cgo / !cgo）も評価するため、CgoEnabled を
// 計測時（proc.sh は未指定＝ホスト既定の CGO_ENABLED=1）に合わせて明示固定する。
// 明示しないと実行環境しだいで判定が go list と食い違いうる。
var lctx = func() build.Context {
	c := build.Default
	c.GOOS = "linux"
	c.GOARCH = "amd64"
	c.CgoEnabled = true // = 計測時の CGO_ENABLED=1
	return c
}()

// linux/amd64 以外のビルド文脈。OS制約だけでなく ARCH 制約 (_arm64.go 等) も拾えるよう
// linux の別アーキテクチャも含める。
var platCtxs = func() []build.Context {
	pairs := [][2]string{
		{"windows", "amd64"}, {"darwin", "arm64"}, {"darwin", "amd64"}, {"freebsd", "amd64"},
		{"netbsd", "amd64"}, {"openbsd", "amd64"}, {"dragonfly", "amd64"}, {"solaris", "amd64"},
		{"illumos", "amd64"}, {"aix", "ppc64"}, {"plan9", "amd64"}, {"android", "arm64"},
		{"ios", "arm64"}, {"js", "wasm"}, {"wasip1", "wasm"}, {"zos", "s390x"},
		{"linux", "arm64"}, {"linux", "386"}, {"linux", "arm"}, {"linux", "riscv64"},
		{"linux", "s390x"}, {"linux", "ppc64le"}, {"linux", "mips64"}, {"linux", "loong64"},
	}
	out := make([]build.Context, 0, len(pairs))
	for _, pr := range pairs {
		c := build.Default
		c.GOOS, c.GOARCH, c.CgoEnabled = pr[0], pr[1], true
		out = append(out, c)
	}
	return out
}()

// cgo 無効の linux/amd64（//go:build !cgo 由来の除外を切り分ける）
var nocgoCtx = func() build.Context {
	c := build.Default
	c.GOOS, c.GOARCH, c.CgoEnabled = "linux", "amd64", false
	return c
}()

func main() {
	if len(os.Args) < 2 {
		fmt.Fprintln(os.Stderr, "usage: importscan <repoDir>")
		os.Exit(2)
	}
	root := os.Args[1]
	fset := token.NewFileSet()
	enc := json.NewEncoder(os.Stdout)

	filepath.Walk(root, func(p string, info os.FileInfo, err error) error {
		if err != nil {
			return nil
		}
		rel, _ := filepath.Rel(root, p)
		if info.IsDir() {
			if p == root {
				return nil
			}
			name := info.Name()
			// go ツールが無視するディレクトリ
			if name == "vendor" || name == "testdata" ||
				strings.HasPrefix(name, ".") || strings.HasPrefix(name, "_") {
				return filepath.SkipDir
			}
			// ネストした別モジュール（root 以外で go.mod を持つ）は対象外
			if _, e := os.Stat(filepath.Join(p, "go.mod")); e == nil {
				return filepath.SkipDir
			}
			return nil
		}
		name := info.Name()
		if !strings.HasSuffix(name, ".go") || strings.HasSuffix(name, "_test.go") {
			return nil
		}
		// ★ ビルド制約は適用せず、全ファイルを parse する
		af, e := parser.ParseFile(fset, p, nil, parser.ImportsOnly)
		if e != nil {
			return nil // 壊れたファイルは飛ばす（go list -e と同じ思想）
		}
		// header と ファイル名サフィックスの**両方**を記録する。
		// 片方だけだと、//go:build 行を持つ foo_windows.go で "_windows" が失われ、
		// platform に分類すべきものが other_tag に流れる。
		cons := strings.TrimSpace(headerConstrained(p) + " " + suffixConstrained(name))
		// linux/amd64 ビルドに含まれるかを go/build に評価させる
		linuxOK := true
		if m, e := lctx.MatchFile(filepath.Dir(p), name); e == nil {
			linuxOK = m
		}
		// linux/amd64 で除外された理由を、文字列マッチではなく MatchFile の再評価で判定する。
		//   otherPlat = 他の GOOS/GOARCH のいずれかでは含まれる → プラットフォーム制約
		//   cgoOff    = cgo を無効にすると含まれる            → cgo 制約
		// この方式なら "!linux" "darwin || freebsd" "unix" "arm64" 等も正しく拾え、
		// タグ名の文字列マッチに起因するバグが原理的に起きない。
		otherPlat, cgoOff := false, false
		if !linuxOK {
			for _, c := range platCtxs {
				if m, e := c.MatchFile(filepath.Dir(p), name); e == nil && m {
					otherPlat = true
					break
				}
			}
			if !otherPlat {
				if m, e := nocgoCtx.MatchFile(filepath.Dir(p), name); e == nil && m {
					cgoOff = true
				}
			}
		}
		for _, is := range af.Imports {
			ip, e2 := strconv.Unquote(is.Path.Value)
			if e2 != nil || ip == "" || ip == "C" {
				continue
			}
			enc.Encode(imp{Path: ip, File: rel, Line: fset.Position(is.Pos()).Line,
				Build: cons != "", Cons: cons, LinuxOK: linuxOK,
				OtherPlat: otherPlat, CgoOff: cgoOff})
		}
		return nil
	})
}
