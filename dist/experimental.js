export default async function(e,{ready:t,style:o,domfn:n}){await t,console.log("experiments...");const{div:a,article:s,textarea:r,input:i,a:l,p:c,button:p,br:d,hr:u,h1:m,h4:g,section:h,span:b,header:f}=n;o`
.mouseboard {
    position: fixed;
    display: block;
    left: 0;
    top: 0;
    max-width: 220px;
    border-radius: 6px;
    background: rgba(137, 136, 136, 0.541);
    z-index: 10;
}

.mouseboard .output {
    border-radius: 4px;
    padding: .12em .24em;
    margin: .12em;
    background: #fff;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,.12));
}

.mouseboard .letters {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-flow: row wrap;
}

.mouseboard .letters span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-flow: row wrap;
    margin: .1em .05em;
    padding: 0 .22em;
    border-radius: 4px;
    background: #fff;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,.12));
    cursor: grabbing;
    user-select: none;
}

.mouseboard .letters span:hover {
    transform: scale(1.25);
}

.close {
    position: absolute;
    left: calc(100% - 2em);
    top: 0;
    color: red;
    font-weight: 600;
    cursor: pointer;
    border-radius: 100%;
    padding: .5em;
    transition: all 140ms ease;
}

.close:hover {
    scale: 1.25;
}

.exps p {
    margin: .25em;
}
`;const x=(e,t,o="")=>{return e.split(o).map((n="span",e=>{const t=document.createElement(n);return t.classList.add(e),t.innerText=e,t}));var n},y=(e,t=(e?1:0),o=(e?"auto":"none"))=>({opacity:t,pointerEvents:o}),w=((e,t)=>(...o)=>t(...o.map((t=>t+e))))("px",((e,t)=>Object.assign(j.style,{left:e,top:t}))),k=e=>Object.assign(j.style,y(!!e)),v=(e,t)=>(e instanceof Node?e:e.target).parentNode.classList.contains(t);let C=!1,O=new Text,j=a.mouseboard({$:"body",css:y()},h.letters(x("abcdefghijklmnopqrstuvwxyz1234567890"),a.spacer,x("enter space del copy caps",0," ")),h.output(O));const D=Object.assign((e=>O.textContent+=O.caps?e.toUpperCase():e),{del(){O.textContent=O.textContent.slice(0,-1)},space(){D(" ")},enter(){D("\n")},copy(){navigator.clipboard.writeText(O.textContent.trim())},caps(){const e=(O.caps=!O.caps)?"toUpperCase":"toLowerCase",t="textContent";document.querySelectorAll(".letters span").forEach((o=>o[t].length<2&&(o[t]=o[t][e]())))}});Object.assign(document,{onpointermove(e){C&&(j.lastCheck&&+new Date-j.lastCheck<600||(j.lastCheck=+new Date,e.target==j||v(e,"letters")||w(e.clientX-60,e.clientY-50)))},onpointerdown(e){2==e.which?(e.preventDefault(),k(C=!0),w(e.clientX-60,e.clientY-50)):e.target!=j&&!v(e,"letters")&&k()},onpointerup(e){2==e.which||e.target!=j&&!v(e,"letters")||((D[e.target.textContent]||D)(e.target.textContent),C=!1)}}),h.exps({$:"main",css:{display:"flex",position:"relative",flexDirection:"column",alignItems:"center",justifyContent:"center",background:"#fff",padding:"1em"}},m({css:{color:"var(--highlight-color)"}},"Experiments"),a.close({onclick(e,t){t.parentNode.remove()}},"x"),s(g("Mouseboard"),c("A mouseboard is a virtual keyboard that can be used with a mouse. It is activated by clicking the middle mouse button."),a({css:{display:"flex",flexDirection:"column",alignItems:"flex-start",justifyContent:"center"}},f({css:{fontWeight:"bold"}},"Clicking:"),[c("The middle mouse button again will deactivate the mouseboard."),c("On a letter will add that letter to the mouseboard's output."),c("On the enter key will add a new line to the mouseboard's output."),c("On the space key will add a space to the mouseboard's output."),c("On the del key will remove the last character from the mouseboard's output."),c("On the copy key will copy the mouseboard's output to the clipboard."),c("On the caps key will toggle caps lock on the mouseboard.")].randomize()),p({onclick:e=>(e.preventDefault(),k(C=!0),w(e.clientX-60,e.clientY-50))},"make it pop up")),s(g("future experiments and things?"),c("if you have suggestions contact me and lemme know for things to try out on this site."))),e.toast("experiments loaded")}