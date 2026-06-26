const fs=require("fs");
const repolist=fs.readFileSync("results3gt/repolist.csv","utf8").trim().split("\n").map(l=>l.split(",")[0]).filter(Boolean);
const norm=s=>{try{s=decodeURIComponent(s);}catch(e){}return s.trim().toLowerCase();};
const tools={syft:"syft_output.json",trivy:"trivy_output.json",cdxgen:"cdxgen_output.json","cyclonedx-gomod":"cyclonedx-gomod_output.json"};
const isPseudo=v=>/-\d{14}-[0-9a-f]+/.test(v)||/v0\.0\.0-/.test(v);
function gtMap(f,main){const m=new Map();if(!fs.existsSync(f))return null;
  for(const l of fs.readFileSync(f,"utf8").split("\n")){const a=l.trim().split(/\s+/);if(!a[0])continue;
    const p=norm(a[0]);if(p===main)continue;m.set(p,a[1]?norm(a[1]):"");}return m;}
function toolMap(f,main){const m=new Map();let d;try{d=JSON.parse(fs.readFileSync(f));}catch(e){return null;}
  for(const c of(d.components||[])){const u=c.purl||"";if(!u.startsWith("pkg:golang/"))continue;
    let r=u.slice(11).split("?")[0].split("#")[0];const at=r.lastIndexOf("@");
    const p=norm(at<0?r:r.slice(0,at));const v=at<0?"":norm(r.slice(at+1));
    if(p==="stdlib"||p===main)continue;if(!m.has(p))m.set(p,v);}return m;}
const levels={all:"gt_go_list.txt",imported:"gt_imported.txt"};
const buckets=["tool_noversion","gt_noversion","vprefix_only","incompatible","pseudo","semver_diff"];
const stat={};for(const t of Object.keys(tools))stat[t]={all:Object.fromEntries(buckets.map(b=>[b,0])),imported:Object.fromEntries(buckets.map(b=>[b,0]))};
const totalNameTP={};for(const t of Object.keys(tools))totalNameTP[t]={all:0,imported:0};
for(const name of repolist){const RES="resultsAll/"+name;
  const glf=RES+"/gt_go_list.txt";if(!fs.existsSync(glf))continue;
  const fr=fs.readFileSync(glf,"utf8").split("\n")[0].trim().split(/\s+/);const main=fr.length===1?norm(fr[0]):null;
  for(const[lvl,gf]of Object.entries(levels)){const gm=gtMap(RES+"/"+gf,main);if(!gm)continue;
    for(const[t,tf]of Object.entries(tools)){const tm=toolMap(RES+"/"+tf,main);if(!tm)continue;
      for(const[p,tv]of tm){if(!gm.has(p))continue; // name TP
        totalNameTP[t][lvl]++;
        const gv=gm.get(p);
        if(tv===gv)continue; // version match
        // classify mismatch
        let b;
        if(tv==="")b="tool_noversion";
        else if(gv==="")b="gt_noversion";
        else if(tv.replace(/^v/,"")===gv.replace(/^v/,""))b="vprefix_only";
        else if(tv.includes("+incompatible")||gv.includes("+incompatible"))b="incompatible";
        else if(isPseudo(tv)||isPseudo(gv))b="pseudo";
        else b="semver_diff";
        stat[t][lvl][b]++;
      }}}}
function rep(lvl){let o=`### ${lvl} レベル — version不一致の内訳（name一致したコンポーネントのうち）\n\n`;
  o+="| ツール | name一致数 | version不一致 | tool版欠落 | v接頭辞のみ | +incompatible | pseudo差 | semver差(MVS/replace) |\n|---|---|---|---|---|---|---|---|\n";
  for(const t of Object.keys(tools)){const s=stat[t][lvl];const tot=Object.values(s).reduce((a,b)=>a+b,0);
    o+=`| ${t} | ${totalNameTP[t][lvl]} | ${tot} (${(100*tot/totalNameTP[t][lvl]).toFixed(1)}%) | ${s.tool_noversion} | ${s.vprefix_only} | ${s.incompatible} | ${s.pseudo} | ${s.semver_diff} |\n`;}
  return o+"\n";}
let md="## version不一致の原因分類（all/imported、時点整合GT）\n\n";
md+=rep("all")+rep("imported");
console.log(md);
fs.writeFileSync("/tmp/vclass_out.md",md);
