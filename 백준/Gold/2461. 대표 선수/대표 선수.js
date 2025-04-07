class MinHeap {
  constructor() {
    this.heap = [];
  }

  front() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.heapify();
  }

  heapify() {
    if (this.heap.length === 1) return;
    let idx = this.heap.length - 1;

    // 0번부터 시작
    let parent = Math.floor((idx - 1) / 2);

    while (idx > 0 && parent >= 0 && this.heap[parent][0] > this.heap[idx][0]) {
      const tmp = this.heap[parent];
      this.heap[parent] = this.heap[idx];
      this.heap[idx] = tmp;

      idx = parent;
      parent = Math.floor(idx / 2);
    }
  }

  pop() {
    // 📌 0일때와 1 예외처리 해줘야한다.
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const val = this.heap[0];

    const last = this.heap.pop();
    this.heap[0] = last;
    this.sort();

    return val;
  }

  sort() {
    let parent = 0;

    //🚨 아래와 같이 작성하면 오른쪽 노드가 없는데도 rigth에 접근해 오류가 발생한다.
    // while (parent <= Math.floor((this.heap.length - 1) / 2)) {
    //   left = 2 * parent + 1;
    //   right = 2 * parent + 2;

    //   console.log(parent, left, right);

    //   if (this.heap[left][0] < this.heap[right][0]) {
    //     child = left;
    //   } else {
    //     child = right;
    //   }

    //   if (this.heap[child][0] < this.heap[parent][0]) {
    //     const tmp = this.heap[parent];
    //     this.heap[parent] = this.heap[child];
    //     this.heap[child] = tmp;
    //     parent = child;
    //   } else {
    //     break;
    //   }
    // }

    while (true) {
      let left = 2 * parent + 1;
      let right = 2 * parent + 2;
      let smallest = parent;

      // 🚨 left, right index가 있는지 확인하면 undefined 접근을 방지할 수 있다.
      if (
        left < this.heap.length &&
        this.heap[left][0] < this.heap[smallest][0]
      ) {
        smallest = left;
      }

      if (
        right < this.heap.length &&
        this.heap[right][0] < this.heap[smallest][0]
      ) {
        smallest = right;
      }

      // 변동 없다 === [parent][0]이 제일 작다.
      if (smallest === parent) break;

      // 한 번에 바꿀 수 있다
      [this.heap[parent], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[parent],
      ];
      parent = smallest;
    }
  }

  lsit() {
    return this.heap;
  }
}
function sol(input) {
  const [N, M] = input[0].split(" ").map(Number);
  const classRoom = [];

  for (let i = 1; i <= N; i++) {
    classRoom.push(
      input[i]
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b)
    );
  }

  const minArr = new MinHeap();
  let min = Infinity;
  let max = 0;

  let answer = Infinity;

  for (let i = 0; i < N; i++) {
    const curr = classRoom[i][0];
    minArr.push([curr, [i, 0]]);

    min = Math.min(min, curr);
    max = Math.max(max, curr);
  }

  answer = max - min;

  while (1) {
    const [row, col] = minArr.pop()[1];

    // minVal pop

    if (col === M - 1) break;

    const newVal = classRoom[row][col + 1];

    minArr.push([newVal, [row, col + 1]]);

    // // 갱신
    if (newVal > max) {
      max = newVal;
    }

    min = minArr.front()[0];

    answer = Math.min(answer, max - min);
  }

  console.log(answer);
}

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().split("\n");

sol(input);
