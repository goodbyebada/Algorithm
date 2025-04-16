// DP 문제 실패!

/**
 * n개의 정수로 이뤄진 임의의 수열
 * 연속된 몇 개의 수 선택
 * 가장 큰 합 구해야함
 *
 * 수는 -> 한 개 이상 선택
 *
 *
 * n 최대 10^5
 * DP memo log(N) => 메모리 초과
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

sol(input);

function sol(input) {
  const N = +input[0];
  const list = input[1].split(" ").map(Number);
  const DP = Array(N)
    .fill()
    .map(() => Array(N).fill(0));

  let max = -Infinity;
  //   const pos = [-1, -1];

  //   좌표 0부터 시작, [start][end]
  // 길이가 1일때

  for (let i = 0; i < N; i++) {
    DP[i][i] = list[i];
    max = Math.max(max, DP[i][i]);
  }

  // 길이가 2일때,MAX 값 갱신
  for (let i = 0; i < N - 1; i++) {
    DP[i][i + 1] = DP[i][i] + list[i + 1];

    max = Math.max(max, DP[i][i + 1]);
  }

  for (let dist = 2; dist < N; dist++) {
    for (let start = 0; start + dist < N; start++) {
      DP[start][start + dist] =
        DP[start][start + dist - 1] + list[start + dist];

      max = Math.max(max, DP[start][start + dist]);
    }
  }

  console.log(max);
}
