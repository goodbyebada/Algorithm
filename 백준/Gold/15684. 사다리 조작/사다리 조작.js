const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

// 입력 파싱
const [n, m, h] = input[0].split(" ").map(Number); // n: 세로선 개수, m: 기존 가로선 개수, h: 가로선을 놓을 수 있는 위치 수

// 맵 초기화: [1][1] ~ [h][n] 사용
const map = Array.from({ length: h + 1 }, () => Array(n + 1).fill(0));

// 상수 정의
const EMPTY = 0,
  RIGHT = 1,
  LEFT = 2;

let finished = false;
let minCnt = -1;

// 입력된 가로선 정보 등록
for (let i = 1; i <= m; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  map[a][b] = RIGHT;
  map[a][b + 1] = LEFT;
}


function backtrack(y, x, addedCnt, finishCnt) {
  // 조건 만족한 해를 찾은 경우 더 이상 탐색하지 않음
  if (finished) return;

  // 가로선을 목표 개수만큼 추가했으면 검사
  if (addedCnt === finishCnt) {
    if (checkAllVLines()) {
      finished = true; // 성공 플래그
    }
    return;
  }

  // 가능한 위치에 가로선 추가 시도
  for (let i = y; i <= h; i++) {
    for (let j = i === y ? x : 1; j < n; j++) {
      // 가로선 두 칸이 비어 있어야 가로선 추가 가능
      if (map[i][j] === EMPTY && map[i][j + 1] === EMPTY) {
        // 가로선 추가
        map[i][j] = RIGHT;
        map[i][j + 1] = LEFT;

        // 다음 칸으로 백트래킹 (j + 2로 넘김: 인접 가로선 방지)
        backtrack(i, j + 2, addedCnt + 1, finishCnt);

        // 되돌리기 (백트래킹)
        map[i][j] = EMPTY;
        map[i][j + 1] = EMPTY;
      }
    }
  }
}

/**
 * 모든 세로선 검사
 * 각 세로선이 시작 위치와 같은 위치로 도착하는지 확인
 */
function checkAllVLines() {
  for (let vLineIdx = 1; vLineIdx <= n; vLineIdx++) {
    if (!checkVLine(vLineIdx)) return false;
  }
  return true;
}

/**
 * 특정 세로선 검사
 * 출발한 세로선에서 시작해 아래로 내려가며 좌우 이동을 시뮬레이션
 */
function checkVLine(start) {
  let x = start;
  for (let y = 1; y <= h; y++) {
    if (map[y][x] === RIGHT) x++;
    else if (map[y][x] === LEFT) x--;
  }
  return x === start; // 도착한 위치가 출발한 위치와 같아야 함
}

// N- queens 처럼 고정해놓고 시작 (1,1)
// 추가 가로선 수 0 ~ 3개까지 시도
for (let finishCnt = 0; finishCnt <= 3; finishCnt++) {
  backtrack(1, 1, 0, finishCnt); // 초기 위치부터 탐색 시작

  // ✨ 가장 작은 것부터 실행하니까 빨리 끝났다면 정답임
  if (finished) {
    minCnt = finishCnt; // 정답 갱신
    break;
  }
}

// 출력
console.log(minCnt);
