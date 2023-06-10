export default async function(app, {ready, style, domfn}) {
    await ready; console.log('experiments...')
    const {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = domfn

    style`
.mouseboard {
    position: fixed;
    display: block;
    left: 0;
    top: 0;
    max-width: 220px;
    border-radius: 6px;
    background: rgba(137, 136, 136, 0.541);
    z-index: 10;
}

.mouseboard .output {
    border-radius: 4px;
    padding: .12em .24em;
    margin: .12em;
    background: #fff;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,.12));
}

.mouseboard .letters {
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-flow: row wrap;
}

.mouseboard .letters span {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-flow: row wrap;
    margin: .1em .05em;
    padding: 0 .22em;
    border-radius: 4px;
    background: #fff;
    filter: drop-shadow(0 1px 3px rgba(0,0,0,.12));
    cursor: grabbing;
    user-select: none;
}

.mouseboard .letters span:hover {
    transform: scale(1.25);
}

.close {
    position: absolute;
    left: calc(100% - 2em);
    top: 0;
    color: red;
    font-weight: 600;
    cursor: pointer;
    border-radius: 100%;
    padding: .5em;
    transition: all 140ms ease;
}

.close:hover {
    scale: 1.25;
}

.exps p {
    margin: .25em;
}
`

    const gEl = tag => cl => {
        const el = document.createElement(tag)
        el.classList.add(cl)
        el.innerText = cl
        return el
    }
    const sma = (str, el, s = '') => str.split(s).map(gEl('span'))
    const cssOp = (op, opacity = op ? 1 : 0, pointerEvents = op ? 'auto' : 'none') => ({opacity, pointerEvents})  
    const affix = (affix, fn) => (...args) => fn(...args.map(arg => arg + affix))
    const setMBPos = affix('px', (left, top) => Object.assign(mb.style, {left, top}))
    const setMBOp = op => Object.assign(mb.style, cssOp(!!op))
    const parHasClass = (e, cl) => (e instanceof Node ? e : e.target).parentNode.classList.contains(cl)
    
    let busy = false
    let mbstr = new Text()
    let mb = div.mouseboard({
        $: 'body',
        css: cssOp()
    }, 
        section.letters(
            sma('abcdefghijklmnopqrstuvwxyz1234567890', span),
            div.spacer,
            sma('enter space del copy caps', span, ' ')
        ),
        section.output(mbstr)
    )

    const ptrgs = Object.assign(t => mbstr.textContent += (!mbstr.caps ? t : t.toUpperCase()), {
        del() { mbstr.textContent = mbstr.textContent.slice(0, -1) },
        space() { ptrgs(' ') },
        enter() { ptrgs('\n') },
        copy() { navigator.clipboard.writeText(mbstr.textContent.trim()) },
        caps() {
            const op = (mbstr.caps = !mbstr.caps) ? 'toUpperCase' : 'toLowerCase', tc = 'textContent'
            document.querySelectorAll('.letters span')
                .forEach(l => l[tc].length < 2 && (l[tc] = l[tc][op]()))
        }
    })

    Object.assign(document, {
        onpointermove(e) {
            if (!busy) return
            // if the last check was less than a second a go, don't move it
            if (mb.lastCheck && +new Date() - mb.lastCheck < 600) return
            mb.lastCheck = +new Date() // timestamp
            // if the mouse is over the mouseboard, don't move it
            if (e.target == mb || parHasClass(e, 'letters')) return
            setMBPos(e.clientX - 60, e.clientY - 50)
        },
        onpointerdown(e) {
            e.which == 2 ? 
                (e.preventDefault(), setMBOp(busy = true), setMBPos(e.clientX - 60, e.clientY - 50)) :
                (e.target != mb && !parHasClass(e, 'letters')) && setMBOp()
        },
        onpointerup(e) {
            if (e.which == 2 || (e.target != mb && !parHasClass(e, 'letters'))) return
            (ptrgs[e.target.textContent] || ptrgs)(e.target.textContent)
            busy = false
        }
    })

    section.exps({
        $: 'main',
        css: {display: 'flex', position: 'relative', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '1em'},

    }, 
        h1({css: {color: 'var(--highlight-color)'}}, 'Experiments'),
        div.close({onclick(e, el) { el.parentNode.remove() }}, 'x'),
        article(
            h4('Mouseboard'),
            p('A mouseboard is a virtual keyboard that can be used with a mouse. It is activated by clicking the middle mouse button.'),
            div({css: {display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center'}},
                header({css: {fontWeight: 'bold'}},'Clicking:'),
                [
                    p('The middle mouse button again will deactivate the mouseboard.'),
                    p('On a letter will add that letter to the mouseboard\'s output.'),
                    p('On the enter key will add a new line to the mouseboard\'s output.'),
                    p('On the space key will add a space to the mouseboard\'s output.'),
                    p('On the del key will remove the last character from the mouseboard\'s output.'),
                    p('On the copy key will copy the mouseboard\'s output to the clipboard.'),
                    p('On the caps key will toggle caps lock on the mouseboard.')
                ].randomize()
            ),
            button({onclick: e => (e.preventDefault(), setMBOp(busy = true), setMBPos(e.clientX - 60, e.clientY - 50))}, "make it pop up")
        ),
        article(
            h4('future experiments and things?'),
            p('if you have suggestions contact me and lemme know for things to try out on this site.'),
        )
    )
      
    app.toast('experiments loaded')
/*

const P = async (val, ...fns) => {
        for (const f of fns) val = f.constructor.name === 'AsyncFunction' ? await f(val) : f(val)
        return val
    }
    const bindReflectorProp = (o, r, p, gfn, sfn) => {
        Object.defineProperty(r, p, {
            get() {
                const v = Reflect.get(o, p)
                return gfn instanceof Function ? gfn(v) : v
            },
            set(v) {
                Reflect.set(o, p, sfn instanceof Function ? sfn(v) : v)
                return v
            },
        })
        return r
    }

    const facFn = (o, fn) => {
        const r = Object.create(null)
        return fn(o, r)
    }
    function curried_summing_function(...numbers_to_sum) {
        let sum = 0
        numbers_to_sum.forEach(n => sum += n)

        return (...numbers_to_sum) => {
            if (!numbers_to_sum.length) return sum

            numbers_to_sum.forEach(n => sum += n)
            return (...ns) => curried_summing_function(sum, ...ns)
        }
    }

    const trz = (o, get, set) => Object.defineProperty(o, {get,set})

    */
}