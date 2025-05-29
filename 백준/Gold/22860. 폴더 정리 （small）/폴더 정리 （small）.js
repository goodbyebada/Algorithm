// https://www.acmicpc.net/problem/22860
// 폴더 정리;

// 📌 폴더의 이름이 중복이 되지 않기 때문에 key로 접근할 수 있다.
// 총 파일의 개수가 M, 즉 재귀는 N(10^3)이라 재귀로 해도 괜찮다.

/**
 * 1. [root] = [[curr, 0]] => 그래프를 만들어준다.
 * 2. 쿼리문에 대해서 targetFolder를 찾는다.
 * 3. targetFolder를 찾으면 파일의 종류와 개수로 센다 => set과 count를 이용한다.
 * 4. 만약 폴더가 존재한다면 해당 폴더에 대해 한 번 더 재귀를 수행한다. 단 set과 count는 파라미터로 가져간다
 * 5. [] -> 더 이상 폴더가 없을때까지 수행한다.
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

// stack으로 도전하겠다.

// 1. tree[targetFolder] => []
// flag가 1인 원소가 있다면 한번 더 depth가 깊어져야한다.
// 만약 1인 원소 배열이 없다면 끝난다.

function findTarget(tree, targetFolder, set) {
  let count = 0;
  const stack = [targetFolder];

  // 폴더가 있다면 dfs
  while (stack.length !== 0) {
    const foderName = stack.pop();

    //🚨 folder에 아무것도 없을 때 입력으로 주어지지 않기에 tree에 없다는 점을 간과해 틀렸다.
    if (!tree[foderName]) continue;

    for (const [name, isFolder] of tree[foderName]) {
      if (isFolder) {
        stack.push(name);
        continue;
      }
      set.add(name);
      count++;
    }
  }

  return [set.size, count];
}

// flag 1이면 폴더
// 0이면 파일
function sol(input) {
  // 그래프 만들기
  let answer = [];
  const tree = {};
  const [N, M] = input[0].split(" ").map(Number);

  // 트리 초기화
  for (let i = 1; i < N + M + 1; i++) {
    const [root, sub, flag] = input[i].split(" ");

    // [] => true
    if (tree[root]) {
      tree[root].push([sub, +flag]);
    } else {
      // 🚨 없다면 배열을 만들고 정보를 push 해야한다.
      tree[root] = [];
      tree[root].push([sub, +flag]);
    }
  }

  const Q = +input[N + M + 1];
  for (let i = N + M + 2; i <= N + M + Q + 1; i++) {
    const targetFolder = input[i].split("/").at(-1);
    let set = new Set();
    answer = findTarget(tree, targetFolder, set);
    console.log(answer.join(" "));
  }
}

sol(input);
