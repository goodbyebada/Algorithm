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
    // i*i로 시작하면 중복된 숫자를 제외할 수 있다.
    for (let j = i * i; j <= num; j += i) {
      isDemical[j] = false;
    }
  }

  return isDemical;
}

function nextVal(isDemical, curIdx) {
  for (let idx = curIdx + 1; idx < isDemical.length; idx++) {
    if (isDemical[idx]) {
      return idx;
    }
  }

  return isDemical.length;
}

function twoPointerProcess(isDemical, num, count) {
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
      if (end === isDemical.length) break;

      sum += end;

      end = nextVal(isDemical, end);
      //   더하고 나서도 작다면 end == len이 되기  때문에 break
    } else {
      if (start === isDemical.length) break;
      sum -= start;
      start = nextVal(isDemical, start);
    }
  }

  return count;
}

function sol() {
  let count = 0;
  let isDemical = [];

  isDemical = getIsDemicalList(input);

  count = twoPointerProcess(isDemical, input, count);
  console.log(count);
}

sol();
