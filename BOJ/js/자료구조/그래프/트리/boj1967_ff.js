const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const count = +input[0];

// 부모 노드에 대한 정보가 필요하다
class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.child = [];
    this.weight = 0;
  }
}

// 루트부터 가장 깊은 리프 노드까지의 길이 , 리프노드 ~ 리프 노드간의 길이를 비교한다
let longest = 0;

let weightStack = new Array(count + 1).fill(-1);

// DFS 방식으로
function getHeight(n) {
  let visitStack = [n];
  while (visitStack.length > 0) {
    let node = visitStack.pop();

    // 리프노드일때
    if (node.child.length === 0) {
      weightStack[node.value] = node.weight;
      continue;
    }

    // ??
    let arr = [];
    let count = 0;
    for (let i = 0; i < node.child.length; i++) {
      if (weightStack[node.child[i].value] === -1) {
        if (count === 0) {
          visitStack.push(node);
        }
        visitStack.push(node.child[i]);
        count++;
      }

      // 자식 노드 weight를 넣는다.
      arr.push(weightStack[node.child[i].value]);
    }

    if (count > 0) {
      continue;
    }

    arr.sort((a, b) => a - b);
    if (arr.length > 1) {
      longest = Math.max(longest, arr[arr.length - 1] + arr[arr.length - 2]);
    }

    weightStack[node.value] = arr[arr.length - 1] + node.weight;
  }
}

let nodes = new Array(count + 1).fill(0);
nodes[1] = new Node(1);
// 루트 노드

// 노드 - 무게 init
for (let i = 1; i < count; i++) {
  let [parent, child, weight] = input[i].split(" ").map((x) => +x);
  nodes[child] = new Node(child);
  nodes[child].weight = weight;
}

// 부모 - 자식 init
for (let i = 1; i < count; i++) {
  let [parent, child] = input[i].split(" ").map((x) => +x);
  nodes[parent].child.push(nodes[child]);
  nodes[child].parent = nodes[parent];
}

getHeight(nodes[1]);

let h = Math.max(...weightStack);
console.log(Math.max(h, longest));
