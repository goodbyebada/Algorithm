// https://school.programmers.co.kr/learn/courses/30/lessons/43105

// Answer(1)
function solution(triangle) {
  const depth = triangle.length;
  const dp = triangle.map((row) => [...row]); // 깊은 복사

  //   depth - 1 indexError 조심
  for (let d = 0; d < depth - 1; d++) {
    for (let i = 0; i < triangle[d].length; i++) {
      dp[d + 1][i] = Math.max(dp[d + 1][i], dp[d][i] + triangle[d + 1][i]);
      dp[d + 1][i + 1] = Math.max(
        dp[d + 1][i + 1],
        dp[d][i] + triangle[d + 1][i + 1]
      );
    }
  }

  return Math.max(...dp[depth - 1]);
}

// BottomUp
function solution2(triangle) {
  const n = triangle.length;

  //   엣지 케이스
  if (n === 1) return triangle[0][0];

  for (let i = n - 2; i >= 0; i--) {
    const row = triangle[i];

    // 비교해 row를 업데이트
    const nextRow = triangle[i + 1];

    for (let j = 0, len = row.length; j < len; j++) {
      // 이 또한 이유를 모르겠는데
      //  Math.max()를 하면 시간 초과난다..
      // 시간 초과 나면 삼항연산자를 이용해보자.
      row[j] += nextRow[j] > nextRow[j + 1] ? nextRow[j] : nextRow[j + 1];
    }
  }

  return triangle[0][0];
}

// dfs 방법도 가능하다.
function solution3(triangle) {
  const n = triangle.length;
  const memo = Array.from({ length: n }, (_, i) =>
    Array(triangle[i].length).fill(-1)
  );

  function dfs(row, col) {
    // 기저 조건: 마지막 행에 도달
    if (row === n - 1) {
      return triangle[row][col];
    }

    // 이미 계산된 값이 있으면 반환
    if (memo[row][col] !== -1) {
      return memo[row][col];
    }

    // 두 경로 중 최댓값 선택
    const left = dfs(row + 1, col);
    const right = dfs(row + 1, col + 1);

    memo[row][col] = triangle[row][col] + Math.max(left, right);
    return memo[row][col];
  }

  return dfs(0, 0);
}
