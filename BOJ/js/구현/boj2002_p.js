// 차선 변경 불가, 터널 내부 추월 불가
// 반드시 추월했을 차의 개수
// 들어가는 차량 번호 목록 => 대근
// 나오는 차량 번호 목록=> 영식

// 🚨 잘못된 접근
//  => 앞 뒤로 하나씩 검사해 a < b(뒤 숫자 <앞 숫자) 라면 count++

// => 각 차를 하나 고정, 뒤에 자기보다 큰 수가 있다면 count 세었다면 바로 continue해도 된다.

// ✨ 처음 접근, 들어오는 차 원소(target)를 기준으로, 나가는 차 배열을 검사하려고 했는데 (앞에 있는 차량 모두 추월 차량)
// 1. 들어오는 차에 (추월차량 존재)
// 2. 추월차량 중복 count됨
// 문제가 있었다. 하지만 추월차량, target 차량 모두 삭제하며 진행하면 문제가 사라진다.

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

function solution(input) {
  const N = +input[0];
  const dic = {};
  const results = [];
  let count = 0;

  for (let i = 1; i <= N; i++) {
    const car = input[i];
    dic[car] = i;
  }

  for (let i = N + 1; i <= 2 * N; i++) {
    const car = input[i];
    results.push(dic[car]);
  }

  for (let targetIdx = 0; targetIdx < input.length; targetIdx++) {
    for (let j = targetIdx + 1; j < input.length; j++) {
      if (results[j] < results[targetIdx]) {
        count++;
        break;
      }
    }
  }
  console.log(count);
}

function fasterSol(input) {
  const N = +input[0];
  const inCar = new Set();
  const outCar = new Set();
  let count = 0;

  for (let i = 1; i <= N; i++) {
    inCar.add(input[i]);
    outCar.add(input[i + N]);
  }

  // 들어오는 차 기준으로 검사
  for (let targetCar of inCar) {
    if (!outCar.has(targetCar)) continue;
    for (let car of outCar) {
      // 중복을 위해 소거해야한다.
      outCar.delete(car);

      if (car === targetCar) {
        break;
      } else {
        // 추월차량 제거
        count++;
      }
    }
  }

  console.log(count);
}

fasterSol(input);
// solution(input);
