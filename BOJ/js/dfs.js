const dx = [1, -1, 0, 0];
const dy = [0, 0, 1, -1];

function dfs(startX, startY) {
  const stack = [[startX, startY]];

  while (stack.length) {
    const [x, y] = stack.pop();

    for (let i = 0; i < 4; i++) {
      let cx = x + dx[i];
      let cy = y + dy[i];

      if (cx < 0 || cy < 0 || cx >= N || cy >= M) continue;

      visited[cx][cy] = 1;
      stack.push([cx, cy]);
    }
  }
}
