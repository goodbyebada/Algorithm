class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.heap.sort((a, b) => a.energy - b.energy); // 최소 에너지 기준 정렬
  }

  pop() {
    return this.heap.shift();
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function minimumEnergy(n, m, k, T, grid) {
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const isValid = (x, y) => x >= 0 && x < n && y >= 0 && y < m;

  const pq = new MinHeap();
  const visited = new Set();

  // 초기 상태 (x, y, energy, time)
  pq.push({ x: 0, y: 0, energy: 0, time: 0 });
  visited.add(`0,0,0`);

  while (!pq.isEmpty()) {
    const { x, y, energy, time } = pq.pop();

    // 도착 확인
    if (x === n - 1 && y === m - 1 && time <= T) {
      return energy;
    }

    // 시간 초과
    if (time > T) continue;

    // 에너지 충전
    if (energy < k) {
      const chargeState = `${x},${y},${Math.min(energy + 1, k)}`;
      if (!visited.has(chargeState)) {
        visited.add(chargeState);
        pq.push({ x, y, energy: Math.min(energy + 1, k), time: time + 1 });
      }
    }

    // 네 방향으로 이동
    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      if (isValid(nx, ny) && grid[nx][ny] !== 0) {
        const cost = grid[nx][ny] === 2 ? 1 : 0; // 하늘 이동 시 비용 1
        const newEnergy = energy - cost;
        const newState = `${nx},${ny},${newEnergy}`;

        if (newEnergy >= 0 && !visited.has(newState)) {
          visited.add(newState);
          pq.push({ x: nx, y: ny, energy: newEnergy, time: time + 1 });
        }
      }
    }
  }

  return -1; // 도달 불가능
}

// 테스트 케이스
const n = 6,
  m = 5,
  k = 13,
  T = 10;
const grid = [
  [2, 0, 2, 2, 2],
  [2, 1, 1, 1, 1],
  [2, 0, 0, 0, 2],
  [2, 0, 2, 2, 2],
  [2, 0, 2, 0, 2],
  [2, 2, 2, 0, 2],
];

// const input = require("fs").readFileSync("input.txt").toString().split("\n")

console.log(minimumEnergy(n, m, k, T, grid)); // 예상 출력: 0
