/**
 * 스위치 켜고 끄기
 * 실버 4

 *
 * 남학생: 자기가 받은 수의 배수인 스위치의 상태를 원상태와 반대로 바꾼다
 * 여학생 : 자기가 받은수와 같은 번호 스위치 중심으로 좌우가 대칭 + 가장 많은 스위치를 포함하는 구간을 찾는다.
 * 그 구간에 속한 스위치의 상태를 모두 바꾼다. 이 때 구간에 속한 스위치 개수는 항상 홀수
 *
 *
 * 마지막 스위치 상태를 출력해라
 *
 * 스위치 개수
 *스위치 상태
 학생 수 < = 100
 남 1
 여 2
 학생이 받은 수 <= 스위치 개수 

 출력 20개씩 출력한다.

 */

//  남학생
// 자기가 받은 수의 배수를 구한다. <= 현재 전구의 개수인 수
// 전구의 위치를 현재와 반대로 한다.
const maleStudent = (num, switchCnt, list) => {
  const maxCnt = Math.floor(+switchCnt / num);

  for (let mult = 1; mult <= maxCnt; mult++) {
    list[mult * num - 1] = list[mult * num - 1] === 1 ? 0 : 1;
  }
  return list;
};

// 여학생
// 자기가 받은수 -1,+1 에 접근한다.
// 만약 대칭이라면 index를 옮긴다.
// 최대한 넓은 범위를 찾기 때문에 start <= 왼쪽 || 오른쪽 <= end와 같아지면 멈춘다.
// 멈춘후 왼쪽 idx부터 오른쪽까지 idx의 switch 값을 바꾼다.
// 만약 대칭이 아니라면 멈춰서 상태 바꾼다.

/**
 * 처음에 짰던 여학생 로직
 * -  너무 복잡하고 분기처리할 것이 많다.
 * -> 1. num === start || num === end라면 list[num]만 바꿔야한다.
 * -> 2.1번 상황을 따로 분기처리했다면
 *  대칭의 값이 안 맞을때, 혹은 left right가 범위를 넘어갔을때 한꺼번에 바꾸는 로직은 list[num]을 제외해야한다.
 * -> 너무 복잡하다.
 */
const WrongfemaleStudent = (number, switchCnt, list) => {
  const start = 0;
  const end = list.length - 1;
  const num = number - 1;

  //  left right가 범위를 벗어나있을 수도 있다.
  let left = num - 1;
  let right = num + 1;

  //   start <= left && right <= end 가 순회가능한 범위

  while (num + 1 < end && start < num - 1) {
    // 현재 left right가 다를 때
    if (list[left] !== list[right]) {
      for (let idx = left + 1; idx <= right - 1; idx++) {
        list[idx] = list[idx] === 1 ? 0 : 1;
      }
      break;
    }
    // 미리 확인
    if (left - 1 < start || right + 1 > end) {
      // 현재 left ~ right까지 확인해야한다.

      for (let idx = left; idx <= right; idx++) {
        list[idx] = list[idx] === 1 ? 0 : 1;
      }
      break;
    }

    left -= 1;
    right += 1;
  }

  return list;
};

const femaleStudent = (num, arr, n) => {
  let index = num - 1;
  arr[index] = arr[index] === 1 ? 0 : 1;
  for (let j = 1; index - j >= 0 && index + j < n; ++j) {
    if (arr[index - j] == arr[index + j]) {
      arr[index - j] = arr[index - j] === 1 ? 0 : 1;
      arr[index + j] = arr[index + j] === 1 ? 0 : 1;
    } else {
      break;
    }
  }

  return arr;
};

const main = () => {
  const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
    .toString()
    .trim()
    .split("\n");

  const switchNumbers = Number(input.shift());
  let switchs = input.shift().split(" ").map(Number);
  const genderListLength = input.shift();

  const genderlist = input.map((elem) => elem.split(" ").map(Number));

  for (let idx = 0; idx < genderListLength; idx++) {
    const [gender, number] = genderlist[idx];

    if (gender === 1) {
      switchs = maleStudent(number, switchNumbers, switchs);
    } else {
      switchs = femaleStudent(number, switchs, switchNumbers);
    }
  }

  //   let str = "";
  //   for (let i = 0; i < switchNumbers; i++) {
  //     str += switchs[i] + " ";
  //     if ((i + 1) % 20 === 0) {
  //       console.log(str);
  //       str = "";
  //     }

  //     if (i === switchNumbers - 1) {
  //       console.log(str);
  //     }
  //   }

  let result = "";
  for (let i = 0; i < switchNumbers; i++) {
    result += switchs[i] + " ";
    if ((i + 1) % 20 === 0) {
      result += "\n";
    }
  }
  console.log(result.trim());
};

main();
