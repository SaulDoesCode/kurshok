import domlib from 'https://cdn.jsdelivr.net/gh/SaulDoesCode/kurshok/dist/domlib.js'
Array.prototype.randomize = function () {
  let l = [], a = this, ln = a.length, i
  while (l.length != ln) {
    l.push(a[i = Math.floor(Math.random() * a.length)])
    a.splice(i, 1)
  }
  a.splice(0, a.length, ...l)
  return a
}
domlib.runAsync(async _ => {
const
  {queryAsync, query, render} = domlib,
  {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = domlib.domfn,
  app = domlib.emitter({toasts: new Set()}),
  shuffleChildren = (s, filter) => {
    for (const c of [...(s = query(s)).children].randomize()) {
      if (filter && !filter(c)) continue
      c.remove()
      s.appendChild(c)
    }
  },
  ftxt = async url => (await (await fetch(url)).text()).trim(),
  cdnRoot = 'https://cdn.jsdelivr.net/gh/SaulDoesCode/',
  gurl = cdnRoot + 'resources/',
  thoughts = (await ftxt(gurl + 'expressions.txt'))
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
   shortIdeasList = (await ftxt(gurl + 'short-ideas.txt'))
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
 ;(await queryAsync('.breathing-circle')).onclick=_=>lhs(xpmtl)
 ;(onhashchange=_=>lhi(xpmtl)&&app.emit.xpm())()
 render(shortIdeasList,shortIdeasContainer)
 toast('loaded; pressing r randomizes things')
 sfhlFtr()
 app.once.xpm(async()=>(await import(location.hostname[1] == 'o' ? `./experimental.js` : cdnRoot + 'kurshok/dist/experimental.js')).default(app, domlib))
})
