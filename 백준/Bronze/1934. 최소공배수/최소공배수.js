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

for (let i = 0; i < +n; i++) {
  let a = Number(input[i][0]);
  let b = Number(input[i][1]);
  let gcd = GCD(a, b);
  result.push((a * b) / gcd);
}

console.log(result.join("\n"));