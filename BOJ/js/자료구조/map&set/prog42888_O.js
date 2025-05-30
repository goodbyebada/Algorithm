//프로그래머스/2/42888. 오픈채팅방
// 최종적으로 방을 개설한 사람이 보게 되는 메시지를 문자열 배열 형태로 return

// 있는 상태에서 수정
// 나가서 들어오는 (수정)

//  Enter, Leave, Change

// Map => uiid - nickname 업데이트
// O(N)
// record 순회하며 uiid 업데이트

// record 순회하며 문자열 만들기
function solution(record) {
  var answer = [];
  const nickNameMap = new Map();

  for (let str of record) {
    const info = str.split(" ");

    // 🚨 로직은 쉽다. 입력의 형태가 차이가 있는데, 이를 무시해 틀렸다. 😩
    //         Leave uid1234
    if (info.length <= 2) continue;

    const [type, id, nickName] = info;
    nickNameMap.set(id, nickName);
  }

  for (let str of record) {
    const info = str.split(" ");
    const type = info[0];
    const id = info[1];

    if (type === "Enter") {
      const message = `${nickNameMap.get(id)}님이 들어왔습니다.`;
      answer.push(message);

      continue;
    }

    if (type === "Leave") {
      const message = `${nickNameMap.get(id)}님이 나갔습니다.`;
      answer.push(message);

      continue;
    }
  }

  return answer;
}
