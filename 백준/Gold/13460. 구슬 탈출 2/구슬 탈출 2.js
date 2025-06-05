const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const map = input.slice(1);
const dirs = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

//  N, M (3 ≤ N, M ≤ 10)
let visited = Array.from({ length: N }, () =>
  Array.from({ length: M }, () =>
    Array.from({ length: N }, () => Array(M).fill(false))
  )
);

// 4개

// 1. 4방향 모두 방문한다.
// 2. 한 방향으로 이동할때 # 이나 O을 만나면 이동을 멈춘다. => bball이 들어가면 continue
// 3. 이동할때 이동 거리를 기록한다. 만약 rball bball 위치가 겹친다면, 더 많은 이동거리를 가진 공이 뒤로간다.
// 4, bfs 방문 rball, bball , (공이 움직인 횟수)
// 5. (공이 움직인 횟수)가 10 이하라면 실패

// 처음에 visited가 필요없다고 생각했다.
// 수가 적으니까 없어도 되지 않을까..? 어차피 "O" 빨리 만나는 놈이 최단 거리이니까

class Balls {
  constructor(rx, ry, bx, by) {
    this.rx = rx;
    this.ry = ry;
    this.bx = bx;
    this.by = by;
  }

  isSamePos(nrx, nry, nbx, nby) {
    return (
      nrx === this.rx && nry === this.ry && nbx === this.bx && nby === this.by
    );
  }
}

function getPos() {
  // R , B
  const pos = [0, 0, 0, 0];

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (map[row][col] === "R") {
        pos[0] = row;
        pos[1] = col;
      }
      if (map[row][col] === "B") {
        pos[2] = row;
        pos[3] = col;
      }
    }
  }

  return pos;
}

// 한 공이 움직일때
function move(x, y, dir) {
  let cx = x;
  let cy = y;
  let len = 0;

  while (map[cx + dir[0]][cy + dir[1]] !== "#" && map[cx][cy] !== "O") {
    cx += dir[0];
    cy += dir[1];
    len++;
  }

  return [cx, cy, len];
}

function BFS(pos) {
  const balls = new Balls(...pos);
  const q = [[balls, 0]];
  let index = 0;

  while (index < q.length) {
    const [balls, count] = q[index++];
    if (count >= 10) break;

    for (const dir of dirs) {
      // redball
      let [nrx, nry, redLen] = move(balls.rx, balls.ry, dir);

      // blueball
      let [nbx, nby, blueLen] = move(balls.bx, balls.by, dir);

      //   👹 빨간 공이 들어간 후에 파란공이 들어가도 실패
      if (map[nbx][nby] === "O") {
        //   파란공이 공에 들어갈때
        continue;
      }

      //   겹칠때
      if (nrx === nbx && nry === nby) {
        // redBall 움직이기
        if (redLen > blueLen) {
          nrx -= dir[0];
          nry -= dir[1];
        } else {
          // blueBall 움직이기
          nbx -= dir[0];
          nby -= dir[1];
        }
      }

      //   //   👹 틀렸었음
      //   let alreadyVisited = false;
      //   //  이미 방문했다면,  방문처리
      //   //   시간초과 의심..
      //   for (const [vBalls, vCnt] of visited) {
      //     if (count + 1 === vCnt && vBalls.isSamePos(nrx, nry, nbx, nby)) {
      //       alreadyVisited = true;
      //       break;
      //     }
      //   }
      //   if (alreadyVisited) continue;

      if (visited[nrx][nry][nbx][nby]) {
        continue;
      }

      if (map[nrx][nry] === "O") {
        return count + 1;
      }

      q.push([new Balls(nrx, nry, nbx, nby), count + 1]);
      //   visited.push([new Balls(nrx, nry, nbx, nby), count + 1]);
      visited[nrx][nry][nbx][nby] = 1;
    }
  }

  return -1;
}

function sol() {
  const pos = getPos();
  const answer = BFS(pos);
  console.log(answer);
}

sol();
