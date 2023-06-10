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
      c.remove()
      s.appendChild(c)
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
   j = (a, b, ...f) => a == b && (b = null, f.forEach(f => b = f(b))),
   w = fn => (...A) => (...B) => (fn(...A), fn(...B)),
   shflIdeas = _ => shuffleChildren(shortIdeasContainer, clh('small-idea')),
   shflExpressions = _ => shuffleChildren(thoughtsContainer, clh('thought')),
   w100mauto = {width: '100%', margin: '0 auto'},
   thoughtsContainer = section.thoughts({
      $pre: 'main',
      ondblclick: shflExpressions
    },
      header({css: w100mauto}, 'expressions'),
      div.spacer,
      thoughts.map(t => p.thought(t))
    ),
   shortIdeasContainer = section.short_ideas({
       $pre: 'main',
       ondblclick: shflIdeas
     },
     div.spacer,
     header({css: w100mauto}, 'short ideas'),
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
   {once, on, emit, toasts} = app,
   xpmtl = 'experimental',
   hl = h => h[0] != '#' ? '#' + h : h,
   lhi = h => hl(h) === location.hash,
   lhs = h => location.hash = hl(h),
   rmT = t => {
     t.remove()
     toasts.delete(t)
     clearTimeout(t.to)
   }
 window.onkeyup = e => j(e.key, 'r', shflIdeas, shflExpressions)
 document.addEventListener('pointerdown', async ({target}) => {
   if (target.hasAttribute('copyable') && navigator.clipboard && window.isSecureContext) {
     await navigator.clipboard.writeText(target.textContent.trim())
     toast('Copied to clipboard')
   }
 })
 on.toast(e => toasts.add(div.toast({
   $:'body',
   css:{top:`calc(1vh + 1.5cm * ${toasts.size})`, zIndex: 0},
   onclick(e,t){rmT(t)}
 }, e, t => {t.to = setTimeout(_=>rmT(t),5500)})))
 on.experiments_loaded(_=> toast('experiments loaded'))
 once.xpm(async()=>(await import("./experimental.js")).default(app, domlib))
 ;(await queryAsync('.breathing-circle')).onclick=_=>lhs(xpmtl)
 ;(onhashchange=_=>lhi(xpmtl)&&emit.xpm())()
 render(shortIdeasList,shortIdeasContainer)
 toast('loaded')
 w(shuffleChildren)('.doodle-links')('.links', c => c.tagName == 'A')
})
