import domlib from './domlib.js'
Array.prototype.randomize = function () {
  const l = [], ln = this.length
  while (l.length != ln) {
    const i = Math.floor(Math.random() * this.length)
    l.push(this[i])
    this.splice(i, 1)
  }
  this.splice(0, this.length, ...l)
  return this
}
domlib.runAsync(async _ => {
const
  {queryAsync, query, render} = domlib,
  {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = domlib.domfn,
  app = domlib.emitter({toasts: new Set()}),
  shuffleChildren = (s, filter) => {
    for (const c of [...(s = query(s)).children].randomize()) {
      if (filter instanceof Function && !filter(c)) continue
      c.remove(); s.appendChild(c)
    }
  }, 
  gurl = 'https://cdn.jsdelivr.net/gh/SaulDoesCode/resources/',
  thoughts = (await (await fetch(gurl + 'expressions.txt')).text())
     .trim()
     .split("\n")
     .map(t => t.trim())
     .filter(t => t != '')
     .randomize(), 
   clh = cl => c => c.classList.contains(cl),
   j = (a, b, ...f) => a === b && (b = null, f.forEach(f => b = f(b)), b),
   w = fn => (...A) => (...B) => (fn(...A), fn(...B)),
   shflIdeas = _ => shuffleChildren(shortIdeasContainer, clh('small-idea')),
   shflExpressions = _ => shuffleChildren(thoughtsContainer, clh('thought')),
   sfhlFtr = _ => w(shuffleChildren)('.doodle-links')('.links', c => c.tagName == 'A'),
   thoughtsContainer = section.thoughts({
      $pre: 'main',
      ondblclick() { shflExpressions() }
    },
      header('expressions'),
      div.spacer,
      thoughts.map(t => p.thought(t))
    ),
   shortIdeasContainer = section.short_ideas({
       $pre: 'main',
       ondblclick() { shflIdeas() }
     },
     div.spacer,
     header('short ideas'),
     br,
     div.spacer
   ), 
   shortIdeasList = (await (await fetch(gurl + 'short-ideas.txt')).text())
     .split('.')
     .map(s => s.trim())
     .filter(s => s.length > 0)
     .randomize()
     .map(s => {
       const [h, c] = s.split(':')
       return article.small_idea(header(h), span(c))
     }),
   toast = app.toast = app.emit.toast,
   xpmtl = 'experimental',
   hl = h => h[0] != '#' ? '#' + h : h,
   lhi = h => hl(h) === location.hash,
   lhs = h => location.hash = hl(h),
   rmT = t => {
     t.remove()
     app.toasts.delete(t)
     clearTimeout(t.to)
   }
 onkeyup = e => j(e.key, 'r', shflIdeas, shflExpressions, sfhlFtr)
 document.onpointerdown = async ({target}) => {
   if (target.hasAttribute('copyable') && navigator.clipboard && window.isSecureContext) {
     await navigator.clipboard.writeText(target.textContent.trim())
     toast('Copied to clipboard')
   }
 }
 app.on.toast(e => app.toasts.add(div.toast({
   $:'body',
   css:{top:`calc(1vh + 1.5cm * ${app.toasts.size})`, zIndex: 0},
   onclick(e,t){rmT(t)}
 }, e, t => {t.to = setTimeout(_=>rmT(t),5500)})))
 app.once.xpm(async()=>(await import("./experimental.js")).default(app, domlib))
 ;(await queryAsync('.breathing-circle')).onclick=_=>lhs(xpmtl)
 ;(onhashchange=_=>lhi(xpmtl)&&app.emit.xpm())()
 render(shortIdeasList,shortIdeasContainer)
 toast('loaded; pressing r randomizes things'); sfhlFtr()
})
