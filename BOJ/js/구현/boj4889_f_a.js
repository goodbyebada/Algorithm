const path = process.platform === "linux" ? "/dev/stdin" : "input.txt";
const inputs = require("fs").readFileSync(path).toString().trim().split("\n");

function count(removedStr) {
  let answer = 0;
  for (let i = 0; i < removedStr.length - 1; i += 2) {
    const front = removedStr[i];
    const back = removedStr[i + 1];

    if (front === "}") {
      answer++;
    }

    if (back === "{") {
      answer++;
    }
  }

  return answer;
}

function count2(removedStr) {
  let compare = ["{", "}"];
  let answer = 0;
  for (let i = 0; i < removedStr.length; i++) {
    if (compare[i % 2] !== removedStr[i]) answer++;
  }
  return answer;
}

function restStr(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (stack.length > 0 && stack[stack.length - 1] === "{" && str[i] === "}") {
      stack.pop();
      continue;
    }
    stack.push(str[i]);
  }

  return count(stack.join(""));
}

function sol(inputs) {
  for (let i = 0; i < inputs.length - 1; i++) {
    if (inputs[0] === "-") break;
    const answer = restStr(inputs[i]);
    console.log(`${i + 1}. ${answer}`);
  }
}

sol(inputs);
