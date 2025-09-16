// https://school.programmers.co.kr/learn/courses/30/lessons/42898

// 쉬운 DP 문제.. 하지만 못 풀었다.

// 최단거리만 보고 => BFS 생각했따.

function solution(m, n, puddles) {
  var answer = 0;

  //   m = col
  //   n = row

  // DP 배열 초기화
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(m + 1).fill(0));

  // 물웅덩이 표시
  for (const [col, row] of puddles) {
    dp[row][col] = -1;
  }

  // 시작점 초기화
  dp[1][1] = 1;

  //   그냥 전부 순회하면 된다. -> (i, j) 기준으로

  const dirs = [
    [-1, 0],
    [0, -1],
  ];

  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= m; col++) {
      // 물웅덩이
      if (dp[row][col] === -1) continue;

      for (let dir of dirs) {
        const cr = row + dir[0];
        const cc = col + dir[1];

        // 범위 밖이라면
        if (cr < 1 || cc < 1 || cr > n || cc > m) continue;

        if (dp[cr][cc] === -1) continue;

        // 물 웅덩이가 아니라면
        // % 해서 오버플로우 방지!
        dp[row][col] += dp[cr][cc] % 1000000007;
      }
    }
  }

  answer = dp[n][m] % 1000000007;

  return answer;
}

function solution2(m, n, puddles) {
  const MOD = 1000000007;

  // DP 배열 초기화
  const dp = Array(n + 1)
    .fill(0)
    .map(() => Array(m + 1).fill(0));

  // 물웅덩이 표시
  for (const [col, row] of puddles) {
    dp[row][col] = -1;
  }

  // 시작점 초기화
  dp[1][1] = 1;

  for (let row = 1; row <= n; row++) {
    for (let col = 1; col <= m; col++) {
      // 물웅덩이이거나 시작점이면 스킵
      if (dp[row][col] === -1 || (row === 1 && col === 1)) continue;

      let count = 0;

      // 위에서 오는 경우
      //   ✨ 반복문 범위 설정으로 인해 col은 무조건 정상 범위 -> row 범위만 체크해주면됨 + 물 웅덩이인가?
      if (row > 1 && dp[row - 1][col] !== -1) {
        count = (count + dp[row - 1][col]) % MOD;
      }

      // 왼쪽에서 오는 경우
      //   ✨ 마찬가지로   범위만 체크해주면됨 + 물 웅덩이인가?
      if (col > 1 && dp[row][col - 1] !== -1) {
        count = (count + dp[row][col - 1]) % MOD;
      }

      dp[row][col] = count;
    }
  }

  return dp[n][m];
}
