import './global.css'
import './site.css'

import domlib from './domlib.js'

const d = domlib.domfn
const {div, article, textarea, input, a, p, button, hr, h1, h4, section, span, header} = d

const app = domlib.emitter({})

const thoughts = `
  Reality demonstrates itself in a tone of absoluteness. There is no true control, normativity reigns supreme.

  Slowing down colors attention like a filter and ram clear on what time feels like. Slow breath makes time thick, because we forget we are alive, and suddenly realize what a complex contrap all this truly is, our concerns are so narrow at times, that our own bodies and thoughts pass us by.
`
  .trim()
  .split(",,")
  .map(t => t.trim())
  .filter(t => t != '')



section.thoughts({$pre: 'main'},
  header({
    css: {
      width: '100%',
      margin: '0 auto'
    }
  }, 'thoughts'),
  thoughts.map(t => section.thought(t))
)


console.log('loaded')