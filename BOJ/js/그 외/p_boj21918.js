/**
 * 전구
 * 브론즈 2
 *
 * 전구의 개수 N
 * 명령어의 개수 M
 * 
 *a 명령어
 b,c는 i, x
 *
 *
 * 1. 원본 배열이 있다.
 * 2. 1번일 경우 원본 배열에 접근해 직접 값을 변경한다.
 * 3. 나머지의 경우 l번째부터 r번째까지 반복해 전구에 접근한다.
 * 	그냥 for문으로 쓰자 
 * 
 */

function sol(num, l, s, lightsArray) {
  if (num === 1) {
    lightsArray[l - 1] = s;
    return;
  }
  if (num === 2) {
    for (let i = l; i <= s; i++) {
      if (lightsArray[i - 1] === 0) {
        lightsArray[i - 1] = 1;
        continue;
      }
      lightsArray[i - 1] = 0;
    }
    return;
  }
  if (num === 3) {
    for (let i = l; i <= s; i++) {
      lightsArray[i - 1] = 0;
    }
    return;
  }
  if (num === 4) {
    for (let i = l; i <= s; i++) {
      lightsArray[i - 1] = 1;
    }
    return;
  }
}

function main() {
  let input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
    .toString()
    .split("\n")
    .map((elem) => elem.split(" ").map(Number));

  const lightsArray = input[1];
  const commandCount = input[0][1];
  const commandList = [];

  for (let i = 2; i < 2 + commandCount; i++) {
    commandList.push(input[i]);
  }

  commandList.forEach((elem) => {
    const [num, l, s] = elem;
    sol(num, l, s, lightsArray);
  });

  console.log(lightsArray.join(" "));
}

main();
