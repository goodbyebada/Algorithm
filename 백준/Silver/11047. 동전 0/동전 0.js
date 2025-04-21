const input = require('fs').readFileSync('/dev/stdin').toString().trim().split("\n");
let K = input.shift().split(" ").map(Number)[1];
const coins = input.map(Number).filter(coin => coin <= K).sort((a, b) => b - a);

const count = coins.reduce((acc, coin) => {
    const coinCount = Math.floor(K / coin);
    K %= coin;
    return acc + coinCount;
}, 0);

console.log(count);