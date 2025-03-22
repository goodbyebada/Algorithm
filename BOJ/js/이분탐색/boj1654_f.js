/**
 * 1654 랜선 자르기
 *
 * --- 풀이
 * 1. 이분탐색
 * 1. K개의 랜선을 같은 길이의 N개의 랜선으로 만들고 싶다.
 * 2. 최대의 길이를 구해야한다.
 * -> a. 개수가 작을수록 길이가 길다.
 * -> b. 개수는 N개 이상이어야한다.
 * ->  N개로 나눠 떨어지지 않을 수 있다. 때문에  최소 N개 이상의 값을 가지는 길이를 구해야한다.
 *
 * 2. UpperBound를 이용해 구할 수 있다.
 * N개를 만족시키는 랜선의 길이를 초과하는 첫번째 값을 구할 수 있다.
 *
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const [K, N] = input.shift().split(" ").map(Number);
const list = input.map(Number);

// 🍯 처음에는 sort 메소드를 이용했는데, 최댓값만 구하면 되니 max 사용이 더 적합하고 빠르다.
// O(nlogn)vsO(n)
const max = Math.max(...list);

// binarySearch(N, list, max);
upperCase(N, max, list);

// 생각을 합시다
// 무조건적으로 배열 사용하지 말고
function binarySearch(N, input, max) {
  // 1부터
  let start = 1;
  let end = max;

  while (start < end) {
    let mid = Math.floor((start + end) / 2);
    const len = mid;

    const count = input.reduce((acc, curr) => {
      const devidedCount = Math.floor(curr / len);
      acc += devidedCount;
      return acc;
    }, 0);

    //        가능
    if (count >= N) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  //   console.log(end);
  console.log(end);
  //   return list[end];
}

//1.
function upperCase(N, max, list) {
  let left = 1;
  let right = max;

  while (left <= right) {
    // 수정: while (left < right) → while (left <= right)
    let mid = Math.floor((left + right) / 2);

    const count = list.reduce((acc, curr) => acc + Math.floor(curr / mid), 0);

    if (count < N) {
      right = mid - 1; // 수정: right = mid; → right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  console.log(left - 1); // 수정: right - 1 → left - 1
}

//2.
function upperCase(N, max, list) {
  let left = 1;
  let right = max + 1;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    const count = list.reduce((acc, curr) => acc + Math.floor(curr / mid), 0);

    if (count < N) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  console.log(right - 1); // 수정: right - 1 → left - 1
}
