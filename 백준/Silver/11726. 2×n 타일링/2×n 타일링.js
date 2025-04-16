// 첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = +input;

// 순열처럼 앞에 고정해놓고 그 나머지의 경우의 수를 구해야한다.s
// 길이가 n이고 숫자가 1개가 고정되어 있다면 경우의 수는 (n-1)!
// |(길이 1), = (길이 2)가 필수적으로 들어가고 있다.
// |(길이 1)가 앞에 고정되어있다면 (n-1)인 경우의 수와 같다.
// = (길이 2)가 앞에 고정되어있다면 (n-2)인 경우의 수와 같다.
// 길이 3인 모양은 (n-1)인 경우의 수와 (n-2)인 경우의 수에 포함되어있기 때문에 (n-3)인 경우의 수는 포함하지 않는다.

function sol(N) {
  const cache = Array(N + 1).fill(0);

  cache[1] = 1;
  cache[2] = 2;
  //   || =

  for (let i = 3; i <= N; i++) {
    cache[i] = (cache[i - 1] + cache[i - 2]) % 10007;
  }

  console.log(cache[N]);
}

sol(N);
