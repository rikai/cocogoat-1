"use strict";(self["define"]=self["define"]||[]).push([[4861],{48034:function(e,t,a){a.r(t),a.d(t,{default:function(){return C}});a(77610),a(9917);var n=a(69417),s=a(6504),o=a(19812),i=a(55893);const l=(0,o._)("span",{style:{"font-family":"genshin"}},"椰羊 · ",-1),c=["src"],r={class:"model"},u=(0,o._)("div",{class:"title"},"扫描完成",-1),m={key:0,class:"faildResults"},d=["src"],f=["value"],g={class:"operations"},v={key:1},h=(0,o._)("a",null," | ",-1);function p(e,t,a,p,w,y){const S=s.mi,k=n.Q0,_=(0,o.up)("Layout");return(0,o.wg)(),(0,o.j4)(_,{"full-height":""},{title:(0,o.w5)((()=>[l,(0,o.Uk)(" 扫描成就并导出到"+(0,i.zw)("seelie"===e.to?"Seelie":"Paimon.moe"),1)])),actions:(0,o.w5)((()=>[(0,o.Wm)(k,{content:"扫描完成之后也还可以切换哦"},{default:(0,o.w5)((()=>[(0,o.Wm)(S,{class:"switch",type:"primary",plain:"",onClick:t[0]||(t[0]=t=>e.$router.replace({...e.$route,query:{...e.$route.query,to:"seelie"===e.to?"paimon-moe":"seelie"}}))},{default:(0,o.w5)((()=>[(0,o.Uk)(" 切换到"+(0,i.zw)("seelie"===e.to?"Paimon.moe":"Seelie"),1)])),_:1})])),_:1})])),default:(0,o.w5)((()=>[(0,o._)("iframe",{ref:"contentFrame",class:(0,i.C_)(e.$style.fr),src:e.frameUrl,frameborder:"0"},null,10,c),e.finished?((0,o.wg)(),(0,o.iD)("div",{key:0,class:(0,i.C_)(e.$style.modelBackdrop)},[(0,o._)("div",r,[u,e.showFaildImages?((0,o.wg)(),(0,o.iD)("div",m,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.faildResults,((e,t)=>((0,o.wg)(),(0,o.iD)("img",{key:t,src:e},null,8,d)))),128))])):((0,o.wg)(),(0,o.iD)("textarea",{key:1,value:"seelie"===e.to?e.exportToSeelie:e.exportToPaiminMoe},null,8,f)),(0,o._)("div",g,[e.faildResults.length>0?((0,o.wg)(),(0,o.iD)("span",{key:0,onClick:t[1]||(t[1]=t=>e.showFaildImages=!e.showFaildImages)},(0,i.zw)(e.showFaildImages?"返回导出结果":"查看失败项"),1)):(0,o.kq)("",!0),e.faildResults.length>0?((0,o.wg)(),(0,o.iD)("a",v," | ")):(0,o.kq)("",!0),(0,o._)("span",{class:"switch",onClick:t[2]||(t[2]=t=>e.$router.replace({...e.$route,query:{...e.$route.query,to:"seelie"===e.to?"paimon-moe":"seelie"}}))},"切换到"+(0,i.zw)("seelie"===e.to?"Paimon.moe":"Seelie"),1),h,(0,o._)("span",{class:"reset",onClick:t[3]||(t[3]=(...t)=>e.reset&&e.reset(...t))},"重新开始")])])],2)):(0,o.kq)("",!0)])),_:1})}var w=a(20521),y=a(13065),S=a(28501),k=a(51020),_=(0,o.aZ)({setup(){const e=(0,S.G)("frames.achievement.scan"),t=(0,w.iH)(!1),a=(0,w.iH)(!1),n=(0,w.iH)([]),s=(0,o.Fl)((()=>n.value.filter((e=>!e.success||!e.done)).map((e=>{var t;return null===(t=e.images)||void 0===t?void 0:t.main})))),i=(0,w.iH)(null),l=(0,y.yj)(),c=(0,o.Fl)((()=>"seelie"===l.query.to?"seelie":"paimon-moe"));(0,o.YP)(i,(e=>{e&&window.addEventListener("message",(e=>{const{app:t,event:s,data:o}=e.data;if("cocogoat.scanner.achievement"===t)if("ready"!==s){if("result"===s){const{result:e}=o;for(const t of e)if(t.success&&t.achievement.preStage&&t.achievement.preStage>0){const a=k.Z.find((e=>e.id===t.achievement.categoryId));if(a){let n=a.achievements.find((e=>e.id===t.achievement.preStage));if(n){const a={...t,success:!0,date:"后续已完成"};e.push({...a,achievement:{...n,categoryId:t.achievement.categoryId}})}}}n.value=e,a.value=!0,console.log("got result from scanner")}}else a.value=!1}))}));const r=(0,o.Fl)((()=>{const e=n.value.filter((e=>e.success&&e.date)).map((e=>{const t=e.achievement;return[t.categoryId,t.id]}));return`/* \n* 复制此处所有内容，\n* 在Paimon.moe页面按F12打开调试器，\n* 选择控制台(Console)\n* 粘贴并回车执行完成导入\n*/\nconst b = ${JSON.stringify(e)};\nconst a = (await localforage.getItem('achievement')) || {};\nb.forEach(c=>{a[c[0]]=a[c[0]]||{};a[c[0]][c[1]]=true})\nawait localforage.setItem('achievement',a);\nlocation.href='/achievement'`})),u=(0,o.Fl)((()=>{const e=n.value.filter((e=>e.success&&e.date)).map((e=>{const t=e,a=t.achievement;return[a.id,(t.status+" "+t.date).trim()]}));return`/* \n* 复制此处所有内容，\n* 在Seelie.me页面按F12打开调试器，\n* 选择控制台(Console)\n* 粘贴并回车执行完成导入\n*/\nconst z = ${JSON.stringify(e)};\nconst a = localStorage.account || 'main'\nconst b = JSON.parse(localStorage.getItem(\`\${a}-achievements\`)||'{}')\nz.forEach(c=>{b[c[0]]={done:true,notes:c[1]}})\nlocalStorage.setItem(\`\${a}-achievements\`,JSON.stringify(b))\nlocalStorage.last_update = (new Date()).toISOString()\nlocation.href='/achievements'`})),m=()=>{var e,t;null===(e=i.value)||void 0===e||null===(t=e.contentWindow)||void 0===t||t.postMessage({app:"cocogoat.scanner.achievement",event:"reset"},"*")};return{finished:a,results:n,exportToPaiminMoe:r,exportToSeelie:u,contentFrame:i,reset:m,faildResults:s,showFaildImages:t,to:c,frameUrl:e}}}),I={fr:"fr-e4616f",modelBackdrop:"model-backdrop-c93930"},F=a(48998);const $={};$["$style"]=I;const q=(0,F.Z)(_,[["render",p],["__cssModules",$]]);var C=q},77610:function(e,t,a){a(13910),a(33950)}}]);