const { readFileSync } = require('fs');
const input = readFileSync('/dev/stdin').toString().trim().split('\n');
const [n, k] = input[0].split(' ').map(Number);
const parent = +input[1];
let visited = Array(n).fill(0);
let g = Array.from({length: n}, () => []);

for (let i = 2; i <= k + 1; i++) {
    let [n1, n2, cost] = input[i].trim().split(' ');
    g[+n1-1].push({node: +n2, value: +cost});
};

let graph = Array(n).fill(Infinity);

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(edge, value) {
        const node = {edge, value};
        this.upheap(node);
    }

    upheap(node) {
        this.heap.push(node);
        let idx = this.heap.length - 1;

        while(idx > 0) {
            let parentIdx = (idx - 1) >> 1;
            if (this.heap[parentIdx].value <= node.value) break;

            this.heap[idx] = this.heap[parentIdx];
            idx = parentIdx;
        }
        this.heap[idx] = node;
    }

    remove() {
        if (this.heap.length == 0) return undefined;
        if (this.heap.length == 1) return this.heap.pop();
        const res = this.heap[0];
        const node = this.heap.pop();
        this.downheap(node);

        return res;
    }

    downheap(node) {
        let len = this.heap.length >> 1;
        let idx = 0;

        while(idx < len) {
            let left = (idx << 1) + 1;
            let right = left + 1;
            let small = left;

            if (right < this.heap.length && this.heap[left].value > this.heap[right].value) small = right;

            if (this.heap[small].value >= node.value) break;
            this.heap[idx] = this.heap[small];
            idx = small;
        }

        this.heap[idx] = node;
    }
}

const dijkstra = (start) => {
    visited[start-1] = 1;
    graph[start-1] = 0;
    let hp = new MinHeap();
    const target = g[start-1];
    let move = 0;

    for (let i = 0; i < target.length; i++) {
        const {node, value} = target[i];
        if (graph[node-1] > value) {
            graph[node-1] = value;
            hp.insert(node, value);
        }
    }

    while(hp.heap.length) {
        const {edge, value} = hp.remove();
        if (!visited[edge-1] || graph[edge-1] > value) {
            visited[edge-1] = 1;
            graph[edge-1] = Math.min(graph[edge-1], value);
            const tg = g[edge-1];
            move = value;

            for (let i = 0; i < tg.length; i++) {
                const {node, value} = tg[i];
                if (graph[node-1] > value + move) {
                    graph[node-1] = value + move;
                    hp.insert(node, value+move);
                }
            }
        }
    }
}

dijkstra(parent);
graph = graph.map(v => v == Infinity ? 'INF' : v);
console.log(graph.join('\n'));