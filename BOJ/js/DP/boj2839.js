const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const n = +input;
let answer = -1;
// bruteForce(n);
DynamicProgramming(n);

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

function DynamicProgramming(n) {
  const dp = new Array(n + 1).fill(0);

  //   init
  dp[3] = 1;
  dp[5] = 1;

  for (let idx = 6; idx <= n; idx++) {
    if (idx % 5 == 0) dp[idx] = dp[idx - 5] + 1;
    // 5로 나눈 몫 < 3으로 나눈 몫 , 따라서 3의 배수여도 계산하지 않는다.
    else if (idx % 3 === 0) dp[idx] = dp[idx - 3] + 1;
    else if (dp[idx - 5] !== 0 && dp[idx - 3] !== 0) {
      dp[idx] = Math.min(dp[idx - 5], dp[idx - 3]) + 1;
    }
  }

  if (dp[n]) console.log(dp[n]);
  else console.log(-1);
}
