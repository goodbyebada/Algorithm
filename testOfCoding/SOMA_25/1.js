// 1.

let testA = [1, 2, 3, 3, 4];
let testB = [6, 7, 8, 9, 10];

const answer = sol(testA, testB);
console.log(answer);

function sol(a, b) {
  for (let i = 0; i < 3; i++) {
    const map = new Map();

    for (const num of a) {
      if (map.has(num)) {
        const pevCount = map.get(num);
        map.set(num, pevCount + 1);
      } else {
        map.set(num, 1);
      }
    }

    for (let i = 0; i < a.length; i++) {
      const uniqueNum = a[i];
      if (map.get(uniqueNum) === 1) a[i]++;
    }

    a = a.filter((elem) => b.includes(elem) === false);
  }

  return a;
}
