import './site.css'
import domlib from './domlib.js'

const {queryAsync, runAsync} = domlib
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

  Life is a perpetual balancing act between stability and growth. Too much of either can lead to stagnation or chaos.

  The human condition is one of constant longing. We seek love, validation, success, and happiness, but even when we attain them, they are fleeting and incomplete.

  Our perception of reality is limited by our senses and biases. What we perceive as objective truth is often shaped by our subjective experiences.

  Time is both a gift and a curse. It allows for growth and change, but also brings loss and impermanence.

  To truly understand someone, we must listen without judgment or agenda. Only then can we connect on a deeper level and cultivate empathy.

  The pursuit of knowledge is a never-ending journey. The more we learn, the more we realize how much we don't know.

  The line between genius and madness is often blurred. Both require a willingness to think outside the box and challenge conventional wisdom.

  Change is the only constant in life, and learning to embrace it can lead to personal growth and fulfillment.

  Love is a force that transcends boundaries of time, space, and logic. It can bring both joy and pain, but ultimately, it is what gives life its meaning.

  We are all searching for purpose in life, but sometimes the journey is more important than the destination.

  The abyss gazes back, and it does not like what it sees, or at least it feels that way.

  A love that is broken is not an end, but a beginning. It is the shattered fragments that become the seeds of a new growth, a new hope.

  It is easy to see love as a form of possession, as something we can own or control. But true love, like the will to a sense of freedom, is a force that transcends ownership.

  When we love, we risk everything. We risk our hearts, our minds, our very souls. It is worth it to feel.

  Existence in the face of normativity, one can not deny their subjective experience. The process of individuation demands the disintegration of the symbolic order, leaving one to face the void.

To live in the world is to be bound by normativity, yet individuality can only emerge in the realization of the subjective experience that is delimited by the symbolic order.

The subjective experience of the individual is both bounded and liberated by the symbolic order, which creates the possibility of transcendence while simultaneously hemming in individuality.

To be a self is to be situated within a symbolic order that is both enabling and constraining. It is only by confronting the limits of this order that the individual can emerge as a subjective entity.

The process of individuation is a journey towards the realization of one's subjective experience, which is both bounded and facilitated by the symbolic order.

The heart is a maze of contradictions, a labyrinth of desires and fears that can never be fully mapped or understood. Love is the thread that leads us out of the maze, but it can also tangle us up in knots.

Freedom lies not in the absolute absence of constraint, but in the ability to creatively navigate the boundaries of what is given. Knowing full well that the bounds of giveness might not be fixed, but renegotiable given as it is a myth that givenness is given givenly.

The symbolic order shapes our subjective experience in ways that are often invisible to us, but nonetheless profound. To challenge it is to enter into a struggle that may require the upending of cherished beliefs and habits.

To be human is to live with the awareness of our own mortality, and to confront the anxiety that it engenders. But it is also to embrace the urgency of our limited time, and to find meaning in the small moments that make up our lives.

The pain of love sickness is the price we pay for the privilege of loving, the tax on our hearts for the joy of connection.

The metamodern subject is one who embraces the paradoxical nature of trauma and love sickness, who finds beauty in the midst of pain and meaning in the face of despair.

In a digital abyss of hyperreality, love becomes an algorithm that computes and models our desires and their meta-rationality.

The self is not a static entity, but a process of becoming. Through the experience of love and pain, we are constantly transformed and remade. Only by embracing this process can we fully realize our potential and our place in the world.

The external world in many ways has the quality of being a mirror of subjectivity's setup and valence proportions, reflecting our own desires and fears back to us. Through introspection and self-reflection, we can come to a deeper understanding of ourselves and our place in the universe.

