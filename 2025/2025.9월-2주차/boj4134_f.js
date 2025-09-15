// 실버 5 다음소수
// 이걸 틀려..? 또 틀려,,?  🤬

const fs = require("fs");
const [N, ...input] = fs
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

sol();
function sol() {
  // 소수 판정

  function isPrime(num) {
    // 🚨 히든 케이스?
    if (num < 2) return false;

    // Math.sqrt(num) 까지 한다.
    for (let i = 2; i <= Math.sqrt(num); i++) {
      // 노나진다면 -> 합성수
      if (num % i === 0) {
        return false;
      }
    }

    return true;
  }

  const answer = [];

  for (let num of input) {
    let i = num;
    while (!isPrime(i)) i++;

    // isPrime이 true일때까지 킵고잉~
    answer.push(i);
  }

  console.log(answer.join("\n"));
}
