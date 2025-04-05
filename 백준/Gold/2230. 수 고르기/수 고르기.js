// 수고르기

/**
 * 수열에서 두 수를 고른다
 * 두 수의 차는 M 이상이어야한다
 * 가장 작은 차이를 출력한다.
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

/**
 * 1. 처음 min 의 값을 차가 M이상이라면 갱신한다.
 * 2. 투 포인터를 통해 min 이하라면 움직인다.
 * 	 두 수의 차가 min 보다 크다면 start 이동
 * 	 작다면 end 이동

* 3. min보다 더 작은 값이라면 min 갱신 -
		
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
      continue;
    }

    if (diff >= min) {
      start++;
      continue;
    }
  }

  console.log(min);
}
