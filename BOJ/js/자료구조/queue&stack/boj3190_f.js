/**
 *  1. 처음에는 문제 이해를 못했다. 사과가 없을때 꼬리를 치워야하는데 그냥 움직이면 되는 줄
 *  2. 현재 방문한 위치에도 1 표시를 해야하는데, board 아니라 que list로 디버깅하느라 틀렸다.
 */

// 초기값 -1
// 사과가 있다면 0
// 뱀이 있는 자리라면 1

function settingBoard(input, board) {
  const applePosList = input
    .slice(1, 1 + Number(input[0]))
    .map((elem) => elem.split(" "));

  for (let i of applePosList) {
    const [x, y] = i.map(Number);
    board[x - 1][y - 1] = 0;
  }
}

function changeDirection(curDir, char) {
  if (char === "L") {
    return (curDir + 3) % 4;
  }

  if (char === "D") {
    return (curDir + 1) % 4;
  }
}

//  이동한다.
//   사과가 있다면 좌표에 1을 대입한다, 앞으로도 계속 1이다.
//   없다면 그냥 0으로 간다.
//   좌표의 위치가 벗어나거나 || 1이라면  시간이 끝난다.
//   snakeDirectionChangeMap가 cnt를 가지고 있다면 방향을 바꾼다.

//   꼬리가 사과가 있다면 꼬리를 두고, 없다면 꼬리를 없앤다.
//   꼬리 좌표가 있는 두고 온, 큐를 만들어야한다.
//   사과가 없으면 큐 pop해 해당 좌표를 -1로 만든다.
function visit(board, snakeDirectionChangeMap, n) {
  const dy = [0, 1, 0, -1];
  const dx = [-1, 0, 1, 0];
  const tail = [];

  let cnt = 0;
  let dir = 1;

  let x = 0;
  let y = 0;
  tail.push([0, 0]);
  let tailPointer = 0;

  while (1) {
    cnt++;

    // 방문할 곳
    x += dx[dir];
    y += dy[dir];

    if (x < 0 || x >= n || y < 0 || y >= n) {
      break;
    }

    // 본인의 몸일때
    if (board[x][y] === 1) {
      break;
    }

    // 사과가 있을 경우
    if (board[x][y] === 0) {
      board[x][y] = 1;
      tail.push([x, y]);
    }

    // 사과가 없을 경우
    if (board[x][y] === -1) {
      const [px, py] = tail.shift();
      board[px][py] = -1;
      board[x][y] = 1;
      tail.push([x, y]);
      // 현재 위치 초기화 까먹었다.
    }

    if (snakeDirectionChangeMap.has(cnt)) {
      const char = snakeDirectionChangeMap.get(cnt);
      dir = changeDirection(dir, char);
    }
  }

  return cnt;
}

function main() {
  const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
    .toString()
    .trim()
    .split("\n");

  const n = +input.shift();
  const board = [...new Array(n)].map(() => new Array(n).fill(-1));

  settingBoard(input, board);

  //   cnt와 초가 같을때를 위해 map으로 사용했다.
  const snakeDirectionChangeMap = input
    .slice(2 + Number(input[0]))
    .map((elem) => elem.split(" "))
    .reduce((map, curr) => {
      const [key, val] = curr;
      map.set(+key, val);
      return map;
    }, new Map());

  console.log(visit(board, snakeDirectionChangeMap, n));
}
main();
