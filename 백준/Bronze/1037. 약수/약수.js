/**
 * 약수
 * 브론즈 1
 */

// function GCD(a, b) {
//   let gcdA;
//   let gcdB;

//   if (a > b) {
//     gcdA = a;
//     gcdB = b;
//   } else {
//     gcdA = b;
//     gcdB = a;
//   }

//   while (1) {
//     let result = gcdA % gcdB;

//     if (result == 0) {
//       return gcdB;
//     }

//     gcdA = gcdB;
//     gcdB = result;
//   }
// }

// function LCM(b, a) {
//   const gcd = GCD(a, b);
//   return (a * b) / gcd;
// }

function main() {
  const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
    .toString()
    .split("\n");

  let max = -1;
  let min = 1_000_000;

  const findMaxAndMin = (a) => {
    if (max < a) {
      max = a;
    }

    if (min > a) {
      min = a;
    }
  };

  input[1].split(" ").map(Number).forEach(findMaxAndMin);

  console.log(max * min);
}

main();
