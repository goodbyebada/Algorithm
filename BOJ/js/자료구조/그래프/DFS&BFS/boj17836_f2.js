// 17836번
const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [N, M, T] = input[0].split(" ").map(Number);

/**
 * 1. gram이 있을 때와 없을 때를 비교해야한다.
 * 2. BFS를 통해 공주님이 있는 최단 거리를 찾는다.
 * 3. BFS를 통해 탐색하는 중 gram을 찾는다면, ✨ gram이 있을 시 시간 :gram까지 오는 거리 + |gram위치.x - N| + |gram의 위치.y - M| -> 벽을 뚫고 직진할 수 있기 때문에 최단거리임!
 * 4. gram이 없다면 (N,M)을 찾을 때까지 방문하면 된다.
 *
 * - T시간 이내 접근할 수 있다면, Math.min(gram 시간, 방문 시간)
 * - T시간 이내 구출할 수 없다면 Fail 출력
 */

const dy = [-1, 0, 1, 0];
const dx = [0, 1, 0, -1];

// 🚨 큐에서 뺐을때 방문 표시 했더니, 중복 방문으로 메모리 초과났다. 큐에 넣으면서 방문 표시해야한다.

function BFS(map) {
  let index = 0;

  // ✨ 경로별 time을 구분하기 위해 큐에 함께 넣어준다.
  let q = [[0, 0, 0]];
  map[0][0] = 1;

  // gram < time 일 수도 있다! 따로 분리해줘야한다.
  let gramTime = Infinity;

  while (index < q.length) {
    // 🚨 매번 헷갈리는 index++, index 반환한 뒤 ++ 해준다!! 그만 헷갈리자!
    const [cx, cy, time] = q[index++];

    // 필수, BFS로 바로 답을 낼거니까.
    if (time > T) {
      if (gramTime <= T) return gramTime;
      return "Fail";
    }

    for (let i = 0; i < 4; i++) {
      let nextX = cx + dx[i];
      let nextY = cy + dy[i];

      //   좌표 벗어났을 시
      if (nextX < 0 || nextY < 0 || nextX >= N || nextY >= M) continue;

      // 공주님 찾았을 때 출력
      if (nextX === N - 1 && nextY === M - 1)
        return Math.min(gramTime, time + 1);

      //   벽 || 방문했을 시
      if (map[nextX][nextY] === 1) continue;

      // 🚨 gram이 있어도 큐에 넣는다. 더 짧은 경로가 있을 수 있기 때문이다.
      if (map[nextX][nextY] === 2)
        gramTime =
          time + 1 + Math.abs(nextX - (N - 1)) + Math.abs(nextY - (M - 1));

      q.push([nextX, nextY, time + 1]);
      //  ✨ 방문한 곳을 벽이 있는 것처럼 1로 표시하면 visited 배열을 쓰지 않아도 된다.
      map[nextX][nextY] = 1;
    }
  }

  //  🚨 반례) 벽이 공주가 있는 지점을 다 막고 있어서 (N-1,M-1) 방문할 수 없는 경우
  if (gramTime <= T) return gramTime;
  return "Fail";
}

function sol(input) {
  const map = input.slice(1).map((elem) => elem.split(" ").map(Number));

  console.log(BFS(map));
}

sol(input);
