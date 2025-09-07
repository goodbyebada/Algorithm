//12:52 ~ 2:10 틀림
// 1. 역으로 안해서 틀림
// 2. heap this[idx] 와 같은 자잘한 실수
// 3. 메모리 초과로 실패!

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [N, M, K] = input[0].split(" ").map(Number);

// 도시끼리는 단방향

// 도시에 도로가 업 ㅅ을수도 여러개일수도
// 어떤 도시 -> 적어도 하나의 면접장 방문 가능
// 면접장까지의 거리 => 가장 가까운 면접장까지의 최단 거리

// 면접장까지의 거리가 가장 먼 도시와 그 거리를 구하자.

// 도시의 수 N 10^5

// M = 5*10^5
// K 면접장의ㅏ 수
// 도시 번호 , 도로의 길이,

//  각 도시 -> K M 최단거리를 구한다.
// K를 출발점으로 두고 갱신한다. -> dist1
// M을 출발점으로 두고 갱신한다. -> dist2
// dist 1 , dist2 비교해 각각 재 갱신

// N (K, M) 제외하고 N을 순회한다. 가장 먼 거리와 번호를 업데이트한다.
//  max < curr 일때만 인덱스와 값을 업데이트 한다.

// 1. 다익스트라 => heap  MlogN
// N*N 배열로 사용한다면 NlogN  10^5 * 5
//N*N 배열 visited와 함께 사용하다면, N*N = > 10^10인디

// 입력
// 다음 M개의 줄에 걸쳐
// 1 ~ M

// 메모리초과

const graph = Array(N + 1)
  .fill(0)
  .map(() => Array(N + 1).fill(Infinity));

class MinHeap {
  constructor(compare) {
    this.arr = [];

    // 콜백
    this.compare = compare;
  }

  length() {
    return this.arr.length;
  }

  push(node) {
    this.arr.push(node);
    this.siftUp();
  }

  pop() {
    if (this.length() === 0) return null;
    if (this.length() === 1) return this.arr.pop();

    const root = this.arr[0];
    const child = this.arr.pop();

    this.arr[0] = child;
    this.siftDonw();
    return root;
  }

  siftUp() {
    let i = this.length() - 1;

    while (i > 0) {
      let p = Math.floor((i - 1) / 2);

      // a < b
      if (this.compare(this.arr[i][1], this.arr[p][1])) {
        this.swap(p, i);
        i = p;
      }

      break;
    }
  }

  siftDonw() {
    let i = 0;

    while (1) {
      let l = 2 * i + 1;
      let r = 2 * i + 2;

      let sm = i;

      if (l < this.length() && this.compare(this.arr[l][1], this.arr[sm][1])) {
        sm = l;
      }
      if (r < this.length() && this.compare(this.arr[r][1], this.arr[sm][1])) {
        sm = r;
      }

      if (sm === i) break;

      //  업데이트
      this.swap(sm, i);
      i = sm;
    }
  }

  swap(i1, i2) {
    const tmp = this.arr[i1];
    this.arr[i1] = this.arr[i2];
    this.arr[i2] = tmp;
  }
}

function dijks(start, graph) {
  //   N개의 노드 최단거리
  //   ..?
  const mh = new MinHeap((a, b) => a - b < 0);
  const dist = Array(N + 1).fill(Infinity);

  mh.push([start, 0]);
  dist[start] = 0;

  //   N*(N+logN)
  //   N^2
  //   10^10
  while (mh.length() > 0) {
    const [v, d] = mh.pop();

    // 레거시 값
    if (dist[v] < d) continue;

    // 인접한 노드 갱신
    for (let i = 1; i <= N; i++) {
      if (graph[v][i] === Infinity) continue;

      const ndist = d + graph[v][i];

      if (dist[i] > ndist) {
        dist[i] = ndist;
        mh.push([i, ndist]);
      }
    }
  }

  return dist;
}

function minDiks(start, graph) {
  const visited = Array(N + 1).fill(false);
  const dist = Array(N + 1).fill(0);

  dist[start] = 0;
  visited[start] = true;

  for (let i = 1; i <= N; i++) {
    if (!visited[i] && dist[i] > dist[start] + graph[start][i]) {
      // 갱신
      dist[i] = dist[start] + graph[start][i];
    }
  }
}

function main() {
  for (let i = 1; i <= M; i++) {
    const [start, end, d] = input[i].split(" ").map(Number);

    //   가장 최소의 값만 갱신
    // 역으로 추적할거니까
    if (graph[end][start] > d) graph[end][start] = d;
  }

  const kList = input[M + 1].split(" ").map(Number);

  const dist = Array(N + 1).fill(Infinity);
  for (let kNode of kList) {
    const kDist = dijks(kNode, graph);

    for (let i = 1; i <= N; i++) {
      // 갱신
      if (dist[i] > kDist[i]) dist[i] = kDist[i];
    }
  }

  //   final compare
  let max = -1;
  let maxIndex = 0;

  for (let i = 1; i < dist.length; i++) {
    const currDist = dist[i];

    if (currDist !== Infinity && max < currDist) {
      max = currDist;
      maxIndex = i;
    }
  }

  console.log(maxIndex);
  console.log(max);
}

main();
