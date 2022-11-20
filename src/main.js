import './global.css'
import './site.css'

import domlib from './domlib.js'

const d = domlib.domfn
const {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = d

const app = domlib.emitter({domlib, d})

const thoughts = `
  Reality demonstrates itself in a tone of absoluteness. There is no true control, normativity reigns supreme.

  Slowing down colors attention like a filter and ram clear on what time feels like. Slow breath makes time thick, because we forget we are alive, and suddenly realize what a complex contrap all this truly is, our concerns are so narrow at times, that our own bodies and thoughts pass us by.

  Consequence is a meta-temporal concept, and has little traction upon non-static non-type/object oriented thinking, it is physical and proccessual not narrativistic or semantic.

  The right music at the right time, mends old wounds and bring release.

  Returning to aesthetics, like a corpse to the sublimity of rebirth, from out of atelic duty with a new found loss of the sense of the trancendent sourced from pragmatic, utilitarian, and instrumental interest.  

  A dreadful thought, to count all the times one must essentially start over in life, be it with relationships, a move, or change of business.. so much waste, so much hurt, the repetition is torturous. Stronger not dead, sure, but at what cost?

`
  .trim()
  .split("\n")
  .map(t => t.trim())
  .filter(t => t != '')



section.thoughts({$: 'main'},
  header({
    css: {
      width: '100%',
      margin: '0 auto'
    }
  }, 'thoughts'),
  div.spacer,
  thoughts.map(t => p.thought(t))
)

app.toasts = new Set()

app.on('toast', evt => {
  const toast = div.toast({$:'body'}, evt)
  toast.style.top = "calc(1vh + 1.5cm * " + app.toasts.size + ")"
  app.toasts.add(toast)
  const ct = (action => {
      const to = setTimeout(action, 10000)
      return () => {
          clearTimeout(to)
          action()
      }
  })(() => {
    toast.remove()
  })
  toast.onclick = ct
})

app.toast = (...msgs) => {
  app.emit('toast', ...msgs)
}


app.toast('...loaded')

import ex from "./experimental.js"
ex(app)