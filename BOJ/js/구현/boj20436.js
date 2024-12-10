// /**
//  * ZOAC 3
//  * 실버 4
//  * 10:33~
//  */

// // 해당 문자열을 출력하는데 걸리는 시간의 최솟값을 구해보자
// //  문자열을 출력하는 데 걸리는 시간의 최솟값을 구해보자.
// //  두 점 중 거리가 가까운 곳을 기준으로 이동한다.

// function findPair(keyboard, char) {
//   for (let row = 0; row < keyboard.length; row++) {
//     const posY = keyboard[row].indexOf(char);
//     if (posY === -1) continue;
//     return [row, posY];
//   }
// }

// function difference(a, b) {
//   return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
// }

// function main() {
//   const keyboard = `qwertyuiop
// asdfghjkl
// zxcvbnm`
//     .split("\n")
//     .map((elem) => elem.split(""));

//   let moveCnt = 0;

//   const input = require("fs")
//     .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./text.txt")
//     .toString()
//     .trim()
//     .split("\n");

//   const [leftChar, rightChar] = input[0].split(" ");
//   const str = input[1];

//   let leftPos = findPair(keyboard, leftChar);
//   let rightPos = findPair(keyboard, rightChar);
//   moveCnt += 2;

//   for (let index = 2; index < str.length; index++) {
//     let newPos = findPair(keyboard, str[index]);

//     let moveWithLeft = difference(leftPos, newPos);
//     let moveWithRight = difference(rightPos, newPos);

//     if (moveWithLeft > moveWithRight) {
//       rightPos = findPair(keyboard, str[index]);
//       moveCnt += moveWithRight;
//     } else {
//       leftPos = findPair(keyboard, str[index]);
//       moveCnt += moveWithLeft;
//     }
//     moveCnt++;
//     // 눌렀을때

//     console.log(moveWithLeft, moveWithRight);
//     console.log(str[index]);
//     console.log(moveCnt);
//   }

//   console.log(moveCnt);
// }

// main();

function main() {
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
    .reduce((acc, cur) => Object.assign(acc, cur), {});

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

  const isLeftHand = (char) => "qwertasdfgzxcv".includes(char);

  for (const char of str) {
    const newPos = keyboard[char];

    if (isLeftHand(char)) {
      moveCnt +=
        Math.abs(leftPos[0] - newPos[0]) + Math.abs(leftPos[1] - newPos[1]);
      leftPos = newPos;
    } else {
      moveCnt +=
        Math.abs(rightPos[0] - newPos[0]) + Math.abs(rightPos[1] - newPos[1]);
      rightPos = newPos;
    }

    moveCnt++; // 키를 누르는 시간 추가
  }

  console.log(moveCnt);
}

main();
