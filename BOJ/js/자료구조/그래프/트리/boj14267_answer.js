const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

let T = +input[0];
let index = 1;
let answer = "";

while (T > 0) {
  const [n, d] = input[index].split(" ").map((el) => +el);

  const arr = Array.from({ length: n }, () => Array(n).fill(0));

  //   n행을 읽는다.
  for (let i = index + 1; i < index + 1 + n; i++) {
    const temp = input[i].split(" ").map((el) => +el);
    for (let j = 0; j < n; j++) {
      arr[i - (index + 1)][j] = temp[j];
    }
  }

  //   4가지 행을 저장한다.
  const rows = Array.from({ length: 4 }, () => []);

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 📌 중복으로 포함되는 수가 존재하기에 동시에 검사한다.

      //   가운데 행
      if (Math.floor(n / 2) === i) rows[0].push(arr[i][j]);

      //    주대각선
      if (i === j) rows[1].push(arr[i][j]);

      //   가운데 열
      if (Math.floor(n / 2) === j) rows[2].push(arr[i][j]);

      //   부대각선
      if (i === n - 1 - j) rows[3].push(arr[i][j]);
    }
  }

  //   회전을 몇 번 반복하는가 -> 양수 만들기
  let count = d >= 0 ? d / 45 : (d / 45) * -1;

  // 📌 배열이 담겨져있는 방향과 값을 넣는 방향이 다름을 알아야한다.
  //   가운데 행 0 , 주대각선 1, 가운데 열 2 , 부대각선 3
  //   idx가 의미하는 위치는 같지만 방향이 다르기 때문에 reverse가 필요하다.
  while (count--) {
    if (d < 0) {
      // 📌 반시계방향일때는 맨 앞에 있는 elem의 방향이 바뀌어야한다.
      const first = rows.shift();
      first.reverse();
      rows.push(first);
    } else {
      // 📌 시계방향일때는 맨 끝에 있는 elem의 방향이 바뀌어야한다.
      const last = rows.pop();
      last.reverse();
      rows.unshift(last);
    }
  }

  const x = Math.floor(n / 2);

  //   가운데 행 0 , 주대각선 1, 가운데 열 2 , 부대각선 3
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      if (i == 0) arr[x][j] = rows[i][j];
      else if (i == 1) arr[j][j] = rows[i][j];
      else if (i == 2) arr[j][x] = rows[i][j];
      else if (i == 3) arr[j][n - 1 - j] = rows[i][j];
    }
  }

  for (let i = 0; i < n; i++) {
    answer += arr[i].join(" ") + "\n";
  }

  index += n + 1;
  T -= 1;
}

console.log(answer);
