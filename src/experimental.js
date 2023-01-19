export default async function(app) {
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
            'abcdefghijklmnopqrstuvwxyz1234567890'.split('').map(l => span[l](l)),
            div.spacer,
            'enter,space,del,copy'.split(',').map(l => span[l](l))
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
        if (e.which == 2) return
        if (e.target.parentNode.classList.contains('letters')) {
            if (e.target.textContent == 'del') {
                mbstr.textContent = mbstr.textContent.slice(0, -1)
            } else if (e.target.textContent == 'space') {
                mbstr.textContent += ' '
            } else if (e.target.textContent == 'enter') {
                mbstr.textContent += '\n'
            } else if (e.target.textContent == 'copy') {
                navigator.clipboard.writeText(mbstr.textContent.trim())
            } else {
                mbstr.textContent += e.target.textContent
            }
            is_busy = false
        }
    }

    app.emit('experiments_loaded')


    /*function curried_summing_function(...numbers_to_sum) {
        let sum = 0
        numbers_to_sum.forEach(n => sum += n)

        return (...numbers_to_sum) => {
            if (!numbers_to_sum.length) return sum

            numbers_to_sum.forEach(n => sum += n)
            return (...ns) => curried_summing_function(sum, ...ns)
        }
    }*/
}