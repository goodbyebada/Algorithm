/**
 * 1. 정신 나갔나? BFS 푸는데 visited 방문 체킹을 안 했다.
 * 2. DP를 사용하면 더 빠르게 풀 수 있다. idx 값 val 최솟값
 */

// 연산을 사용하는 횟수의 최솟값을 구해라
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim();

DP(+input);
// BFS(+input);

function DP(N) {
  const dp = new Array(N + 1).fill(0);

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
 * 중복되는 값 visited 체크를 통해 제거
 * @param {*} N
 */
function BFS(N) {
  let index = 0;
  const queue = [[1, 0]];
  const visited = new Array(N + 1).fill(false);
  visited[1] = true;

  while (index < queue.length) {
    let [val, count] = queue[index++];

    if (val === N) {
      console.log(count);
      break;
    }
    const list = [val + 1, val * 2, val * 3];

    for (let num of list) {
      if (num > N) continue;
      if (visited[num]) continue;
      queue.push([num, count + 1]);
      visited[num] = true;
    }
  }
}
