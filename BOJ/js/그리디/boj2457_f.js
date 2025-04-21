const path = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs").readFileSync(path).toString().trim().split("\n");
const N = +input[0];
let days = input.splice(1, N).map((elem) => elem.split(" "));

sol(days);

function sol(days) {
  const monthCountList = makeMonthCount();
  days = days
    .map((day) => {
      day = day.map(Number);
      return addLiveDay(day, monthCountList);
    })
    .sort((a, b) => b[4] - a[4]);

  console.log(days);

  //sm sd lm  ld liveDay
  const answer = greedy(days);
  console.log(answer);
}

function greedy(days) {
  // 긴 것 부터 찾는다.
  let answer = 0;

  //   3월 1일부터 11월 30일까지

  const [initSm, initSd, initLm, initLd] = [3, 1, 11, 30];
  let prevDate = days[0];
  answer++;

  for (let i = 1; i < N; i++) {
    // 마지막으로 선택된 날짜 start, end 비교 🙅‍♀️
    if (
      initSm === prevDate[0] &&
      initSd === prevDate[1] &&
      initLm === prevDate[2] &&
      initLd === prevDate[3] - 1
    ) {
      return answer;
    }

    const [sm, sd, lm, ld] = days[i];

    // 되는 조건
    // startdate <=   prevEndDate <= endDate
    // startdate <= prevStartdate <= endDate

    if (
      sm <= prevDate[0] &&
      sd <= prevDate[1] &&
      prevDate[0] <= lm &&
      prevDate[1] <= ld
    ) {
      prevDate = days[i];
      answer++;
      continue;
    }

    if (
      sm <= prevDate[2] &&
      sd <= prevDate[3] &&
      prevDate[2] <= lm &&
      prevDate[3] <= ld
    ) {
      prevDate = days[i];
      answer++;
      continue;
    }
  }

  // 마지막으로 선택된 날짜 start, end 비교 🙅‍♀️
  if (
    initSm === prevDate[0] &&
    initSd === prevDate[1] &&
    initLm === prevDate[2] &&
    initLd === prevDate[3] - 1
  ) {
    return answer;
  }

  //   조건 불 만족
  return 0;
}

//  N (1 ≤ N ≤ 100,000) 10^5
function addLiveDay(day, monthCountList) {
  const [sm, sd, lm, ld] = day;

  let sum = 0;

  //   sm+1 ~ lm-1까지의 합
  // 0번부터 시작하는 인덱스라서 sm ~ lm까지의 합

  // 첫달
  sum += monthCountList[sm - 1] - sd + 1;
  // 마지막 달
  sum += monthCountList[lm - 1] - ld;

  for (let i = sm; i < lm - 1; i++) {
    sum += monthCountList[i];
  }

  day.push(sum);

  return day;
}

// (올해는 4, 6, 9, 11월은 30일까지 있고, 1, 3, 5, 7, 8, 10, 12월은 31일까지 있으며, 2월은 28일까지만 있다.

function makeMonthCount() {
  const monthCountList = Array(12).fill(0);
  for (let m = 0; m < 12; m++) {
    let i = m + 1;

    if (i == 2) {
      monthCountList[i] = 28;
      continue;
    }

    if (i <= 7) {
      if (i % 2 == 0) {
        monthCountList[i] = 30;
        continue;
      }

      monthCountList[i] = 31;
      continue;
    }

    if (i % 2 == 0) {
      monthCountList[i] = 31;
      continue;
    }

    monthCountList[i] = 30;
    continue;
  }

  return monthCountList;
}
