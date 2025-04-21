const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const [N, K] = input[0].split(" ").map(Number);

// K 10^8임
const numbers = input.splice(1, N);

// 탐색 이분 탐색

function bs(target, numbers) {
  let start = 0;
  let end = numbers.length - 1;

  let mid = Math.floor((start + end) / 2);
  let val = Number(numbers[mid]);

  while (start < end) {
    val = Number(numbers[mid]);

    if (val > target) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
    mid = Math.floor((end + start) / 2);
  }

  // 가장 가까운 수
  if (Number(numbers[mid]) > target) {
    return mid - 1;
  }

  return mid;
}

// 동전 합이 K
// 동전 개수의 최소값
// N 줄 동전 가치

// 1. K보다 작거나 같은 수 중 가장 큰 수로 나눈다.
// 2. (나머지 수 )에 K를 넣는다. -> 나머지가 0이 될때까지 반복한다.

function sol() {
  let count = 0;
  const target = Number(K);
  let remain = target;
  let idx;

  while (1) {
    idx = bs(remain, numbers);
    count += Math.floor(remain / Number(numbers[idx]));

    // 업데이트
    remain = remain % Number(numbers[idx]);
    if (remain === 0) break;
  }

  console.log(count);
}

sol();
