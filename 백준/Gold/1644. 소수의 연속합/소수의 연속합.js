//  소수의 연속 합

/**
 * 1. 연속된 소수의 합으로 자연수를 나타내야한다.
 *
 * 자연수가 주어졌을대, 연속된 소수의 합 경우의 수를 구해야한다.
 *
 *
 */

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = +require("fs").readFileSync(path).toString().trim();

// 에라토스테네스의 체 알고리즘
function getIsDemicalList(num) {
  const isDemical = new Array(num + 1).fill(true);
  //   0과 1은 사용 X

  for (let i = 2; i <= Math.sqrt(num); i++) {
    // 남은 수인 경우 (소수인 경우)
    if (isDemical[i]) {
      let j = 2;
      while (i * j <= num) {
        if (isDemical[i * j]) isDemical[i * j] = false;
        j++;
      }
    }
  }
  return isDemical;
}

function nextVal(sosuList, curIdx) {
  for (let idx = curIdx + 1; idx < sosuList.length; idx++) {
    if (sosuList[idx]) {
      return idx;
    }
  }

  return sosuList.length;
}

function twoPointerProcess(sosuList, num, count) {
  let start = 2;
  let end = 2;
  let sum = 0;

  //  sum > num start가 움직인다.
  //  sum < num 일 때 end가 움직인다.
  //   end len-1이고 sum < num이라면 break
  //
  //   start 가 len -1이라면 break -> 같은 방향으로

  while (1) {
    if (sum === num) count++;

    if (sum < num) {
      if (end === sosuList.length) break;

      sum += end;

      end = nextVal(sosuList, end);
      //   더하고 나서도 작다면 end == len이 되기  때문에 break
    } else {
      if (start === sosuList.length) break;
      sum -= start;
      start = nextVal(sosuList, start);
    }
  }

  return count;
}

function sol() {
  let count = 0;
  let sosuList = [];

  sosuList = getIsDemicalList(input);

  count = twoPointerProcess(sosuList, input, count);
  console.log(count);
}

sol();
