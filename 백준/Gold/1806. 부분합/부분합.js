const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const [N, S] = input[0].split(" ").map(Number);
const list = input[1].split(" ").map(Number);

// 🥲 불가능하면 0을 return 해야한다.

function solution() {
  let head = 0;
  let tail = 0;
  let sum = 0;
  let min = Infinity;

  //tail은 다음을 가리키고 있다.

  while (tail <= N) {
    // 이동한다.

    if (sum >= S) {
      min = Math.min(min, tail - head);
      sum -= list[head];
      head++;
    } else {
      // 합이 작다면 tail을 더해야한다.
      sum += list[tail];
      tail++;
    }
  }

  console.log(min === Infinity ? 0 : min);
}

solution();
