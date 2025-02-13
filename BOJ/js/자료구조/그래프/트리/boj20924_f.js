/**
 * 2:11
 *
 * 기가 노드 : 루트 노드에서 순회 시작, 처음으로 자식 노드 2개 이상인 노드
 * 리프 노드 1개시, 리프노드 -> 기가 노드
 * 기둥 : 루트 - 기가
 * 가지 : 기가 - 리프 노드 => 가지의 길이 -> 가장 긴 가지의 길이
 *
 *
 * 트리의 기둥과 가장 긴 가지의 길이 구하기
 * -> 악 가장 긴 가지,,
 * 1. 완탐? DFS
 *
 * 입력
 * 첫번째줄 노드의 개수 N
 * 루트 노드 번호 R
 * a b d (간선의 길이)
 *
 *
 * -- 풀이
 * 1. 기가 노드를 찾는다.
 * 	처음으로 자식 노드 2개 이상을 갖는 노드이다.
 *  만약 루트노드부터 순회하는데도 기가노드가 나오지 않는다면, 리프노드이다.\
 * 2. 기가 노드를 루트로 삼아 완전 탐색을 통해 최대 길이를 찾느다.
 * 	만약 기가 노드가 리프노드라면 길이는 0이다.
 * 3. 자식과 간선의 길이를 함께 저장한다.
 *
 */

/**
 * 풀고 느낀 점
 * - 필요 없더라도 웬만하면 모든 정보를 가지고 다니는 것이 좋다. 후반에 currNode가 parent인지, child인지 헷갈렸다.
 *  ex) node에  parent, child 정보
 * - 순수함수로 짜면 시간을 단축 시킬 수 있다. DFS 가 반복됨에도 새로운 DFS를 계속 짜야만 했다.
 */
class Node {
  constructor(nodeName, d) {
    this.nodeName = nodeName;
    this.d = d;
  }
}

function addChild(tree, parent, child) {
  tree[parent].push(child);
  return tree;
}

// DFS로 방문한다.
function makeTree(cnt, adjList, root) {
  let tree = new Array(cnt + 1).fill(0).map(() => []);

  const stack = [];
  const visited = new Array(cnt + 1).fill(false);

  let curr = new Node(root, -1);
  visited[curr.nodeName] = true;
  stack.push(curr);

  while (stack.length !== 0) {
    const now = stack.pop();
    const idx = now.nodeName;

    for (let i = 0; i < adjList[idx].length; i++) {
      const nextNode = adjList[idx][i];
      const nextIdx = nextNode.nodeName;

      if (visited[nextIdx]) continue;
      stack.push(nextNode);
      visited[nextIdx] = true;
      tree = addChild(tree, idx, nextNode);
    }
  }

  return tree;
}

//  트리 탐색 - 기가 노드 찾기
//  루트 노드 - 기가 노드의 길이
function findRootGiga(tree, root) {
  let currNodeIdx = root;
  let len = 0;
  let gigaNodeIdx = -1;

  while (1) {
    if (tree[currNodeIdx].length !== 1) {
      gigaNodeIdx = currNodeIdx;
      break;
    }

    len += tree[currNodeIdx][0].d;
    currNodeIdx = tree[currNodeIdx][0].nodeName;
  }

  return { gigaNodeIdx, len };
}

function main() {
  const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
  const input = require("fs").readFileSync(path).toString().trim().split("\n");
  const [cnt, root] = input[0].split(" ").map(Number);

  // 인접 리스트 만들기
  const adjList = new Array(cnt + 1).fill(0).map(() => []);
  for (let i = 1; i < cnt; i++) {
    const [a, b, d] = input[i].split(" ").map(Number);
    adjList[a].push(new Node(b, d));
    adjList[b].push(new Node(a, d));
  }

  // 무방향 그래프 트리 만들기
  const tree = makeTree(cnt, adjList, root);
  const { gigaNodeIdx, len } = findRootGiga(tree, root);
  const max = findMax(tree, gigaNodeIdx);
  console.log(len, max);
}

main();

function findMax(tree, root) {
  const stack = [{ idx: root, len: 0 }];
  let lenList = [0];

  while (stack.length) {
    const curr = stack.pop();
    let childs = tree[curr.idx];

    if (!childs.length) {
      lenList.push(curr.len);
    }

    for (let i = 0; i < childs.length; i++) {
      stack.push({ idx: childs[i].nodeName, len: curr.len + childs[i].d });
    }
  }

  return Math.max(...lenList);
}
