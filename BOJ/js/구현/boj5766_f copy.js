const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");

main();
function main() {
  const answer = [];
  let idx = 0;

  while (1) {
    let [N, M] = input[idx].split(" ").map(Number);
    idx++;

    if (N === 0 && M === 0) break;

    const map = new Map();

    // N주 동안의 랭킹 처리
    for (let i = 0; i < N; i++) {
      weekResult(input[idx].split(" ").map(Number), map);
      idx++;
    }

    // 점수 기준으로 정렬 (점수 내림차순, 같은 점수면 번호 오름차순)
    const arr = [...map].sort((a, b) => {
      if (b[1] !== a[1]) {
        return b[1] - a[1];
      }
      return a[0] - b[0];
    });

    const str = findSecond(arr);
    answer.push(str);
  }

  console.log(answer.join("\n"));
}

function weekResult(challengers, map) {
  for (let challenger of challengers) {
    map.set(challenger, (map.get(challenger) || 0) + 1);
  }
}

function findSecond(arr) {
  const result = [];

  // 1등의 점수

  const firstScore = arr[0][1];

  // 2등의 점수 찾기
  // 문제에는 1등이 한 사람이라고 적혀있는데, 꼭 아래와 같은 과정 거쳐야함
  // 문제대로라면 arr[1][1]로 바로 선언하면 되는데 그럼 틀림 문제 이상함~
  let secondScore = -1;
  for (let i = 1; i < arr.length; i++) {
    if (arr[i][1] < firstScore) {
      secondScore = arr[i][1];
      break;
    }
  }

  // 2등 점수와 같은 모든 선수들 찾기
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][1] === secondScore) {
      result.push(arr[i][0]);
    }
  }

  return result.join(" ");
}
