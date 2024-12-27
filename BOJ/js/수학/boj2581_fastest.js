const fs = require("fs");
const filePath = process.platform === "linux" ? "dev/stdin" : "input.txt";
const [m, n] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map((i) => Number(i));

const isPrime = Array(n + 1)
  .fill(true)
  .fill(false, 0, 2);
for (let i = 2; i <= Math.sqrt(n); i++) {
  for (let j = i * i; j <= n; j = j + i) {
    isPrime[j] = false;
  }
}

const primeArr = [];
for (let i = m; i <= n; i++) {
  if (isPrime[i]) primeArr.push(i);
}

if (primeArr.length === 0) {
  console.log(-1);
} else {
  console.log(primeArr.reduce((acc, cur) => acc + cur));
  console.log(Math.min(...primeArr));
}