The dialectic of love and reason can renew the bread and butter of subjectivity. Love, as a subjective feeling, is the immediate expression of the subject, but reason, as objective mediation, allows a reconcilation with the other and the world.
`
  .trim()
  .split("\n")
  .map(t => t.trim())
  .filter(t => t != '')
  .randomize()

const w100mauto = {width: '100%', margin: '0 auto'}
const shortIdeasContainer = section.short_ideas({$pre: 'main'},
  div.spacer,
  header({css: w100mauto}, 'short ideas'),
  br,
  div.spacer
)
section.thoughts({$: 'main'},
  header({css: w100mauto}, 'expressions'),
  div.spacer,
  thoughts.map(t => p.thought(t))
)

const shortIdeasList = `Reason:
The mind is a tool,
to be used for truth and understanding.
Loss:
To lose is to gain,
a new perspective on life.
Fear of death:
The end is a beginning,
feared only by the ignorant.
Disappointment with people:
We are all human,
flawed and imperfect.
Ego and identity:
always-already deferred and yet always implicated in the symbolic order.
Norms: an ever-present force shaping subjectivity, operating through discursive practices that regulate behavior and thought.
The Other: a fundamental alterity that is both necessary for subjectivity and threatening to its stability.
Homosexuality:
Love knows no bounds,
it cannot be contained by labels.
Selfhood:
To be oneself,
is to be free from societal norms.
Nonchalance:
A cool demeanor,
hides a passion within.
The illusion of control: 
Control is an illusion created by the mind. To truly live, we must learn to let go of the need for control.
Attitude:
A choice to make,
determines the path ahead.
Freedom of thought:
A mind unbounded,
able to explore new ideas.
The nature of reality:
A puzzle to solve,
whose pieces are constantly shifting.
The limits of language: 
Language is a tool for communication, but it can also be a prison for the mind, go beyond.
The concept of time:
A seemingly constant flow,
yet relative to each individual.
The paradox of individuality: 
Individuality is a prison without walls. To be truly free, we must transcend our individuality.
The fragility of relationships: 
Relationships are like sandcastles on the beach, they can be beautiful and intricate, but they are also easily washed away by the tides of time.
The power of language:
A tool for communication,
but also a source of misunderstanding.
The idea of justice:
A concept that varies,
depending on cultural norms and beliefs.
Anxiety:
A constant battle,
between the mind and the heart.
Depression:
A dark cloud,
hanging over the soul.
Suicidal thoughts:
A cry for help,
lost in the silence.
Bipolar disorder:
A rollercoaster ride,
of highs and lows.
Social anxiety:
A fear of rejection,
a need for acceptance.
Eating disorders:
A distorted view,
of the self and the world.
Obsessive-compulsive disorder:
A never-ending cycle,
of repetition and control.
Schizophrenia:
A split in reality,
a blur between truth and delusion.
Anthropological fieldwork:
Observing and interacting,
with a new culture.
Cultural evolution:
The change and adaptation,
of a culture over time.
Cultural relativism:
Understanding others,
through their own lens.
Ethnocentrism:
The belief in superiority,
of one's own ethnic groups.
Gender roles:
Societal expectations,
imposed on the sexes.
Race and ethnicity:
Labels that divide,
but also define us.
Cultural diffusion:
The spread of ideas,
across different societies.
Quantum mechanics:
The world of the small,
where particles behave in mysterious ways.
Relativity:
The bending of space and time,
the faster you go, the slower you age.
Thermodynamics:
The study of heat and energy,
the constant search for balance.
Electromagnetism:
The force that holds atoms together,
and drives the universe forward.
Gravity:
The attraction of mass,
the force that holds us to the earth.
Optics:
The study of light,
from rainbows to lasers.
Nuclear physics:
The power of the atom,
unleashed in controlled reactions.
Astrophysics:
The study of the stars,
our window into the vastness of space.
Particle physics:
The search for the fundamental building blocks,
the secrets of the universe revealed.
Non-standard philosophy:
A different approach,
to understanding the world.
Philosophy of immanence:
A focus on the present,
the world as it is.
Non-philosophy:
A rejection of traditional philosophy,
and a new way of thinking.
Realism:
The belief in the existence,
of a world beyond our perceptions.
Inconsistency:
A willingness to embrace,
contradictions and paradoxes.
Radical subjectivity:
The recognition,
that we are all unique beings.
Anti-humanism:
A rejection of the human-centric,
view of the world.
Non-philosophy of science:
A critique of traditional,
scientific methods and theories.
Non-philosophy of art:
A new way of looking,
at the creations of the human mind.
Non-philosophy of religion:
A re-evaluation of religious,
beliefs and practices.
Religion as a human construct:
A recognition that religion,
is a product of the human mind.
The non-religious subject:
A focus on the individual,
and their unique experiences and beliefs.
The non-religious world:
A world beyond religious,
doctrines and dogmas.
The non-religious future:
A future without religion,
free from the constraints of tradition.
The non-religious community:
A community of individuals,
united in their rejection of religion.
The non-religious self:
A self beyond religion,
free to explore and discover.
The non-religious Other:
A recognition of the diversity,
of beliefs and experiences.
The non-religious reality:
A reality beyond religious,
explanations and interpretations.
The non-religious truth:
A truth that is personal,
and cannot be imposed by religion.
The mirror stage:
The moment when the infant,
recognizes themselves as a separate being.
The symbolic order:
The world of language,
and the construction of meaning.
The imaginary order:
The world of our perceptions,
and the illusions we create.
The real:
The unrepresentable,
the unknowable core of being.
The Name-of-the-Father:
The symbolic authority,
that shapes our identity.
The Other:
The external world,
and our relations to it.
Lacan and feminism:
A critique of patriarchal,
power structures.
Lacan and art:
A re-evaluation of art,
through a psychoanalytic lens.
Lacan and the unconscious:
A focus on the unconscious,
forces that shape our actions and thoughts.
The Absolute:
The ultimate reality,
beyond human comprehension.
The Phenomenology of Spirit:
Hegel's major work,
exploring the evolution of consciousness.
The State:
Hegel's concept of the political,
realization of the Absolute.
The Master-Slave Dialectic:
The struggle for recognition,
and the formation of self-consciousness.
The Dialectic of History:
The progression of humanity,
towards the realization of the Absolute.
The Dialectic of Nature:
The continual evolution,
of the natural world.
The Dialectic of Reason:
The struggle between the individual,
and the universal.
The Dialectic of Spirit:
The development of the human,
mind and soul.
The Universal and Homogenous State:
Kojeve's vision of the ultimate,
political form of society.
The Hegelian dialectic of recognition:
Kojeve's emphasis on the importance,
of recognition in human interactions.
The master-slave dialectic:
Kojeve's exploration of the power dynamics,
between individuals in society.
The Animal and the Human:
Kojeve's distinction between,
the two stages of human consciousness.
The Human and the Divine:
Kojeve's idea of the ultimate,
human achievement of divinity.
The victory of the West:
Kojeve's belief that the Western,
world has achieved the end of history.
The role of violence:
Kojeve's view that violence,
is necessary for historical change.
The importance of work:
Kojeve's emphasis on the centrality,
of work in human life.
Unconditional love:
A love that knows no bounds,
accepting flaws and imperfections.
Romantic love:
A passion that burns,
two hearts beating as one.
Self-love:
A recognition of worth,
a foundation for a fulfilling life.
Parental love:
A selfless devotion,
nurturing and protecting a child.
Brotherly love:
A bond of friendship,
built on trust and shared experiences.
Platonic love:
A connection beyond romance,
a deep affection and understanding.
Divine love:
A love that transcends humanity,
a connection to a higher power.
Love as sacrifice:
A willingness to put others first,
giving up something of value for their sake.
Love as companionship:
A shared journey through life,
two hearts walking side by side.
Love as a choice:
A decision to commit,
to make a relationship work.
Love as recognition:
The acknowledgement of another,
as a self-conscious individual.
Love as union:
The coming together of two individuals,
creating something greater than the sum of its parts.
Love as reconciliation:
The resolution of conflicts,
and the restoration of unity.
Love as transformation:
The growth and development,
of individuals through the relationship.
Love as fulfillment:
The realization of the self,
through the recognition and union with another.
Love, a force beyond reason:
Love can make us do irrational things, but it is also what gives us the strength to overcome impossible obstacles.
Reason, a guide for love:
Reason helps us make sense of our emotions and understand what we truly want in love.
Love, a test of reason:
Love can challenge our rational thinking, but it also allows us to experience deep emotions and connect with others on a profound level.
Reason, a boundary for love:
Reason can help us avoid making impulsive decisions in love and set healthy boundaries for ourselves.
Love and reason, a delicate balance:
Finding the right balance between our emotions and rational thinking is key to making healthy choices in love and in life.
`.split('.').map(s => s.trim()).filter(s => s.length > 0)
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
once.xpm(async _ => (await import("./experimental.js")).default(app, domlib))
runAsync(async si => {
  (await queryAsync('.breathing-circle')).onclick=_=>lhs(xpmtl)
  ;(onhashchange= _=>lhi(xpmtl)&&emit.xpm())()
  await sleep(60); toast('loaded')
  while (si = shortIdeasList.pop()) {
    await sleep(50)
    shortIdeasContainer.append(si)
  }
})