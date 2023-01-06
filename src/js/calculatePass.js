export default function calculatePass(index, amount, boardSize) {
  let result = [];
  if (amount === 4) {
    result = [
      (index - 4 * (boardSize)),
      (index + 4 * (boardSize)),
      (index + 4 * (index % boardSize <= 3 && index < 28 ? boardSize + 1 : 0)),
      (index + 4 * (index % boardSize >= 4 && index < 32 ? boardSize - 1 : 0)),
      (index - 4 * (index % boardSize <= 3 && index > 31 ? boardSize - 1 : 0)),
      (index - 4 * (index % boardSize >= 4 && index > 35 ? boardSize + 1 : 0)),
      (index + (index % boardSize < 4 ? 4 : 0)),
      (index - (index % boardSize >= 4 ? 4 : 0)),

      (index - 3 * (boardSize)),
      (index + 3 * (boardSize)),
      (index + 3 * (index % boardSize <= 4 && index < 37 ? boardSize + 1 : 0)),
      (index + 3 * (index % boardSize >= 3 && index < 40 ? boardSize - 1 : 0)),
      (index - 3 * (index % boardSize <= 4 && index > 23 ? boardSize - 1 : 0)),
      (index - 3 * (index % boardSize >= 3 && index > 26 ? boardSize + 1 : 0)),
      (index + (index % boardSize <= 4 ? 3 : 0)),
      (index - (index % boardSize >= 3 ? 3 : 0)),

      (index - 2 * (boardSize)),
      (index + 2 * (boardSize)),
      (index + 2 * (index % boardSize <= 5 && index < 46 ? boardSize + 1 : 0)),
      (index + 2 * (index % boardSize >= 2 && index < 48 ? boardSize - 1 : 0)),
      (index - 2 * (index % boardSize <= 5 && index > 15 ? boardSize - 1 : 0)),
      (index - 2 * (index % boardSize >= 2 && index > 17 ? boardSize + 1 : 0)),
      (index + (index % boardSize <= 5 ? 2 : 0)),
      (index - (index % boardSize >= 2 ? 2 : 0)),

      (index - (boardSize)),
      (index + (boardSize)),
      (index + (index % boardSize <= 6 && index < 55 ? boardSize + 1 : 0)),
      (index + (index % boardSize >= 1 && index < 56 ? boardSize - 1 : 0)),
      (index - (index % boardSize <= 6 && index > 7 ? boardSize - 1 : 0)),
      (index - (index % boardSize >= 1 && index > 8 ? boardSize + 1 : 0)),
      (index + (index % boardSize <= 6 ? 1 : 0)),
      (index - (index % boardSize >= 1 ? 1 : 0)),
    ];
  } else if (amount === 2) {
    result = [
      (index - 2 * (boardSize)),
      (index + 2 * (boardSize)),
      (index + 2 * (index % boardSize <= 5 && index < 46 ? boardSize + 1 : 0)),
      (index + 2 * (index % boardSize >= 2 && index < 48 ? boardSize - 1 : 0)),
      (index - 2 * (index % boardSize <= 5 && index > 15 ? boardSize - 1 : 0)),
      (index - 2 * (index % boardSize >= 2 && index > 17 ? boardSize + 1 : 0)),
      (index + (index % boardSize <= 5 ? 2 : 0)),
      (index - (index % boardSize >= 2 ? 2 : 0)),

      (index - (boardSize)),
      (index + (boardSize)),
      (index + (index % boardSize <= 6 && index < 55 ? boardSize + 1 : 0)),
      (index + (index % boardSize >= 1 && index < 56 ? boardSize - 1 : 0)),
      (index - (index % boardSize <= 6 && index > 7 ? boardSize - 1 : 0)),
      (index - (index % boardSize >= 1 && index > 8 ? boardSize + 1 : 0)),
      (index + (index % boardSize <= 6 ? 1 : 0)),
      (index - (index % boardSize >= 1 ? 1 : 0)),
    ];
  } else if (amount === 1) {
    result = [
      (index - (boardSize)),
      (index + (boardSize)),
      (index + (index % boardSize <= 6 && index < 55 ? boardSize + 1 : 0)),
      (index + (index % boardSize >= 1 && index < 56 ? boardSize - 1 : 0)),
      (index - (index % boardSize <= 6 && index > 7 ? boardSize - 1 : 0)),
      (index - (index % boardSize >= 1 && index > 8 ? boardSize + 1 : 0)),
      (index + (index % boardSize <= 6 ? 1 : 0)),
      (index - (index % boardSize >= 1 ? 1 : 0)),
    ];
  }
  result = result.map((e) => (e !== index && e >= 0 && e <= 63 ? e : false));
  result = result.filter((n) => typeof n === 'number');
  return result;
}
