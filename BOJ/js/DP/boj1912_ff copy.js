// DP 문제 실패!

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

sol(input);

function sol(input) {
  const N = +input[0];
  const list = input[1].split(" ").map(Number);
  const DP = Array(N).fill();

  let max = (DP[0] = list[0]);

  for (let i = 1; i < N; i++) {
    // 누적 + 현재 || 현재의 값
    const curr = Math.max(DP[i - 1] + list[i], list[i]);
    DP[i] = curr;
    max = Math.max(curr, max);
  }

  console.log(max);
}
