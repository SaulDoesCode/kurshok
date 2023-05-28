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

const sleep = async ms => new Promise(r => setTimeout(r, ms))

const onHoverScroll = (el, dur = 1000, t) => {
  el.onmouseover = e => t = setTimeout(_=> (el.scrollIntoView({behavior:'smooth'}), el.classList.add('scrolled')), dur)
  el.onmouseout = e => (clearTimeout(t), el.classList.remove('scrolled'))
  return el
}

const shuffleChildren = (s, filter) => {
  for (const c of [...(s = query(s)).children].randomize()) {
    if (filter instanceof Function && !filter(c)) continue
    c.remove()
    s.appendChild(c)
  }
}

runAsync(async () => {

const thoughts = (await (await fetch('https://gistcdn.githack.com/SaulDoesCode/56050a66371b928e50311adae52a6c8a/raw/90cfd7bf1dd6caa06d920be83712ddea2f4c6236/thoughts.txt')).text())
  .trim()
  .split("\n")
  .map(t => t.trim())
  .filter(t => t != '')
  .randomize()

window.onkeyup = e => {
  if (e.key == 'r') {
    shuffleChildren(thoughtsContainer, c => c.classList.contains('thought'))
    shuffleChildren(shortIdeasContainer, c => c.classList.contains('small-idea'))
  }
}

const w100mauto = {width: '100%', margin: '0 auto'}
const shortIdeasContainer = section.short_ideas({
    $pre: 'main',
    ondblclick(_, el) { 
      shuffleChildren(el, c => c.classList.contains('small-idea'))
    }
  },
  div.spacer,
  header({css: w100mauto}, 'short ideas'),
  br,
  div.spacer
)
const thoughtsContainer = section.thoughts({
  $: 'main',
  ondblclick(_, el) {
    shuffleChildren(el, c => c.classList.contains('thought'))
  }
},
  header({css: w100mauto}, 'expressions'),
  div.spacer,
  thoughts.map(t => onHoverScroll(p.thought(t)))
)

const shortIdeasList = (await (await fetch('https://gistcdn.githack.com/SaulDoesCode/56050a66371b928e50311adae52a6c8a/raw/90cfd7bf1dd6caa06d920be83712ddea2f4c6236/short-ideas.txt')).text())
  .split('.')
  .map(s => s.trim())
  .filter(s => s.length > 0)
  .randomize()
  .map(s => article.small_idea(header(s.split(':')[0], ':'), span(s.split(':')[1])))

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
}, e, t => {t.to = setTimeout(_ => rmT(t), 5000)})))
on.experiments_loaded(_=> toast('experiments loaded'))
once.xpm(async _ => (await import("./experimental.js")).default(app, domlib))
runAsync(async si => {
  (await queryAsync('.breathing-circle')).onclick=_=>lhs(xpmtl)
  ;(onhashchange= _=>lhi(xpmtl)&&emit.xpm())()
  await sleep(60); toast('loaded')
  render(shortIdeasList, shortIdeasContainer)
  if (!(window.innerWidth <= 768)) {
    await sleep(6000); toast('press r to randomize or dblclick on "short ideas" or "expressions"')
  }
})


})