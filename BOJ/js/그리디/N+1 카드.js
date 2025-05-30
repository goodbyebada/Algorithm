// 1. coin을 덜 사용해야 오래갈 수 있다.
// 2. map을 이용해 set delete를 통해 추가 제거를 쉽게 관리하자. (map=> 내가  들고 있는 카드)
// 3. 쌍이 있다면 pass
// 4. 들고 있는 카드 + 뽑 카 SUM이 된다면 쌍이 된다.
// 5.    - num1, num2 둘 다 만족 && 동전의 여유가 된다면 -> 각 라운드에서 두 개 뽑아도 된다. => 라운드는 쌍을 낼 수 있어야 통과할 수 있기 때문에!
// 6. 뽑 카 + 뽑 카 된다면 쌍 추가
// 7. 뽑지 못한 카드들도 따로 보관한다 => 뽑지 못한 카드들끼리 쌍을 이루는지 매번 확인한다.
//   => 동전의 여유가 된다면 쌍을 뽑을 수 있다.

function solution(coin, cards) {
  var answer = 0;

  const map = new Map();
  const save = new Map();
  const N = cards.length;
  const SUM = N + 1;
  const roundStart = N / 3;
  let pair = 0;

  //     초기화

  for (let i = 0; i < roundStart; i++) {
    const num = cards[i];
    if (map.has(SUM - num)) {
      map.delete(num);
      pair++;
    } else {
      map.set(num, true);
    }
  }

  //     매 라운드를 방문한다. 하지만 각 라운드의 num1, num2 모두 확인해야함
  for (let round = roundStart; round < cards.length; round += 2) {
    const num1 = cards[round];
    const num2 = cards[round + 1];

    // 🌷 내가 가지고 있는 카드를 쓰는게 우선! => 코인 하나만 써도 되니까!
    if (coin >= 1 && map.has(SUM - num1)) {
      map.delete(SUM - num1);
      coin--;
      pair++;
    } else {
      save.set(num1, true);
    }

    if (coin >= 1 && map.has(SUM - num2)) {
      map.delete(SUM - num2);
      coin--;
      pair++;
    } else {
      save.set(num2, true);
    }

    // 하나도 못 뽑았는데, pair을 갖고 있다면 쓴다.
    if (pair) {
      pair--;
      answer++;
      continue;
    }

    //  못 뽑았고 pair도 없다 => 이번 라운드 못 넘긴다.
    // 버린 카드들을 본다. 한 판이라도 더해야되니까!

    // 두가지의 경우
    // 1. 현재 라운드의 뽑 카 2개의 합 === SUM
    // 2. 여태까지 뽑히지 못한 카드들의 합이 ===SUM인 경우 ( 미래를 보는것이 아니올시다.)

    if (!pair) {
      let hasPair = false;

      if (coin - 2 >= 0) {
        for (let num of save.keys()) {
          if (save.has(SUM - num)) {
            coin -= 2;
            save.delete(num);
            save.delete(SUM - num);
            answer++;
            hasPair = true;
            break;
          }
        }
      }

      // 아무것도   낼 수 없을때
      if (!hasPair) break;
    }
  }

  //     1라운드부터 시작
  return answer + 1;
}
