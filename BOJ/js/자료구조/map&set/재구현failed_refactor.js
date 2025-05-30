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
  }

  // 초기화
  for (let i = 0; i < events.length; i++) {
    const type = events[i][0];
    const time = events[i][1];
    const idList = events[i][2].split(" ");
    const idSet = new Set(idList);

    // ""일때 set에 들어가면 분기처리하기가 어렵다..

    // console.log(idSet);
    console.log(i, time, "전", countMap, unActiveMap);

    if (type === "MESSAGE") {
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

  // string기준으로 sorted해줘야함
  // ["id123=5", "id5=5"]

  console.log(countMap);
  console.log(unActiveMap);
  return 0;
}

sol(users, events);
