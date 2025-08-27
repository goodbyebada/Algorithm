const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(path)
  .toString()
  .trim()
  .split("\n")
  .map((e) => e.trim());

const [n, m, h] = input.shift().split(" ").map(Number);
const ladders = input.map((e) => e.split(" ").map(Number));

const map = Array.from({ length: h + 1 }, () =>
  Array.from({ length: n + 1 }, () => false)
);

let answer = Infinity;

for (let [a, b] of ladders) {
  // 방향성 통일하기 위해 b에만 표시한다.
  map[a][b] = true;
}

const check = () => {
  for (let i = 1; i <= n; i++) {
    let idx = i;
    // 각 열마다 검사한다.
    // 가로 선의 길이만 보면 된다
    for (let j = 1; j <= h; j++) {
      // 오른쪽으로 이동
      if (map[j][idx]) idx++;
      // 왼쪽으로 이동
      else if (map[j][idx - 1]) idx--;
    }

    if (idx !== i) return false;
  }
  return true;
};

const dfs = (depth, max) => {
  // 가지치기 어차피 3 이상이면 안됨
  if (answer <= max) return;

  if (max === depth) {
    // 바꾸고 나서 검사한다. (0도 포함되어있어서 안 바뀌었을떄도 검사)
    // 가지 치기  => answer > depth ~ 시간 단축 & 갱신
    if (check() && answer > depth) answer = depth;
    return;
  }

  // j == col
  for (let j = 1; j < n; j++) {
    // 사다리는 왼쪽에서 오른쪽으로 연결되는 방식으로 놓을 예정이니 n - 1까지 진행
    // ✨ 방향 고정 & 인덱스 에러 안남 (1부터 Index 시작 & n-1까지만 진행)
    // 새로운 가로선을 놓는 과정
    for (let i = 1; i <= h; i++) {
      // 나 || 좌 || 우 연결되어있다면
      if (map[i][j] || map[i][j - 1] || map[i][j + 1]) continue;

      map[i][j] = true;
      dfs(depth + 1, max);
      map[i][j] = false;

      while (i <= h && !map[i][j + 1] && !map[i][j - 1]) i++;
    }
  }
};

// 최대 3개
// 놓으려는 사다리의 개수
for (let i = 0; i < 4; i++) {
  dfs(0, i);
}

console.log(answer === Infinity ? -1 : answer);
