function solution() {
  const fs = require('fs');
  const input = fs.readFileSync('/dev/stdin').toString().trim().split('\n');
  
  const n = +input[0];
  
  if (n % 2) console.log("SK");
  else console.log("CY");

}

solution();