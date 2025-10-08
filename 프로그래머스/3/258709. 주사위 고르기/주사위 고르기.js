// 목표 : 승리할 확률이 높은 주사위를 구해라
// 1. 6개의 숫자를 가진 n/2 주사위
// n/2 => 최대 5
//  => 완탐! => 10C5 * (6^6 * 6^6) -> 시간초과
// 그럼 어케 하냐?
// 10C5를 어떻게 할 수는 없다.
// 하나의 조합 케이스마다. [#1, #2]
// A의 주사위 -> 모든 합을 구하는데 6^6
// B의 주사위 -> 모든 합을 구하는데 6^6
// 비교 1) 각각 하나씩 비교 6^6 * 6^6 => 대략 10^12
// 각 주사위의 조합 ~> `A보다 작은 B의 주사위 개수` => 이기는 개수 => 확률
// lowerBound => A 조합 합 < m 작은 범위를 구한다. logN
// 비교 2)  `A보다 작은 B의 주사위 개수 ~> 6^6 * log6^6
// 최종 10C5 * 6^6 * log6^6 대략 10^8

// max인 개수를 가진 주사위의 조합을 구한다.

function solution(dice) {
  var answer = [];
  const N = dice.length;
  const LEN = dice.length / 2;
  const diceIndex = Array(N)
    .fill(0)
    .map((elem, index) => index);
  let max = -1;

  //     1. 조합 구하기.
  //     0부터 시작하는 주사위 인덱스 조합들
  const diceIndexComb = combination(LEN, diceIndex);

  //   각 조합에 대해 수행
  diceIndexComb.forEach((dice1) => {
    //       dice1에 들어가지 않은 i 주사위 filter
    const dice2 = diceIndex.filter((a) => !dice1.includes(a));

    const sum1 = getAllSum(dice, dice1);

    // sum2 오름차순 정렬
    // sum1[i]보다 작은 값들을 찾는다.
    const sum2 = getAllSum(dice, dice2).sort((a, b) => a - b);

    let count = 0;

    for (let i = 0; i < sum1.length; i++) {
      count += lowerBound(sum1[i], sum2);
    }

    if (count > max) {
      // 주사위 조합 인덱스
      answer = dice1;

      //   카운트 갯수 -> 최대 비교 우해
      max = count;
    }
  });

  //     2. 조합 별 각 주사위의 모든 합 구하기. 6^6
  //     A의 조합의 모든 합 . B의 조합의 모든 합을 구한다.

  //   diceIndexComb.map((comb) => {
  //     const Aans = Array(6).fill(0);
  //     getAllSum(comb, dice, LEN, Aans, LEN, 0);
  //     //      A 조합과 다른 조합
  //     const Bans = Array(6).fill(0);
  //     const bCombs = diceIndex.filter((elem) => !comb.includes(elem));
  //     getAllSum(comb, dice, LEN, Bans, LEN, 0);

  //     //         오름차순으로 정렬.
  //     const sortedBans = Bans.sort((a, b) => a - b);

  //     //         한 조합에 대한 승리 개수
  //     const countSum = Aans.reduce((acc, curr) => {
  //       const currCnt = lowerBound(curr, sortedBans);
  //       return acc + currCnt;
  //     }, 0);

  //     if (countSum > max) {
  //       max = countSum;
  //       answer = Aans;
  //     }
  //   });

  //     3. lowerbound로 A의 각 합 대상별 작은 B의 합 개수 측정 logN
  //     4. 각 조합별 max 측정해 max인 조합을 찾는다.

  return answer.sort((a,b) => a-b).map((elem) => elem + 1);
}

// 1. 조합 구하기. 10C2
// [fix, 뒤에하나씩 넣기.]
function combination(N, arr) {
  //     1일때 하나의 배열을 return
  if (N === 1) return arr.map((elem) => [elem]);

  const answer = [];

  for (let i = 0; i < arr.length - N + 1; i++) {
    const fixed = arr[i];
    const rest = arr.slice(i + 1);
    const comb = combination(N - 1, rest);
    const result = comb.map((arr) => [...arr, fixed]);

    //         1차원 배열들이 나란히 들어간다.
    answer.push(...result);
  }

  return answer;
}

// //     0 1 2 LEN-1
// //     i번 주사위
// function getAllSum(comb, dice, LEN, answ, depth, val){

// //     최종일때 그 값 넣어야함.
//     if( depth=== LEN) {
//         answ.push(val)
//         return }

//     for(let i =0; i < 6; i++){
//         const curr = comb[depth][i] + val
//         getAllSum(comb, dice, LEN, answ, depth-1, curr)
//     }

// }

function getAllSum(dice, list) {
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

// 최초 >= m인 곳을 찾는다.
// 해당 index -1이 m보다 작은 인덱스
//  0 1 2 3
//  left === right => 반환하면 개수 .
function lowerBound(m, arr) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    let mid = Math.floor((left + right) / 2);

    //         최초 >= m인 곳을 찾는다.
    if (arr[mid] < m) {
      left = mid + 1;
    } else {
      //             >= m => mid 버리면 안됨.
      right = mid;
    }
  }

  //     >= m 인 인덱스 === 갯수
  return left;
}
