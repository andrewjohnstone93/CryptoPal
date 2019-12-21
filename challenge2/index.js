const buffer1 = Buffer.from('1c0111001f010100061a024b53535009181c', 'hex');
const buffer2 = Buffer.from('686974207468652062756c6c277320657965', 'hex');

const newBuffer = Buffer.alloc(buffer1.length);
for(let i = 0; i < buffer1.length; i++) {
    newBuffer[i] = (buffer1[i]) ^ (buffer2[i]);
}


console.log(newBuffer.toString('hex'));