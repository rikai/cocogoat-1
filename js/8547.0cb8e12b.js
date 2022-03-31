"use strict";(self["define"]=self["define"]||[]).push([[8547],{88547:function(t,s,e){e.r(s),e.d(s,{default:function(){return k}});var a=e(78255),o=(e(21703),e(72867)),r=e(17997),i=e(19812),n=e(55893);const c={class:"logo"},u={class:"content"},h={class:"title"},l={class:"username"},d={class:"status"};function C(t,s,e,a,o,r){const C=(0,i.up)("icon-cocogoat");return(0,i.wg)(),(0,i.iD)("div",{class:(0,n.C_)(t.$style.syncItemMsft)},[(0,i._)("div",c,[(0,i.Wm)(C)]),(0,i._)("div",u,[(0,i._)("div",h,[(0,i._)("div",l,"清心 - "+(0,n.zw)(t.provider.email),1),(0,i._)("div",d,(0,n.zw)(t.provider.email),1)])])],2)}var f=e(11296),w=(0,i.aZ)({components:{IconCocogoat:f.Z},props:{provider:{type:Object,required:!0}},setup(){return{}}}),v={syncItemMsft:"syncItemMsft-cc4a0b"},g=e(48998);const m={};m["$style"]=v;const p=(0,g.Z)(w,[["render",C],["__cssModules",m]]);var y=p,A=e(20521);const T="/qingxin/d";class M{constructor(t){(0,a.Z)(this,"data",void 0),(0,a.Z)(this,"token",""),(0,a.Z)(this,"user",""),(0,a.Z)(this,"email",""),(0,a.Z)(this,"component",(0,A.Xl)(y)),(0,a.Z)(this,"status",(0,A.iH)({status:r.mA.WAITING,error:null}));try{this.data=t,this.token=t.token,this.email=this.getFromJWT(this.token,"email"),this.user=this.getFromJWT(this.token,"sub")}catch(s){const t=new r.s9(r.fS.AUTH,"Authorization required",null);throw this.status.value.status=r.mA.OFFLINE,this.status.value.error=t,t}}async info(){const t=await fetch(`${await(0,o.HU)(T)}/${this.user}`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}});return await t.json()}async set(t,s,{localLast:e,localNow:a,forceOverride:i}){const n=await fetch(`${await(0,o.HU)(T)}/${this.user}/${t}${i||0===e.getTime()?"?override":""}`,{method:null===s?"DELETE":"PUT",headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json","If-Unmodified-Since":e.toUTCString(),"X-Last-Modified":a.toUTCString()},body:null===s?void 0:JSON.stringify(s)});if(412===n.status){const s=new r.s9(r.fS.CONFLICT,"conflict when saving ["+t+"]",{localLast:e,remoteLast:new Date(n.headers.get("Last-Modified")||0),localNow:a});throw this.status.value.status=r.mA.FAILED,this.status.value.error=s,s}if(401===n.status){const t=new r.s9(r.fS.AUTH,"Authorization required",null);throw this.status.value.status=r.mA.OFFLINE,this.status.value.error=t,t}if(!n.ok){let t=n.statusText;try{const s=await n.text();t=s;try{const e=JSON.parse(s);e.error&&(t=e.error)}catch(u){}}catch(u){}const s=new r.s9(r.fS.OTHER,t,n);throw this.status.value.status=r.mA.FAILED,this.status.value.error=s,s}await n.json();const c=n.headers.get("authorization");return c&&(this.data.token=c.replace("Bearer ",""),this.data.lastModified=Date.now()),{value:s,lastModified:new Date(n.headers.get("Last-Modified")||0)}}async get(t){const s=await fetch(`${await(0,o.HU)(T)}/${this.user}/${t}`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}});if(401===s.status){const t=new r.s9(r.fS.AUTH,"Authorization required",null);throw this.status.value.status=r.mA.OFFLINE,this.status.value.error=t,t}if(!s.ok){let t=s.statusText;try{const a=await s.text();t=a;try{const s=JSON.parse(a);s.error&&(t=s.error)}catch(e){}}catch(e){}const a=new r.s9(r.fS.OTHER,t,s);throw this.status.value.status=r.mA.FAILED,this.status.value.error=a,a}return{value:await s.json(),lastModified:new Date(s.headers.get("Last-Modified")||0)}}async loadAll(){const t=await fetch(`${await(0,o.HU)(T)}/${this.user}`,{method:"GET",headers:{Authorization:`Bearer ${this.token}`}});if(!t.ok){let s=t.statusText;try{const e=await t.text();s=e;try{const t=JSON.parse(e);t.error&&(s=t.error)}catch(a){}}catch(a){}const e=new r.s9(r.fS.OTHER,s,t);throw this.status.value.status=r.mA.FAILED,this.status.value.error=e,e}const s=t.headers.get("authorization");s&&(this.data.token=s.replace("Bearer ",""),this.data.lastModified=Date.now());const e=await t.json();return Object.keys(e).forEach((t=>{e[t].lastModified=new Date(e[t].lastModified)})),e}getFromJWT(t,s){const e=t.split(".");if(3!==e.length)throw new Error("Invalid token");const a=JSON.parse(atob(e[1]));return a[s]}}var k=M},72867:function(t,s,e){e.d(s,{HU:function(){return i}});const a={global:"https://77.cocogoat.work",cn:"https://cocogoat-1251105598.file.myqcloud.com/77"};let o=navigator.language.startsWith("zh")?"cn":"global",r=!1;const i=async(t="")=>(r||(r=!0,await n()),a[o]+t),n=async()=>{const t=await i("/v1/utils/api-region");try{const s=await fetch(t);if(s.ok){const t=await s.text();a[t]&&(o=t)}}catch(s){console.error("API Region Probe Faild",s),o="global"===o?"cn":"global"}}},11296:function(t,s,e){e.d(s,{Z:function(){return l}});var a=e(19812);const o={viewBox:"0 0 204 204"},r=(0,a._)("g",null,[(0,a._)("path",{d:" M 92.79 59.13 C 94.98 55.32 98.53 52.56 101.92 49.88 C 105.14 52.74 108.92 55.30 111.02 59.15 C 110.63 62.49 107.80 65.92 104.21 65.83 C 101.15 65.86 97.27 66.68 95.10 63.91 C 93.97 62.56 92.73 60.98 92.79 59.13 Z"}),(0,a._)("path",{d:" M 82.38 54.26 C 82.72 54.23 83.41 54.17 83.76 54.14 C 86.77 57.18 89.10 60.84 92.29 63.72 C 93.95 65.58 96.89 67.68 95.57 70.52 C 93.68 75.27 90.04 79.03 87.26 83.27 C 85.94 84.91 84.25 87.99 81.72 86.52 C 79.39 83.07 77.68 79.20 75.02 75.95 C 73.64 73.84 70.87 71.42 72.69 68.75 C 75.49 63.69 78.35 58.47 82.38 54.26 Z"}),(0,a._)("path",{d:" M 119.11 54.95 C 120.87 52.96 122.79 55.72 123.89 57.04 C 126.97 61.41 130.22 65.85 132.00 70.92 C 128.93 76.45 124.76 81.37 121.83 87.03 C 121.20 86.96 119.95 86.83 119.33 86.77 C 116.16 82.55 113.06 78.28 110.00 73.99 C 108.50 71.78 106.78 68.39 109.16 66.15 C 112.65 62.58 116.01 58.89 119.11 54.95 Z"}),(0,a._)("path",{d:" M 51.82 63.56 C 58.70 63.02 64.12 67.97 68.08 72.99 C 72.28 77.62 75.21 83.19 78.32 88.57 C 80.70 92.48 79.50 97.42 81.68 101.44 C 84.44 88.13 95.06 78.87 101.41 67.39 C 103.21 69.06 104.59 71.10 105.93 73.15 C 111.83 81.55 119.56 89.46 121.42 99.94 C 121.88 99.79 122.79 99.50 123.25 99.35 C 123.62 95.93 123.59 92.31 125.30 89.22 C 129.75 80.82 134.83 72.41 142.47 66.52 C 145.21 64.40 148.62 63.50 152.06 63.57 C 150.18 68.18 148.61 72.98 148.91 78.04 C 148.87 91.80 143.22 105.66 132.73 114.74 C 129.22 118.10 124.49 120.51 122.54 125.21 C 127.83 124.55 132.04 121.10 136.38 118.32 C 145.39 112.57 154.03 106.14 161.79 98.78 C 167.77 93.07 171.20 85.51 174.16 77.96 C 176.45 77.74 177.07 80.44 178.09 81.97 C 181.72 88.26 181.50 95.83 180.67 102.81 C 179.03 109.41 175.27 115.68 169.55 119.51 C 161.87 124.32 153.00 127.10 143.98 127.83 C 140.96 128.00 137.94 128.52 135.19 129.85 C 136.01 134.37 136.26 139.44 133.24 143.26 C 129.03 150.23 118.48 151.96 112.25 146.74 C 108.03 143.08 106.71 137.40 103.80 132.82 C 102.28 133.14 100.11 132.48 99.28 134.22 C 96.79 138.38 95.66 143.53 91.73 146.71 C 87.38 150.49 80.82 150.55 75.80 148.14 C 72.69 146.31 70.33 143.26 68.96 139.95 C 67.64 136.66 68.75 133.04 68.04 129.67 C 65.75 128.01 62.69 128.23 60.02 127.83 C 51.21 127.21 42.64 124.39 35.05 119.91 C 28.95 116.19 24.96 109.66 23.29 102.82 C 22.58 95.83 22.21 88.24 25.83 81.92 C 26.84 80.41 27.51 77.79 29.76 77.99 C 31.70 81.87 32.72 86.19 35.15 89.83 C 41.41 100.09 51.57 106.93 61.00 113.98 C 67.60 117.93 73.49 123.71 81.26 125.19 C 79.42 120.47 74.79 118.01 71.24 114.75 C 60.50 105.43 54.82 91.11 55.06 76.99 C 55.35 72.26 53.43 67.89 51.82 63.56 M 72.72 129.22 C 72.52 135.00 78.56 138.93 83.85 138.62 C 87.70 138.20 90.56 135.35 93.11 132.70 C 87.27 128.33 79.61 128.62 72.72 129.22 M 110.90 132.29 C 112.59 134.55 114.51 136.81 117.21 137.86 C 123.13 140.54 131.06 135.91 131.17 129.27 C 124.29 128.39 117.05 128.76 110.90 132.29 Z"})],-1),i=[r];function n(t,s){return(0,a.wg)(),(0,a.iD)("svg",o,i)}var c=e(48998);const u={},h=(0,c.Z)(u,[["render",n]]);var l=h}}]);