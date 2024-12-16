/**
 * 피보나치 수 2
 * 3:59~
 *
 *
 * BigInt
 */
function sol2() {
  const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim();

  const n = +input;
  const dp = [0, 1];

  for (let i = 2; i <= n; i++) {
    //📌 js 배열은 동적 배열이다.
    dp[i] = BigInt(dp[i - 1]) + BigInt(dp[i - 2]);
  }

  console.log(dp[n].toString());
}

/**
 * 피보나치 수 2
 * 처음에 했던 것
 * BigInt를 사용하지 않아 틀림
 *
 */
function sol1() {
  const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .trim();

  let n = +input - 1;

  let n0 = BigInt(0);
  let n1 = BigInt(1);

  if (+input === 0) {
    console.log(n0.toString());
    return;
  }

  if (+input === 1) {
    console.log(n1.toString());
    return;
  }

  while (n--) {
    let tmp = BigInt(n0) + BigInt(n1);
    n0 = n1;
    n1 = tmp;
  }
  console.log(n1.toString());
}
