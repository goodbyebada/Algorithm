// 사촌

const path = process.platform === "linux" ? "/dev/stdins" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

makeSet(input[1].split(" ").map(Number));

// 집합 나누기
function makeSet(list) {
  const dividedSet = [list[0]];
  let set = [];

  for (let i = 1; i < list.length; i++) {
    const now = list[i];

    // 연속되지않음
    if (set.length !== 0 && now - set[set.length - 1] !== 1) {
      dividedSet.push(set);
      set = [];
    }

    set.push(now);
    if (i === list.length - 1) {
      dividedSet.push(set);
    }
  }

  console.log(dividedSet);

  return dividedSet;
}

// 트리만들기
function makeTree(dividedSet) {
  const tree = new Map();
  const parent = new Map();

  for (let i = 0; i < dividedSet.length; i++) {}
}
