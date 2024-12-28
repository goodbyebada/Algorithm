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
 
  for (let i = index + 1; i < index + 1 + n; i++) {
    const temp = input[i].split(" ").map((el) => +el);
    for (let j = 0; j < n; j++) {
      arr[i - (index + 1)][j] = temp[j];
    }
  }
 
  const rows = Array.from({ length: 4 }, () => []); 
 
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      // 중복으로 포함되는 수가 존재
      if (Math.floor(n / 2) === i) rows[0].push(arr[i][j]);
      if (i === j) rows[1].push(arr[i][j]);
      if (Math.floor(n / 2) === j) rows[2].push(arr[i][j]);
      if (i === n - 1 - j) rows[3].push(arr[i][j]); 
    }
  }
 
  let count = d >= 0 ? d / 45 : (d / 45) * -1;
 
  while (count--) {
    if (d < 0) {
      const first = rows.shift();
      first.reverse(); 
      rows.push(first);
    } else {
      const last = rows.pop();
      last.reverse(); 
      rows.unshift(last);
    }
  }
 
  const x = Math.floor(n / 2);
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