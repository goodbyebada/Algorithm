// 깨끗한 칸과 더러운 칸 방문
// 장애물 가구가 있다.
// 같은 칸 중복 방문이 가능하다.
// 방의 정보가 주어졌을때, 더러운 칸 => 모두 깨끗한 칸 필요한 최소 이동횟수

// 더러운 칸 <= 10

// 최소 이동 횟수 -> bfs
// 그리디? BFS?

// 더러운 칸을 모두 깨끗한 칸으로 만드는데 필요한 이동 횟수의 최솟값을 구하시오.
// 가로 크기 w 세로 크기 h

// 방문할 수 없는 더러운 칸이 존재하는 경우 -1 출력

// 0. w h 20*20
// 감도 안 잡힌다.
// 골드1 로봇 청소기

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

// 상 우 하 좌
const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// 로봇 청소기, 더러운 곳
function findPos(board, w, h) {
  const visited = Array.from({ length: h }, () => Array(w).fill(0));
  const q = [[0, 0]];
  let index = 0;
  const dirtySpot = [];
  const robot = [];

  while (index < q.length) {
    const [row, col] = q[index++];

    for (let dir of dirs) {
      const movedR = row + dir[0];
      const movedC = col + dir[1];

      if (
        movedR < 0 ||
        movedC < 0 ||
        movedC >= w ||
        movedR >= h ||
        board[movedR][movedC] === "x" ||
        visited[movedR][movedC] === 1
      ) {
        continue;
      }

      if (board[movedR][movedC] === "*") dirtySpot.push([movedR, movedC]);
      if (board[movedR][movedC] === "o") robot.push([movedR, movedC]);

      visited[movedR][movedC] = 1;

      // 다음 방문
      q.push([movedR, movedC]);
    }
  }

  return { robot, dirtySpot };
}

function getLength(x1, y1, x2, y2) {
  const xDist = Math.abs(x1 - x2);
  const yDist = Math.abs(y1 - y2);

  return xDist + yDist;
}

// 모든 거리 갱신
// 여러번 순열 계산을 위해
// 각각 계산
function everyDistCalc(robot, dirtySpot) {
  // W * H 배열을
  // 인덱스를 붙여서 만드는 것이...
  // 0번은 robot
  // 1부터 ~ 만들기

  const pos = [];
  pos.push(robot[0]);
  for (let i = 0; i < dirtySpot.length; i++) {
    pos.push(dirtySpot[i]);
  }

  const N = pos.length;
  const dist = Array.from({ length: N }, () => Array(N).fill(0));

  // row 가 pos 자신 인덱스
  // col pos 상대 인덱스
  for (let row = 0; row < N; row++) {
    const [x1, y1] = pos[row];
    for (let col = 0; col < N; col++) {
      const [x2, y2] = pos[col];
      const len = getLength(x1, y1, x2, y2);
      dist[row][col] = len;
    }
  }

  return dist;
}

// 순열 n!을 통한 최소거리 찾기
function permutation() {}

function sol(input) {
  let index = 0;

  let board = [];

  let [w, h] = input[index].split(" ").map(Number);

  while (!(w === 0 && h === 0)) {
    // index
    // 현재 좌표 + 길이 -1

    // index + h-1
    // 1회일 때
    //1 5
    board = input.slice(index + 1, index + h + 1).map((elem) => elem.split(""));

    index = index + h + 1;

    console.log(findPos(board, w, h));
    everyDistCalc();
    permutation();

    [w, h] = input[index].split(" ").map(Number);
  }
}

sol(input);
