import domlib from"./domlib.js";Array.prototype.randomize=function(){const t=[],e=this.length;for(;t.length!=e;){const e=Math.floor(Math.random()*this.length);t.push(this[e]),this.splice(e,1)}return this.splice(0,this.length,...t),this},domlib.runAsync((async t=>{const{queryAsync:e,query:o,render:i}=domlib,{div:a,article:s,textarea:n,input:r,a:l,p:c,button:d,br:h,hr:m,h1:p,h4:u,section:b,span:g,header:x}=domlib.domfn,f=domlib.emitter({toasts:new Set}),y=(t,e)=>{for(const i of[...(t=o(t)).children].randomize())e instanceof Function&&!e(i)||(i.remove(),t.appendChild(i))},w="https://cdn.jsdelivr.net/gh/SaulDoesCode/resources/",v=(await(await fetch(w+"expressions.txt")).text()).trim().split("\n").map((t=>t.trim())).filter((t=>""!=t)).randomize(),k=t=>e=>e.classList.contains(t),z=t=>y(j,k("small-idea")),A=t=>y($,k("thought")),C=t=>{return(e=y,(...t)=>(...o)=>(e(...t),e(...o)))(".doodle-links")(".links",(t=>"A"==t.tagName));var e},$=b.thoughts({$pre:"main",ondblclick(){A()}},x("expressions"),a.spacer,v.map((t=>c.thought(t)))),j=b.short_ideas({$pre:"main",ondblclick(){z()}},a.spacer,x("short ideas"),h,a.spacer),S=(await(await fetch(w+"short-ideas.txt")).text()).split(".").map((t=>t.trim())).filter((t=>t.length>0)).randomize().map((t=>{const[e,o]=t.split(":");return s.small_idea(x(e),g(o))})),T=f.toast=f.emit.toast,q="experimental",M=t=>"#"!=t[0]?"#"+t:t,_=t=>{t.remove(),f.toasts.delete(t),clearTimeout(t.to)};onkeyup=t=>((t,e,...o)=>t===e&&(e=null,o.forEach((t=>e=t(e))),e))(t.key,"r",z,A,C),document.onpointerdown=async({target:t})=>{t.hasAttribute("copyable")&&navigator.clipboard&&window.isSecureContext&&(await navigator.clipboard.writeText(t.textContent.trim()),T("Copied to clipboard"))},f.on.toast((t=>f.toasts.add(a.toast({$:"body",css:{top:`calc(1vh + 1.5cm * ${f.toasts.size})`,zIndex:0},onclick(t,e){_(e)}},t,(t=>{t.to=setTimeout((e=>_(t)),5500)}))))),f.once.xpm((async()=>(await import("./experimental.js")).default(f,domlib))),(await e(".breathing-circle")).onclick=t=>{return e=q,location.hash=M(e);var e},(onhashchange=t=>M(q)===location.hash&&f.emit.xpm())(),i(S,j),T("loaded; pressing r randomizes things"),C()}));