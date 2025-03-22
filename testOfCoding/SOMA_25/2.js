/**
 *
 * 이중 배열 table, 문자열 search 줌
 * search 는 tablecolum value 형태로 띄어쓰기로 이어져있음
 *
 * 한 쿼리문을 검색할때다 나온 검색량의 총합을 구해라
 *
 * 근데 colum이 겹치지 않는다고 말했다는 기억이 안난다.
 *
 */

const table = [
  ["type", "clothes", "name"],
  ["true", "b", "c"],
  ["false", "c", "f"],
];

const serach = "type true clothes b";

function sol(table, serach) {
  let answer = "";

  const colum = table.shift();

  //   colm , index
  const columMap = new Map();

  for (let i = 0; i < colum.length; i++) {
    columMap.set(colum[i], i);
  }

  //   [colum, val] 이중 배열로 만들기
  let serachArr = [];
  serach = serach.split(" ");

  for (let i = 0; i < serach.length; i += 2) {
    const col = serach[i];
    const val = serach[i + 1];
    serachArr.push([col, val]);
  }

  for (let i = 0; i < serach.length; i++) {
    const [col, val] = serach[i];
    const idx = columMap.get(col);

    table = table.filter((elem) => elem[idx] === val);
    answer += table.length;
  }

  return answer;
}
