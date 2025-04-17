const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

/**
 * 첫째줄 N, M
 *
 *
 * DP를 이용해 누적
 * 1 ~ N을 누적한다.
 *
 * i j 의 누적합은 DP[j] - DP[i-1]
 * j까지의 누적합 - (i-1)까지의 누적합을 출력한다.
 */

function sol() {
  const [N, M] = input[0].split(" ").map(Number);
  const numbers = input[1].split(" ").map(Number);
  const rangeList = [];
  for (let i = 2; i < input.length; i++) {
    rangeList.push(input[i].split(" "));
  }

  const answer = [];

  //   누적합
  //   index는 1부터 시작한다.
  const DP = Array(N + 1).fill(0);

  DP[1] = numbers[0];

  //  index 0  부터 시작
  for (let index = 1; index <= N; index++) {
    // DP 현재 인덱스 index+1
    // DP  이전 인덱스 Index
    DP[index + 1] = DP[index] + numbers[index];
  }

  for (let index = 0; index < M; index++) {
    const [i, j] = rangeList[index];

    answer.push(DP[j] - DP[i - 1]);
  }

  console.log(answer.join("\n"));
}

sol();
