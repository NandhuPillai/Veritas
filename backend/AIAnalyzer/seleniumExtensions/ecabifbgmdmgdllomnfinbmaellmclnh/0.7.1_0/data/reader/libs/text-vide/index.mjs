var _=Object.defineProperty;var T=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,k=Object.prototype.propertyIsEnumerable;var h=(t,n,e)=>n in t?_(t,n,{enumerable:!0,configurable:!0,writable:!0,value:e}):t[n]=e,u=(t,n)=>{for(var e in n||(n={}))N.call(n,e)&&h(t,e,n[e]);if(T)for(var e of T(n))k.call(n,e)&&h(t,e,n[e]);return t};var L=t=>t==null||t==="";var x=(t,n)=>Object.keys(t).reduce((o,r)=>(n(o[r])&&delete o[r],o),t);var I=(t,n)=>u(u({},n),x(t,L));var F=["<b>","</b>"],M=1,P=!0,E=t=>I(t,{sep:F,fixationPoint:M,ignoreHtmlTag:P});var y=[[0,4,12,17,24,29,35,42,48],[1,2,7,10,13,14,19,22,25,28,31,34,37,40,43,46,49],[1,2,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49],[0,2,4,5,6,8,9,11,14,15,17,18,20,0,21,23,24,26,27,29,30,32,33,35,36,38,39,41,42,44,45,47,48],[0,2,3,5,6,7,8,10,11,12,14,15,17,19,20,21,23,24,25,26,28,29,30,32,33,34,35,37,38,39,41,42,43,44,46,47,48]],O=(t,n)=>{var i;let{length:e}=t,o=(i=y[n-1])!=null?i:y[0],r=o.findIndex(a=>e<=a),s=e-r;return r===-1&&(s=e-o.length),Math.max(s,0)};var R=(t,n)=>typeof n=="string"?`${n}${t}${n}`:`${n[0]}${t}${n[1]}`;var b=/(<!--[\s\S]*?-->)|(<[^>]*>)/g,A=t=>{let n=t.matchAll(b),o=$(n).reverse();return r=>{let s=r.index,i=o.find(([m])=>s>m);if(!i)return!1;let[,a]=i;return s<a}},$=t=>[...t].map(n=>{let e=n.index,[o]=n,{length:r}=o;return[e,e+r-1]});var G=/(\p{L}|\p{Nd})*\p{L}(\p{L}|\p{Nd})*/gu,Z=(t,n={})=>{if(!(t!=null&&t.length))return"";let{fixationPoint:e,sep:o,ignoreHtmlTag:r}=E(n),s=t.matchAll(G),i="",a=0,g;r&&(g=A(t));for(let d of s){if(g==null?void 0:g(d))continue;let[H]=d,f=d.index,p=f+O(H,e);i+=t.slice(a,f),f!==p&&(i+=R(t.slice(f,p),o)),a=p}let m=t.slice(a);return i+m};export{Z as textVide};
