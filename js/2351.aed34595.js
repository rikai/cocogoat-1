"use strict";(self["define"]=self["define"]||[]).push([[2351],{72351:function(t,e,a){a.r(e),a.d(e,{default:function(){return k}});var o=a(78255),s=a(72867),r=a(20521),n=a(69033),i=a(19812),c=a(55893);const d={class:"logo"},l={class:"content"},f={class:"title"},h={class:"username"},u={class:"status"};function p(t,e,a,o,s,r){const n=(0,i.up)("fa-icon");return(0,i.wg)(),(0,i.iD)("div",{class:(0,c.C_)(t.$style.syncItemMsft)},[(0,i._)("div",d,[(0,i.Wm)(n,{icon:["fab","microsoft"]})]),(0,i._)("div",l,[(0,i._)("div",f,[(0,i._)("div",h,"OneDrive - "+(0,c.zw)(t.provider.name),1),(0,i._)("div",u,(0,c.zw)(t.provider.user),1)])])],2)}var m=a(75444),w=a(1607);w.vI.add(m.hVS);var y=(0,i.aZ)({props:{provider:{type:Object,required:!0}},setup(){return{}}}),g={syncItemMsft:"syncItemMsft-dbda1e"},v=a(48998);const A={};A["$style"]=g;const b=(0,v.Z)(y,[["render",p],["__cssModules",A]]);var T=b,_=a(17997);class x{constructor(t){(0,o.Z)(this,"component",(0,r.Xl)(T)),(0,o.Z)(this,"data",void 0),(0,o.Z)(this,"name",""),(0,o.Z)(this,"user",""),this.data=t;const e=t.id_token,a=JSON.parse((0,n.Jx)(e.split(".")[1]));this.name=a.name,this.user=a.preferred_username}async refreshToken(){if(Date.now()-this.data.last_updated<1e3*this.data.expires_in)return;const t=await fetch(await(0,s.HU)("/oauth/v1/microsoft"),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({refresh_token:this.data.refresh_token})});try{if(200===t.status){const e=await t.json();if(e.refresh_token&&e.access_token){const t=e.id_token;Object.assign(this.data,e),this.data.id_token=t,this.data.last_updated=Date.now(),console.log("SYNC-ONEDRIVE","Token Refreshed")}}}catch(e){}}async info(){return{user:"debug",name:"debug",avatar:"",storage:[0,0]}}async set(t,e,{localLast:a,localNow:o,forceOverride:s}){await this.refreshToken();const r=`https://graph.microsoft.com/beta/me/drive/special/approot:/${t}.json`;if(!s&&a.getTime()>0&&null!==e){const e=await fetch(r,{method:"GET",headers:{Authorization:`Bearer ${this.data.access_token}`}});if(200===e.status){const s=await e.json(),r=new Date(s.lastModifiedDateTime);if(r>a)throw new _.s9(_.fS.CONFLICT,"conflict when saving ["+t+"]",{remoteLast:r,localLast:a,localNow:o,key:t})}}const n={value:e,lastModified:o.toISOString()},i=await fetch(`${r}${null===e?"":":/content"}?@microsoft.graph.conflictBehavior=replace`,{method:null===e?"DELETE":"PUT",headers:{Authorization:`Bearer ${this.data.access_token}`,"Content-Type":"application/json"},body:null===e?void 0:JSON.stringify(n,null,4)}),c=await i.text();if(200===i.status||201===i.status||204===i.status||404===i.status)return{value:e,lastModified:o};throw new _.s9(_.fS.OTHER,"OneDrive Sync Faild",c)}async get(t){await this.refreshToken();const e=`https://graph.microsoft.com/beta/me/drive/special/approot:/${t}.json:/content`,a=await fetch(e,{method:"GET",headers:{Authorization:`Bearer ${this.data.access_token}`}});if(404===a.status)return{value:null,lastModified:new Date(0)};if(200===a.status)try{const t=await a.json();return t}catch(s){return{value:null,lastModified:new Date(0)}}const o=await a.text();throw new _.s9(_.fS.OTHER,"OneDrive Sync Faild",{status:a.status,data:o})}async loadAll(){await this.refreshToken();const t="https://graph.microsoft.com/beta/me/drive/special/approot/children",e=await fetch(t,{method:"GET",headers:{Authorization:`Bearer ${this.data.access_token}`}});if(200===e.status){const t=await e.json(),o={};for(const e of t.value){if(!e.name.endsWith(".json"))continue;const t=`https://graph.microsoft.com/beta/me/drive/special/approot:/${e.name}:/content`,s=await fetch(t,{method:"GET",headers:{Authorization:`Bearer ${this.data.access_token}`}});try{if(200===s.status){const t=await s.json();t.lastModified=new Date(t.lastModified);const a=e.name.substr(0,e.name.length-5);o[a]=t}}catch(a){console.log(a)}}return o}throw new _.s9(_.fS.OTHER,"OneDrive Sync Faild",{status:e.status,data:await e.text()})}}var k=x},72867:function(t,e,a){a.d(e,{HU:function(){return n}});const o={global:"https://77.cocogoat.work",cn:"https://cocogoat-1251105598.file.myqcloud.com/77"};let s=navigator.language.startsWith("zh")?"cn":"global",r=!1;const n=async(t="")=>(r||(r=!0,await i()),o[s]+t),i=async()=>{const t=await n("/v1/utils/api-region");try{const e=await fetch(t);if(e.ok){const t=await e.text();o[t]&&(s=t)}}catch(e){console.error("API Region Probe Faild",e),s="global"===s?"cn":"global"}}},69033:function(t,e,a){a.d(e,{Jx:function(){return b}});a(48675),a(3462),a(21703);const o="function"===typeof atob,s="function"===typeof Buffer,r="function"===typeof TextDecoder?new TextDecoder:void 0,n=("function"===typeof TextEncoder&&new TextEncoder,"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),i=Array.prototype.slice.call(n),c=(t=>{let e={};return t.forEach(((t,a)=>e[t]=a)),e})(i),d=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,l=String.fromCharCode.bind(String),f="function"===typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):(t,e=(t=>t))=>new Uint8Array(Array.prototype.slice.call(t,0).map(e)),h=t=>t.replace(/[^A-Za-z0-9\+\/]/g,""),u=/[\xC0-\xDF][\x80-\xBF]|[\xE0-\xEF][\x80-\xBF]{2}|[\xF0-\xF7][\x80-\xBF]{3}/g,p=t=>{switch(t.length){case 4:var e=(7&t.charCodeAt(0))<<18|(63&t.charCodeAt(1))<<12|(63&t.charCodeAt(2))<<6|63&t.charCodeAt(3),a=e-65536;return l(55296+(a>>>10))+l(56320+(1023&a));case 3:return l((15&t.charCodeAt(0))<<12|(63&t.charCodeAt(1))<<6|63&t.charCodeAt(2));default:return l((31&t.charCodeAt(0))<<6|63&t.charCodeAt(1))}},m=t=>t.replace(u,p),w=t=>{if(t=t.replace(/\s+/g,""),!d.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(3&t.length));let e,a,o,s="";for(let r=0;r<t.length;)e=c[t.charAt(r++)]<<18|c[t.charAt(r++)]<<12|(a=c[t.charAt(r++)])<<6|(o=c[t.charAt(r++)]),s+=64===a?l(e>>16&255):64===o?l(e>>16&255,e>>8&255):l(e>>16&255,e>>8&255,255&e);return s},y=o?t=>atob(h(t)):s?t=>Buffer.from(t,"base64").toString("binary"):w,g=s?t=>f(Buffer.from(t,"base64")):t=>f(y(t),(t=>t.charCodeAt(0))),v=s?t=>Buffer.from(t,"base64").toString("utf8"):r?t=>r.decode(g(t)):t=>m(y(t)),A=t=>h(t.replace(/[-_]/g,(t=>"-"==t?"+":"/"))),b=t=>v(A(t))}}]);