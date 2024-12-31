const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ");


console.log(`a = ${input[0]}`);
console.log(`b = ${input[1]}`);