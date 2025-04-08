/**
 * 에라토스테네스의 체
 *
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

  for (let i = 2; i <= n; i++) {
    for (let j = 1; i * j <= n; j++) {
      if (list[i * j]) continue;
      list[i * j] = true;
      cnt++;
      if (cnt === k) {
        answer = i * j;
        break;
      }
    }
  }

  console.log(answer);
}
sol();
