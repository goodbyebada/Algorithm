// 첫째 줄에 2×n 크기의 직사각형을 채우는 방법의 수를 10,007로 나눈 나머지를 출력한다.

const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = +input;

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
