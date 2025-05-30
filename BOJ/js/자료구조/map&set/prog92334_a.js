function solution(id_list, report, k) {
  //  reports = [신고하는 id, 신고 당한 id][]
  let reports = [...new Set(report)].map((a) => {
    return a.split(" ");
  });

  let counts = new Map();
  for (const bad of reports) {
    // 신고 당하는 id => count
    counts.set(bad[1], counts.get(bad[1]) + 1 || 1);
  }

  let good = new Map();

  // [userId, badUserId]
  // 1. 만약 badUserId count가 k이상이라면 신고 당한 ID
  // 2. good Map에 badUserId count를 세준다.

  // ✨ N번의 연산을 통해 해결할 수 있다.
  for (const report of reports) {
    // 신고당한 id의 count >= k일때
    if (counts.get(report[1]) >= k) {
      // 신고 id , good에 없다면 1
      good.set(report[0], good.get(report[0]) + 1 || 1);
    }
  }

  // 제일 고민이었던 id_list에 대응되는 횟수
  // userid- Index를 이어지는 Map을 사용했었는데

  // ✨ id_list를 순회하며 id 접근을 하면 된다.
  let answer = id_list.map((a) => good.get(a) || 0);
  return answer;
}
