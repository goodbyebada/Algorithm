const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = +input;

if (N % 2 === 0) {
  console.log("CY");
} else {
  console.log("SK");
}
