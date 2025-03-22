/**
 * MAX는 최대 길이 +1 로 설정해야한다.
 */

const MAX = 100;
class Queue {
  constructor() {
    this.q = new Array(MAX).fill(0);
    this.tail = 0;
    this.head = 0;
  }

  push(v) {
    this.tail = (this.tail + 1) % MAX;
    this.q[this.tail] = v;
  }

  pop() {
    if (this.empty()) throw new Error("Empty!");
    this.head = (this.head + 1) % MAX;
    return this.q[this.head];
  }

  length() {
    return (this.tail - this.head + MAX) % MAX;
  }

  empty() {
    return this.tail === this.head;
  }

  front() {
    return this.q[(this.head + 1) % MAX];
  }
}

function solution(priorities, location) {
  const sortedPri = [...priorities].sort((a, b) => a - b);

  const queue = new Queue();
  let cnt = 0;

  priorities.forEach((p, i) => queue.push([p, i]));

  while (!queue.empty()) {
    const curr = queue.pop();

    //         최대보다 작다면
    if (curr[0] < sortedPri[sortedPri.length - 1]) {
      queue.push(curr);
      continue;
    }

    // 🛎️  오름차순 후, length -1로 접근한다면 O(1)으로 처리할 수 있다.
    sortedPri.pop();
    cnt++;

    if (curr[1] === location) {
      break;
    }
  }

  return cnt;
}
