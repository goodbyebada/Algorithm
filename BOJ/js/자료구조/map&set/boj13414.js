// 수강 신청
/**
 * 버튼 누른 후 대기열,
 * 대기열에서 버튼 다시 선택시 맨뒤로
 * 버튼 비활성화 시  앞에서 부터 수강신청
 * 수강 인원 꽉 찰 시 나머지 대기목록 무시 후 종료
 *
 * 입력
 * K (수강 가능 인원) 	L (신청 학생의 수 )
 * 마지막 클릭한 순서가 들어가야한다.
 *
 * */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const [K, L] = input[0].split(" ").map(Number);
const map = new Map();
let answer = [];

// ✨ map 사용시, 삭제 , 추가 O(1)의 시간이 걸린다.
// 처음에 리스트로 구현했는데, map을 사용하면 시간도 덜 걸리고, 로직이 간단해진다.
for (let i = 1; i <= L; i++) {
  const code = input[i];
  if (map.has(code)) map.delete(code);
  map.set(code);
}

// answer console.log로 출력하면 시간 초과 날 수 있다. answer list로 만들어 join해 출력하는 습관을 기르자
let cnt = 0;
for (const item of map) {
  if (cnt === K) break;
  answer.push(item[0]);
  cnt++;
}

console.log(answer.join("\n"));
