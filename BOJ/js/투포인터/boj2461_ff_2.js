/**
 * 투 포인터 풀이
 * -> 더 느리다.
 *
 * O(N*M * log (N*M))
 */

function sol(input) {
  const [N, M] = input[0].split(" ").map(Number);
  const students = [];

  // students 배열에 다 넣는다. 대신 한 반에 한 명이기에 classId를 넣어야한다.
  for (let i = 1; i <= N; i++) {
    const scores = input[i].split(" ").map(Number);

    for (let score of scores) {
      students.push({ score, classId: i - 1 });
    }
  }

  // 반에 상관없이 능력치 기준 정렬
  // O(N*M * log (N*M))
  students.sort((a, b) => a.score - b.score);

  const count = Array(N).fill(0);

  let uniqueClass = 0;
  let left = 0;
  let minDiff = Infinity;

  // O(N*M)
  for (let right = 0; right < students.length; right++) {
    const { score, classId } = students[right];
    count[classId]++;

    if (count[classId] === 1) uniqueClass++;

    // N개라면 N개의 반에 최솟값들이 다 들어왔다.
    while (uniqueClass === N) {
      // 최댓값- 최솟값
      const diff = students[right].score - students[left].score;
      minDiff = Math.min(minDiff, diff);

      // 최솟값 빼준다.
      const leftClass = students[left].classId;
      count[leftClass]--;

      // 전체 반 갯수--
      if (count[leftClass] === 0) uniqueClass--;
      // 최솟값 인덱스도 이동한다. -> 빼줬기 때문에
      left++;
    }
  }

  console.log(minDiff);
}

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
sol(input);
