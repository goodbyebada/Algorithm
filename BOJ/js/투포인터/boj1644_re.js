//  소수의 연속 합

const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = +require("fs").readFileSync(path).toString().trim();

// 에라토스테네스의 체 알고리즘
function getPrimeList(num) {
  const isPrime = new Array(num + 1).fill(true);
  //  쓰지 않는 수는 명시적으로 false 처리한다.
  isPrime[0] = isPrime[1] = false;
  const prime = [];

  for (let i = 2; i <= num; i++) {
    if (isPrime[i]) {
      prime.push(i);
      for (let j = i * i; j <= num; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return prime;
}

function twoPointerProcess(prime, num, count) {
  let start = 0;
  let end = 0;
  let sum = 0;

  // break를 없애고 while 조건에서 종료 조건을 직접 설정
  while (start <= end && end <= prime.length) {
    if (sum === num) count++;

    if (sum < num) {
      sum += prime[end];
      end++;
    } else {
      sum -= prime[start];
      start++;
    }
  }

  return count;
}

function sol(input) {
  let count = 0;
  const prime = getPrimeList(input);

  count = twoPointerProcess(prime, input, count);
  console.log(count);
}

sol(input);
