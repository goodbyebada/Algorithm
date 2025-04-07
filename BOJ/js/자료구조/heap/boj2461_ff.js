/**
 * 최소 힙
 *
 *
 * O(N*M * log (N))
 */

/**
 * 놓친 점
 * 1. 최대 , 최소 중 무언가 하나 고정해야한다 생각했는데, 오름차순 정렬을 통해 최대가 최소가 될 수는 없다라는 점을 간과했다.
 * 2. 최소 포인터를 옮겼을때 그 값이 최대가 된다면,,어떻게 해야하나 혼란 또한 N-2개의 배열 중 최소 result를 구할 수 있는 값이 있다면? 에서 혼란 왔다.
 * [..N 행의 최솟값 값들]을 넣어놓고 오름차순 정렬 -> 최대는 고정이니 최소는 계속 갱신/ 만약 현재 값이
 *
 *
 * 1. 최솟값을 업데이트 해야한다.
 * -> 비교를 위해 오름차순으로 정렬했기 때문에, 인덱스를 움직여 값을 줄일 수는 없기 때문이다.
 * 2. 각 반의 [최소값, 행]을 minHeap에 넣는다. min, max를 정해 result를 업데이트
 * 3. minHeap의 최솟값이 있는  행의 다음 인덱스의 값을 구한다.
 * 4. 해당 값을 minHeap에 넣고 sort 한다. 또한 현재 max보다 크다면 max 갱신 => 현재 heap의 최솟값과 max의 차, result 비교 통해 업데이트
 * 5. heap의 길이가 0이 될때까지 반복한다. 또한, 행이 M-1이 된다면 break -> N 미만의 학생들이 되기 때문에 조건 만족 X
 *
 */

class MinHeap {
  constructor() {
    this.heap = [];
  }

  front() {
    return this.heap[0];
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp();
  }

  bubbleUp() {
    if (this.heap.length === 1) return;
    let idx = this.heap.length - 1;
    const curr = this.heap[idx];

    while (idx > 0) {
      // 0번부터 시작
      const parentIdx = Math.floor((idx - 1) / 2);
      const parent = this.heap[parentIdx];

      // 비교는 parent와 curr이랑 해야한다.
      if (parent[0] <= curr[0]) break;

      this.heap[idx] = parent;
      idx = parentIdx;
    }

    // 마지막 한번만 바꾼다. => 계속 복사하지 않아도 된다.
    this.heap[idx] = curr;
  }

  pop() {
    // 📌 0일때와 1 예외처리 해줘야한다.
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const val = this.heap[0];

    // 📌 lastNode 없어져야한다!
    const last = this.heap.pop();
    this.heap[0] = last;
    this.bubbleDown();

    return val;
  }

  bubbleDown() {
    // 처음 작성한 코드
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

    let index = 0;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

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

      // 변동 없다 === [index][0]이 제일 작다.
      if (smallest === index) break;

      [this.heap[index], this.heap[smallest]] = [
        this.heap[smallest],
        this.heap[index],
      ];

      index = smallest;
    }
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
