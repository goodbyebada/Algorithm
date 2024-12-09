function GCD(a, b) {
  while (b !== 0) {
    let tmp = b;
    b = a % b;
    a = tmp;
  }
  return a;
}

const [a, b] = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

console.log(GCD(a, b));
console.log((a * b) / GCD(a, b));
