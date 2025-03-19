const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

const [N, S] = input[0].split(" ").map(Number);
const list = input[1].split(" ").map(Number);

function solution() {
  let head = 0;
  let tail = 0;
  let sum = 0;
  let min = Infinity;

  //   길이 유지
  //tail은 다음을 가리키고 있다.

  while (tail <= N) {
    // 이동한다.

    const currLen = tail - head;

    if (sum >= S && min > currLen) {
      min = currLen;
      sum -= list[head];
      head++;

      if (sum >= S) continue;
      sum += list[tail];
      tail++;
      continue;
    }

    // 현재 길이가 min의 길이보다  작거나 같아야한다.
    if (min <= currLen) {
      // 줄이기
      sum -= list[head];
      head++;
    } else {
      // 늘리기
      sum += list[tail];
      tail++;
    }
  }

  console.log(min === Infinity ? 0 : min);
}

solution();
