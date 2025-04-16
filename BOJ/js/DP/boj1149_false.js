const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 틀린코드
let T = +input.shift();
const list = input.map((ele) => ele.split(" ").map(Number));

// colorIndex 0: R 1: G 2:B
function nextColorIndex(list, nextIndex, currColorIndex) {
  const [idx1, idx2] = [0, 1, 2].filter((idx) => idx !== currColorIndex);

  //   같으면 그 다음 집, 그래도 같으면 그그 다음 집을 봐야함
  if (list[nextIndex][idx1] < list[nextIndex][idx2]) return idx1;
  return idx2;
}

function sol() {
  const answer = [];

  let sum = 0;

  let currColorIndex = startColorIndex;
  sum += list[0][currColorIndex];

  for (let i = 1; i < list.length; i++) {
    currColorIndex = nextColorIndex(list, i, currColorIndex);
    sum += list[i][currColorIndex];
  }
  answer.push(sum);

  console.log(Math.min(...answer));
}

sol();
