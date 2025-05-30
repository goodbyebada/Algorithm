/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
function isUnActive(time, key, unActiveMap) {
  if (unActiveMap.has(key)) {
    if (Number(time) < unActiveMap.get(key)) {
      return true;
    }
  }
  return false;
}

// 중복 카운트가 안된다고 생각햇다.
function countMentions(numberOfUsers, events) {
  const countMap = new Map();
  const unActiveMap = new Map();

  // 🚨 놓친 점 : "MESSAGE" 와 "OFFLINE" type이 같은 time에 온다는 케이스를 간과함
  events.sort((a, b) => {
    // time 순으로 정렬
    // time이 같다면, OFFLINE을 더 위의 우선순위로
    if (Number(a[1]) === Number(b[1]) && a[0] !== b[0]) {
      if (b[0] === "OFFLINE") return -1;
    }

    return Number(a[1]) - Number(b[1]);
  });

  // 초기화
  for (let i = 0; i < numberOfUsers; i++) {
    const key = "id" + i;
    countMap.set(key, 0);
    unActiveMap.set(key, 0);
  }

  // 초기화
  for (let i = 0; i < events.length; i++) {
    const type = events[i][0];
    const time = events[i][1];

    if (type === "MESSAGE") {
      const idList = events[i][2].split(" ");
      const idSet = new Set(idList);
      // ALL이 들어갈떄
      if (idSet.has("ALL")) {
        for (let key of countMap.keys()) {
          countMap.set(key, countMap.get(key) + 1);
        }
        continue;
      }

      if (idSet.has("HERE")) {
        //활성화된 애들만 넣기
        for (let key of countMap.keys()) {
          if (!isUnActive(time, key, unActiveMap))
            countMap.set(key, countMap.get(key) + 1);
        }

        for (let key of idSet) {
          if (key === "HERE") continue;
          if (countMap.has(key) && isUnActive(time, key, unActiveMap))
            countMap.set(key, countMap.get(key) + 1);
        }
        continue;
      }

      for (let key of idSet) {
        if (countMap.has(key)) countMap.set(key, countMap.get(key) + 1);
      }
    } else {
      const idList = events[i][2].split(" ").map((elem) => "id" + `${elem}`);
      const idSet = new Set(idList);

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
  return [...countMap.values()];
}

// TEST

const numberOfUsers = 3;
const events = [
  ["MESSAGE", "2", "HERE"],
  ["OFFLINE", "2", "1"],
  ["OFFLINE", "1", "0"],
  ["MESSAGE", "61", "HERE"],
];

// 0 1 2
// 1 1 1

console.log(countMentions(numberOfUsers, events));
