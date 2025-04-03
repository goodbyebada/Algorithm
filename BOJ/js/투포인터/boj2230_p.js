// 수고르기

/**
 * 수열에서 두 수를 고른다
 * 두 수의 차는 M 이상이어야한다
 * 가장 작은 차이를 출력한다.
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

/**
 *
 * diff을 키운다. end++
 * diff을 줄인다. start++
 *
 * diff 계산 후
 * 1. min < M end++
 * 2. min >= M 이라면 start++ (최소 diff 찾기 위해)
 *    - diff와 min 비교를 통해 갱신 여부 판단
 *    - min == M 비교를 멈추고 return M
 */

sol(input);

function sol(input) {
  const [N, M] = input[0].split(" ").map(Number);
  let numbers = [];
  for (let i = 1; i <= N; i++) {
    numbers.push(Number(input[i]));
  }

  //   오름차순
  numbers = numbers.sort((a, b) => a - b);

  let min = 2_000_000_000;
  let start = 0;
  let end = 0;

  while (start <= end && end < numbers.length) {
    const maxVal = numbers[end];
    const minVal = numbers[start];
    const diff = maxVal - minVal;

    // 차가 M보다 작다면 -> maxVal이 더 커져야함
    if (diff < M) {
      end++;
      continue;
    }

    if (diff < min) {
      min = diff;
      start++;
      //  🚨 처음에 end++으로 생각
      //diff < min보다 작으니까 diff의 값이 커져야한다고 생각했다.
      // 하지만 앞에서 diff < M인 경우를 필터링했기에 현재, diff >= M을 만족해 더 작아져야함을 간과함
      // 로직을 깔끔하게 정리를 못해서 참사가 난 것 같다. -> 핵심은 차가 diff >= M이냐 <M이냐이다.

      continue;
    }

    if (diff >= min) {
      start++;
      continue;
    }
  }

  console.log(min);
}
