export default async function(app) {
    if (location.hash == "#experimental") {
        console.log('experiments...')
        const {div, article, textarea, input, a, p, button, br, hr, h1, h4, section, span, header} = app.d

        

        app.toast('...experiments loaded')
    }
}