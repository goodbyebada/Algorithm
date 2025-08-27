const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

// 랭킹에 오를때마다 => 선수의 포인트 1씩 오름
// 할아버지 가장 많은 포인트 얻음
// 최고의 브릿지 선수
// 어떤 선수가 2등

// 첫 행 N.M
// 2<=N<= 500
// 2<=M<= 500

// 한 주의 랭킹 정보
// 최고점의 선수가 단 한명만 존재
// M개의 선수 번호

// 해시맵 이용하는 문제
// N주동안 1포인트씩 쌓기
// ObjectEntries로 만든다음, 포인트별로 내림차순으로 sort
// 최고점의 선수가 단 한명만 존재 , 이등은 동점자 가능
// [1]의 값인 애들만 걸러내기 => O(N)

// N 500 M 500
main();
function main() {
  const answer = [];
  let index = 0;

  while (1) {
    let [N, M] = input[index++].split(" ").map(Number);

    if (N === 0 && M == 0) break;

    const map = new Map();
    for (let i = index; i < index + N; i++) {
      const challengers = input[i].split(" ").map(Number);
      weekResult(challengers, map);
    }

    const arr = [...map].sort((a, b) => {
      if (b[1] - a[1] === 0) {
        return a[0] - b[0];
      }
      return b[1] - a[1];
    });

    const str = findSecond(arr);

    answer.push(str);

    // 업데이트
    index += N;
  }

  console.log(answer.join("\n"));
}

function weekResult(challengers, map) {
  for (let challenger of challengers) {
    map.set(challenger, map.get(challenger) + 1 || 1);
  }
}

function findSecond(arr) {
  let answer = [];

  //   첫 2위
  let targetScore = arr[1][1];

  for (let i = 1; i < arr.length; i++) {
    let currentScore = arr[i][1];
    if (currentScore !== targetScore) break;

    // 선수 수
    const number = arr[i][0];
    answer.push(number);
  }

  return answer.join(" ");
}
