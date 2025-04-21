const input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");
let K = input.shift().split(" ").map(Number)[1];

// K보다 작은 수만 가져온 후 , 오름차순으로 정렬한다.
const coins = input
  .map(Number)
  .filter((coin) => coin <= K)
  .sort((a, b) => b - a);

// 동전의 개수를 구한 후, K의 값을 업데이트 한다.
// reduce를 이용해 count를 누적한다.
const count = coins.reduce((acc, coin) => {
  const coinCount = Math.floor(K / coin);
  K %= coin;
  return acc + coinCount;
}, 0);

console.log(count);
