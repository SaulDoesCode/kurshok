import './site.css'
import domlib from './domlib.js'

const {queryAsync, query, runAsync, render} = domlib
const {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = domlib.domfn

const app = domlib.emitter()

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

const shuffleChildren = (s, filter) => {
  for (const c of [...(s = query(s)).children].randomize()) {
    if (filter instanceof Function && !filter(c)) continue
    c.remove()
    s.appendChild(c)
  }
}

runAsync(async () => {
const gurl = 'https://cdn.jsdelivr.net/gh/SaulDoesCode/resources/'

const thoughts = (await (await fetch(gurl + 'expressions.txt')).text())
  .trim()
  .split("\n")
  .map(t => t.trim())
  .filter(t => t != '')
  .randomize()

const shflIdeas = () => shuffleChildren(shortIdeasContainer, c => c.classList.contains('small-idea'))
const shflExpressions = () => shuffleChildren(thoughtsContainer, c => c.classList.contains('thought'))
window.onkeyup = e => e.key == 'r' && (shflIdeas(), shflExpressions())

const w100mauto = {width: '100%', margin: '0 auto'}
const shortIdeasContainer = section.short_ideas({
    $pre: 'main',
    ondblclick() { shflIdeas() }
  },
  div.spacer,
  header({css: w100mauto}, 'short ideas'),
  br,
  div.spacer
)
const thoughtsContainer = section.thoughts({
  $: 'main',
  ondblclick() { shflExpressions() }
},
  header({css: w100mauto}, 'expressions'),
  div.spacer,
  thoughts.map(t => p.thought(t))
)

const shortIdeasList = (await (await fetch(gurl + 'short-ideas.txt')).text())
  .split('.')
  .map(s => s.trim())
  .filter(s => s.length > 0)
  .randomize()
  .map(s => article.small_idea(header(s.split(':')[0]), span(s.split(':')[1])))

app.toasts = new Set()
const
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

on.toast(e => toasts.add(div.toast({
  $:'body',
  css: {top: `calc(1vh + 1.5cm * ${toasts.size})`, zIndex: 0},
  onclick(e, t) { rmT(t) }
}, e, t => {t.to = setTimeout(_ => rmT(t), 5500)})))
on.experiments_loaded(_=> toast('experiments loaded'))
once.xpm(async()=>(await import("./experimental.js")).default(app, domlib))
;(await queryAsync('.breathing-circle')).onclick=_=>lhs(xpmtl)
;(onhashchange=_=>lhi(xpmtl)&&emit.xpm())()
render(shortIdeasList,shortIdeasContainer)
toast('loaded')
})