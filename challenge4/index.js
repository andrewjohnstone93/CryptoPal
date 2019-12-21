const readline = require('readline');
const fs = require('fs');

const ALPHABET = ['e','t','a','o','i','n','s','r','h','l','d','c','u','m','f','p','g','w','y','b','v','k','x','j','q','z'];

let cipherTexts = readFile();
console.log(bruteForceXor(cipherTexts[170]));
console.log(bruteForceXor(cipherTexts[171]));
console.log(bruteForceXor(cipherTexts[172]));


// let xOredCipherTexts = cipherTexts.map((cipherText) => {
//     return bruteForceXor(cipherText).plaintext;
// })

// let decrypted = { plaintext: '', score: 0}
// for(let i = 0; i < xOredCipherTexts.length; i++) {
//         let plaintext = xOredCipherTexts[i];
//         //Score each item by checking frequency of most common english letters
//         let score = 0;
//         for(let i = 0; i < 8; i++) {
//             score = score + plaintext.split(ALPHABET[i]).length;
//             score = score + plaintext.split(ALPHABET[i].toUpperCase()).length;
//         }

//         //Update decrypted object
//         if(score > decrypted.score) {
//             decrypted.score = score;
//             decrypted.plaintext = plaintext;
//         }    

// }

// console.log(decrypted);


function readFile() {
    var text = fs.readFileSync(__dirname + '/4.txt').toString('utf-8');
    var cipherTexts = text.split("\n")

    return cipherTexts;
}

function bruteForceXor(cipherText) {
    cipherText = Buffer.from(cipherText, 'hex');

    const alphabet = ['e','t','a','o','i','n','s','r','h','l','d','c','u','m','f','p','g','w','y','b','v','k','x','j','q','z'];
    let decrypted = { key: '', score: 0}

    //Try each letter in the alphabet
    for(let y = 0; y < alphabet.length; y++) {
        let plaintext = Buffer.alloc(cipherText.length);
        const key = Buffer.from(alphabet[y].repeat(cipherText.length));

        //XOR each byte
        for(let i = 0; i < cipherText.length; i++) {
            plaintext[i] = (cipherText[i]) ^ Buffer.from(alphabet[y]);
        }

        //Convert to string
        plaintext = plaintext.toString('ascii');
        
        //Score each item by checking frequency of most common english letters
        let score = 0;
        for(let i = 0; i < 8; i++) {
            score = score + plaintext.split(alphabet[i]).length;
            score = score + plaintext.split(alphabet[i].toUpperCase()).length;
        }

        //Update decrypted object
        if(score > decrypted.score) {
            decrypted.key = key
            decrypted.score = score;
            decrypted.plaintext = plaintext;
        }    
    }

    return decrypted;
}