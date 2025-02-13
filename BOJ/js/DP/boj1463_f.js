/**
 * 1. 정신 나갔나? BFS 푸는데 visited 방문 체킹을 안 했다.
 * 2. DP를 사용하면 더 빠르게 풀 수 있다. idx 값 val 최솟값
 */

// 연산을 사용하는 횟수의 최솟값을 구해라
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim();

BFS(+input);
// BFS(+input);

function DP(N) {
  const dp = new Array(N + 1).fill(0);
  const visited = new Array(N + 1).fill(false);

  visited[N] = true;

  for (let idx = 2; idx <= N; idx++) {
    dp[idx] = dp[idx - 1] + 1;

    if (idx % 2 === 0) {
      dp[idx] = Math.min(dp[idx], dp[idx / 2] + 1);
    }

    if (idx % 3 === 0) {
      dp[idx] = Math.min(dp[idx], dp[idx / 3] + 1);
    }
  }

  console.log(dp[N]);
}

/**
 *
 * TopDown 방식이 더 좋다 작아질수록 => 개수가 적어진다.
 * 중복되는 값 visited 체크를 통해 제거
 * @param {*} N
 */
function BFS(N) {
  let index = 0;
  const queue = [[N, 0]];
  const visited = new Set();
  visited.add(N);

  while (index < queue.length) {
    let [val, count] = queue[index++];

    if (val === 1) {
      console.log(count);
      break;
    }

    if (val % 2 === 0 && !visited.has(val % 2)) {
      queue.push([val / 2, count + 1]);
      visited.add(val / 2);
    }
    if (val % 3 === 0 && !visited.has(val % 3)) {
      queue.push([val / 3, count + 1]);
      visited.add(val / 3);
    }

    if (!visited.has(val - 1)) {
      queue.push([val - 1, count + 1]);
      visited.add(val - 1);
    }
  }
}
