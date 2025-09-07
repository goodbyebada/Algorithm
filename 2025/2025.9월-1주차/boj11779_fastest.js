const filePath = {
  forTest: `${__dirname}/example.txt`,
  forSubmit: "/dev/stdin",
};

const inputs = require("fs")
  .readFileSync(filePath.forSubmit)
  .toString()
  .split("\n");

const n = +inputs[0];
const m = +inputs[1];

// index 0은 사용하지 않음.
// (N+1)*(N+1)
const graph = [...new Array(n + 1)].map(() => new Array(n + 1).fill(Infinity));

for (let i = 2; i < m + 2; i++) {
  const [start, end, distance] = inputs[i].split(" ").map((input) => +input);

  graph[start][end] = Math.min(graph[start][end], distance);
}

const [startCity, endCity] = inputs[m + 2].split(" ").map((v) => +v);

// 같을 때 미리 분기처리 => 시간 단축
if (startCity === endCity) {
  console.log(0);
  console.log(1);
  console.log(startCity);
  return;
}

const heap = [];

// 최소 힙
const heapPush = (node) => {
  heap.push(node);

  let index = heap.length - 1;

  let parentIndex = Math.floor((index - 1) / 2);

  while (parentIndex >= 0) {
    const parentNode = heap[parentIndex];
    const currentNode = heap[index];

    if (parentNode.cost <= currentNode.cost) break;

    // swap
    heap[parentIndex] = currentNode;
    heap[index] = parentNode;

    index = parentIndex;
    parentIndex = Math.floor((index - 1) / 2);
  }
};

const heapPop = () => {
  const result = heap[0];
  const lastNode = heap.pop();

  if (heap.length === 0) return result;

  heap[0] = lastNode;

  let index = 0;
  let leftChildIndex = index * 2 + 1;
  let rightChildIndex = index * 2 + 2;
  // 자식 노드가 없을 때까지
  while (leftChildIndex <= heap.length - 1) {
    const currentNode = heap[index];
    const rightChildNode = heap[rightChildIndex];
    const leftChildNode = heap[leftChildIndex];

    if (!leftChildNode && !rightChildNode) break;

    if (!rightChildNode && currentNode.cost <= leftChildNode.cost) break;

    if (
      currentNode.cost <= leftChildNode.cost &&
      currentNode.cost <= rightChildNode.cost
    )
      break;

    // 둘 중 작은 것과 swap
    const minIndex =
      (rightChildNode?.cost ?? Infinity) > leftChildNode.cost
        ? leftChildIndex
        : rightChildIndex;
    const minNode = heap[minIndex];

    heap[index] = minNode;
    heap[minIndex] = currentNode;

    index = minIndex;
    leftChildIndex = index * 2 + 1;
    rightChildIndex = index * 2 + 2;
  }

  return result;
};

const distances = new Array(n + 1).fill(Infinity);
distances[startCity] = 0;
const path = new Array(n + 1).fill(null);

// 노드와 노드에 연결된 distance를 heap에 넣음
heapPush({
  cost: 0,
  vertex: startCity,
});

while (heap.length > 0) {
  // vertex  -> nowVertex 변수에 할당
  const { cost, vertex: nowVertex } = heapPop();

  if (distances[nowVertex] < cost) {
    continue;
  }

  // 인접 노드 방문
  for (let nextVertex = 1; nextVertex <= n; nextVertex++) {
    const distance = graph[nowVertex][nextVertex];

    if (distances[nextVertex] > distances[nowVertex] + distance) {
      distances[nextVertex] = distances[nowVertex] + distance;

      // 최솟값 갱신될때마다 , 바로 이전 노드를 기록한다. 🔑 경로 추적 위해
      path[nextVertex] = nowVertex;

      heapPush({
        vertex: nextVertex,
        cost: distances[nextVertex],
      });
    }
  }
}

/**
 * endCity -> startCity까지 역추적 후 reverse 한다. 🔑
 */
const answerPath = (() => {
  const result = [];
  let currentVertex = endCity;
  while (true) {
    result.push(currentVertex);

    // path[currentVertex] null이라면  start경로 => break
    if (!path[currentVertex]) break;

    currentVertex = path[currentVertex];
  }

  return result.reverse();
})();

console.log(distances[endCity]);
console.log(answerPath.length);
console.log(answerPath.join(" "));
