let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(""));
const solution = () => {
  let red, blue, hole;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === "R") red = { x: i, y: j };
      if (arr[i][j] === "B") blue = { x: i, y: j };
      if (arr[i][j] === "O") hole = { x: i, y: j };
    }
  }

  const dir = [
    { dx: 0, dy: 1 },
    { dx: 0, dy: -1 },
    { dx: -1, dy: 0 },
    { dx: 1, dy: 0 },
  ];

  const move = (x, y, dx, dy) => {
    let count = 0;

    while (arr[x + dx][y + dy] !== "#" && arr[x][y] !== "O") {
      x += dx;
      y += dy;
      count++;
    }

    return { x, y, count };
  };

  const queue = [{ red, blue, moves: 0 }];
  const visited = new Set();

  visited.add(`${red.x},${red.y},${blue.x},${blue.y}`);

  while (queue.length) {
    const { red, blue, moves } = queue.shift();

    if (moves >= 10) continue;

    for (const { dx, dy } of dir) {
      const newRed = move(red.x, red.y, dx, dy);
      const newBlue = move(blue.x, blue.y, dx, dy);

      if (arr[newBlue.x][newBlue.y] === "O") continue;
      if (arr[newRed.x][newRed.y] === "O") return moves + 1;

      if (newRed.x === newBlue.x && newRed.y === newBlue.y) {
        if (newRed.count > newBlue.count) {
          newRed.x -= dx;
          newRed.y -= dy;
        } else {
          newBlue.x -= dx;
          newBlue.y -= dy;
        }
      }

      const state = `${newRed.x},${newRed.y},${newBlue.x},${newBlue.y}`;
      if (!visited.has(state)) {
        visited.add(state);
        queue.push({ red: newRed, blue: newBlue, moves: moves + 1 });
      }
    }
  }
  return -1;
};
console.log(solution());
