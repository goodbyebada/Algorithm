/**
 *
 *  모든 배열을 순회하며 GCD를 구하고, 그것의 약수를 구하는 로직이다.
 */

const getDivisors = (num) => {
  const divisors = [];
  for (let i = 1; i <= num / 2; i++) {
    if (num % i === 0) divisors.push(i);
  }
  return [...divisors, num];
};

function GCD(a, b) {
  while (b !== 0) {
    let tmp = b;
    b = a % b;
    a = tmp;
  }
  return a;
}

const numbers = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
  .toString()
  .trim()
  .split("\n")[1]
  .split(" ")
  .map(Number);

const gcd = numbers.reduce((acc, curr) => GCD(acc, curr));
console.log(getDivisors(gcd).join("\n"));
