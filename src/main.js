import domlib from './domlib.js'
Array.prototype.randomize = function () {
  let l = [], a = this, ln = a.length, i
  while (l.length != ln) {
    l.push(a[i = Math.floor(Math.random() * a.length)])
    a.splice(i, 1)
  }
  a.splice(0, a.length, ...l)
  return a
}
domlib.run(async _ => {
const
  {queryAsync, query, render, domfn} = domlib,
  {div, article, p, br, section, span, header} = domfn,
  app = domlib.emitter({toasts: new Set()}),
  shuffleChildren = (s, filter) => {
    for (const c of [...(s = query(s)).children].randomize()) {
      if (filter && !filter(c)) continue
      c.remove()
      s.appendChild(c)
    }
  },
  ftxt = app.ftxt = async url => (await (await fetch(url)).text()).trim(),
  cdnRoot = app.cdnRoot = 'https://cdn.jsdelivr.net/gh/SaulDoesCode/',
  gurl = cdnRoot + 'resources/',
  thoughts = (await ftxt(gurl + 'expressions.txt'))
     .split("\n")
     .map(t => t.trim())
     .filter(t => t != '')
     .randomize(), 
   clh = cl => c => c.classList.contains(cl),
   j = (a, b, ...f) => a === b && (b = null, f.forEach(f => b = f(b)), b),
   w = fn => (...A) => (...B) => (fn(...A), fn(...B)),
   abl = (a, b, [A, B]) => [a(A), b(B)],
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
   shortIdeasList = (await ftxt(gurl + 'short-ideas.txt'))
     .split('.')
     .map(s => s.trim())
     .filter(s => s.length > 0)
     .randomize()
     .map(s => article.small_idea(abl(header, span, s.split(':')))),
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
     app.emit.toast('Copied to clipboard')
   }
 }
 app.on.toast(e => app.toasts.add(div.toast({
   $:'body',
   css:{top:`calc(1vh + 1.5cm * ${app.toasts.size})`, zIndex: 0},
   onclick(e,t){rmT(t)}
 }, e, t => {t.to = setTimeout(_=>rmT(t),5500)})))
 ;(await queryAsync('.breathing-circle')).onpointerdown=_=>lhs(xpmtl)
 render(shortIdeasList,shortIdeasContainer)
 app.emit.toast('loaded; pressing r randomizes things')
 sfhlFtr()
 app.once.xpm(async()=>(await import((app.isLH = location.hostname[2] == 'c' ? './' : cdnRoot + 'kurshok/dist/') + `experimental.js`)).default(app, domlib))
 ;(onhashchange=_=>lhi(xpmtl)&&app.emit.xpm())()
})
