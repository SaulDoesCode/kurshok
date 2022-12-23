// Encodes the given trinary triple as a 5-bit symbol
function encode(triple) {
    // Check if the triple is a smart token
    switch (triple) {
        case '###': return 0b00000; // escape
        case '@@@': return 0b00001; // repeat
        case '$$$': return 0b00010; // store
        case '^^^': return 0b00011; // load
        case '&&&': return 0b00100; // reference
    }

    // Encode the triple as a 5-bit symbol
    let symbol = 0;
    for (let i = 0; i < 3; i++) {
        let digit = triple[i];
        symbol = symbol * 3 + (digit === '1' ? 1 : (digit === '2' ? 2 : 0));
    }
    return symbol;
}

// Decodes the given 5-bit symbol into a trinary triple
function decode(symbol) {
    // Check if the symbol is a smart token
    switch (symbol) {
        case 0b00000: return '###'; // escape
        case 0b00001: return '@@@'; // repeat
        case 0b00010: return '$$$'; // store
        case 0b00011: return '^^^'; // load
        case 0b00100: return '&&&'; // reference
    }

    // Decode the symbol into a trinary triple
    let triple = '';
    for (let i = 0; i < 3; i++) {
        let digit = symbol % 3;
        triple = (digit === 1 ? '1' : (digit === 2 ? '2' : '0')) + triple;
        symbol = (symbol - digit) / 3;
    }
    return triple;
}

// Example usage:

let triple = '112';
let symbol = encode(triple);
console.log(symbol); // Output: 11

let decoded = decode(symbol);
console.log(decoded); // Output: 112