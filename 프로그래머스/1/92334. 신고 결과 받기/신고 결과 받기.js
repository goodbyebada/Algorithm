// 각 유저는 한번에 한명의 유저를 신고할 수 있다.
// 동일한 유저에 대한 신고는 1회(중복 인정x)
// k번 이상 신고당하면 유저는 정지된다.

// 각 유저별로 처리 결과 메일을 받은 횟수 출력
// 각 유저가 신고한 ID가 정지된다면 처리 결과 메일을 받는다.

// 각 ID 신고 누적 횟수를 count
// report => set으로 중복 제거

// id_list
// id_list 의 index로 이용해 접근하자. id : id_list index map을 만든다.
// [index]: set([신고 ID])로 만든다.
// report 반복문을 통해서 할 것
// [신고당한 id] : count

// 초기화해야함
// arr[[신고한 id]의 index] -> new Set()거기에 .add를 한다
//

// k이상인 신고 리스트를 포함하고 있는지 N번의 검사를 통해 알 수 있다. => 신고 횟수를 count 가능하다.

// 1. [신고당한 ID] : 신고당한 횟수 count 로 비교를 해야함 =>K이상인 애들만 추려내 id리스트 만들기
// 2. [유저 ID]: set([신고 ID] )=> 신고 id를 얼마나 포함하고 있다면 ++
// 3. id_list 순회하며 [] 배열에 넣기  n*n

function solution(id_list, report, k) {
  var answer = [];
  const setReport = new Set(report);
  const idIndexMap = new Map();
  const userIdSetList = Array(id_list.length)
    .fill(0)
    .map(() => new Set());

  const reportedIdMap = new Map();
  const stopedIdList = [];

  //   초기화
  for (let i = 0; i < id_list.length; i++) {
    idIndexMap.set(id_list[i], i);
  }

  for (let str of setReport) {
    const [userId, reportedId] = str.split(" ");
    
      
    if(reportedIdMap.has(reportedId)){
        reportedIdMap.set(reportedId, reportedIdMap.get(reportedId) + 1) 
    }else{
        reportedIdMap.set(reportedId, 1) 
    }
     
    
    const index = idIndexMap.get(userId);
    const set = userIdSetList[index];
    set.add(reportedId);
  }

    
  for (const [userId, count] of reportedIdMap) {
    if (count >= k) stopedIdList.push(userId);
  }
    
  for (let i = 0; i < userIdSetList.length; i++) {
    let count = 0;
    for (const reportedId of stopedIdList) {
      if (userIdSetList[i].has(reportedId)) {
        count++;
      }
    }
    answer.push(count);
  }

  // //   n*N*N -> 시간초과
  //   for (const userId of id_list) {
  //     let count = 0;
  //     if (userIdMap.has(userId)) {
  //       const reportedIdList = userIdMap.get(userId);
  //       for (let id of reportedIdList) {
  // 		if( )
  //       }
  //       continue;
  //     }

  //     answer.push(count);
  //   }

  return answer;
}
