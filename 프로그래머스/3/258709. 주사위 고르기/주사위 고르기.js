function solution(dice) {
  let answer = [];
  const N = dice.length;
  const LEN = N / 2;
  const diceIndex = Array.from({ length: N }, (_, i) => i);
  let max = -1;

  // 1. 조합 구하기
  const diceIndexComb = combination(LEN, diceIndex);

  // 2. 각 조합별 계산
  for (const comb of diceIndexComb) {
    const bCombs = diceIndex.filter((x) => !comb.includes(x));

    const Aans = getAllSum(comb, dice);
    const Bans = getAllSum(bCombs, dice).sort((a, b) => a - b);

    // 3. 승리 횟수 계산
    let winCount = 0;
    for (const sum of Aans) {
      winCount += lowerBound(sum, Bans);
    }

    // 4. 최대값 갱신
    if (winCount > max) {
      max = winCount;
      answer = comb;
    }
  }

  return answer.map((x) => x + 1);
}

// 조합
function combination(n, arr) {
  if (n === 1) return arr.map((x) => [x]);
  const result = [];
  for (let i = 0; i < arr.length - n + 1; i++) {
    const fixed = arr[i];
    const rest = arr.slice(i + 1);
    const comb = combination(n - 1, rest);
    result.push(...comb.map((c) => [fixed, ...c]));
  }
  return result;
}

// 조합의 모든 합 구하기
function getAllSum(comb, dices) {
  const result = [];

  const dfs = (idx, sum) => {
    if (idx === comb.length) {
      result.push(sum);
      return;
    }
    const cur = dices[comb[idx]];
    for (let i = 0; i < 6; i++) {
      dfs(idx + 1, sum + cur[i]);
    }
  };

  dfs(0, 0);
  return result;
}

// lowerBound (m보다 작은 원소 개수 반환)
function lowerBound(m, arr) {
  let left = 0;
  let right = arr.length;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < m) left = mid + 1;
    else right = mid;
  }
  return left;
}
