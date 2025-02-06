// 수강 신청
/**
 * 5:19
 * 버튼 누른 후 대기열,
 * 대기열에서 버튼 다시 선택시 맨뒤로
 * 버튼 비활성화 시  앞에서 부터 수강신청
 * 수강 인원 꽉 찰 시 나머지 대기목록 무시 후 종료
 *
 * 입력
 * K (수강 가능 인원) 	L (신청 학생의 수 )
 * 마지막 클릭한 순서가 들어가야한다.
 *
 *
 * */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [K, L] = input[0].split(" ").map(Number);
const codeIdxMap = new Map();

for (let i = 1; i <= L; i++) {
  const code = input[i];
  codeIdxMap.set(code, i);
}

let list = [];
for (let [code, idx] of codeIdxMap) {
  list.push([code, idx]);
}
list = list.sort((a, b) => a[1] - b[1]);

let answer = [];
for (let i = 0; i < list.length; i++) {
  if (i === K) break;
  answer.push(list[i][0]);
}

console.log(answer.join("\n"));
