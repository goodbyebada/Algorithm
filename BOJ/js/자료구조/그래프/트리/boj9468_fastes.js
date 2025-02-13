const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "input.txt")
  .toString()
  .trim()
  .split("\n");

let l = 0;
const answer = [];

/**
 * - 막힌 이유 찾기
 * 1. 루트 노드가 1부터 시작하지 않을때가 있어 index 매칭 어떻게 시킬지 몰랐음
 * 2. 집합을 순회하며 부모 노드 매칭을 어떻게 시켜야하는지 모르겠었음
 * 	배열 모음으로 접근해 [[1,2,3], [5,6,7]] = > 1의 자식 노드 5 6 7인데 어떻게 하는것인가
 * 트리 생성하는 곳에서 부터 막힘
 *
 * - 알게 된것
 * index를 통해 접근하면 편하다.
 *  - 일련의 연속된 번호가 아니다 == 부모가 다르다 == 부모 idx가 증가한다.
 *  - k(target) idx를 기억해 부모 idx에 접근한다
 *  - 사촌 == 조부가 같다 && 부모가 다르다.
 *
 * 좀 간단하게 정의하고 생각할 것
 */
while (true) {
  let [n, k] = input[l++].split(" ").map(Number);
  //   node의 개수, k

  if (n === 0 && k === 0) break;

  let target = 0;
  const arr = Array(n + 1).fill(0);
  const parent = Array(n + 1).fill(0);

  let idx = -1;
  parent[0] = -1;
  arr[0] = -1;

  //   set 만들기
  input[l++].split(" ").map((item, i) => {
    arr[i + 1] = +item;

    // target : k의 index
    if (arr[i + 1] === k) target = i + 1;

    // prev와 1차이가 나지 않는다면  부모가 달라지기 때문에  idx++한다.
    if (arr[i + 1] !== arr[i] + 1) idx++;
    parent[i + 1] = idx;
  });

  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (
      parent[i] !== parent[target] &&
      parent[parent[i]] === parent[parent[target]]
    ) {
      ans++;
    }
  }
  answer.push(ans);
}

console.log(answer.join("\n"));
