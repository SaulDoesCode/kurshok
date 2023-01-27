import './site.css'
import domlib from './domlib.js'

const d = domlib.domfn
const {queryAsync, runAsync} = domlib
const {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = d

const app = domlib.emitter({domlib, d})

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

const thoughts = `
  Reality demonstrates itself in a tone of absoluteness. There is no true control, normativity reigns supreme.

  Slowing down allows us to focus our attention and truly experience the complexity and richness of time. When we take slow, mindful breaths, we become aware of our own existence and the vastness of the world around us. Our narrow concerns fade away, and we are able to fully appreciate the intricate web of existence in which we are a part.

  Consequence is a meta-temporal concept, and has little traction upon non-static non-type/object oriented thinking, it is physical and proccessual not narrativistic or semantic.

  The right music at the right time, mends old wounds and brings release. 

  Returning to aesthetics, like a corpse to the sublimity of rebirth, from out of atelic duty with a new found loss of the sense of the trancendent sourced from pragmatic, utilitarian, and instrumental interest.  

  A dreadful thought, to count all the times one must essentially start over in life, be it with relationships, a move, or change of business.. so much waste, so much hurt, the repetition is torturous. Stronger not dead, sure, but at what cost?

  It hurts to be alive. You can have whatever. It still hurts.

  Someone loses a part of their body, and it doesn't grow back, the future of their existence is marked by that. The absolute unabsoluteness of the future, the absolute unabsoluteness of the past, the absolute unabsoluteness of the circumstances facilitating what it is like to be alive frightens.

  Condemed to freedom? Hah, condemed to making due with limitation, freedom being what is indivudated in a negative sense. Someone define some positive content for be-ing!

  To choose from a pile of mediocrity is hardly choosing at all. Such freedom, wow, shitpost equivalent of spiritual nourishment.
`
  .trim()
  .split("\n")
  .map(t => t.trim())
  .filter(t => t != '')
  .randomize()

const w100mauto = {width: '100%', margin: '0 auto'}

section.thoughts({$pre: 'main'},
  header({css: w100mauto}, 'expressions'),
  div.spacer,
  thoughts.map(t => p.thought(t))
)


const shortIdeasContainer = section.short_ideas({$: 'main'},
  div.spacer,
  header({css: w100mauto}, 'short ideas'),
  br,
  div.spacer
);

const shortIdeasList = `Reason:
   The mind is a tool,
   to be used for truth and understanding.
   |
   Loss:
   To lose is to gain,
   a new perspective on life.
   |
   Fear of death:
   The end is a beginning,
   feared only by the ignorant.
   |
   Disappointment with people:
   We are all human,
   flawed and imperfect.
   |
   Homosexuality:
   Love knows no bounds,
   it cannot be contained by labels.
   |
   Selfhood:
   To be oneself,
   is to be free from societal norms.
   |
   Nonchalance:
   A cool demeanor,
   hides a passion within.
   |
   Attitude:
   A choice to make,
   determines the path ahead.
   |
   Freedom of thought:
   A mind unbounded,
   able to explore new ideas.
   |
   The nature of reality:
   A puzzle to solve,
   whose pieces are constantly shifting.
   |
   The concept of time:
   A seemingly constant flow,
   yet relative to each individual.
   |
   The power of language:
   A tool for communication,
   but also a source of misunderstanding.
   |
   The idea of justice:
   A concept that varies,
   depending on cultural norms and beliefs.
   |
   Anxiety:
   A constant battle,
   between the mind and the heart.
   |
   Depression:
   A dark cloud,
   hanging over the soul.
   |
   Suicidal thoughts:
   A cry for help,
   lost in the silence.
   |
   Bipolar disorder:
   A rollercoaster ride,
   of highs and lows.
   |
   Social anxiety:
   A fear of rejection,
   a need for acceptance.
   |
   Eating disorders:
   A distorted view,
   of the self and the world.
   |
   Obsessive-compulsive disorder:
   A never-ending cycle,
   of repetition and control.
   |
   Schizophrenia:
   A split in reality,
   a blur between truth and delusion.
   |
   Anthropological fieldwork:
   Observing and interacting,
   with a new culture.
   |
   Cultural evolution:
   The change and adaptation,
   of a culture over time.
   |
   Cultural relativism:
   Understanding others,
   through their own lens.
   |
   Ethnocentrism:
   The belief in superiority,
   of one's own ethnic groups.
   |
   Gender roles:
   Societal expectations,
   imposed on the sexes.
   |
   Race and ethnicity:
   Labels that divide,
   but also define us.
   |
   Cultural diffusion:
   The spread of ideas,
   across different societies.
   |
   Quantum mechanics:
   The world of the small,
   where particles behave in mysterious ways.
   |
   Relativity:
   The bending of space and time,
   the faster you go, the slower you age.
   |
   Thermodynamics:
   The study of heat and energy,
   the constant search for balance.
   |
   Electromagnetism:
   The force that holds atoms together,
   and drives the universe forward.
   
   Gravity:
   The attraction of mass,
   the force that holds us to the earth.
   |
   Optics:
   The study of light,
   from rainbows to lasers.
   |
   Nuclear physics:
   The power of the atom,
   unleashed in controlled reactions.
   |
   Astrophysics:
   The study of the stars,
   our window into the vastness of space.
   |
   Particle physics:
   The search for the fundamental building blocks,
   the secrets of the universe revealed.
   |
   Non-standard philosophy:
   A different approach,
   to understanding the world.
   |
   Philosophy of immanence:
   A focus on the present,
   the world as it is.
   |
   Non-philosophy:
   A rejection of traditional philosophy,
   and a new way of thinking.
   |
   Realism:
   The belief in the existence,
   of a world beyond our perceptions.
   |
   Inconsistency:
   A willingness to embrace,
   contradictions and paradoxes.
   |
   Radical subjectivity:
   The recognition,
   that we are all unique beings.
   |
   Anti-humanism:
   A rejection of the human-centric,
   view of the world.
   |
   Non-philosophy of science:
   A critique of traditional,
   scientific methods and theories.
   |
   Non-philosophy of art:
   A new way of looking,
   at the creations of the human mind.
   |
   Non-philosophy of religion:
   A re-evaluation of religious,
   beliefs and practices.
   |
   Religion as a human construct:
   A recognition that religion,
   is a product of the human mind.
   |
   The non-religious subject:
   A focus on the individual,
   and their unique experiences and beliefs.
   |
   The non-religious world:
   A world beyond religious,
   doctrines and dogmas.
   |
   The non-religious future:
   A future without religion,
   free from the constraints of tradition.
   |
   The non-religious community:
   A community of individuals,
   united in their rejection of religion.
   |
   The non-religious self:
   A self beyond religion,
   free to explore and discover.
   |
   The non-religious Other:
   A recognition of the diversity,
   of beliefs and experiences.
   |
   The non-religious reality:
   A reality beyond religious,
   explanations and interpretations.
   |
   The non-religious truth:
   A truth that is personal,
   and cannot be imposed by religion.
   |
   The mirror stage:
   The moment when the infant,
   recognizes themselves as a separate being.
   |
   The symbolic order:
   The world of language,
   and the construction of meaning.
   |
   The imaginary order:
   The world of our perceptions,
   and the illusions we create.
   |
   The real:
   The unrepresentable,
   the unknowable core of being.
   |
   The Name-of-the-Father:
   The symbolic authority,
   that shapes our identity.
   |
   The Other:
   The external world,
   and our relations to it.
   |
   Lacan and feminism:
   A critique of patriarchal,
   power structures.
   |
   Lacan and art:
   A re-evaluation of art,
   through a psychoanalytic lens.
   |
   Lacan and the unconscious:
   A focus on the unconscious,
   forces that shape our actions and thoughts.
   |
   The Absolute:
   The ultimate reality,
   beyond human comprehension.
   |
   The Phenomenology of Spirit:
   Hegel's major work,
   exploring the evolution of consciousness.
   |
   The State:
   Hegel's concept of the political,
   realization of the Absolute.
   |
   The Master-Slave Dialectic:
   The struggle for recognition,
   and the formation of self-consciousness.
   |
   The Dialectic of History:
   The progression of humanity,
   towards the realization of the Absolute.
   |
   The Dialectic of Nature:
   The continual evolution,
   of the natural world.
   |
   The Dialectic of Reason:
   The struggle between the individual,
   and the universal.
   |
   The Dialectic of Spirit:
   The development of the human,
   mind and soul.
   |
   The Universal and Homogenous State:
   Kojeve's vision of the ultimate,
   political form of society.
   |
   The Hegelian dialectic of recognition:
   Kojeve's emphasis on the importance,
   of recognition in human interactions.
   |
   The master-slave dialectic:
   Kojeve's exploration of the power dynamics,
   between individuals in society.
   |
   The Animal and the Human:
   Kojeve's distinction between,
   the two stages of human consciousness.
   |
   The Human and the Divine:
   Kojeve's idea of the ultimate,
   human achievement of divinity.
   |
   The victory of the West:
   Kojeve's belief that the Western,
   world has achieved the end of history.
   |
   The role of violence:
   Kojeve's view that violence,
   is necessary for historical change.
   |
   The importance of work:
   Kojeve's emphasis on the centrality,
   of work in human life.`.split('|').map(s => s.trim()).filter(s => s.length > 0)
   .map(s => {
      const [t, c] = s.split(':')
      return article.small_idea(header(t, ':'), span(c))
   }).randomize();

app.toasts = new Set()
const
  toast = app.toast = app.emit.toast,
  {once, on, emit, toasts} = app,
  xpmtl = 'experimental',
  hl = h => h[0] != '#' ? '#' + h : h,
  lhi = h => hl(h) === location.hash,
  lhs = h => location.hash = hl(h)

on.toast(e => toasts.add(div.toast({
  $:'body',
  css: {top: `calc(1vh + 1.5cm * ${toasts.size})`},
  onclick(e, t) {
    t.remove()
    toasts.delete(t)
    clearTimeout(t.to)
  }
}, e, t => {t.to = setTimeout(_ => t.remove(), 5000)})))
on.experiments_loaded(_=> toast('experiments loaded'))
once.xpm(async _ => (await import("./experimental.js")).default(app))
runAsync(async si => {
  (await queryAsync('.breathing-circle')).onclick=_=>lhs(xpmtl)
  ;(onhashchange= _=>lhi(xpmtl)&&emit.xpm())()
  await sleep(60); toast('loaded')
  while (si = shortIdeasList.pop()) {
    await sleep(50)
    shortIdeasContainer.append(si)
  }
})