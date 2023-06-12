const ce = t => document.createElement(t), https = 'https://';
(async _ => document.querySelector('.img-grid').append(
...(await (await fetch(https+'cdn.jsdelivr.net/gh/SaulDoesCode/resources/imgs.txt')).text()).split('\n\n')
.map(s => s.trim().split('\n'))
.filter(([u, d]) => u && d)
.randomize()
.map(([u, d]) => {
const art = ce('article'), img = ce('img'), p = ce('p')
img.setAttribute('src', https+u)
p.textContent = d
art.append(img, p)
return art
})))()
Array.prototype.randomize = function () {
let l = [], a = this, ln = a.length, i
while (l.length != ln) {
l.push(a[i = Math.floor(Math.random() * a.length)])
a.splice(i, 1)
}
a.splice(0, a.length, ...l)
return a
}
