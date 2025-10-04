// 다음달에 누가 선물을 많이 받을지 예측
// 더 많은 선물 준 사람 A> B-> 담달에 +1 A가 B에게 +1
// 주고받은 기록이 하나도 없거나 주고받은 수가 같다면, 선물 지수로 판단 , 더 큰 사람이 작은사람에게 +1
// 선물 지수 : 이번달까지. 친구들에게 준 선물의 수 - 받은 선물의 수
// 선물 지수도 같다면 -> 담달에 주고 받지 X

// 목적 : 당신은 선물을 가장 많이 받을 친구가 받을 선물의 수를 구해라

// gifts
// "A B"
// 선물 준 사람 // 선물 받은 사람

// 배열 사용 => 이름 - index 번호 map
// 1. 준 사람/ 받은 사람 => 데이터를 정리한다. 이차원 배열
// 2. 사람 별 준 선물 / 받은 선물 => 계산 해 선물지수 갱신
// 3. 한 사람마다 비교  -> 중복 이슈 -> muzy + ryan === ryan + muzy => 문자열 set에 넣어버려서 중복 체크
// 4. 1차원 배열에 받을 선물의 개수 입력

function solution(friends, gifts) {
  var answer = 0;
  const nameSet = new Set();

  const N = friends.length;

  //     [muzi][ryan]

  //     선물을 준 사람 선물을 받은 사람
  const giftMap = {};

  //     선물을 받은 사람 선물을 준 사람
  const getMap = {};

  for (let names of gifts) {
    //         준 사람, 받은 사람
    const [buyP, getP] = names.split(" ");

    giftMap[buyP] = giftMap[buyP] || { total: 0 };
    getMap[getP] = getMap[getP] || { total: 0 };

    giftMap[buyP][getP] = (giftMap[buyP][getP] || 0) + 1;
    getMap[getP][buyP] = (getMap[getP][buyP] || 0) + 1;

    giftMap[buyP].total += 1;
    getMap[getP].total += 1;
  }

  console.log(giftMap, getMap);

  //     받은 선물 , 준 선물 갱신 => 선물 지수 갱신 위해

  const giftJisu = {};

  for (const name of friends) {
    //         준 선물 - 받은 선물

    //         undefiend라면
    const giveGiftCnt = !giftMap[name] ? 0 : giftMap[name]["total"];

    //         받은 선물 수 getMap
    const getGiftCnt = !getMap[name] ? 0 : getMap[name]["total"];

    giftJisu[name] = giveGiftCnt - getGiftCnt;
  }

  const set = new Set();

  const nextMonthGift = {};

  for (let name of friends) {
    nextMonthGift[name] = 0;
  }

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      let main = friends[i];
      let freind = friends[j];

      const giveGiftCnt = (giftMap[main] && giftMap[main][freind]) || 0;
      const getGiftCnt = (giftMap[freind] && giftMap[freind][main]) || 0;

      //           지수 비교
      if (giveGiftCnt - getGiftCnt === 0) {
        if (giftJisu[main] === giftJisu[freind]) continue;

        if (giftJisu[main] > giftJisu[freind]) {
          nextMonthGift[main] += 1;
          continue;
        }

        nextMonthGift[freind] += 1;
        continue;
      }

      if (giveGiftCnt > getGiftCnt) nextMonthGift[main] += 1;
      else nextMonthGift[freind] += 1;
    }
  }

  const result = Object.entries(nextMonthGift).sort((a, b) => b[1] - a[1]);

  return result[0][1];
}
