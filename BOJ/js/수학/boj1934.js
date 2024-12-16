const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((elem) => elem.split(" "));

const n = input.shift();
const result = [];

function GCD(a, b) {
  while (b !== 0) {
    const tmp = b;
    b = a % b;
    a = tmp;
  }

  return a;
}

// 구조 분해보다는 index로 접근하는게 더 빠르구나!
for (let i = 0; i < +n; i++) {
  let a = Number(input[i][0]);
  let b = Number(input[i][1]);
  let gcd = GCD(a, b);
  result.push((a * b) / gcd);
}

// result.join("\n")으로 한번에 출력하는게 매번 콘솔찍는것과 비교해  한 100ms 더 단축됨
console.log(result.join("\n"));

// 이전 코드
function slowerFunction() {
  const [n, ...rest] = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim()
    .split("\n");

  function GCD(a, b) {
    while (b !== 0) {
      const tmp = b;
      b = a % b;
      a = tmp;
    }

    return a;
  }
  const targets = rest.map((elem) => elem.split(" ").map(Number));

  for (let i = 0; i < +n; i++) {
    const [a, b] = targets[i];
    let gcd = GCD(a, b);
    console.log((a * b) / gcd);
  }
}
