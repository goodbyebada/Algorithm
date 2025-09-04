
class Node {
  constructor(node, cost) {
    this.node = node;
    this.cost = cost;
  }
}
class MinHeap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
  }
  top() {
    return this.heap[0];
  }
  empty() {
    if (this.heap.length == 0) return true;
    else return false;
  }
  push(value, cost) {
    let node = new Node(value, cost);
    this.heap.push(node);
    let curIdx = this.heap.length - 1;
    let curItem = this.heap[curIdx];

    while (curIdx > 0) {
      let parentIdx = Math.floor((curIdx - 1) / 2);
      let parentItem = this.heap[parentIdx];

      if (this.compare(parentItem.cost, curItem.cost)) break;

      this.heap[curIdx] = this.heap[parentIdx];
      curIdx = parentIdx;
    }
    this.heap[curIdx] = curItem;
  }
  pop() {
    let lastIdx = this.heap.length - 1;
    this.heap[0] = this.heap[lastIdx];
    this.heap.pop();
    if (this.heap.length > 0) {
      let curIdx = 0;
      let curItem = this.heap[curIdx];

      while (curIdx < this.heap.length) {
        let leftIdx = curIdx * 2 + 1;
        let rightIdx = curIdx * 2 + 2;

        if (leftIdx >= this.heap.length) break;

        let leftItem = this.heap[leftIdx];
        let rightItem = rightIdx < this.heap.length
          ? this.heap[rightIdx]
          : null;

        let nextIdx = rightItem !== null && this.compare(rightItem.cost, leftItem.cost)
          ? rightIdx
          : leftIdx;
        let nextItem = this.heap[nextIdx];

        if (this.compare(curItem.cost, nextItem.cost)) break;

        this.heap[curIdx] = nextItem;
        curIdx = nextIdx;
      }
      this.heap[curIdx] = curItem;
    }
  }
}
function main() {
  const input = require('fs').readFileSync('/dev/stdin').toString().trim().split('\n');
  const [N, E] = input[0].trim().split(' ').map(Number);
  const [v1, v2] = input[E + 1].trim().split(' ').map(Number);
  let graph = new Array(801).fill(null).map(_ => new Array(801).fill(Infinity));
  for (let i = 1; i <= E; i++) { // 길은 양방향으로 존재한다. 2*10^5.
    const [start, end, cost] = input[i].trim().split(' ').map(Number);
    if (cost < graph[start][end]) {
      graph[start][end] = cost;
    }
    if (cost < graph[end][start]) {
      graph[end][start] = cost;
    }
  }
  return console.log(sol(N, E, graph, v1, v2));
}
function sol(N, E, graph, v1, v2) {
  let dist0 = dijkstra(N, 1, graph);  // O(Nlog_2(N)). 9*800 == 7200;
  let dist1 = dijkstra(N, v1, graph);
  let dist2 = dijkstra(N, v2, graph);

  const d1 = dist0[v1] + dist1[v2] + dist2[N];  // start - v1 - v2 -n
  const d2 = dist0[v2] + dist2[v1] + dist1[N];  // start - v2 -v1 -n
  if (d1 == Infinity && d2 == Infinity) return -1;
  return d1 < d2 ? d1 : d2;
}
function dijkstra(N, start, graph) {
  let dist = new Array(N + 1).fill(Infinity);
  dist[start] = 0;

  let mh = new MinHeap((a, b) => a < b);
  mh.push(start, 0);

  while (!mh.empty()) {
    let cur = mh.top();
    mh.pop();
    let [curNode, curCost] = [cur.node, cur.cost];
    for (let next = 1; next < graph[curNode].length; next++) {
      let nextNode = next;
      let nextCost = curCost + graph[curNode][next];
      if (nextCost < dist[nextNode]) {
        dist[nextNode] = nextCost;
        mh.push(nextNode, nextCost);
      }
    }
  }
  return dist;
}
main();