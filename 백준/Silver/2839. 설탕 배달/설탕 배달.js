const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = +input;
let answer = -1;
bruteForce(n);

function bruteForce(n) {
  let fivePack = Math.floor(n / 5);

  while (fivePack >= 0) {
    let remain = n - fivePack * 5;

    if (remain % 3 === 0) {
      answer = fivePack + remain / 3;
      break;
    } else {
      fivePack--;
    }
  }

  console.log(answer);
}
