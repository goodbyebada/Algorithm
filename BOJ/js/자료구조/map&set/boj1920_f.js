const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, A, M, B] = input.map((v) => v.split(" "));

const array = new Set(A);

const result = B.map((v) => (array.has(v) ? 1 : 0));

console.log(result.join("\n"));
