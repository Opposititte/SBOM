// 修正版: cdxgenが報告するメインモジュールのバージョンの go.sum と突合
// argv: name  <gosum結合ファイル>  <gomod結合ファイル>
const fs=require("fs");
const name=process.argv[2], gosumF=process.argv[3], gomodF=process.argv[4];
const norm=s=>{try{s=decodeURIComponent(s);}catch(e){}return s.trim().toLowerCase();};
const RES="resultsAll/"+name;
const rd=f=>fs.existsSync(f)?fs.readFileSync(f,"utf8"):"";
const gl=rd(RES+"/gt_go_list.txt").split("\n")[0].trim().split(/\s+/);
const main=gl.length===1?norm(gl[0]):null;
const gtImp=new Set(rd(RES+"/gt_imported.txt").split("\n").map(l=>norm((l.trim().split(/\s+/)[0]||""))).filter(Boolean));
gtImp.delete(main);
function toolNames(f){const s=new Set();let d;try{d=JSON.parse(rd(f));}catch(e){return null;}
  for(const c of(d.components||[])){const u=c.purl||"";if(!u.startsWith("pkg:golang/"))continue;
    let r=u.slice(11).split("?")[0].split("#")[0];const at=r.lastIndexOf("@");const p=norm(at<0?r:r.slice(0,at));
    if(p==="stdlib"||p===main)continue;s.add(p);}return s;}
const cdx=toolNames(RES+"/cdxgen_output.json");
if(!cdx){console.log(name+",NA");process.exit(0);}
const gosum=new Set();for(const l of rd(gosumF).split("\n")){const t=l.trim().split(/\s+/);if(t[0])gosum.add(norm(t[0]));}
const gomod=new Set();{let inblk=false;for(let line of rd(gomodF).split("\n")){const t=line.trim();
  if(t.startsWith("require (")){inblk=true;continue;} if(inblk&&t===")"){inblk=false;continue;}
  if(inblk){const m=t.split(/\s+/)[0];if(m&&!m.startsWith("//"))gomod.add(norm(m));continue;}
  if(t.startsWith("require ")){const m=t.split(/\s+/)[1];if(m)gomod.add(norm(m));}}}
gomod.delete(main);
let FP=0,inGomod=0,resInGosum=0,neither=0,anyInGosum=0;
for(const m of cdx){if(gtImp.has(m))continue;FP++;
  if(gosum.has(m))anyInGosum++;
  if(gomod.has(m))inGomod++; else if(gosum.has(m))resInGosum++; else neither++;}
console.log([name,cdx.size,gtImp.size,FP,inGomod,resInGosum,neither,anyInGosum].join(","));
