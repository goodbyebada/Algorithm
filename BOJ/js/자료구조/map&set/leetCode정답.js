/**
 * @param {number} numberOfUsers
 * @param {string[][]} events
 * @return {number[]}
 */
var countMentions = function (numberOfUsers, events) {
  // timestamp 기준으로 정렬한다.
  // timestamp가 같다면, OFFLINE를 더 높은 우선순위로
  events = events.sort((a, b) => {
    const num1 = parseInt(a[1]),
      num2 = parseInt(b[1]);
    if (num1 == num2) {
      if (a[0] == "OFFLINE") {
        return -1;
      }
    } else {
      return num1 - num2;
    }
  });

  const mentions = Array(numberOfUsers).fill(0);

  // -1로 초기화 -> onLine 의미
  const offlineUsers = Array(numberOfUsers).fill(-1);

  for (const [message, timestamp, messageString] of events) {
    // MESSAGE 일때 처리 위해
    // 오프라인 상태이면 -> 현재 timestamp에 -(제한시간) >= 60이면 온라인으로 마크
    for (let i = 0; i < numberOfUsers; i++) {
      if (offlineUsers[i] != -1 && timestamp - offlineUsers[i] >= 60) {
        offlineUsers[i] = -1;
      }
    }

    if (message == "OFFLINE") {
      offlineUsers[messageString] = parseInt(timestamp);
      continue;
    } else {
      switch (messageString) {
        case "ALL": {
          for (let i = 0; i < numberOfUsers; i++) {
            mentions[i]++;
          }
          break;
        }
        case "HERE": {
          for (let i = 0; i < numberOfUsers; i++) {
            // 온라인 상태인 사용자들만 언급한다.
            if (offlineUsers[i] == -1) {
              mentions[i]++;
            }
          }
          break;
        }
        default: {
          const mentionedUsers = messageString.replace(/id/gm, "").split(" ");
          for (const user of mentionedUsers) {
            mentions[user]++;
          }
          break;
        }
      }
    }
  }
  return mentions;
};
