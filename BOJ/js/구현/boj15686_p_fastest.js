let input = require("fs")
  .readFileSync("/dev/stdin")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const [N, M] = input[idx++].split(" ").map(Number);
const chickenHouse = [];
const map = [];
const house = [];

// map 작성함과 동시에 치킨 집, 집 위치를 구하기 🌟
for (let i = 0; i < N; i++) {
  map.push(input[idx++].split(" ").map(Number));
  map[i].forEach((v, j) => {
    if (v === 2) chickenHouse.push([i + 1, j + 1]);
    if (v === 1) house.push([i + 1, j + 1]);
  });
}

// stack
const store = [];
let min = Infinity;

// stack으로 푼 백트래킹
const bt = (depth = 0, start = 0) => {
  if (store.length === M) {
    let sum = 0;

    // 모든 집을 순회
    for (let j = 0; j < house.length; j++) {
      let minChicken = Infinity;

      // 한 집의 치킨 거리 구하기
      for (let i = 0; i < store.length; i++) {
        // store => 치킨집의  pos
        // house => 집의 pos

        const dist =
          Math.abs(store[i][0] - house[j][0]) +
          Math.abs(store[i][1] - house[j][1]);

        minChicken = Math.min(dist, minChicken);
      }

      sum += minChicken;
    }

    // 치킨 거리의 합 중 최소값 갱신
    min = Math.min(min, sum);
    return;
  }

  // 📌 stack을 이용한 조합
  for (let i = start; i < chickenHouse.length; i++) {
    store.push(chickenHouse[i]); // 1. 스택에 추가
    bt(depth + 1, i + 1); // 2. 다음 인덱스부터 재귀
    store.pop(); // 3. 돌아와서 복구
  }
};

bt();
console.log(min);
