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