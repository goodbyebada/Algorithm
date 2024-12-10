/**
 * 약수
 * 브론즈 1
 */

function main() {
  const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
    .toString()
    .split("\n");

  let max = -1;
  let min = 1_000_000;

  const arr = input[1].split(" ").map(Number);
  for (let i = 0; i < arr.length; i++) {
    if (max < arr[i]) max = arr[i];
    if (min > arr[i]) min = arr[i];
  }
  console.log(max * min);
}

main();
