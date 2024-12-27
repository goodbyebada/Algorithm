const input = require("fs").readFileSync("/dev/stdin").toString().trim();

//   팰린드롬이란 앞으로 읽을 때와 거꾸로 읽을 때 똑같은 단어를 말한다.
// 100ms
// console.log(input === input.split("").reverse().join("") ? 1 : 0);
let ans = 1;
for (let i = 0; i < Math.floor(input.length / 2); i++) {
  if (input[i] !== input[input.length - 1 - i]) {
    ans = 0;
    break;
  }
}
console.log(ans);
