// 한 번호가 다른 번호의 접두어인 경우
// phone_book 10^7

// 접두사가 되면 -> false
// 짧은 것부터 검사..?
// 접두어.

// 헉..어렵다..!
//  N + N-1+ N-2 => N^2
// 시간 초과
// 선형으로...
// 자릿수로 잘라봐..? 정렬 시킴
// 짧은것부터 자릿수 순으로 시작
//  1 + 2 + ~ N => N^2
// 선형으로 해
// 앞에 있는거랑 비교 해.

// 이걸 못 풀다니..

// O(N)
function solution(phone_book) {
  // 정렬하면 접두어 관계에 있는 번호들이 인접하게 배치됨
  phone_book.sort();

  for (let i = 0; i < phone_book.length - 1; i++) {
    // 다음 번호가 현재 번호로 시작하는지만 확인하면 됨
    if (phone_book[i + 1].startsWith(phone_book[i])) {
      return false;
    }
  }

  return true;
}

// set을 이용한 문제
function sol2(phone_book) {
  const set = new Set();

  for (const phone of phone_book) {
    set.add(phone);
  }

  // O(N)
  for (const phone of phone_book) {
    let curr = "";
    for (let char of phone) {
      curr += char;

      if (set.has(curr)) return false;
    }
  }

  return true;
}

// set을 이용한 문제
function sol2(phone_book) {
  const set = new Set();

  for (const phone of phone_book) {
    set.add(phone);
  }

  // O(N)
  for (const phone of phone_book) {
    //       본인이 아니어야한다.
    for (let i = 1; i < phone.length; i++) {
      let curr = phone.slice(0, i);
      if (set.has(curr)) return false;
    }
  }

  return true;
}
