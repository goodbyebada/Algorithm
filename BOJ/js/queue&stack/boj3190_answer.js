const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "./text.txt";
const inputs = fs.readFileSync(path).toString().trim().split("\n");
const n = Number(inputs[0]);
const k = Number(inputs[1]);
const apples = inputs.slice(2, 2 + k);
const infos = inputs.slice(3 + k).map((it) => it.split(" "));
// // 상 좌 하 우
// const dx = [-1, 0, 1, 0];
// const dy = [0, -1, 0, 1];

// 상 우 하 좌
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];

// 맵 생성
// const map = Array.from({ length: n }).map(() =>
//   Array.from({ length: n }).fill(-1)
// );

const map = [...new Array(n)].map(() => new Array(n).fill(-1));

// 맵 출력
const printMap = (...param) => {
  console.log(...param);
  for (let i = 0; i < n; i++) console.log(map[i].join(" "));
};

// 사과 생성
for (const apple of apples) {
  const [x, y] = apple.split(" ").map(Number);
  map[x - 1][y - 1] = 0;
}

// 뱀 시작 위치  설정
map[0][0] = 1;

let time = 0;
let d = 1;

// ?뭐야
let infoIdx = 0;
const q = [[0, 0]];

while (true) {
  const [x, y] = q.at(-1);
  //   현재 위치

  const nx = x + dx[d];
  const ny = y + dy[d];

  if (nx < 0 || ny < 0 || nx === n || ny === n) break;
  if (map[nx][ny] === 1) break;

  if (map[nx][ny] === 0) {
    map[nx][ny] = 1;
    q.push([nx, ny]);
  } else if (map[nx][ny] === -1) {
    const [px, py] = q.shift();
    map[px][py] = -1;
    map[nx][ny] = 1;
    q.push([nx, ny]);
  }

  time += 1;
  if (infoIdx < infos.length && Number(infos[infoIdx][0]) === time) {
    if (infos[infoIdx][1] === "D") d = (d + 1) % 4;
    if (infos[infoIdx][1] === "L") d = (d + 3) % 4;
    infoIdx += 1;
  }
}

console.log(time + 1);
