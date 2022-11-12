import './global.css'
import './site.css'

import domlib from './domlib.js'

const d = domlib.domfn
const {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = d

const app = domlib.emitter({})

const thoughts = `
  Reality demonstrates itself in a tone of absoluteness. There is no true control, normativity reigns supreme.

  Slowing down colors attention like a filter and ram clear on what time feels like. Slow breath makes time thick, because we forget we are alive, and suddenly realize what a complex contrap all this truly is, our concerns are so narrow at times, that our own bodies and thoughts pass us by.

  Consequence is a meta-temporal concept, and has little traction upon non-static non-type/object oriented thinking, it is physical and proccessual not narrativistic or semantic.
`
  .trim()
  .split("\n")
  .map(t => t.trim())
  .filter(t => t != '')



section.thoughts({$pre: 'main'},
  header({
    css: {
      width: '100%',
      margin: '0 auto'
    }
  }, 'thoughts'),
  br,
  thoughts.map(t => p.thought(t))
)


console.log('loaded')