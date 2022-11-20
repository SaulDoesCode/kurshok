!function(){"use strict";var e=(e=>{e.isArr=Array.isArray,e.isNil=e=>null==e,e.isDef=e=>null!=e,e.isFunc=e=>e instanceof Function,e.isBool=e=>"boolean"==typeof e,e.isObj=e=>null!=e&&e.constructor===Object,e.isStr=e=>"string"==typeof e,e.isNum=e=>"number"==typeof e&&!isNaN(e),e.isInt=t=>e.isNum(t)&&t%1==0,e.isArrlike=t=>null!=t&&(e.isArr(t)||!(t instanceof Function||t instanceof Node)&&t.length%1==0),e.isNode=e=>e instanceof Node,e.isNodeList=(t,n=!0)=>t instanceof NodeList||n&&e.allare(t,e.isNode),e.isPrimitive=e=>"string"===(e=typeof e)||"number"===e||"boolean"===e,e.isEl=e=>e instanceof Element,e.isPromise=t=>"object"==typeof t&&e.isFunc(t.then),e.isRegExp=e=>e instanceof RegExp,e.isEmpty=t=>e.isNil(t)||!((e.isObj(t)?Object.keys(t):t).length||t.size),e.isMounted=(t,n=document)=>e.isNodeList(t)?Array.from(t).every((t=>e.isMounted(t))):n===t||!!(16&n.compareDocumentPosition(t)),e.isSvg=e=>e instanceof SVGElement,e.isInput=(e,t)=>e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||!!t&&e instanceof Element&&"true"===e.getAttribute("contenteditable"),e.isRenderable=t=>t instanceof Node||e.isPrimitive(t)||e.allare(t,e.isRenderable),e.allare=(t,n)=>{if(!e.isArrlike(t))return!1;const r=n instanceof Function;for(let e=0;e<t.length;e++)if(!(r?n(t[e]):t[e]===n))return!1;return!0},e.compose=(...e)=>e.reduce(((e,t)=>(...n)=>e(t(...n)))),e.curry=(t,n=t.length,...r)=>n<=r.length?t(...r):e.curry.bind(null,t,n,...r),e.assign=Object.assign,e.clone=(t,n)=>e.assign(n?Object.create(null):{},t),e.flatten=(t,n=[],r=!0)=>{if(r&&!e.isArr(t))return[t];for(let r=0;r<t.length;r++)e.isArr(t[r])?e.flatten(t[r],n):e.result.push(t[r]);return n},e.runAsync=window.requestIdleCallback?(e,...t)=>window.requestIdleCallback(e.bind(void 0,...t)):(e,...t)=>setTimeout(e,0,...t),e.run=function(){document.body||"complete"===document.readyState?e.runAsync.apply(void 0,arguments):window.addEventListener("DOMContentLoaded",(t=>{e.runAsync.apply(void 0,arguments)}),{once:!0})},e.html=(t,...n)=>{if(n.length>2)return e.h(t,...n);if(t instanceof Function&&(t=t(...n)),t instanceof Promise)return new Promise((r=>{t.then((t=>r(e.html(t,...n))))}));if(t instanceof Node)return t;if(e.isNum(t)&&(t=String(t)),"string"==typeof t)return Array.from(document.createRange().createContextualFragment(t).childNodes);if(e.isArr(t))return t.map((t=>e.html(t,...n)));throw new Error(".html: unrenderable input")},e.frag=t=>null!=t?e.html(t):document.createDocumentFragment(),e.query=(t,n=document)=>e.isNode(t)?t:e.query(n).querySelector(t),e.queryAsync=(t,n)=>new Promise(((r,i)=>{const o=()=>{const o=e.query(t,n);null==o?i(new Error("queryAsync: couldn't find "+t)):r(o)};document.body?o():e.run(o)})),e.queryAll=(t,n=document)=>Array.from(e.query(n).querySelectorAll(t)),e.queryEach=(t,n,r=document)=>(e.isFunc(n)||([n,r]=[r,document]),e.each(e.queryAll(t,r),n)),e.each=(t,n)=>{if(null!=t)if(e.isObj(t))for(const e in t)n(t[e],e,t);else if(t.length){const e=t.length;let r=0;for(;r!==e;)n(t[r],r++,t)}else if(t.forEach)t.forEach(n);else if(e.isInt(t)){let e=0;for(;e<t;)n(e++,t)}return t},e.infinify=(e,t)=>new Proxy(e,{get:!0===t?(e,t)=>t in e?Reflect.get(e,t):e.bind(null,t):(e,t)=>e.bind(null,t)}),e.copyprop=(e,t,n)=>(Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n)),e),(e.merge=(t,n)=>{if(e.isArr(t)&&e.isArr(n))for(const e of n)t.includes(e)||t.push(e);else if(e.merge.able(t)&&e.merge.able(n))for(const r in n)if(r in t){const i=t[r],o=n[r];e.merge.able(i)&&e.merge.able(o)?e.merge(i,o):null!=o&&e.copyprop(t,n,r)}else e.copyprop(t,n,r);return t}).able=t=>e.isArr(t)||null!=t&&"object"==typeof t&&!e.isFunc(t.then),e.emitter=(t=Object.create(null),n=new Map)=>Object.assign(t,{emit:e.infinify(((t,...r)=>e.runAsync((()=>{if(n.has(t))for(const e of n.get(t))e.apply(null,r)})))),on:e.infinify(((e,r)=>{n.has(e)||n.set(e,new Set),n.get(e).add(r);const i=()=>t.off(e,r);return i.off=i,i.on=()=>(i(),t.on(e,r)),i.once=()=>(i(),t.once(e,r)),i})),once:e.infinify(((e,n)=>t.on(e,(function r(){n(...arguments),t.off(e,r)})))),off:e.infinify(((e,t)=>{if(n.has(e)){const r=n.get(e);r.delete(t),r.size&&null!=t||n.delete(e)}})),clear:()=>(n.clear(),t)});const t=function(n,r,i,o,s=!1){if(e.isStr(r)&&(r=e.queryAll(r)),(e.isArr(r)||r instanceof NodeList)&&1===r.length&&(r=r[0]),!r||e.isArr(r)&&!r.length||!r.addEventListener)throw new Error("nil/empty event target(s)");let l,c=e.isObj(i);if(null==i||!c&&!e.isStr(i))throw new TypeError("cannot listen to nil or invalid event type");if(e.isArr(r)){for(let l=0;l<r.length;l++)r[l]=t(n,r[l],c?e.clone(i):i,o,s);return r.off=()=>{for(const e of r)e();return r},r.on=e=>{for(const t of r)t.on(e);return r},r}if(c){for(const e in i)i[e]=t(n,r,e,i[e],s);return r.off=()=>{for(const e of Object.values(i))e();return r},r.on=e=>{for(const t of Object.values(i))t.on(e);return r},i}if("string"==typeof o&&s instanceof Function){let e=o;o=s,null==(s=arguments[5])&&(s=!1),l=function(t){null!=t.target&&t.target!==this&&t.target.matches(e)&&(o.call(this,t,r),u.once&&u())}}else l=function(e){o.call(this,e,r),u.once&&u()};const a=e=>(null!=e&&e!==u.once&&(u.once=!!e),r.addEventListener(i,l,s),u.ison=!0,u),u=e.assign((()=>(r.removeEventListener(i,l),u.ison=!1,u)),{target:r,on:a,once:n});return u.off=u,a()},n={get:(e,t)=>(n,r,i)=>e(n,t,r,i)};e.on=new Proxy(t.bind(null,!1),n),e.once=new Proxy(t.bind(null,!0),n),e.EventManager=e.curry(t,3),e.vpend=(t,n,r="appendChild",i=e.frag(),o)=>{for(let o=0;o<t.length;o++){let s=t[o];if(s instanceof Function){if((s=s(n))===n)continue;if(s instanceof Function){let e,t=0,r=!1;for(;s instanceof Function&&t<25&&(e=s,s=s(),!(r=s===n)&&e!==s);)t++;if(r)continue}}if(null==s)continue;const l=s.constructor;if(l===String||l===Number){if(!s.length)continue;s=new Text(s)}else e.isArr(s)&&(s=e.vpend(s,n,r,i,!0));s instanceof Node&&(i.appendChild(s),t[o]=s)}return n&&!o&&e.run((()=>n[r](i))),t},e.prime=(...t)=>{for(let n=0;n<t.length;n++){let r=t[n];const i=typeof r;if(null==r||"boolean"===i){t.splice(n,1);continue}if(r instanceof Node||r instanceof Function)continue;if("string"===i||"number"===i){const e=n+1;if(e<t.length){const i=t[e],o=typeof i;"string"!==o&&"number"!==o||(t[n]=String(r)+String(i),t.splice(e,1),n--)}else t[n]=new Text(String(r));continue}const o=r instanceof NodeList;if(o){if(r.length<2){t[n]=r[0];continue}r=Array.from(r)}else r.constructor===Object&&(r=Object.values(r));if(e.isArr(r)){if(!o&&(r=e.prime.apply(null,r),r.length<2)){t[n]=r[0],n--;continue}t.splice(n,1,...r),n--}else if(null!=r)throw new Error(`illegal renderable: ${r}`)}return t},e.attach=(t,n,...r)=>{t instanceof Function&&(t=t()),1===r.length&&e.isArr(r[0])&&(r=r[0]);const i=t instanceof Node;if(r=e.prime(r),i)e.vpend(r,t,n);else if("string"==typeof t)return e.queryAsync(t).then((t=>e.attach(t,n,...r)));return e.isArr(t)&&t.push(...r),1===r.length?r[0]:r},e.render=(t,n=document.body||"body",r="appendChild")=>e.attach(n,r,t);e.actualDF={};const r=new Proxy(e,{get:(e,t)=>{return e.actualDF[t]||((r=t)in(n=e)?Reflect.get(n,r):n[r]=new Proxy(n.bind(null,r),{get:(e,t)=>(t=t.replace(/_/g,"-").split("."),new Proxy((function(){const n=e.apply(null,arguments);return n.classList.add(...t),n}),{get:(e,n,r)=>(t.push(...n.replace(/_/g,"-").split(".")),r)}))}));var n,r},set:(e,t,n)=>Reflect.set(e.actualDF,t,n)});r.css=(e,t,n)=>{if(null==t){if(document.defaultView)return document.defaultView.getComputedStyle(e)}else if(t.constructor===Object)for(const n in t)r.css(e,n,t[n]);else if("string"==typeof t)if(null==n){if(t&&"-"===t[0])return e.getPropertyValue(t);if(document.defaultView){const n=document.defaultView.getComputedStyle(e);if(n)return t?n[t]:n}}else"-"===t[0]?e.style.setProperty(t,n):e.style[t]=n;return e},r.class=(t,n,i)=>{if(t&&null!=n&&t.classList)if(e.isArr(t))for(const e of t)r.class(e,n,i);else if(n.constructor===Object)for(const e in n)if(!0===n[e])t.classList.add(e);else if(!1===n[e])t.classList.remove(e);else for(const r of n)t.classList.toggle(e);else{"string"==typeof n&&(n=n.split(" "));for(const e of n)!0===i?t.classList.add(e):!1===i?t.classList.remove(e):t.classList.toggle(e)}return t},r.hasClass=(e,t)=>e.classList.contains(t),r.attr=(e,t,n)=>{if(t.constructor===Object)for(const n in t){e[null==t[n]?"removeAttribute":"setAttribute"](n,t[n])}else if("string"==typeof t){const r=e.getAttribute(t);return null!=n&&e.setAttribute(t,n),r}return e},r.removeAttribute=(t,...n)=>{if(1===n.length)t.removeAttribute(n[0]);else for(let r=0;r<n.length;r++)e.isArr(n[r])&&(n.splice(r,1,...n[r]),r--),t.removeAttribute(n[r]);return t},r.attrToggle=(e,t,n=!e.hasAttribute(t),r=e.getAttribute(t)||"")=>(n?e.setAttribute(t,r):e.removeAttribute(t),e),r.emit=(e,t,n)=>(e.dispatchEvent(t instanceof String?new CustomEvent(t,{detail:n}):t),e),r.append=(t,...n)=>(e.attach(t,"appendChild",...n),t),r.prepend=(t,...n)=>(e.attach(t,"prepend",...n),t),r.appendTo=(t,n)=>(e.attach(t,"appendChild",n),t),r.prependTo=(t,n)=>(e.attach(t,"prepend",n),t),r.clear=t=>(t[e.isInput(t)?"value":"textContent"]="",t),r.refurbish=e=>{e.removeAttribute("class");for(const{name:t}of e.attributes)e.removeAttribute(t);return r.clear(e)},r.remove=(t,n)=>{if(t instanceof Function&&(t=t()),"string"==typeof t&&(t=document.querySelector(t)),e.isArr(t))for(const e of t)r.remove(e,n);else{if(e.isNum(n))return new Promise((e=>setTimeout((()=>e(r.remove(t))),n)));if(e.isMounted(t))e.run((()=>t.remove()));else if(e.isNodeList(t))for(let e=0;e<t.length;e++)r.remove(t[e])}return t},r.replace=(t,n)=>(n instanceof Function&&(n=n()),e.run((()=>t.replaceWith(n))),n),r.find=e.queryAll,r.findOne=e.query,r.empty=r.clear,e.domfn=r,e.txt=e=>new Text(e),e.assimilate=Object.assign(((t,{props:n,methods:r})=>{n&&e.assimilate.props(t,n),r&&e.assimilate.methods(t,r)}),{props(e,t){for(const n in t){let r=t[n];if(n in e)e[n]=r;else if("accessors"===n)for(const t in r){const{set:n=r[t],get:i=r[t]}=r[t],o={};n instanceof Function&&(o.set=n.bind(e,e)),i instanceof Function&&(o.get=i.bind(e,e)),Object.defineProperty(e,t,o)}else r instanceof Function?e[n]=r.call(e,e):copyprop(e,t,n)}},methods(e,t){for(const n in t)Object.defineProperty(e,n,{value:t[n].bind(e,e)})}}),e.h=(t,...n)=>{let r="";for(let e=0;e<n.length;e++)r+=t[e]+n[e];r+=t[t.length-1];const i=document.createElement("template");i.innerHTML=r;const{content:o}=i;return o.collect=({attr:e="ref",keep:t,assign:n={}}={})=>(Array.from(o.querySelectorAll("["+e+"]")).reduce(((n,r)=>{const i=r.getAttribute(e).trim();return t||r.removeAttribute(e),n[i]=r,n}),n),n),o.renderCollect=(...t)=>{const n=o.collect();return e.render(o,...t),n},o};const i=new Map,o=(e,t)=>i.has(e)&&i.get(e)(t),s=new Map;e.directive=(t,n)=>{const r=new Map;return r.init=s=>{o(t,s)||r.set(s,((t,n,r)=>{let{init:s,update:l,remove:c}=r;!s&&!l&&r instanceof Function&&([s,l]=[r,r]);const a=(e,r)=>{return e&&!o(n,t)?(s&&s(t,r),i.has(n)||i.set(n,(l=new WeakSet,(e,t)=>l[null==t?"has":t?"add":"delete"](e))),i.get(n)(t,!0),!0):o(n,t);var l};let u=!1,f=t.getAttribute(n);a(t.hasAttribute(n),f);const d=e.on.attr(t,(({name:e,value:r,oldvalue:i,present:o})=>{e===n&&f!==r&&r!==i&&a(o,r)&&(o?(l&&l(t,r,f),u=!1):u||(c&&c(t,r,f),u=!0),f=r)})),p=()=>{d(),i.has(n)&&i.get(n)(t,!1)};return p.start=()=>{d.on(),i.get(n)(t,!0)},p.stop=p})(s,t,n))},r.stop=e=>{r.has(e)&&r.get(e)()},s.set(t,r),e.run((()=>e.queryEach("["+t+"]",(e=>l(e,t))))),r};const l=(t,n,r,i=t.getAttribute(n),o=t.hasAttribute(n))=>{s.has(n)&&s.get(n).init(t),i!==r&&t.dispatchEvent(e.assign(new CustomEvent("attr"),{name:n,value:i,oldvalue:r,present:o}))};return e.createElementPlugins={},e})((function e(t,n,...r){const i=t.constructor===String?document.createElement(t):t,o=e.isObj(n);if(o){let t;e.assimilate(i,n);for(const r in n)if(null!=(t=n[r]))if("o"==r[0]&&"n"==r[1]){const o="c"==r[2]&&"e"==r[3],s=o?4:2,l=r.substr(0,s);let c=r.substr(s);const a=e.EventManager(o);if(n[l]||(n[l]={}),e.isFunc(t))n[l][c]=a(i,t.name.substr(s),t),delete n[t.name];else{const r=e.isArr(t)?t:[t];n[l][c]=c.length?a(i,c,...r):a(i,...r)}}else r in i?i[r]instanceof Function?e.isArr(t)?i[r].apply(i,t):i[r](t):i[r]=n[r]:r in e.actualDF?(t=e.isArr(t)?e.actualDF[r](i,...t):e.actualDF[r](i,t),t!==i&&(n[r]=t)):r in e.createElementPlugins&&e.createElementPlugins[r](t,i,n);const r=n.$||n.render||n.$pre;r&&e.attach(r,r==n.$pre?"prepend":"appendChild",i)}if(3!==i.nodeType){if(!o){if(n instanceof Function){const e=n.call(i,i);n=e!==i?e:void 0}e.isRenderable(n)&&r.unshift(n)}r.length&&e.attach(i,"appendChild",r)}return i}));const t=e.domfn,{div:n,article:r,textarea:i,input:o,a:s,p:l,button:c,br:a,hr:u,h1:f,h4:d,section:p,span:m,header:h}=t,g=e.emitter({domlib:e,d:t}),y="\n  Reality demonstrates itself in a tone of absoluteness. There is no true control, normativity reigns supreme.\n\n  Slowing down colors attention like a filter and ram clear on what time feels like. Slow breath makes time thick, because we forget we are alive, and suddenly realize what a complex contrap all this truly is, our concerns are so narrow at times, that our own bodies and thoughts pass us by.\n\n  Consequence is a meta-temporal concept, and has little traction upon non-static non-type/object oriented thinking, it is physical and proccessual not narrativistic or semantic.\n\n  The right music at the right time, mends old wounds and bring release.\n\n  Returning to aesthetics, like a corpse to the sublimity of rebirth, from out of atelic duty with a new found loss of the sense of the trancendent sourced from pragmatic, utilitarian, and instrumental interest.  \n\n  A dreadful thought, to count all the times one must essentially start over in life, be it with relationships, a move, or change of business.. so much waste, so much hurt, the repetition is torturous. Stronger not dead, sure, but at what cost?\n\n".trim().split("\n").map((e=>e.trim())).filter((e=>""!=e));p.thoughts({$:"main"},h({css:{width:"100%",margin:"0 auto"}},"thoughts"),n.spacer,y.map((e=>l.thought(e)))),g.toasts=new Set,g.on("toast",(e=>{const t=n.toast({$:"body"},e);t.style.top="calc(1vh + 1.5cm * "+g.toasts.size+")",g.toasts.add(t);const r=(e=>{const t=setTimeout(e,1e4);return()=>{clearTimeout(t),e()}})((()=>{t.remove()}));t.onclick=r})),g.toast=(...e)=>{g.emit("toast",...e)},g.toast("...loaded"),async function(e){"#experimental"==location.hash&&(console.log("experiments..."),e.d,e.toast("...experiments loaded"))}(g)}();
//# sourceMappingURL=bundle.js.map
