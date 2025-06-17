// 1H 22M

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
  let MIN = Infinity;
  const count = dist.length;
  const homeCount = dist[0].length;
  // const used = Array(count).fill(false);
  const stack = [];

  function backTracking(start, depth) {
    // 수행한다.
    if (depth === M) {
      let nowMin = 0;
      for (let home = 0; home < homeCount; home++) {
        nowMin += calcMyChickDist(dist, home, stack);
        if (nowMin > MIN) break;
      }

      if (nowMin < MIN) MIN = nowMin;
      return;
    }

    for (let i = start; i < count; i++) {
      stack.push(i);
      backTracking(i + 1, depth + 1);
      stack.pop();
    }
  }

  backTracking(0, 0);

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
  const shops = [];
  const homes = [];

  // 한번에 ✨ pos 찾기
  for (let row = 0; row < N; row++) {
    map.push(input[index++].split(" ").map(Number));
    map[row].forEach((value, col) => {
      if (value === 1) {
        homes.push([row, col]);
      }

      if (value === 2) {
        shops.push([row, col]);
      }
    });
  }

  // findPos(map, N, shops, homes);
  const dist = calcDist(shops, homes);
  const MIN = findMinDist(dist, M);
  console.log(MIN);
}

sol(input);
