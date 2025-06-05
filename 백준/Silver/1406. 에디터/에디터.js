// 에디터
// 최대 6* 10^5글자 까지

// L 커서를 왼쪽으로 한 칸
// D 커서를 오른쪽으로 한칸
// B 커서 왼쪽에 있는 문자 삭제 => 커서의 오른쪽에 있던 문자는 그대로
// P $ 문자 왼쪽에 추가한다.

// shift, unshift를 사용하면 O(N)의 시간이 걸린다.
// slice 또한 O(N)의 시간이 걸리기 때문에
// O(1)의 시간인 pop, push를 이용해야한다.
// right를 [a,b,c] => [c, b, a]로 거꾸로 놓아서 마지막에 출력할때 reverse한다.
// 인덱스가 끝에 있을수록 커서와 가깝다.

let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

function sol() {
  let left = input[0].split("");
  let right = [];
  let len = parseInt(input[1]);

  for (let i = 2; i < 2 + len; i++) {
    let [char, add] = input[i].split(" ");

    if (char === "L" && left.length > 0) {
      // 커서 왼쪽의 문자 => 커서 오른쪽으로 이동
      const w = left.pop();
      right.push(w);
    }

    if (char === "D" && right.length > 0) {
      // 커서 오른쪽 문자  -> 커서 왼쪽의 문자로 이동
      const w = right.pop();
      left.push(w);
    }

    // 왼쪽 삭제
    if (char === "B" && left.length > 0) left.pop();

    // 커서 왼쪽 추가
    if (char === "P") {
      left.push(add);
    }
  }

  let answer = left.join("");
  answer += right.reverse().join("");

  console.log(answer);
}

sol();
