// 스티커의 각 칸은 상하좌우로 모두 연결되어 있다.

// 위쪽부터 붙인다, 여러곳이 있다면 왼쪽
// 스티커를 붙일 수 있는 위치 X -> 스티커를 시계 방향으로 90도 회전 한 뒤 다시 도전
// 0도 90 180ㅜ 270도 해보았는데도 붙이지 못했다면, 버린다.

const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = require("fs")
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

//   0도 90도 180도 270도
function rotate90(dir, sticker) {
  if (dir === 0) return sticker;

  // 📌  매번 row col이 바뀌게 된다.
  const rowLen = sticker.length;
  const colLen = sticker[0].length;

  const newSticker = Array.from({ length: colLen }, () =>
    Array(rowLen).fill(0)
  );

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      // 📌  rowLen 길이와 함께 index 계산할 때는 항상 -1
      newSticker[col][rowLen - row - 1] = sticker[row][col];
    }
  }

  return newSticker;
}

// board 변형 X
// 가능한지 확인만 함
function canUseSticker(
  board,
  sticker,
  startRow,
  startCol,
  stickerRow,
  stickerCol
) {
  for (let row = 0; row < stickerRow; row++) {
    for (let col = 0; col < stickerCol; col++) {
      const boardRow = startRow + row;
      const boardCol = startCol + col;

      // 1이고 && 1이라면 부착안됨
      if (sticker[row][col] && board[boardRow][boardCol]) return false;
    }
  }

  return true;
}

function attachSticker(
  board,
  sticker,
  startRow,
  startCol,
  stickerRow,
  stickerCol
) {
  for (let row = 0; row < stickerRow; row++) {
    for (let col = 0; col < stickerCol; col++) {
      if (sticker[row][col]) {
        board[startRow + row][startCol + col] = 1;
      }
    }
  }
}

function search(board, sticker, N, M) {
  const stickerRowLen = sticker.length;
  const stickerColLen = sticker[0].length;

  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      //   되는 경우

      if (row + stickerRowLen - 1 < N && col + stickerColLen - 1 < M) {
        const canUse = canUseSticker(
          board,
          sticker,
          row,
          col,
          stickerRowLen,
          stickerColLen
        );

        // 가능할때만 갱신한다.
        if (canUse) {
          attachSticker(board, sticker, row, col, stickerRowLen, stickerColLen);
          return true;
        }
      }
    }
  }

  return false;
}

// (N*M) * K * 4
// 4^3 * 10^4
function sol(input) {
  let [N, M, K] = input[0].split(" ").map(Number);
  let board = Array.from({ length: N }, () => Array(M).fill(0));
  let index = 1;

  while (K--) {
    const [R, C] = input[index++].split(" ").map(Number);

    let sticker = input
      .slice(index, index + R)
      .map((row) => row.split(" ").map(Number));

    // 4방향으로 찾기 시도한다.
    for (let rotate = 0; rotate < 4; rotate++) {
      sticker = rotate90(rotate, sticker);

      //   가능하다면 탈출!
      if (search(board, sticker, N, M)) break;
    }

    index = index + R;
  }

  let answer = 0;
  for (let row = 0; row < N; row++) {
    for (let col = 0; col < M; col++) {
      if (board[row][col]) answer++;
    }
  }

  console.log(answer);

  //    스티커가 붙은 칸의 수를 출력한다.
}

sol(input);
