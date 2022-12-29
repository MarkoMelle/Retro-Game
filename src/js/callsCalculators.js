import calculatePass from "./calculatePass";
import calculateAttack from "./calculateAttack";

export default function callCalculator(index, charType, isAttack, boardSize = 8) {
  let result;
  if (charType === 'swordsman' || charType === 'undead') {
    if (isAttack) {
      result = calculateAttack(index, 1, boardSize);
    } else {
      result = calculatePass(index, 4, boardSize);
    }
  }
  if (charType === 'bowman' || charType === 'vampire') {
    if (isAttack) {
      result = calculateAttack(index, 2, boardSize);
    } else {
      result = calculatePass(index, 2, boardSize);
    }
  }
  if (charType === 'magician' || charType === 'daemon') {
    if (isAttack) {
      result = calculateAttack(index, 4, boardSize);
    } else {
      result = calculatePass(index, 1, boardSize);
    };
  }
  return result;
}
