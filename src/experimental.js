export default async function(app, dl) {
    console.log('experiments...')
    const {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = dl.domfn

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
        del() { ptrgs(mbstr.textContent.slice(0, -1)) },
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