import './site.css'
import domlib from './domlib.js'

const {queryAsync, runAsync, render} = domlib
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

To live in the world is to be bound by normativity, yet individuality emerges in the realization of the subjective experience that is delimited by the symbolic order, a kind of freeom through the law againt itself into a new meta-stable shape bound to an individual or as a compehensive set of traits/aboutnesses if we're avoiding object talk.

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

Desperation is a poor substitute for integrity; it may gain you something in the short term, but ultimately it will cost you everything.

Intuition, driven by life's blind force, enables problem-solving and negentropic growth in beings without subjectivity.

The content of experience, whether real or simulated, must be determined by a reality outside itself, as simulations are simulated by something external to them.

Possible constructions of intuitive logic inherit the consistency of the outside world, as the subject cannot be separate from itself as an object of actuality.

God is Nothing because the concept of truth is not the truth itself, leaving us searching for more than a trace, unaware that reality is already present without being given to us.
`
  .trim()
  .split("\n")
  .map(t => t.trim())
  .filter(t => t != '')
  .randomize()

const onHoverScroll = (el, dur = 1000) => {
  let t
  el.onmouseover = e => t = setTimeout(_=> (el.scrollIntoView({behavior:'smooth'}), el.classList.add('scrolled')), dur)
  el.onmouseout = e => (clearTimeout(t), el.classList.remove('scrolled'))
  return el
}  

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
  thoughts.map(t => onHoverScroll(p.thought(t)))
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
Control is an illusion created by the mind; to truly live, we must learn to let go of the need for control.
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
Individuality is a prison without walls; being truly free means transcending individuality.
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
The paternal function:
The symbolic authority,
that structures our identities.
The Law of the Father:
The order that maintains,
the stability of society.
The Oedipus complex:
The child's desire,
for the opposite-sex parent.
The phallus:
The symbol of power,
and authority in society.
The castration complex:
The fear of losing,
one's power and identity.
The death drive:
The destructive impulse,
that opposes the life force.
The pleasure principle:
The drive towards pleasure,
and avoidance of pain.
The reality principle:
The recognition,
of the constraints of reality.
The id:
The primal, unconscious,
and instinctual part of the psyche.
The ego:
The conscious,
and rational part of the psyche.
The superego:
The internalized moral,
and ethical values of society.
The unconscious:
The realm of repressed,
and forgotten thoughts and memories.
The collective unconscious:
The shared, inherited,
and universal aspects of the unconscious.
Archetypes:
The universal symbols,
of the collective unconscious.
Individuation:
The process of integrating,
the conscious and unconscious aspects of the psyche.
Transcendence:
The realization of the self,
beyond the limitations of the ego.
Existentialism:
The philosophy of individual,
and subjective experience.
Absurdism:
The recognition,
of the meaningless of existence.
Authenticity:
The pursuit of living,
according to one's true self.
Nihilism:
The rejection of meaning,
and values in life.
Phenomenology:
The study of subjective,
experience and perception.
Intentionality:
The inherent directedness,
of consciousness towards objects.
Existential phenomenology:
The investigation,
of the human condition through subjective experience.
Hermeneutics:
The study of interpretation,
and understanding of texts.
Deconstruction:
The critique of language,
and the uncovering of hidden assumptions.
Postmodernism:
The rejection of grand narratives,
and a focus on individual experience.
Object-oriented ontology:
The recognition,
of the independent existence of objects.
Speculative realism:
The exploration,
of the nature of reality beyond human perception.
Pharmakon:
The paradoxical nature,
of substances as both poison and cure.
Sociobiology:
The study of the biological,
basis of social behavior.
Ecocriticism:
The analysis,
of literary works in relation to the environment.
Animal studies:
The interdisciplinary study,
of human-animal relationships.
Affect theory:
The exploration of emotions,
and their role in shaping experience.
Posthumanism:
The recognition,
of the blurring boundaries between human and non-human entities.
Queer theory:
The critique,
of traditional notions of gender and sexuality.
Feminist philosophy:
The examination,
of the role of gender in society and the world.
Transcendental Realism: Our perceptions and language are not obstacles to truth, but tools for unlocking the hidden potential of reality.
The posthuman: not a new category of existence, but a radical reconfiguration of what it means to be human and what is possible for humanity.
The cognitive unconscious:
The unseen force,
that drives our thoughts and actions.
Cognitive dissonance:
The uncomfortable feeling,
of holding two conflicting beliefs.
Cognitive load:
The mental burden,
of processing information.
Schemas:
The mental frameworks,
that shape our understanding of the world.
Working memory:
The limited capacity,
to hold and manipulate information.
Attentional spotlight:
The selective focus,
of our awareness.
Episodic memory:
The autobiographical record,
of our personal experiences.
Semantic memory:
The knowledge base,
of facts and concepts.
Priming:
The unconscious influence,
of prior stimuli on subsequent behavior.
Hindsight bias:
The tendency to believe,
that events were predictable after they have occurred.
Confirmation bias:
The selective attention,
to information that confirms our beliefs.
False memories:
The reconstruction of,
a distorted past.
Encoding specificity:
The context-dependent,
retrieval of information.
Flashbulb memories:
The vivid recollection,
of emotionally significant events.
Source monitoring:
The attribution of,
memories to their correct source.
Procedural memory:
The unconscious knowledge,
of how to perform a task.
The Illusion of Separation:
In our quest for individuality, we often forget the fundamental truth of our interconnectedness, blinding ourselves to the oneness of all things.
The Silent Language of Symbols:
Symbols, silent messengers of meaning, transcend language and speak directly to the depths of our consciousness.
Repression:
The unconscious defense mechanism,
of pushing unwanted thoughts or memories out of awareness.
Retroactive interference:
The disruption, of memory consolidation by new information.
The Joy of Non-Personal Being:
Engaging with the world in a childlike, meditative way, finding bliss in continuous being and doing without seeking recognition, glorifying the act itself rather than propping up the ego.
Amnesia:
The loss of memory,
due to brain damage or disease.
Executive functioning:
The cognitive processes,
that govern goal-directed behavior.
The planning fallacy:
The tendency to underestimate,
the time and effort required for a task.
Working backwards:
The problem-solving strategy,
of starting with the desired outcome and working backwards.
The sunk cost fallacy:
The irrational tendency,
to continue investing in a project because of past investments.
The framing effect:
The influence,
of the way information is presented on decision making.
The availability heuristic:
The bias,
of judging likelihood based on easily recalled examples.
The anchoring effect:
The bias,
of being influenced by an initial value when making estimates.
The halo effect:
The tendency to generalize,
from one positive characteristic to the overall impression of a person.
The fundamental attribution error:
The tendency to attribute,
behavior to internal factors rather than situational factors.
The self-serving bias:
The tendency to take credit,
for success and attribute failure to external factors.
The false consensus effect:
The overestimation,
of the extent to which others share our beliefs and behaviors.
The Dunning-Kruger effect:
The cognitive bias,
of overestimating one's own abilities and knowledge.
The Flynn effect:
The increase,
in average intelligence test scores over time.
The bystander effect:
The tendency to not intervene,
in an emergency situation when others are present.
The mere exposure effect:
The increase,
in liking for a stimulus due to repeated exposure.
The Zeigarnik effect:
The tendency to remember,
unfinished tasks better than completed tasks.
The philosophy of impermanence:
The acceptance that everything,
is constantly in a state of flux.
The fragility of life:
A reminder that our time is finite,
and should be cherished accordingly.
The fluidity of identity:
A recognition that who we are,
is subject to change over time.
Synchronicity:
There are no coincidences, only the synchronicity of events that lead us to where we need to be. Or is it just blind chance?
Eternalism:
Yesterday is a memory, tomorrow is a possibility, but today is just an illusion.
Presentism:
If the present is a gift, then why do we keep returning it unopened?
Atemporalism:
Time is an illusion, lunchtime doubly so.
Alienating Friends:
When you try too hard to keep someone in your life, you risk pushing them away; sometimes the best way to hold onto something is to let it go.
Ruining Love:
Love is fragile, like a bird in flight; if you try to cage it, it will wither and die, but if you set it free, it may come back to you on its own.
Destroying Opportunities:
Desperation is the enemy of opportunity; it blinds you to the possibilities that surround you and drives away the very things you desire.
Losing Yourself:
When you sacrifice your values and principles for the sake of another person, you may win their affection, but you will lose yourself in the process.
Betraying Trust:
Trust is like a mirror; once it's broken, it can never be fully repaired, and the cracks will always be visible, reminding you of your mistake.
Foolish Love:
To love someone who doesn't love you back is like trying to drink from a well that's already run dry; it may quench your thirst for a moment, but you'll always be left wanting more.
Unrequited Devotion:
Loving someone who keeps you around for entertainment is like being a puppet on a string; they'll pull you close when they want to play, but they'll let you go when they're done.
False Hope:
Hope is a double-edged sword; it can give you strength to persevere, but it can also blind you to the truth and keep you trapped in a cycle of unrequited love.
Entertaining Illusions:
When you're in love with someone who doesn't love you back, it's easy to mistake their amusement for affection; but in the end, you're just a temporary distraction.
One-Sided Love:
Love that's not reciprocated is like a flower that's never watered; it may bloom for a while, but eventually it will wither and die.
Living in Denial:
Self deception is easy when it's about love or something larger than life; clinging drags out the pain, letting go is hard, but what should be there will remain.
Commitment:
A relationship without commitment is like a tree without roots; it may stand for a while, but it will never grow deep enough to weather the storms.
Intimacy:
True intimacy is not just about physical touch; it's about the moments of vulnerability and connection that we share with another person.
Communication:
The most important language in a relationship is not spoken; it's the silent understanding that comes from truly listening to each other.
Balance:
In a healthy relationship, both partners give and take in equal measure, like dancers in a graceful tango.
Trust:
Trust is the foundation of any relationship; it takes time to build, but can be shattered in an instant if it's not respected.
Empathy:
To repair a damaged relationship, you must be willing to see things from the other person's perspective and understand how your actions affected them.
Respect:
Love without respect is like a ship without a rudder; it may drift for a while, but it will eventually crash upon the rocks.
Compatibility:
Chemistry is important, but compatibility is essential; in dating, it's not just about finding someone you're attracted to, but someone who complements you in all the right ways.
The Phoenix: Just like the mythical bird that rises from the ashes, a break up can be an opportunity for rebirth and transformation; embrace the pain and use it as fuel to become a stronger, better version of yourself.
The Road Trip: Sometimes a change of scenery is all you need to gain a new perspective on life; take a solo road trip or adventure with friends to explore new places and create new memories.
The Creative Outlet: Pour your heartbreak into a creative outlet, whether it's painting, writing, music, or any other form of expression; turn your pain into something beautiful that you can be proud of.
The Self-Discovery Journey: Take some time to focus on yourself and rediscover who you are outside of a relationship; try new things, take up new hobbies, and learn to enjoy your own company.
The Support Network: Surround yourself with people who love and support you, whether it's family, friends, or a therapist; take support where needed.
The Healing Ritual: Create a ritual that honors the end of the relationship and symbolizes your commitment to moving forward; could be lighting a candle, burying a memento, or anything else that feels meaningful to you.
Masked Identity:
We wear countless masks, each concealing fragments of our true selves.
A Mirror's Multitude:
Reflections reveal the kaleidoscope of identities we embody within a single lifetime.
Dancing with Demons:
Through shattered dreams and tormented steps, we waltz with our inner demons.
The Bell Jar Unsealed:
Breaking free from the confines of melancholy, we find the light that mends our fractured souls.
Threads of Reality Unraveled:
In the tapestry of life, the frayed threads of illusion expose the underlying void.
The Abyss Beckons:
In the depths of despair, we discover the fathomless allure of oblivion.
The Absurd in Limelight:
Existence, an absurdist play, where laughter and tears share the same stage.
The Illusion of Mirrors:
In the theatre of self-discovery, we seek reflections in others, only to find shattered images of who we once were, caught in the parataxis of evolving desires.
The Cruelty of Unknowing:
Within the dense tapestry of our shifting selves, we long for a friend or lover, yet our elusive identity dissolves, leaving us in the barren theater of uncertainty.
Labyrinths of Changing Desires:
Navigating the intricate mazes of our evolving needs, we yearn for connection, but the script of our authenticity eludes us, lost in the intricate parataxis of our own transformations.
Fractured Masks, Wounded Hearts:
As the curtain falls on our former self, we wear fragmented masks, concealing our changing desires, while the echoes of our genuine yearnings resonate through the theatre of cruelty.
Chimeric Longings:
In the density of shifting desires, we chase elusive companionship, only to realize that the self we seek is an ever-changing chimera, disappearing into the labyrinth of paratactic uncertainty.
The Melody of Transcendence:
Amidst the discordant notes of shifting desires, we harmonize the symphony of our social being, transcending the confines of the self, weaving a tapestry of genuine connections that resonate beyond the boundaries of detachment.
Truth qua Virtue:
Truth reshapes our perception of the world, by prioritizing categorization, explanation, and narrative, we close the gaps in our scientific and socially mediated understanding, revealing the interconnectedness of objects and processes within and beyond ourselves.
Exploring Functionally Correct Truths:
Functionally correct metaphors, allegories, and religious ideas reveal insights into the underlying mechanisms that structure our conceptualizations; uncovering the psychology and processes that enable such belief systems helps us move toward fuller explanations, bridging the gaps between functional correctness and the pursuit of deeper truths.
Embracing the Human Dimension:
The human realm is not withdrawn from the world; studying our minds and behavior is as valid as studying any other natural phenomena; no sacred barriers hinder objective reflection on our relationship with the world, urging us to delve into abstract understanding beyond the limitations of tradition.
Unveiling Subjective Objectivity:
In valuing, we embrace the intersubjective nature of human existence, pondering the rules and patterns that govern our judgements; through explicit conceptualization, we unravel the complexities of value, formulating flexible yet objective heuristics for economies of meaning.
Complex Value; A Web of Judgements:
Value intertwines with emotional states, practical use, aesthetic effect, and even scientific knowledge; from sentimentality to speculative assessment, value navigates intricate webs of normative rules, serving as a compass for our intersubjective engagements.
Domesticated Neutrality, Stripped Objects:
Human cognizers shape the world for-us, stripping objects of their neutral essence, molding them into tools and vessels that serve our subjective ends, weaving them into the fabric of our self-centric existence.
Sentimental Enchantment, Priceless Stories:
Value emerges from connections to past experiences, weaving sentimental threads that transform ordinary objects into bridges to memory, imbuing them with the power to enchant and evoke priceless emotions.
The Mirage of Certainty: Certainty, a mirage born from our longing for stability, dissolves when we confront the fragility of our foundational beliefs, leaving us adrift in a sea of existential questioning.
The Ripples of Perception: Our perception shapes the contours of reality, and in questioning the necessity of existence, we ripple through the fabric of perception, forever altering the landscape of our understanding.
Illusions of Necessity: The comforting notion of necessary existence shatters when we realize that what we thought was essential may be but a fabrication of our limited perception.
Unspoken Echoes, Lingering Embers:
In the silence between words, the true power of language lies, resonating with concealed emotions.
Knowledge's Alchemical Touch:
New vocabulary transforms, though alchemy's gold may be misunderstood or mistaken for fool's.
The Liberation of Intrinsic Worth:
When personal satisfaction becomes the yardstick, external validation loses its grip.
Unleashing Creativity:
Embrace the messy, amateur, and all-over-the-place nature of your writing to explore uncharted territories of self-expression.
Freedom from Validation:
Write for yourself, without seeking approval or validation from others, allowing your words to exist on their own terms.
Subjectivity and Individual Perception:
Recognize that the value and impact of your work will vary from person to person, highlighting the subjective nature of art and creativity.
Defying Conventional Boundaries:
Break free from the constraints imposed by others and explore new vocabulary and expressions, even if it challenges established norms and social standing.
The Power of Self-Evaluation:
Focus on how you personally feel about your work rather than solely relying on external opinions, understanding that your own assessment holds significance.
Embracing Vulnerability:
Accept the vulnerability of sharing your thoughts and ideas publicly, allowing your words to have a life of their own and fostering connections with others around the world.
The Journey of Self-Transformation:
Recognize that personal growth and expanding awareness require a delicate re-structuring of the self, enabling you to navigate a large, colorful, and confusing world.
Listening and Understanding:
Develop the ability to listen to others with love, empathy, and understanding, fostering meaningful connections and gaining insight into your own emotions.
Mastering Your Spirit:
Take control of your emotions by learning to navigate and process pain, allowing yourself to be fluid and adaptable in overcoming obstacles.
The Power of Language:
Explore different languages and their expressive capabilities, recognizing the unique qualities of English while appreciating the elegance, flexibility, and musicality it offers.
The Art of Indirect Communication:
Appreciate the subtlety of storytelling, using unsaid elements and obscured affective relations to convey deeper meanings without directly incriminating the writer.
Patience and Constraint:
Acknowledge that patience with constraint can lead to the refinement of clarity and elegance, transcending pure description and imagery to induce meta-narrative and evoke deeper emotions.
The Art of Crafting Horror:
Utilize suggestion, disruption, and the play with contradictions to create contained horror that induces ontological trauma and challenges perceptions of reality.
Questioning Necessity and Meaning:
Challenge the necessity and reality of established concepts, prompting a deeper examination of their existence and the intelligence influencing the world.
`
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
  lhs = h => location.hash = hl(h)

on.toast(e => toasts.add(div.toast({
  $:'body',
  css: {top: `calc(1vh + 1.5cm * ${toasts.size})`, zIndex: 0},
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
  render(shortIdeasList, shortIdeasContainer)
})