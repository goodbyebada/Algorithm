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

// 시간을 더 줄인 버전
//
function sol() {
  const [N, M] = input[0].split(" ").map(Number);
  const numbers = input[1].split(" ").map(Number);
  const answer = [];

  //   누적합
  const DP = Array(N + 1).fill(0);

  //   0부터 시작
  numbers.map((v, index) => {
    DP[index + 1] = DP[index] + v;
  });

  input.slice(2).map((str) => {
    const [i, j] = str.split(" ").map(Number);
    answer.push(DP[j] - DP[i - 1]);
  });

  console.log(answer.join("\n"));
}

sol();
