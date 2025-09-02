const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
//7:57~

// 1시간 30분 걸림
//  minheap => 처음 자료구조 설계를 제대로 몬해서 좀 오래 걸림 pq는 외워야할듯
// 문제 예시 답안 때문에 오래걸림 여러개일 경우 아무거나 출력하는게 답이었삼..

class Node {
  constructor(value, node) {
    this.value = value;
    this.node = node;
  }
}

class MinHeap {
  constructor() {
    this.arr = [];
  }

  empty() {
    return this.arr.length <= 0;
  }

  push(nodeObj) {
    this.arr.push(nodeObj);
    this.bubbleUp();
  }

  bubbleUp() {
    // 현재 인덱스
    let index = this.arr.length - 1;

    // index가 0보다 커야지 parentIdx에서 오류가 안 생긴다네 📌
    while (index > 0) {
      let parentIdx = Math.floor((index - 1) / 2);

      // 이러면 오류 생기는데
      if (this.arr[parentIdx][0] > this.arr[index][0]) {
        [this.arr[parentIdx][0], this.arr[index][0]] = [
          this.arr[index][0],
          this.arr[parentIdx][0],
        ];

        index = parentIdx;
      }

      break;
    }

    // while (parentIdx >= 0 && this.arr[parentIdx][0] > this.arr[index][0]) {
    //   let parent = this.arr[parentIdx];
    //   this.arr[parentIdx] = this.arr[index];
    //   this.arr[index] = parent;

    //   index = parentIdx;
    //   parentIdx = Math.floor((index - 1) / 2);
    // }
  }

  pop() {
    if (this.arr.length <= 0) return null;
    if (this.arr.length === 1) return this.arr.pop();

    const root = this.arr[0];
    const lastNode = this.arr.pop();

    this.arr[0] = lastNode;

    this.bubbleDown();

    return root;
  }

  // bubbleDown() {
  //   let index = 0;
  //   let leftChildIdx = 2 * index + 1;
  //   let rightChildIdx = 2 * index + 2;

  //   while (leftChildIdx < this.arr.length && rightChildIdx < this.arr.length) {
  //     let tmp = index;
  //     let target;

  //     if (this.arr[leftChildIdx][0] < this.arr[index][0]) {
  //       index = leftChildIdx;
  //     }

  //     if (this.arr[rightChildIdx][0] < this.arr[index][0]) {
  //       index = rightChildIdx;
  //     }

  //     //   안 바뀌었다면 break
  //     if (tmp === index) break;

  //     const rootVal = this.arr[tmp];
  //     this.arr[tmp] = this.arr[index];
  //     this.arr[index] = rootVal;

  //     leftChildIdx = 2 * index + 1;
  //     rightChildIdx = 2 * index + 2;
  //   }
  // }

  bubbleDown() {
    let index = 0;

    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let smallest = index;

      // 왼쪽 자식과 비교
      if (
        leftChildIdx < this.arr.length &&
        this.arr[leftChildIdx][0] < this.arr[smallest][0]
      ) {
        smallest = leftChildIdx;
      }

      // 오른쪽 자식과 비교
      if (
        rightChildIdx < this.arr.length &&
        this.arr[rightChildIdx][0] < this.arr[smallest][0]
      ) {
        smallest = rightChildIdx;
      }

      // 변경이 없으면 종료
      if (smallest === index) break;

      // 교환
      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      // 업데이트
      index = smallest;
    }
  }
}

let index = 0;
const n = +input[index++];
// 도시의 개수
const m = +input[index++];
// 버스의 개수

const graph = Array(n + 1)
  .fill(0)
  .map(() => []);

// 인접리스트 만들기 성공 >.0
for (let i = index; i < input.length - 1; i++) {
  const [start, target, value] = input[i].split(" ").map(Number);

  graph[start].push(new Node(value, target));
}

// 0번 테이블 비워두기 1번 부터 시작
const table = Array(n + 1)
  .fill(0)
  .map(() => [Infinity, []]);
const [start, target] = input[input.length - 1].split(" ").map(Number);

function ds(startNodeName, graph, table) {
  const q = new MinHeap();

  q.push([0, startNodeName, [startNodeName]]);

  while (!q.empty()) {
    const [value, nodeName, arr] = q.pop();

    // 레거시 값 패스
    if (table[nodeName][0] < value) continue;

    for (let adjNode of graph[nodeName]) {
      const dist = value + adjNode.value;

      //  최소값 갱신
      if (dist < table[adjNode.node][0]) {
        table[adjNode.node] = [dist, [...arr, adjNode.node]];

        // 경로 추가
        q.push([dist, adjNode.node, [...arr, adjNode.node]]);
      }
    }
  }
}

function main() {
  ds(start, graph, table);
  console.log(table[target][0]);
  console.log(table[target][1].length);
  console.log(table[target][1].join(" "));

  // 출발 도시의 번호, 도착지의 도시 번호, 버스 비용
  //   m+3 구간 출발점의 도시번호, 도착점의 도시번호
  // 출발점의 도시번호를 구한다.-> 전부 순회하며 최소비용 갱신
  //   출력
  //   최소  비용
  //  최소 비용을 갖는 경로에 포함되는 도시의 개수
  // 최소 비용을 갖는 경로를 방문하는 도시 순서대로 출력
}

main();
