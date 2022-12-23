const divise_N = (divisors = [], divisand) => {
    let sum_of_divisors = divisors.pop()
    divisors.forEach(d => sum_of_divisors += d)
    return (sum_of_divisors * divisand) / divisors.length
}

const divise_normal = (divisand, divisor, sum) => (divisand / divisor) * sum

const is_sign_of_the_one = (divisand, sum) => {
    // example: 8 / (2 * (2 + 2)) === 1
    return divisand / sum === 1
}

// sn = left / small number
// bn = right / big number

const one_sign = (sn, bn) => sn * 3 / bn - (1/2)
const almost_one_sign = (sn, bn) => Math.round(sn * Math.E / bn - (1 / Math.E))


const is_almost_good_ratio = (sn, bn) => Math.floor(one_sign(sn, bn) - (1/2)) == 1

// if (sn == bn) then (((one_sign(sn, sn) - (1/2)) == (one_sign(bn, bn) - (1/2))) == 2)
// if (sn == (bn / (1/2))) then one_sign(sn, bn) == 1
// one_sign(sn, bn * 3) == (1/2)
// one_sign(sn, sn * 4) == (1/4)
// one_sign(sn, sn * 5) == 0.099999999...

/* (one_sign(sn, sn * 5) + 1) == 1.1
   thus:
       one_sign(sn, sn * 5) == 0.1 && one_sign(sn, sn * 5) == 0.0999999999...
*/


/*
    (x * x * x) + (2 * (x * x)) + (13 * x) + 10 ==

*/

const encodeTrinityNumber = (number) => {
    let base, suffix
    number = `${number / 3 / 3}`
    if (number.includes('.')) {
        [base, suffix] = number.split('.')
        suffix = Number(suffix[0])
        base = Number(base)
    } else {
        base = Number(number)
    }
    if (base > 32) throw new Error('your number will not fit into a trinity byte')
    return [base, suffix]
}

const decodeTrinityByte = byte => {
    let suffix, base
    return decodeTrinityNumber(suffix, base)
}

const decodeTrinityNumber = ([suffix, base]) => {
    if (base == 8) {
        return Math.round((Number(suffix) + 0.88888) * 3 * 3)
    } else if (base == 7) {
        return Math.round((Number(suffix) + 0.77777) * 3 * 3)
    } else if (base == 6) {
        return Math.round((Number(suffix) + 0.66666) * 3 * 3)
    } else if (base == 5) {
        return Math.round((Number(suffix) + 0.55555) * 3 * 3)
    } else if (base == 4) {
        return Math.round((Number(suffix) + 0.44444) * 3 * 3)
    } else if (base == 3) {
        return Math.round((Number(suffix) + 0.33333) * 3 * 3)
    } else if (base == 2) {
        return Math.round((Number(suffix) + 0.22222) * 3 * 3)
    } else if (base == 1) {
        return Math.round((Number(suffix) + 0.11111) * 3 * 3)
    }
}



















/*const convert = () => {}
const num = 1677560
console.log(num.toString(3), parseInt(num.toString(3), 3))*/