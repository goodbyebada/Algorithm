const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

for (let i = 0; i < Math.floor(input.length / 2); i++) {
  if (input[i] !== input[input.length - 1 - i]) {
    console.log(0);
    return;
  }
}
console.log(1);
