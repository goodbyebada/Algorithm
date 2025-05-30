/**
 * 필요한 것 =>
 * id_list의 userId에 대응한 신고한 ID들 중 정지한 ID들의 횟수
 * 정지한 ID는 신고가 k 이상이다.
 * [userId, 신고 당한 ID]
 *
 * 1. badUser : count가 필요함
 * 2. userId : badUser list 필요함
 
 */

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

    if (reportedIdMap.has(reportedId)) {
      reportedIdMap.set(reportedId, reportedIdMap.get(reportedId) + 1 || 1);
    }

    const index = idIndexMap.get(userId);
    const set = userIdSetList[index];
    set.add(reportedId);
  }

  for (const [userId, count] of reportedIdMap) {
    if (count >= k) stopedIdList.push(userId);
  }

  // N*N
  for (let i = 0; i < userIdSetList.length; i++) {
    let count = 0;
    for (const reportedId of stopedIdList) {
      if (userIdSetList[i].has(reportedId)) {
        count++;
      }
    }
    answer.push(count);
  }

  return answer;
}
