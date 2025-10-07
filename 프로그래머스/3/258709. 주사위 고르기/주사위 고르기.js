function solution(dice) {
  var answer = [];
  let max = 0;
  const n = dice.length;

  //  주사위 번호 index 번부터 시작
  const array = new Array(n).fill(0).map((a, i) => i);

  const combinations = getComb(n / 2, array);

  //   각 조합에 대해 수행
  combinations.forEach((dice1) => {
    //       dice1에 들어가지 않은 i 주사위 filter
    const dice2 = array.filter((a) => !dice1.includes(a));

    const sum1 = getSumList(dice, dice1);

    // sum2 오름차순 정렬
    // sum1[i]보다 작은 값들을 찾는다.
    const sum2 = getSumList(dice, dice2).sort((a, b) => a - b);

    let count = 0;

    for (let i = 0; i < sum1.length; i++) {
      count += getVictoryCount(sum1[i], sum2);
    }

    if (count > max) {
      // 주사위 조합 인덱스
      answer = dice1;

      //   카운트 갯수 -> 최대 비교 우해
      max = count;
    }
  });

  return answer.map((a) => a + 1);
}

function getVictoryCount(n, list) {
  let left = 0;
  let right = list.length - 1;

  // n이 list의 끝값 보다 크다면 전체 길이가 답 -> right + 1 return
  if (n > list[right]) {
    return right + 1;
  }

  // 중복되는 수가 있기 때문에 lowerBound를 구한다.
  // >= n인 지점을 구해서 작은 수들의 개수를 구한다.

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    // n보다 작음 => 왼쪽 영역 탐색할 필요 없음
    if (list[mid] < n) {
      left = mid + 1;
    } else {
      // n보다 크거나 같음
      // mid 버리면 안됨, 처음으로 >= n인 위치를 찾고 싶기 때문
      right = mid;
    }
  }
  return left;
}

// 조합 구하기
function getComb(L, array) {
  if (L === 1) {
    return array.map((a) => [a]);
  }
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const rest = array.slice(i + 1);
    const comb = getComb(L - 1, rest);
    const attach = comb.map((c) => [array[i], ...c]);
    result.push(...attach);
  }
  return result;
}

// list => 주사위 조합
// dice => 주사위에 있는 숫자들
// 6 × 6 × 6 × ... × 6 (n번) = 6^n 가지

function getSumList(dice, list) {
  // list[0]번째의 숫자값들 === tmp
  //   0번 주사부터 끝까지 모든 조합의 수를 구한다.
  let tmp = [...dice[list[0]]];

  //   현재 주사위 조합 전부 순회
  for (let i = 1; i < list.length; i++) {
    const tmp1 = [];

    // list[0]번째의 주사위값들
    for (let j = 0; j < tmp.length; j++) {
      //   0번 주사부터 끝까지 모든 조합의 수를 구한다.
      for (let k = 0; k < 6; k++) {
        tmp1.push(dice[list[i]][k] + tmp[j]);
      }
    }

    // 업데이트
    tmp = tmp1;
  }
  return tmp;
}
