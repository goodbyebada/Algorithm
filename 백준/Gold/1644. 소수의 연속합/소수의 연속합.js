const N = Number(require('fs').readFileSync('/dev/stdin').toString().trim());

const isPrime = Array(N + 1).fill(true);
isPrime[0] = isPrime[1] = false;

for (let i = 2; i <= Math.sqrt(N); i++) {
  for (let j = i * i; j <= N; j += i) {
    isPrime[j] = false;
  }
}

const primes = isPrime.reduce((acc, v, i) => {
  if (v) {
    acc.push(i);
  }
  return acc;
}, []);

let sum = 0;
let count = 0;
let i = 0;
let j = 0;
while (j < primes.length) {
  sum += primes[j];
  while (sum > N) {
    sum -= primes[i];
    i++;
  }
  if (sum === N) {
    count++;
  }
  j++;
}

console.log(count);