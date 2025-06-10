const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const DIRTY = 1;
const CLEAN = 0;
const OBSTACLE = -1;

const directions = [
  [0, 1], // right
  [0, -1], // left
  [1, 0], // down
  [-1, 0], // up
];

function bfs(startY, startX, board, height, width) {
  const visited = Array.from({ length: height }, () =>
    Array(width).fill(Infinity)
  );
  const queue = [[startY, startX]];
  visited[startY][startX] = 0;

  while (queue.length) {
    const [y, x] = queue.shift();
    const cost = visited[y][x] + 1;

    for (const [dy, dx] of directions) {
      const [ny, nx] = [y + dy, x + dx];
      if (ny < 0 || nx < 0 || ny >= height || nx >= width) continue;

      // visited[ny][nx] <= cost -> 이미 방문한 좌표이다.
      if (board[ny][nx] === "x" || visited[ny][nx] <= cost) continue;

      visited[ny][nx] = cost;
      queue.push([ny, nx]);
    }
  }

  return visited;
}

// 메모리 초과!!!
// (10*8) * 10!
function getPermutations(arr) {
  const result = [];
  const used = Array(arr.length).fill(false);

  function backtrack(path) {
    // arr에 있는 원소들을 다 넣었을때 탈출합니다
    if (path.length === arr.length) {
      // 새로운 배열을 넣어줘야한다. 그냥 넣으면 path 주소값을 따라가서 다 똑같은 result를 갖는다.
      result.push([...path]);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      path.push(arr[i]);
      backtrack(path);
      path.pop();
      used[i] = false;
    }
  }

  backtrack([]);
  return result;
}

function stackBasedDFS(startToTrash, trashToTrash, numTrash) {
  let minDist = Infinity;

  const stack = [];

  // 초기 상태: depth, currentIdx, totalDist, used
  stack.push({
    depth: 0,
    currentIdx: -1,
    totalDist: 0,
    used: Array(numTrash).fill(false),
  });

  while (stack.length) {
    const { depth, currentIdx, totalDist, used } = stack.pop();

    // 현재 거리로는 이미 최소거리보다 큼 => 가지치기
    if (totalDist >= minDist) continue;

    // 모든 더러운 지점을 방문한 경우
    if (depth === numTrash) {
      minDist = Math.min(minDist, totalDist);
      continue;
    }

    for (let next = 0; next < numTrash; next++) {
      if (used[next]) continue;

      const dist =
        currentIdx === -1 ? startToTrash[next] : trashToTrash[currentIdx][next];

      if (dist === Infinity) continue;

      // 새로 복사해야함, 그렇지 않으면 주소를 참조하기 때문에 모든 used가 같은 값을 바라보고 있게 됨
      const newUsed = [...used];
      newUsed[next] = true;

      stack.push({
        depth: depth + 1,
        currentIdx: next,
        totalDist: totalDist + dist,
        used: newUsed,
      });
    }
  }

  return minDist === Infinity ? -1 : minDist;
}

/**
 *최단 거리 찾기
 */
function findMinPath(startY, startX, dirtyPoints, board, height, width) {
  const numTrash = dirtyPoints.length; //더러운 곳들 개수

  const startToTrash = Array(numTrash); //로봇 청소기 - 더러운 곳
  const trashToTrash = Array.from({ length: numTrash }, () =>
    Array(numTrash).fill(Infinity)
  );
  // 더러운 곳끼리의 거리

  const startVisited = bfs(startY, startX, board, height, width);

  // 1.청소기 -  각각의 더러운 곳까지의 최단 거리
  for (let i = 0; i < numTrash; i++) {
    // 더러운 곳 좌표
    const [y, x] = dirtyPoints[i];

    // 청소기 - 각각의 더러운 곳까지의 거리
    startToTrash[i] = startVisited[y][x];
  }

  // 2.(더러운 곳 - 더러운 곳) N:N
  for (let i = 0; i < numTrash; i++) {
    const [y, x] = dirtyPoints[i];

    // 더러운 곳 하나 고정, 다른 더러운 곳까지의 최단 거리 구하기
    const visited = bfs(y, x, board, height, width);

    for (let j = 0; j < numTrash; j++) {
      // 자기 자신일때는 제외
      if (i !== j) {
        const [dy, dx] = dirtyPoints[j];
        trashToTrash[i][j] = visited[dy][dx];
      }
    }
  }

  // // 순열을 통해서 가장 짧은 최단거리를 구해야함
  // let minDist = Infinity;

  // const used = Array(arr.length).fill(false);

  // for (const order of getPermutations([...Array(numTrash).keys()])) {
  //   let dist = startToTrash[order[0]];

  //   // 📌 벽으로 둘러쌓여있어서 접근 불가능한 케이스 있음
  //   if (dist === Infinity) continue;

  //   for (let i = 0; i < order.length - 1; i++) {
  //     const d = trashToTrash[order[i]][order[i + 1]];

  //     // 📌 벽으로 둘러쌓여있어서 접근 불가능한 케이스 있음
  //     if (d === Infinity) {
  //       dist = Infinity;
  //       break;
  //     }
  //     dist += d;
  //   }

  //   // 최단거리 갱신 중
  //   minDist = Math.min(minDist, dist);
  // }

  return stackBasedDFS(startToTrash, trashToTrash, numTrash);
}

function solve(input) {
  let index = 0;
  while (index < input.length) {
    const [w, h] = input[index++].split(" ").map(Number);
    if (w === 0 && h === 0) break;

    const board = input.slice(index, index + h);

    index += h;

    const dirtyPoints = [];
    let startY = -1,
      startX = -1;

    // h*w로 훑어서 청소기, 벽, 더러운 곳 찾는다.
    for (let i = 0; i < h; i++) {
      for (let j = 0; j < w; j++) {
        // 더러운 곳 찾기
        if (board[i][j] === "*") {
          dirtyPoints.push([i, j]);
        }

        // 청소기가 있는 지점부터 BFS 시작하기 위해 시작 지점을 찾는다.
        if (board[i][j] === "o") {
          startY = i;
          startX = j;
        }
      }
    }

    console.log(findMinPath(startY, startX, dirtyPoints, board, h, w));
  }
}

solve(input);
