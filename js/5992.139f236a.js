"use strict";(self["define"]=self["define"]||[]).push([[5992],{31060:function(e,n,s){s.d(n,{zG:function(){return v}});var a=s(61976),r=s(71836),i=s(69997),o=s(84627),t=s(40192),l=s(51020),c=s(82619),u=s(75345);function d(){let e;e=new o.Cc(new URL(s.p+s.u(4679),s.b)),console.log("Worker created using worker-plugin");const n=(0,a.Ud)(e);return{worker:n,_worker:e}}function p(){const{worker:e,_worker:n}=d(),{worker:s,_worker:a}=d(),{scannerOnImage:o,scannerOnLine:p,recognizeAchievement:g}=e,{recognizeAchievement:v,scannerOnLine:m}=s;let f=e=>{};const w=e=>{f=e},h=e=>{throw f(-99),e};n.addEventListener("error",h),a.addEventListener("error",h);const k=(async()=>{try{const[n,a]=(0,i.LS)(),o=t.hP?"ort-wasm-simd.wasm":"ort-wasm.wasm",d=t.hP?"opencv-simd.wasm":"opencv-normal.wasm";await n,await(0,i.sB)([o,d,"ppocr.ort"],(e=>f(e)),a);const p=(0,u.Z)(c.i18n.amos);await Promise.all([e.setResources(r.ZP),s.setResources(r.ZP),e.initAchievementMap(l.Z,p),s.initAchievementMap(l.Z,p)]),f(100)}catch(o){throw f(-1),o}n.removeEventListener("error",h),a.removeEventListener("error",h),await Promise.all([e.init(),s.init()])})();return{recognizeAchievement:v,recognizeAchievement2:g,scannerOnLine:m,scannerOnLine2:p,scannerOnImage:o,initPromise:k,workerCV:e,workerOCR:s,onProgress:w}}let g;function v(){return g||(g=p()),g}},21277:function(e,n,s){function a(e,n){parent&&window!==parent&&parent.postMessage({app:"cocogoat.scanner.achievement",event:e,data:JSON.parse(JSON.stringify(n))},"*")}s.d(n,{l:function(){return a}})},83889:function(e,n,s){s.d(n,{Z:function(){return P}});var a=s(19812),r=s(55893);const i={class:"l"},o={class:"x"},t=(0,a._)("div",{class:"text"},[(0,a.Uk)("当前浏览器不支持此功能"),(0,a._)("br"),(0,a.Uk)("请升级或更换浏览器")],-1),l={key:1,class:"scanner-loading"},c={class:"loader-animation"},u=(0,a._)("div",{class:"loader-text"},"椰羊正在饮甘露，马上就来",-1),d={class:"loader-progress"},p={class:"loader-progress-text"};function g(e,n,s,g,v,m){const f=(0,a.up)("fa-icon"),w=(0,a.up)("icon-loading");return(0,a.wg)(),(0,a.iD)("div",null,[e.ocrCompatible?((0,a.wg)(),(0,a.iD)("div",l,[(0,a._)("div",{class:(0,r.C_)(e.$style.loader)},[(0,a._)("div",c,[(0,a.Wm)(w,{class:"loader-svg",percent:.88*e.progress+5},null,8,["percent"])]),u,(0,a._)("div",d,[(0,a._)("div",{class:"loader-progress-bar",style:(0,r.j5)({width:e.progress+"%"})},null,4)]),(0,a._)("div",p,[(0,a._)("span",null,(0,r.zw)(e.progressText||`${e.progress.toFixed(2)}%`),1)])],2)])):((0,a.wg)(),(0,a.iD)("div",{key:0,class:(0,r.C_)(e.$style.showUncompatible)},[(0,a._)("span",i,[(0,a.Wm)(f,{icon:["fab","internet-explorer"]}),(0,a._)("span",o,[(0,a.Wm)(f,{icon:"triangle-exclamation"})])]),t],2))])}var v=s(20521),m=s(40192),f=s(31060),w=s(21277),h=s(92002),k=s(1607),_=s(14287),y=s(75444);k.vI.add(_.ik8,y.EPy);var C=(0,a.aZ)({components:{IconLoading:h.Z},emits:["done"],setup(e,{emit:n}){const s=(0,v.iH)(0),r=(0,v.iH)("获取资源地址");return(0,a.bv)((async()=>{if(!m.KL)return;const e=(0,f.zG)();e.onProgress((e=>{if(!(s.value<0)){if((0,w.l)("load",e),s.value=e,e<-90)return(0,w.l)("load",!1),void(r.value="应用初始化失败, 请联系开发者");if(e<0)return(0,w.l)("load",!1),void(r.value="加载失败, 请刷新重试或联系开发者");r.value="",e>=100&&(r.value="校验完整性",setTimeout((()=>{(0,w.l)("load",!0),r.value="应用初始化"}),140))}})),e.initPromise.then((()=>{n("done")}))})),{ocrCompatible:m.KL,progress:s,progressText:r}}}),L={showUncompatible:"show-uncompatible-cfbfd0",loader:"loader-a3e60a",scannerCssloadLoader:"scanner-cssload-loader-eb1b08",scannerCssloadLoaderInner:"scanner-cssload-loader-inner-c70159"},D=s(48998);const b={};b["$style"]=L;const O=(0,D.Z)(C,[["render",g],["__cssModules",b]]);var P=O},92427:function(e,n,s){s.r(n),s.d(n,{default:function(){return W}});s(11723),s(24611),s(26913);var a=s(93826),r=s(17336),i=s(95980),o=s(19812),t=s(55893),l=s(44220);const c={key:0,class:"step1"},u=(0,o._)("span",null,[(0,o.Uk)("点击选择成就页面截图（支持多选）"),(0,o._)("br"),(0,o.Uk)("或拖动图片到这里")],-1),d={class:"list"},p=(0,o._)("p",null,[(0,o.Uk)(" 请上传完整的成就页面截图 "),(0,o._)("br"),(0,o.Uk)(" 如无法多选请更换浏览器 ")],-1),g={class:"image-content"},v=["src"],m={key:1,class:"step2"},f={class:"inline-status"};function w(e,n,s,w,h,k){const _=(0,o.up)("Loader"),y=(0,o.up)("fa-icon"),C=i.GT,L=r.Mr,D=a.Xh,b=(0,o.up)("float-content"),O=(0,o.Q2)("elloading");return(0,o.wg)(),(0,o.iD)("div",null,[e.load?((0,o.wg)(),(0,o.iD)("div",{key:1,class:(0,t.C_)(e.$style.listContainer)},[1===e.step?((0,o.wg)(),(0,o.iD)("div",c,[(0,o._)("div",{class:"top",style:(0,t.j5)(e.images.length>0?{}:{padding:0})},[(0,o._)("div",{class:(0,t.C_)(["dropzone",{"drag-over":e.dragOver}]),onDragover:n[2]||(n[2]=(0,l.iM)((n=>e.dragOver=!0),["prevent","stop"])),onDragleave:n[3]||(n[3]=n=>e.dragOver=!1),onDrop:n[4]||(n[4]=(0,l.iM)(((...n)=>e.onFileDrop&&e.onFileDrop(...n)),["prevent","stop"])),onClick:n[5]||(n[5]=(...n)=>e.dropzoneClick&&e.dropzoneClick(...n))},[(0,o._)("i",null,[(0,o.Wm)(y,{icon:"inbox"})]),u,(0,o._)("input",{ref:"fileInput",multiple:"",class:"file-input",type:"file",accept:"image/*",onChange:n[1]||(n[1]=(...n)=>e.onFileChange&&e.onFileChange(...n))},null,544)],34),e.images.length>0?((0,o.wg)(),(0,o.iD)("button",{key:0,onClick:n[6]||(n[6]=n=>e.step++)},"识别")):(0,o.kq)("",!0)],4),(0,o.wy)(((0,o.wg)(),(0,o.iD)("div",d,[(0,o.Wm)(L,null,{default:(0,o.w5)((()=>[e.images.length<=0?((0,o.wg)(),(0,o.j4)(C,{key:0},{description:(0,o.w5)((()=>[p])),_:1})):(0,o.kq)("",!0),(0,o._)("div",g,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.images,(e=>((0,o.wg)(),(0,o.iD)("img",{key:e.id,src:e.src},null,8,v)))),128))])])),_:1})])),[[O,e.loading]])])):(0,o.kq)("",!0),2===e.step?((0,o.wg)(),(0,o.iD)("div",m,[(0,o.Wm)(D,{type:"circle",percentage:e.progress||0,format:e=>e.toFixed(2)+"%"},null,8,["percentage","format"]),(0,o._)("div",f,[(0,o.Wm)(b,{"in-float":!1,capture:!1,state:1,success:e.recognized.success,fail:e.recognized.fail,scanned:e.scanned,duplicate:e.dup},null,8,["success","fail","scanned","duplicate"])])])):(0,o.kq)("",!0)],2)):((0,o.wg)(),(0,o.j4)(_,{key:0,onDone:n[0]||(n[0]=n=>e.load=!0)}))])}s(85827);var h=s(20521),k=s(83889),_=s(40192),y=s(31060),C=s(1607),L=s(14287),D=s(53389),b=(s(92542),s(86463)),O=s.n(b),P=s(13065),z=s(12507),H=s(77225),U=s(21277);C.vI.add(L.wK3);var Z=(0,o.aZ)({components:{Loader:k.Z,FloatContent:H.Z},directives:{elloading:D.t},setup(){const e=(0,h.iH)(!1),n=(0,h.iH)(!1),s=(0,h.iH)(1);if(!_.KL)return{load:e};const{scannerOnLine:a,scannerOnLine2:r,scannerOnImage:i}=(0,y.zG)(),t=(0,h.iH)(null),l=(0,h.iH)([]),c=(0,h.iH)(!1),u=()=>{t.value&&t.value.click()},d=e=>{if(!e.dataTransfer)return;c.value=!1;const n=e.dataTransfer.files;g(n)},p=e=>{const n=e.target.files;n&&g(n)},g=async e=>{l.value=[],n.value=!0;const s=Array.from(e).map(((e,n)=>{const s=new FileReader;return s.readAsDataURL(e),new Promise((e=>{s.onload=()=>{const a=new Image;a.src=s.result,a.id="rcycle-img-"+n,a.onload=()=>{e(a)}}}))}));l.value=await Promise.all(s),n.value=!1},v=(0,h.iH)([]),m=(0,h.iH)(0),f=(0,h.iH)(0),w=(0,o.Fl)((()=>({success:v.value.filter((e=>e.success)).length,fail:v.value.filter((e=>!e.success)).length}))),k=(0,o.Fl)((()=>(w.value.success+w.value.fail+m.value)/f.value*100));(0,o.YP)([l,w,m],(()=>{(0,U.l)("progress",{scanned:l.value.length,...w.value,dup:m.value})}));const C=(0,P.yj)(),L=(0,h.iH)(!1),D=async({image:e,thread:n})=>{if(!e)return;let s=a;n&&L.value&&(s=r);const i=await s(e);if(i.success){const n=v.value.find((e=>{if(!e.success)return!1;const n=e;return n.achievement.id===i.achievement.id}));i.done&&!C.query.withImage||(i.images={main:(0,z.rT)(e).toDataURL()}),n?m.value++:v.value.push(i)}else i.images={main:(0,z.rT)(e).toDataURL()},v.value.push(i),(new Image).src=i.images.main},b=O().promise(D,2),H=async e=>{const n=(0,z.eW)(e),s=await i(n,!0,!0),a=s.reduce(((e,n)=>e+n.image.rows),0);for(const r of s)r.image.rows>a/s.length*2/3&&(b.push({image:r.image,thread:f.value%2===0}),f.value++)},Z=O().promise(H,1);async function F(){b.killAndDrain(),b.pause();let e=Promise.resolve();l.value.forEach((n=>{e=Z.push(n)})),b.resume(),await e,L.value=!0,console.log("processing"),(0,U.l)("state","processing"),await b.push({image:null,thread:!1}),(0,U.l)("state","finish"),(0,U.l)("result",{result:v.value,dup:m.value})}return(0,o.YP)(s,(e=>{2===e&&F()})),{step:s,load:e,loading:n,onFileDrop:d,onFileChange:p,dropzoneClick:u,fileInput:t,dragOver:c,images:l,progress:k,recognized:w,results:v,dup:m,scanned:f}}}),F={listContainer:"list-container-d28269"},I=s(48998);const x={};x["$style"]=F;const A=(0,I.Z)(Z,[["render",w],["__cssModules",x]]);var W=A}}]);