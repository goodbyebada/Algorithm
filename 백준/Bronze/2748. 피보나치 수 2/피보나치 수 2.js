/**
 * 피보나치 수 2
 * 3:59~
 *
 */

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

let n = +input - 1;

let n0 = BigInt(0);
let n1 = BigInt(1);

if (+input === 0) {
  console.log(n0.toString());
  return;
}

if (+input === 1) {
  console.log(n1.toString());
  return;
}

while (n--) {
  let tmp = BigInt(n0) + BigInt(n1);
  n0 = n1;
  n1 = tmp;
}
console.log(n1.toString());
