# 計測環境を再現するためのコンテナ定義。
#
# 本研究は「SBOM生成ツールの出力は環境に依存する」ことを示しているため、
# 環境を固定できなければ成果物として不完全になる。そのための定義である。
#
# 設計方針: **実験コードを一切変更しない**。
#   proc.sh / worker.sh / heavy_worker.sh / drive.sh には計測環境の絶対パス
#   （/home/user/SBOM/census2 と /opt/go1265/go/bin）が埋め込まれている。
#   科学的な処理内容を変えないため、スクリプトを書き換えるのではなく、
#   コンテナ側でその絶対パスを満たす。
#
# 使い方:
#   docker build -t census2 .
#   docker run --rm census2 node verify.js          # 段階1: CSVから表を再計算
#   docker run --rm -it census2 bash                 # 段階3: 個別リポジトリの再計測
#
# 【検証状況】このDockerfile自体のビルドは未検証である（作成環境に docker デーモンが
# 無かったため）。ただし各ステップは同等の環境で個別に実行して確認している:
#   - ベースイメージ golang:1.26.5-bookworm の存在（Docker Hub API で確認）
#   - Node v22.22.2 tarball の URL と SHA256（nodejs.org で確認）
#   - 4ツールの go install / npm install が成功すること
#   - GOEXPERIMENT=jsonv2 を外すと trivy のビルドが実際に失敗すること
#   - /opt/go1265/go シンボリックリンクで proc.sh が無改変で動作すること
# 初回ビルド時は上記を確認のうえ、必要なら修正すること。
#
FROM golang:1.26.5-bookworm

# --- Node.js v22.22.2（計測時と同一。cdxgen の実行に必要）---
# Debian bookworm の nodejs は v18 で cdxgen 12.x の要求（Node >= 20）を満たさない。
# 第三者スクリプトの実行（curl | bash）を避け、公式tarballをSHA256検証して固定する。
ARG NODE_VERSION=22.22.2
ARG NODE_SHA256=88fd1ce767091fd8d4a99fdb2356e98c819f93f3b1f8663853a2dee9b438068a
RUN apt-get update \
 && apt-get install -y --no-install-recommends curl ca-certificates git xz-utils \
 && rm -rf /var/lib/apt/lists/* \
 && curl -fsSLO "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
 && echo "${NODE_SHA256}  node-v${NODE_VERSION}-linux-x64.tar.xz" | sha256sum -c - \
 && tar -xJf "node-v${NODE_VERSION}-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
      --exclude=CHANGELOG.md --exclude=LICENSE --exclude=README.md \
 && rm "node-v${NODE_VERSION}-linux-x64.tar.xz"

# --- SBOM生成ツール4種（計測時と同一バージョン）---
# GitHub Releases が到達できない環境があるため、計測時と同じく go install で
# ソースからビルドする。そのため syft/trivy の `--version` はビルドメタが
# 埋まらず dev を返す（計測時の記録と同じ状態）。バージョンはバイナリの
# 埋め込みモジュール情報（go version -m）で確認できる。
#
# ★ trivy v0.72.0 は go1.26 の encoding/json/v2 を使うため
#   GOEXPERIMENT=jsonv2 が必須。これが無いと
#   "build constraints exclude all Go files in .../encoding/json/v2" で失敗する。
#   計測時の tool_versions.txt にはこの条件が記録されていない。
#
# go install 中は GOFLAGS を空にする（-mod=mod はモジュール取得と競合するため）。
RUN GOFLAGS= go install github.com/anchore/syft/cmd/syft@v1.46.0 \
 && GOFLAGS= go install github.com/CycloneDX/cyclonedx-gomod/cmd/cyclonedx-gomod@v1.10.0 \
 && GOFLAGS= GOEXPERIMENT=jsonv2 go install github.com/aquasecurity/trivy/cmd/trivy@v0.72.0
RUN npm install -g @cyclonedx/cdxgen@12.7.1

# --- 実験スクリプトが期待する絶対パスを満たす ---
# proc.sh:13 等が PATH=/opt/go1265/go/bin を前提にしている
RUN mkdir -p /opt/go1265 && ln -s /usr/local/go /opt/go1265/go

# 計測時の環境変数（tool_versions.txt および論文 tab:env と同じ）
ENV GOTOOLCHAIN=local \
    GOFLAGS=-mod=mod \
    GOOS=linux \
    GOARCH=amd64 \
    CGO_ENABLED=1 \
    PATH=/opt/go1265/go/bin:/go/bin:/usr/local/go/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# proc.sh:7-8 が BASE=/home/user/SBOM/census2 を前提にしている
WORKDIR /home/user/SBOM/census2
COPY . /home/user/SBOM/census2
# proc.sh が1リポジトリ分のマニフェスト行を書き出す先（未収録のため作成する）
RUN mkdir -p /home/user/SBOM/census2/manifest_parts

CMD ["node", "verify.js"]
