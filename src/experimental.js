export default async function(app, dl) {
    console.log('experiments...')
    const {div, article, textarea, input, a, p, button, style, br, hr, h1, h4, section, span, header} = dl.domfn

    style({$: document.head}, `
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
    `)

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
    const setMBOp = op => Object.assign(mb.style, cssOp(op))
    const parHasClass = (e, cl) => (e instanceof Node ? e : e.target).parentNode.classList.contains(cl)
    
    let busy = false
    let mbstr = new Text()
    let mb = div.mouseboard(
        {$: 'body', css: cssOp()}, 
        section.letters(
            sma('abcdefghijklmnopqrstuvwxyz1234567890', span),
            div.spacer,
            sma('enter space del copy', span, ' ')
        ),
        section.output(mbstr)
    )

    const ptrgs = Object.assign(t => mbstr.textContent += t, {
        del() { mbstr.textContent = mbstr.textContent.slice(0, -1) },
        space() { ptrgs(' ') },
        enter() { ptrgs('\n') },
        copy() { navigator.clipboard.writeText(mbstr.textContent.trim()) }
    })

    Object.assign(document, {
        onpointerdown(e) {
            if (e.which == 2) {
                e.preventDefault()
                setMBOp(busy = true)
                setMBPos(e.clientX - 60, e.clientY - 50)
            } else if (e.target != mb && !parHasClass(e, 'letters')) 
                setMBOp()
        },
        onpointerup(e) {
            if (e.which == 2 || !parHasClass(e, 'letters')) return
            (ptrgs[e.target.textContent] || ptrgs)(e.target.textContent)
            busy = false
        }
    })
    app.emit('experiments_loaded')



/*
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
    }*/
}