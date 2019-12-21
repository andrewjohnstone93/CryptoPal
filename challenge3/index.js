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
            plaintext[i] = (cipherText[i]) ^ (key[i]);
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

let result = bruteForceXor('1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736');
console.log(result.plaintext);