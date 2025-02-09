/**
 * 봄버맨
 * 5:19~
 *
 * 폭탄
 * 3초후 폭발, 시계방향 모두 파괴
 *
 *
 *
 * 설치 후  3초 후 전에 설치한 폭탄 폭발
 * 설치 후  2초 후 전부 설치
 * 이전에 설치한  폭탄의 위치를 알아야함
 * bomb map => [][] 설치 시간을 넣는다. 3의 배수일때 n-2인 값을 가진 좌표를 확인한다.
 *
 * 1. 초기화를 한다.
 * 2. N이 될때 멈춘다.
 * 3. time이 2의 배수라면 전체 설치를 한다. bomb에 현재 시간을 넣는다.
 * 4. time이 3초의 배수라면 n-2인 값을 가진 좌표를 확인한다.
 * 5. 시계방향으로 검사해 폭발한 좌표는 -1로 초기화한다.
 * 6. time++을 한다.
 *
 *
 *
 * 출력시
 * 전부 -1로 초기화
 * -1이라면 . 출력
 * -1 이 아니라면 0 출력
 * 시계방향 검사해 -1로 초기화
 *
 */

// R개의줄
// C colum
// N초가 지난 후 격자판 상태 출력
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [R, C, N] = input[0].split(" ").map(Number);

const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

// 전체 설치
function setAllBombs(bombs, time) {
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (bombs[i][j] === -1) bombs[i][j] = time;
    }
  }
}

// 폭발 시키
function bombTheBombs(bombs, time) {
  const bombXY = [];
  const bombTime = time - 3;

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      // 폭발
      if (bombs[i][j] === bombTime) {
        bombXY.push([i, j]);
      }
    }
  }

  //   shift 200개 1번 shift시 n번 이동 n*n
  let idx = 0;
  while (idx < bombXY.length) {
    const [currX, currY] = bombXY[idx];
    idx++;
    bombs[currX][currY] = -1;

    for (let d = 0; d < 4; d++) {
      const cx = currX + dx[d];
      const cy = currY + dy[d];
      if (cx < 0 || cy < 0 || cx >= R || cy >= C) continue;
      if (bombs[cx][cy] === -1) continue;
      bombs[cx][cy] = -1;
      //   폭발
    }
  }
}

function outPut(bombs) {
  const outputArr = Array.from({ length: R }, () => new Array(C).fill(-1));

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (bombs[i][j] === -1) {
        outputArr[i][j] = ".";
      } else {
        outputArr[i][j] = "O";
      }
    }
  }

  const answer = outputArr.map((elem) => elem.join("")).join("\n");
  console.log(answer);
}

function main() {
  // 설치된 시간
  let bombs = Array.from({ length: R }, () => new Array(C).fill(-1));
  //   time 초 후
  let time = 0;

  // 초기화
  for (let i = 1; i <= R; i++) {
    const rowStr = input[i].split("");
    for (let j = 0; j < C; j++) {
      const str = rowStr[j];
      if (str === ".") continue;
      bombs[i - 1][j] = time;
    }
  }
  time++;
  if (time >= N) {
    outPut(bombs);
    return;
  }

  time++;
  setAllBombs(bombs, time);

  if (time >= N) {
    outPut(bombs);
    return;
  }

  time++;
  bombTheBombs(bombs, time);

  if (time >= N) {
    outPut(bombs);
    return;
  }

  time++;

  while (1) {
    if (time % 2 === 0) {
      setAllBombs(bombs, time);
    }

    // 1초가 지난 후에 설치된 폭탄 폭발
    if (time % 2 !== 0) {
      bombTheBombs(bombs, time);
    }

    if (time === N) break;

    time++;
  }

  outPut(bombs);
}

main();
