const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const i = require("fs").readFileSync(path).toString().trim();

function BFS(map, visited, targetX, targetY) {
  //     시계방향
  const d = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  let index = 0;

  const queue = [[0, 0, 0]];

  visited[0][0][0] = 0;
  visited[0][0][1] = 0;

  while (queue.length > index) {
    let [x, y, crushed] = queue[index++];

    // 🚨 마지막 큐에 담긴 게 방문지점인지 확인해야함
    if (x === targetX - 1 && y === targetY - 1)
      return visited[x][y][crushed] + 1;

    for (let i = 0; i < 4; i++) {
      const nx = x + d[i][0];
      const ny = y + d[i][1];

      //             범위에서 벗어난 경우
      if (nx < 0 || ny < 0 || nx >= targetX || ny >= targetY) continue;

      //             이미 방문했다.
      if (visited[nx][ny][crushed] >= 0) continue;

      //             벽이고 부술 수 없기 때문에 못 방문한다.
      if (map[nx][ny] === 1 && crushed) continue;

      //             벽이고 부수지 않았다면 부순 후 방문한다.
      if (map[nx][ny] === 1 && crushed === 0) {
        //                 부순다!
        visited[nx][ny][1] = visited[x][y][crushed] + 1;
        queue.push([nx, ny, 1]);
        continue;
      }

      visited[nx][ny][crushed] = visited[x][y][crushed] + 1;
      queue.push([nx, ny, crushed]);
    }
  }

  return -1;
}

function solution(i) {
  var answer = 0;
  const input = i.split("\n");

  //   N 행
  // M 열
  const [N, M] = input[0].split(" ").map(Number);

  const map = [];

  //   N*M 배열
  const visited = Array(N)
    .fill(0)
    .map(() => Array(M).fill(0));

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      visited[row][col] = Array(2).fill(-1);
    }
  }

  for (let idx = 1; idx <= N; idx++) {
    // M개의 열을
    map.push(input[idx].split("").map(Number));
  }

  //   (4,6)
  // (M,N)

  //   (3,5)
  answer = BFS(map, visited, N, M);
  console.log(answer);
}

solution(i);
