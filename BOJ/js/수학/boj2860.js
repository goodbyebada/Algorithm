/**
 * 에라토스테네스의 체 실5
 * 문제를 잘 읽읍시다. 👀
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split(" ");

function sol() {
  // 2 ~ N까지 채워져있고
  //   제일 작은 수의 배수를 지운다.
  //k 번째 지우는 수를 구해라
  let answer = 0;
  const n = +input[0];
  const k = +input[1];
  let cnt = 0;

  const list = Array(n + 1).fill(false);

  //   🚨 처음 Math.sqrt(n)을 사용해서 틀렸다. =>
  // 문제가 `에라토스테네스의 체`지만 소수 찾기가 목표가 아니라, 그냥 `존재하는 가장 작은 소수의 배수  지우기` 문제
  for (let i = 2; i <= Math.sqrt(n); i++) {
    for (let j = 1; i * j <= n; j++) {
      if (list[i * j]) continue;
      list[i * j] = true;
      cnt++;
      console.log(i * j, cnt);
      if (cnt === k) {
        answer = i * j;
        break;
      }
    }
  }

  console.log(answer);
}
sol();
