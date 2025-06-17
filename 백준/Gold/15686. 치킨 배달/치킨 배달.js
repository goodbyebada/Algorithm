// 도시의 치킨 거리가 가장 작게 될 지 구해라
// M개를 고르고, 치킨 거리가 가장 적게 된다.

// 치킨 거리:집과 가장 가까운 치킨집의 사이

// 각 집마다의 치킨 거리를 계산하고 => 완탐
// M개의 합 최솟값이어야한다.

// => 이렇게 생각한 이유는?
//  어떤 치킨 집이 사라지냐에 따라 각 집의 치킨 거리가 변경된다.
// 때문에 모든 치킨 집과의 거리가 있어야한다.

// 1. 치킨집의 위치, 각 집의 위치를 찾는다.
// 집 (인덱스 - 위치)
// 치킨 집 (인덱스 - 위치)

// 2. 치킨 집 * 각 집 거리를 계산한다.
// 3. 0번 부터 ~ 치킨집까지 M개를 선택해 모든 경우를 구해본다.
// 행 (치킨 인덱스) 열(집)

// (전체 치킨)C(M개 치킨) * (N*M => 각 집마다 최소 치킨 거리 구하기)

// 1H 12M 틀렸습니다.

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

function findPos(map, N, shops, homes) {
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < N; col++) {
      if (map[row][col] === 1) {
        homes.push([row, col]);
      }

      if (map[row][col] === 2) {
        shops.push([row, col]);
      }
    }
  }
}

function calcDist(shops, homes) {
  const rowLen = shops.length;
  const colLen = homes.length;

  const dist = Array(rowLen)
    .fill(0)
    .map(() => Array(colLen).fill(Infinity));

  for (let shop = 0; shop < rowLen; shop++) {
    const [shopX, shopY] = shops[shop];
    for (let home = 0; home < colLen; home++) {
      const [homeX, homeY] = homes[home];
      dist[shop][home] = Math.abs(shopX - homeX) + Math.abs(shopY - homeY);
    }
  }

  return dist;
}

function findMinDist(dist, M) {
  // row M개씩 계산하며 최대값

  let MIN = Infinity;
  const count = dist.length;
  const homeCount = dist[0].length;
  const used = Array(count).fill(false);

  //   👹 왜 착각했지? 순서대로 M개일리가 없잖아
  //   백트래킹

  //dfs 해도 스택 오버플로우 안 될 것 같지만 스택으로 풀자
  //   조합을 구해야한다.
  function backTracking(depth, used, shops) {
    // 수행한다.
    if (depth === M) {
      let nowMin = 0;
      for (let home = 0; home < homeCount; home++) {
        nowMin += calcMyChickDist(dist, home, shops);
        if (nowMin > MIN) break;
      }
      //   console.log(shops);
      //   console.log(nowMin);

      if (nowMin < MIN) MIN = nowMin;
      return;
    }

    for (let i = 0; i < count; i++) {
      if (used[i]) continue;
      used[i] = true;
      //   shops.push(i);
      backTracking(depth + 1, [...used], [...shops, i]);
    }
  }

  backTracking(0, used, []);

  function combination() {
    // 1. stack에 1일때 , used 사용된 거 넣는다.
    // 2. 그 같은 used를 참고해 다음 index를 넣는다.
    // 3. 위를 반복한다.
    // 4, M과 스택의 길이가 같아질 때 최솟값 수행 로직을 수행한다.
    // 그 다음 pop한 뒤 used가 되지 않은 숫자를 넣는다.
    // used가 다 사용되
  }

  return MIN;
}

// 각 집마다 치킨 거리 구하기
function calcMyChickDist(dist, home, certainShops) {
  let MIN = Infinity;

  for (let shop of certainShops) {
    if (MIN < dist[shop][home]) continue;
    MIN = Math.min(MIN, dist[shop][home]);
  }

  return MIN;
}

function sol(input) {
  let index = 0;
  const [N, M] = input[index++].split(" ").map(Number);
  let map = [];

  for (let row = 0; row < N; row++) {
    map.push(input[index++].split(" ").map(Number));
  }

  const shops = [];
  const homes = [];

  findPos(map, N, shops, homes);
  const dist = calcDist(shops, homes);
  const MIN = findMinDist(dist, M);
  console.log(MIN);
}

sol(input);
