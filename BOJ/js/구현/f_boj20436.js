/**
 * ZOAC 3
 * 실버 4
 */

function main() {
  // 맨 처음에 계속 반복문을 이용해 순회하고 있었는데 map을 사용하면 O(1)의 시간으로 시간 단축
  const keyboard = `qwertyuiop
asdfghjkl
zxcvbnm`
    .split("\n")
    .map((row, i) =>
      row.split("").reduce((map, char, j) => {
        map[char] = [i, j];
        return map;
      }, {})
    )
    //reduce를 이용해 {} map을 만들었다 char : [posX,posY]
    .reduce((acc, cur) => {
      return Object.assign(acc, cur);
      // target, source
      //   target에 source 속성을 복사해 반영한다.
    }, {});
  // 하나의 map으로 만들기 위한 로직

  const input = require("fs")
    .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
    .toString()
    .trim()
    .split("\n");

  const [leftChar, rightChar] = input[0].split(" ");
  const str = input[1];

  let leftPos = keyboard[leftChar];
  let rightPos = keyboard[rightChar];
  let moveCnt = 0;

  //   모음 부분은 왼손이 해야한다.
  const isLeftHand = (char) => "qwertasdfgzxcv".includes(char);

  //   leftPos, rigthPos 분기 처리 필요없음
  for (const char of str) {
    const newPos = keyboard[char];

    if (isLeftHand(char)) {
      moveCnt +=
        Math.abs(leftPos[0] - newPos[0]) + Math.abs(leftPos[1] - newPos[1]);
      leftPos = newPos;
      //   업데이트
    } else {
      moveCnt +=
        Math.abs(rightPos[0] - newPos[0]) + Math.abs(rightPos[1] - newPos[1]);
      rightPos = newPos;
      //   업데이트
    }

    moveCnt++; // 키를 누르는 시간 추가
  }

  console.log(moveCnt);
}

main();
