// 연산을 사용하는 횟수의 최솟값을 구해라

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim();

BFS(+input);

// TODO 메모리 초과  + 시간초과
//  워스트 케이스 시간 복잡도 찾기
// 중복되는 값이 너무 많다 => 배열을 만들어서 방문 횟수 기록 1이 채워진다면 출력, 이미 방문한 횟수보다 크다면 건너 뛴다.

function BFS(N) {
  let index = 0;
  const queue = [[1, 0]];
  const visited = new Array(N + 1).fill(false);
  visited[1] = true;
  let answer = [];

  while (index < queue.length) {
    let [val, count] = queue[index++];

    if (val === N) {
      console.log(count);
      break;
    }
    const list = [val + 1, val * 2, val * 3];

    for (let num of list) {
      if (num > N) continue;
      if (visited[num]) continue;
      queue.push([num, count + 1]);
      visited[num] = true;
    }
  }

  // console.log(Math.min(...answer));
}

