export default async function(e,{ready:t,style:o,domfn:{div:n,article:s,p:a,button:i,h1:c,h4:l,section:r,span:p,header:d}}){await t,console.log("experiments...");const u=(e,t,o="")=>{return e.split(o).map((n="span",e=>{const t=document.createElement(n);return t.className=t.innerText=e,t}));var n},m=(e,t=(e?1:0),o=(e?"auto":"none"))=>({opacity:t,pointerEvents:o}),h=((e,t)=>(...o)=>t(...o.map((t=>t+e))))("px",((e,t)=>Object.assign(x.style,{left:e,top:t}))),g=e=>Object.assign(x.style,m(!!e)),b=(e,t)=>(e instanceof Node?e:e.target).parentNode.classList.contains(t);let y=!1,f=new Text,x=n.mouseboard({$:"body",css:m()},r.letters(u("abcdefghijklmnopqrstuvwxyz1234567890"),n.spacer,u("enter space del copy caps",0," ")),r.output(f));const w=Object.assign((e=>f.textContent+=f.caps?e.toUpperCase():e),{del(){f.textContent=f.textContent.slice(0,-1)},space(){w(" ")},enter(){w("\n")},copy(){navigator.clipboard.writeText(f.textContent.trim())},caps(){const e=(f.caps=!f.caps)?"toUpperCase":"toLowerCase",t="textContent";document.querySelectorAll(".letters span").forEach((o=>o[t].length<2&&(o[t]=o[t][e]())))}});Object.assign(document,{onpointermove(e){y&&(x.lastCheck&&+new Date-x.lastCheck<600||(x.lastCheck=+new Date,e.target==x||b(e,"letters")||h(e.clientX-60,e.clientY-50)))},onpointerdown(e){2==e.which?(e.preventDefault(),g(y=!0),h(e.clientX-60,e.clientY-50)):e.target!=x&&!b(e,"letters")&&g()},onpointerup(e){2==e.which||e.target!=x&&!b(e,"letters")||((w[e.target.textContent]||w)(e.target.textContent),y=!1)}}),r.exps({$:"main",css:{display:"flex",position:"relative",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#fff",padding:"1em"}},c({css:{color:"var(--highlight-color)"}},"Experiments"),n.close({onclick(e,t){t.parentNode.remove()}},"x"),s(l("Mouseboard"),a("A mouseboard is a virtual keyboard that can be used with a mouse. It is activated by clicking the middle mouse button."),n({css:{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}},d({css:{fontWeight:"bold"}},"Clicking:"),[a("The middle mouse button again will deactivate the mouseboard."),a("On a letter will add that letter to the mouseboard's output."),a("On the enter key will add a new line to the mouseboard's output."),a("On the space key will add a space to the mouseboard's output."),a("On the del key will remove the last character from the mouseboard's output."),a("On the copy key will copy the mouseboard's output to the clipboard."),a("On the caps key will toggle caps lock on the mouseboard.")].randomize()),i({onclick:e=>(e.preventDefault(),g(y=!0),h(e.clientX-60,e.clientY-50))},"make it pop up")),s(l("future experiments and things?"),a("if you have suggestions contact me and lemme know for things to try out on this site."))),o`${await e.ftxt(e.isLH?"./mb.css":e.cdnRoot+"kurshok/dist/mb.css")}`,e.emit.toast("experiments loaded")}