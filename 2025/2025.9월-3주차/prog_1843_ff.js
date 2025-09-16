function solution(arr) {
  // 중복되는 값을 막기 위해 bottomUp -> 가져다 쓸거임

  // [i][j] : i부터 j까지의 값의 최댓값을 구해서 갱신

  const N = arr.length;

  // 피연산자만 남겨둔다.

  // 항상 홀수 => 연산자 (N-1)/2 개수

  // 피연산자 : N- (N-1)/2

  const count = N - (N - 1) / 2;

  const max = Array(count)
    .fill(0)
    .map(() => Array(count).fill(-Infinity));

  const min = Array(count)
    .fill(0)
    .map(() => Array(count).fill(Infinity));

  // + 길이가 0인 애들 초기화

  for (let i = 0; i < count; i++) {
    max[i][i] = +arr[2 * i];
    min[i][i] = +arr[2 * i];
  }

  // 길이가 1부터 ~ N-1(전체)까지 진행한다.
  for (let d = 1; d < count; d++) {
    for (let i = 0; i < count - d; i++) {
      let j = i + d; //i에서 d만큼의 길이

      // 연산자는 항상 홀수
      // i~ j 사이의 연산자를 순회한다.
      for (let k = i; k < j; k++) {
        // +라면
        if (arr[2 * k + 1] === "+") {
          max[i][j] = Math.max(max[i][j], max[i][k] + max[k + 1][j]);
          min[i][j] = Math.min(min[i][j], min[i][k] + min[k + 1][j]);
        } else {
          // -라면

          max[i][j] = Math.max(max[i][j], max[i][k] - min[k + 1][j]);
          min[i][j] = Math.min(min[i][j], min[i][k] - max[k + 1][j]);
        }
      }
    }
  }

  // 최대
  //     i, j의 의미를 잊지말고 생각좀하자 ~!
  //     전체 : [0, N-1]
  return max[0][count - 1];
}

// =========================================== 이전 시도
// 결합 법칙에 따라 값이 달라진다.
// 서로 다른 연산 순서의 계산 결과 중 최댓값
// 전부 계산 -> DP+완전탐색

// 1. 연산자 기준으로 계산 -> 순회
// 2. DP[i]에 저장
// 3. DFS + 2 -2 통해 다음 연산자 계산
// 4. DP[i+2] = (현재 연산) + (연산자) +   DP[i] 범위 체크 조심
//    DP[i-2] = (현재 연산) + (연산자) +   DP[i]
// 🫠 이름만 DP임 -> 메모제이션을 하고 싶었는데 흠..

// 그냥 -> dp[i] 변수로 넘기면 되니까 ..? 최종 값만 넣으면 될듯..?
// 첫 시도 틀림!!
// stackOverflow;
function dfs(i, dp, arr) {
  //     연산자 인덱스  => 앞 뒤 무조건 숫자 있음
  //      1. 계산

  dp[i] = arr[i] === "-" ? dp[i - 1] - dp[i + 1] : dp[i - 1] + dp[i + 1];

  // 🚨 stackOverflow 이유
  //     dfs(3) → dfs(1) 호출
  //     dfs(1) → dfs(3) 다시 호출 가능 중복되네...
  //     왼
  if (i - 2 >= 0) dfs(i - 2, dp, arr);
  //     오
  if (i + 2 < arr.length - 1) dfs(i + 2, dp, arr);

  return;
}

// DFS sol
// 내가 하고 싶었던 풀이..with gpt
//  시간초과 📌
function dfsSolution(arr) {
  // 문자열 배열을 숫자/연산자 구분해서 관리
  // ex) ["1", "-", "3", "+", "5", "-", "8"]

  function dfs(tokens) {
    // 숫자만 하나 남으면 종료
    if (tokens.length === 1) {
      return [Number(tokens[0])];
    }

    let results = [];

    // 매 연산자마다 계산
    for (let i = 1; i < tokens.length; i += 2) {
      const op = tokens[i];
      const left = Number(tokens[i - 1]);
      const right = Number(tokens[i + 1]);

      let calc = 0;
      if (op === "+") calc = left + right;
      else calc = left - right;

      // 새 토큰 배열 생성
      const nextTokens = [
        ...tokens.slice(0, i - 1),
        String(calc),
        ...tokens.slice(i + 2),
      ];

      const r = dfs(nextTokens);

      // 재귀

      // i번째 연산자의 결과 값
      results.push(...r);
    }

    return results;
  }

  const allResults = dfs(arr);
  return Math.max(...allResults);
}
