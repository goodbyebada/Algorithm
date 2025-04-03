//  소수의 연속 합

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = +require("fs").readFileSync(path).toString().trim();

// 에라토스테네스의 체 알고리즘

// 📌 틀렸습니다. 나왔던 부분
function getIsDemicalList(num) {
  const isDemical = new Array(num + 1).fill(true);

  // 합성수는 반드시 √num 이하의 약수를 갖는다.√num 이하까지 계산하면 그 이후의 배수도 사라진다.
  for (let i = 2; i <= Math.sqrt(num); i++) {
    // i*i로 시작하면 중복된 숫자를 제외할 수 있다.
    for (let j = i * i; j <= num; j += i) {
      isDemical[j] = false;
    }
  }
  return isDemical;
}

// 👎 false true임을 계속 확인해야한다. 더 오래 걸린다
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

function sol(input) {
  let count = 0;
  let isDemical = [];

  isDemical = getIsDemicalList(input);

  count = twoPointerProcess(isDemical, input, count);
  console.log(count);
}
