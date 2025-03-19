const MAX = 101;
class Queue {
    constructor() {
        this.q = new Array(MAX).fill(0);
        this.head = 0;
        this.tail = 0;
    }
    push(v) {
        this.tail = (this.tail+1) % MAX;
        this.q[this.tail] = v;
    }
    pop() {
        if (this.empty()) throw new Error ("Empty!");
        this.head = (this.head+1) % MAX;
        return this.q[this.head];
    }
    size() {
        return (this.tail - this.head + MAX) % MAX;
    }
    empty() {
        return this.head === this.tail;
    }
    front() {
        return this.q[(this.head+1) % MAX];
    }
}

function solution(priorities, location) {
    const q = new Queue();
    const arr = [...priorities].sort((a,b)=>a-b);
    let count = 0;

    priorities.forEach((v,i)=>q.push([v,i]));

    while(!q.empty()) {
        // 큐의 front 값과 max 값 비교 
        const temp = q.pop();
        if (temp[0] < arr[arr.length-1]) {
            // pop, push 
            q.push(temp);
            continue;
        }
        // pop, arr에서도 제거 
        count++;
        arr.pop();
        if (temp[1]===location) break;
    }
    return count;

}