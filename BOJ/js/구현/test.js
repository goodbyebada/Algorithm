const arr = [
  [2, 3],
  [1, 4],
];
arr.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[1] - b[1];
  } else {
    return a[0] - b[0];
  }
});
console.log(arr);
