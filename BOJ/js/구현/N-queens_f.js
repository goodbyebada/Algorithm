var answer = 0;

/**
 *
 * 🍯 알게된 점
 *
 * 처음에 2중배열을 통해 접근했다. 재귀를 통해 다음 dfs(row+1) level로 넘겨줄때마다 이중 배열 board를 복사해야했다. -> O(n^2)
 * 1차원 배열 사용한다면 복사할때도 O(n)이고 각 배열의 값을 통해 불가능조건을 체크해주면 되기때문에 빠르다.
 * 또한, 2차원 배열로 불가능조건을 확인할때 O(n*4)  순회해야했다. for문 4개
 * 하지만 1차원 배열로 좌표값으로만 비교한다면 시간을 단축할 수 있다.
 *
 *
 * - 대각선 조건 확인은 기울기의 절댓값이 1이면 해당되기 때문에 Math.abs(x - row) === Math.abs(y - col)으로 해결하면 된다.
 */
function solution(n) {
  const queens = [];

  for (let col = 0; col < n; col++) {
    dfs(0, col, n, [...queens]);
  }

  return answer;
}

function dfs(row, col, n, tmpQueens) {
  tmpQueens.push([row, col]);

  if (row === n - 1) {
    answer++;
    return;
  }

  for (let curCol = 0; curCol < n; curCol++) {
    if (canVist(row + 1, curCol, tmpQueens)) {
      dfs(row + 1, curCol, n, [...tmpQueens]);
    }
  }
}

function canVist(row, col, tmpQueens) {
  for (let [x, y] of tmpQueens) {
    if (x === row || y === col) return false;
    if (Math.abs(x - row) === Math.abs(y - col)) return false;
  }

  return true;
}
