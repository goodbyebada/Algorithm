const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const N = +input[0];
const numbers = input[1].split(" ").map(Number);
const M = +input[2];

// const M = input[2];

// 인덱스가 1부터 시작한다.

// 펠린드롬
// 하나만 있을때
// 2개라면 동일한 숫자
// 3개면 a b a 같아야함
// 4개라면 aaaa abba
// 5개라면 abcba 끝에서부터 접근하면 됨 짝이 지어지는지

// M 질문의 개수 10^6
// N=2000 (수열의 크기)

// 펠린드롬이라면 1 아니라면 0

// 투포인터  => 2*10^3* 10^6 = 10^9  => 투포인터는 매번 검사

// DP [N][N]
// 길이 1인 숫자열부터 구한다. -> 모두 1
// 길이가 2인 숫자열 펠린드롬이라면 1 아니라면 0
// 길이가 3 시작과 끝이 같은지 확인 -> dp[가운데] 확인 => 갱신
// 길이 4 이상 시작과 끝이 같은지 확인 -> dp[start+1][end-1] => 확인 갱신
// DP 모두 갱신한 후

// 답 도출

function sol(N, M, numbers) {
  // index 0 부터 시작
  const DP = Array(N)
    .fill()
    .map(() => Array(N).fill(0));

  // 길이가 1
  for (let i = 0; i < N; i++) {
    DP[i][i] = 1;
  }

  //   길이가 2
  for (let i = 0; i < N - 1; i++) {
    if (numbers[i] === numbers[i + 1]) {
      DP[i][i + 1] = 1;
    }
  }

  // 길이가 3이상 ~ 길이가 N일때의 경우 DP 업데이트

  for (let len = 3; len <= N; len++) {
    for (let i = 0; i < N - len + 1; i++) {
      if (numbers[i] === numbers[i + len - 1]) {
        DP[i][i + len - 1] = DP[i + 1][i + len - 2];
      }
    }
  }

  //   DP update 끝

  //  S 와 E는 1부터 시작
  const answer = [];

  for (let i = 3; i < 3 + M; i++) {
    let [start, end] = input[i].split(" ");
    answer.push(DP[start - 1][end - 1]);
  }

  console.log(answer.join("\n"));
}

sol(N, M, numbers);
