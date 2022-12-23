export default async function(app) {
    if (location.hash == "#experimental") {
        console.log('experiments...')
        const {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = app.d

        let mbstr = new Text()

        let mb = div.mouseboard({
            $: 'body',
            css: {
                opacity: '0',
                pointerEvents: 'none'
            }
        }, 
            section.letters(
                span.a('a'),
                span.b('b'),
                span.c('c'),
                span.d('d'),
                span.e('e'),
                span.f('f'),
                span.g('g'),
                span.h('h'),
                span.i('i'),
                span.j('j'),
                span.k('k'),
                span.l('l'),
                span.m('m'),
                span.n('n'),
                span.o('o'),
                span.p('p'),
                span.q('q'),
                span.r('r'),
                span.s('s'),
                span.t('t'),
                span.u('u'),
                span.v('v'),
                span.w('w'),
                span.x('x'),
                span.y('y'),
                span.z('z'),
                span.enter('enter'),
                span.space('space'),
                span.backspace('del'),
                // span.capslock('caps')
            ),
            section.output(mbstr)
        )

        let is_busy = false

        const setMBPos = (x, y) => {
            mb.style.left = x + 'px'
            mb.style.top = y + 'px'
        }

        document.onpointerdown = function(e) {
            if (e.which == 2) {
                is_busy = true
                setMBPos(e.clientX - 50, e.clientY - 50)
                e.preventDefault()
                mb.style.opacity = '1'
                mb.style.pointerEvents = 'all'
            } else if (!e.target.parentNode.classList.contains('letters') && e.target != mb) {
                mb.style.opacity = '0'
                mb.style.pointerEvents = 'none'
            }
        }

        document.onpointerup = function(e) {
            if (e.target.parentNode.classList.contains('letters')) {
                if (e.target.textContent == 'del') {
                    mbstr.textContent = mbstr.textContent.slice(0, -1)
                } else if (e.target.textContent == 'space') {
                    mbstr.textContent += ' '
                } else if (e.target.textContent == 'enter') {
                    mbstr.textContent += '\n'
                } else {
                    mbstr.textContent += e.target.textContent
                }
                is_busy = false
            }
        }


        app.toast('...experiments loaded')
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
}

/*
GIven the following code example in javascript, write a similar curried function that produces valid varied english sentences randomly, incorporating a wide vocabulary, making sure that it should never produce the same sentence twice and that each one is grammar checked, as paramaters take in emotion words and common verbs and adjectives as fodder for the selection process that determines what kind of sentence comes out  ```javascript  function curried_summing_function(...numbers_to_sum) {
        let sum = 0
        numbers_to_sum.forEach(n => sum += n)

        return (...numbers_to_sum) => {
            if (!numbers_to_sum.length) return sum

            numbers_to_sum.forEach(n => sum += n)
            return (...ns) => curried_summing_function(sum, ...ns)
        }
    } ```

*/