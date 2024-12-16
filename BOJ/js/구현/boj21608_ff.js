/**
 * 상어 초등학교
 * 골드 5
 * 1:46~
 *
 *
 * 1. 비어있는 칸 중에서 좋아하는 학생이 인접한 칸
 * 2. 인접한 칸 중 비어있는 칸이 가장 많은 칸
 * 3. 행의 번호가 가장 작은 칸 > 열의 번호가 가장 작은 칸
 *
 * 학생의 만족도를 구해라
 * - 학생과 인접한 칸에 앉은 좋아하는 학생의 수를 구해야한다
 *
 * 'N'
 * 1.좋아하는 학생의 위치를 찾는다. -> 좋아하는 학생이 좌표에 없다면  다음 단계로 pass
 * 2.상하좌우를 검사한다.
 * 3. set을 이용해 칸을 찾는다. (좌표를 저장한다.)
 *
 *
 * 여러개라면 각 칸들의 중 비어있는 칸이 가장 많은 칸을 찾는다.
 *
 * 그럼에도 많다면 행의 번호가 가장 작은애를, 열의 번호가 가장 작은애를
 */

/**
 * 절차가 장황하다 어디서부터 해야하는고ㅠㅠ
 *
 */

const debug = (map) => {
  for (let elems of map) {
    console.log(elems.join(" "));
  }
};

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

// set
const N = +input.shift();
const studentList = input.map((elem) => elem.split(" ").map(Number));
const map = [...new Array(N)].map(() => new Array(N).fill("X"));
const dx = [-1, 0, 1, 0];
const dy = [0, 1, 0, -1];
let satisfied = 0;

// 빈칸은 X

let sitLists = [];
for (let i = 1; i <= N * N; i++) {
  debug(map);
  const nowS = studentList[i - 1][0];
  const likesS = studentList[i - 1].splice(1);

  let sitLists = getCloserSits(likesS);

  let maxLists = getMaxCloseEmptySits(sitLists);

  console.log("maxLists", maxLists);
  let [cx, cy] = getMinRowColSits(maxLists);
  map[cx - 1][cy - 1] = nowS;
}

/**
 * 비어있는 칸 중에서 좋아하는 학생이 인접한 좌표 list return
 * TODO 좋아하는 학생이 겹쳐있는 로직이 없다 사람살려..
 * @param {*} nowS
 * @param {*} likesS
 * @returns
 */
function getCloserSits(likesS) {
  //시계방향
  let sitList = [];

  if (map.flat().every((elem) => elem === "X")) {
    return [];
  }

  for (let row = 1; row <= N; row++) {
    for (let col = 1; col <= N; col++) {
      if (likesS.includes(map[row - 1][col - 1])) {
        for (let i = 0; i < 4; i++) {
          let nx = row + dx[i];
          let ny = col + dy[i];

          if (nx > N || ny > N || nx <= 0 || ny <= 0) continue;
          if (map[nx - 1][ny - 1] !== "X") continue;
          sitList.push([nx, ny]);
        }
      }
    }
  }

  return sitList;
}

function getMaxCloseEmptySits(sitList) {
  if (sitList.length === 0) {
    // 좌표를 넣어햠
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        sitList.push([i, j]);
      }
    }
  }

  const maxObject = sitList.reduce((acc, curr, idx) => {
    const [x, y] = curr;
    acc[idx] = getMaxEmptyCountXY(x, y);
    return acc;
  }, {});

  const sortedEntries = Object.entries(maxObject).sort((a, b) => b[1] - a[1]);

  // 가장 큰 값을 추출
  const maxValue = sortedEntries[0][1];

  // 가장 큰 값을 가진 모든 키-값 쌍을 필터링
  const maxPairs = sortedEntries.filter(([key, value]) => value === maxValue);

  return maxPairs.map((elem) => sitList[+elem[0]]);
}

function getMinRowColSits(sitList) {
  sitList.sort((a, b) => {
    if (a[0] === b[0]) {
      return a[1] - b[1];
    } else {
      return a[0] - b[0];
    }
  });

  return sitList[0];
}

function getMaxEmptyCountXY(x, y) {
  let cnt = 0;
  for (let i = 0; i < 4; i++) {
    const nx = x + dx[i];
    const ny = y + dy[i];
    if (nx > N || ny > N || nx <= 0 || ny <= 0) continue;
    if (map[nx - 1][ny - 1] === "X") cnt++;
  }

  return cnt;
}
