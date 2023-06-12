
const imgGrid = document.querySelector('.img-grid')
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
async function fetchPictures() {
    const imgtxt = await (await fetch('https://cdn.jsdelivr.net/gh/SaulDoesCode/resources/imgs.txt')).text()
    const urls = imgtxt.split('\n\n').map(s => {
        let [u, d] = s.trim().split('\n')
        if (u.endsWith(',')) {
            u = u.slice(0, -1)
        }
        return [u, d]
    }).filter(([u, d]) => u && d)
    urls.randomize().map(([u, d]) => {
        const art = document.createElement('article')
        const img = document.createElement('img')
        img.setAttribute('src', 'https://' + u)
        const p = document.createElement('p')
        p.textContent = d
        art.append(img, p)
        imgGrid.appendChild(art)
    })
}
fetchPictures()
