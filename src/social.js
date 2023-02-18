import domlib from './domlib.js'

const {queryAsync, runAsync} = domlib
const {div, section, article, textarea, header, br, span, button, form, input, label, ul, li, a, img, p, h1} = domlib.domfn

const state = domlib.emitter()

state.addMessage = (me, msg, time) =>  {
    const m = p.message(
        {$: state.messagesEl},
        span.time(time),
        // span.read("👀"),
        span.msg(msg)
    )
    me && m.classList.add('me')
    return m
}
    

section.chat({
    $: 'body',
    css: {
        margin: 'auto auto',
    }
},
    header('Chat'),
    state.messagesEl = section.messages(),
    section.input(
        state.chatInput = textarea({
            rows: 1,
            cols: 64,
            onsubmit(e) {
                state.handleSend()
            },
            onkeyup(e) {
                if (e.key == '  ') {
                    e.preventDefault()
                    state.handleSend()
                }
            }
        }),
        state.chatInputButton = button({
            onclick(e) {
                state.handleSend()
            }
        }, "send")
    )
)

state.handleSend = _ => {
    state.addMessage(true, state.chatInput.value, state.dt())
    state.chatInput.value = ''
}

state.once.dayjs(dayjs => {
    const livetimes = []
    const dt = state.dt = (m = 0) => {
        const t = new Text()
        const d = dayjs().subtract(m, 'm')
        livetimes.push(() => t.textContent = d.fromNow())
        return t
    }
    setInterval(() => livetimes.forEach(f => f()), 1500)
    state.addMessage(false, 'Goog night', dt(780))
    state.addMessage(true, 'night night', dt(780))
    state.addMessage(true, 'Hello!', dt(4))
    state.addMessage(false, 'How are you?', dt(4))
    state.addMessage(true, 'I am fine!', dt(3))
    state.addMessage(true, 'How are you holding up?', dt(2))
})


runAsync(() => (function tryUntilItWorks(
    fn, 
    worked = false,
    interval = 1111,
    it = setInterval(() => (worked = fn()) && clearInterval(it), interval)) {}
)(_ => {
    if (window.dayjs && window.dayjs_plugin_relativeTime) {
        window.dayjs.extend(window.dayjs_plugin_relativeTime)
        state.emit.dayjs(window.dayjs)
        return true
    }
    return false
}))