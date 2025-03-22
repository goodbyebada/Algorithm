// 가장 긴 증가하는 부분 수열
// 실버 2

/**
 * DP 사용 문제
 * -> 동일한 계산이 반복된다.
 *
 * 1.
 * Ex)... 10 20 30 '20' 10 10 30
 * '20' 뒤에 있는 '20'보다 큰 숫자는 Count(20) + N을 하게 된다.
 * - 동일한 계산이 반복된다. => 최대 +1
 *
 * 2.
 * 처음에는 i-1 과 비교해 최댓값을 구한 후 +1을 하려고 했으나,
 *  ... 10 20 '30' '20' 10 10 '40'
 * 일시 40의 입장에서 가야할 곳  10, 20 , 30, 10 ,10이다.
 * '30'd
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim();
// dpSolution(input);
lowerBoundFunc(input);

function dpSolution(s) {
  const [N, list] = s.split("\n");
  const A = list.split(" ").map(Number);

  //❌ 주어지는 N NUMBER로 바꿨는지 확인할 것! 조심!
  const dp = new Array(+N).fill(1);

  for (let i = 1; i < A.length; i++) {
    for (let prev = 0; prev < i; prev++) {
      if (A[prev] < A[i]) {
        // 🛑 Math.max(dp[i], dp[prev]) +1 로 설정했다 틀렸던 부분
        // -> 길이가 0이어야하는데, +1로 누적되서 틀리게 됨
        dp[i] = Math.max(dp[i], dp[prev] + 1);
      }
    }
  }

  const max = Math.max(...dp);
  console.log(max);
}

/**
 * 중복되는 숫자가 있다면, 앞에 있는 숫자가 max이기 때문에 lowerBound를 구한다.
 */

// 찾고자 하는 값의 이상이 나오는 첫번째 idx
function lowerBoundFunc(input) {
  const arr = input.split(/\s+/).map(Number);
  const n = arr[0];
  const sequence = arr.slice(1);

  const tail = [];

  for (let i = 0; i < n; i++) {
    const num = sequence[i];
    let left = 0,
      right = tail.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      // 조건 만족
      if (tail[mid] < num) {
        left = mid + 1;
        // 오른쪽으로 이동
      } else {
        right = mid;
      }
    }

    // 아무것도 없다면 , 현재 num을 넣는다. 1회
    if (left === tail.length) {
      tail.push(num);
    } else {
      tail[left] = num;
    }
  }

  console.log(tail.length);
}
