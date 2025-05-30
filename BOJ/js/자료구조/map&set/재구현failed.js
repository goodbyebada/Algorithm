// 유사한 문제 :
// https://leetcode.com/problems/count-mentions-per-user/description/
// 하지만 중복 count 안된다는 점에서 차이가 있었음

// 🚨 문제 풀면서 실수한 점;
// 1. Map, Set 객체 잘 모르는 이슈 => Map[] key 접근 안됨 => get()으로 접근해야함
// 2. 구현이 너무 복잡해서 헤매었다.
// 3. "MESSAGE" 와 "OFFLINE" type이 같은 time에 온다는 케이스를 간과함 => 같은 시간이라면 OFFLINE이 위로 오도록 정렬해야함

const users = ["id0", "id1", "id2", "id3", "id4"];
const events = [
  ["OFFLINE", "28", "id1"],
  ["OFFLINE", "14", "id2"],
  ["MESSAGE", "2", "ALL"],
  ["MESSAGE", "28", "HERE"],
  ["OFFLINE", "66", "id0"],
  ["MESSAGE", "34", "id2"],
  ["MESSAGE", "83", "HERE"],
  ["MESSAGE", "40", "id3 id3 id2 id4 id4"],
];

// { 'id0' => 2, 'id1' => 1, 'id2' => 4, 'id3' => 4, 'id4' => 4 }

function isUnActive(time, key, unActiveMap) {
  if (unActiveMap.has(key)) {
    if (Number(time) < unActiveMap.get(key)) {
      return true;
    }
  }
  return false;
}

function sol(users, events) {
  const countMap = new Map();
  const unActiveMap = new Map();

  // 초기화
  for (let i = 0; i < users.length; i++) {
    countMap.set(users[i], 0);
    unActiveMap.set(users[i], 0);
  }

  events.sort((a, b) => {
    // time 순으로 정렬
    // time이 같다면, OFFLINE을 더 위의 우선순위로
    if (Number(a[1]) === Number(b[1]) && a[0] !== b[0]) {
      if (a[0] === "OFFLINE") return -1;
      return 1;
    }

    return Number(a[1]) - Number(b[1]);
  });

  console.log(events);

  // 초기화
  for (let i = 0; i < events.length; i++) {
    const type = events[i][0];
    const time = events[i][1];
    const idList = events[i][2].split(" ");
    const idSet = new Set(idList);

    // ""일때 set에 들어가면 분기처리하기가 어렵다..

    if (type === "MESSAGE") {
      // ALL이 들어갈떄
      if (idSet.has("ALL")) {
        for (let key of countMap.keys()) {
          countMap.set(key, countMap.get(key) + 1);
        }
        continue;
      }

      if (idSet.has("HERE")) {
        // HERE -> idSet에서 활성화된 애만 카운트
        for (let key of countMap.keys()) {
          if (!isUnActive(time, key, unActiveMap))
            countMap.set(key, countMap.get(key) + 1);
        }

        // 명시되어있는 놈들은 비활성화가 된 애만 카운트.
        for (let key of idSet) {
          console.log(key);
          if (key === "HERE") continue;

          // "" => 들어갈까봐 countMap에 있는지 조건 확인
          if (countMap.has(key) && isUnActive(time, key, unActiveMap)) {
            countMap.set(key, countMap.get(key) + 1);
          }
        }
        continue;
      }

      for (let key of idSet) {
        if (countMap.has(key)) countMap.set(key, countMap.get(key) + 1);
      }
    } else {
      // ALL이 들어갈떄
      if (idSet.has("ALL")) {
        for (let key of unActiveMap.keys()) {
          unActiveMap.set(key, Number(time) + 60);
        }
        continue;
      }

      if (idSet.has("HERE")) {
        //활성화된 애들만 넣기
        for (let key of unActiveMap.keys()) {
          if (unActiveMap.has(key) && !isUnActive(time, key, unActiveMap))
            unActiveMap.set(key, Number(time) + 60);
        }

        for (let key of idSet) {
          if (key === "HERE") continue;
          if (unActiveMap.has(key) && isUnActive(time, key, unActiveMap))
            unActiveMap.set(key, Number(time) + 60);
        }
        continue;
      }

      for (let key of idSet) {
        if (unActiveMap.has(key)) unActiveMap.set(key, Number(time) + 60);
      }
    }
  }

  console.log(countMap);
  return 0;
}

sol(users, events);
