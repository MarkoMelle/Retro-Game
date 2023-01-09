import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';

import callCalculator from '../callCalculators'

//Расчет от клетки с индексом 27
const valuesForOneField = [19, 35, 36, 34, 20, 18, 28, 26]; // 8 значений
const valuesForTwoFieldPass = [11, 43, 45, 41, 13, 9, 29, 25, 19, 35, 36, 34, 20, 18, 28, 26]; //16 значений
const valuesForTwoFieldAttack = [11, 43, 45, 37, 44, 41, 33, 42, 13, 21, 12, 9, 17, 10, 29, 25, 19, 35, 36, 34, 20, 18, 28, 26];//24 значения
const valuesForFierFieldPass = [59, 63, 31, 3, 51, 54, 48, 6, 0, 30, 24, 11, 43, 45, 41, 13, 9, 29, 25, 19, 35, 36, 34, 20, 18, 28, 26]; //27 значений
const valuesForFierFieldAttack = [59, 63, 55, 47, 39, 62, 61, 60, 56, 57, 58, 7, 15, 23, 31, 3, 51, 54, 46, 38, 53, 52, 48, 40, 32, 49, 50, 6, 14, 22, 5, 4, 0, 8, 16, 1, 2, 30, 24, 11, 43, 45, 37, 44, 41, 33, 42, 13, 21, 12, 9, 17, 10, 29, 25, 19, 35, 36, 34, 20, 18, 28, 26]//Все поле(63 значения)


test.each([
   [27, new Bowman(1).type, valuesForTwoFieldPass],
   [27, new Swordsman(1).type, valuesForFierFieldPass],
   [27, new Magician(1).type, valuesForOneField],
])('should generating array of values are possible moves', (index, charType, expected) => {
   expect(callCalculator(index,charType, false)).toEqual(expected);
});

test.each([
   [27, new Bowman(1).type, valuesForTwoFieldAttack],
   [27, new Swordsman(1).type, valuesForOneField],
   [27, new Magician(1).type, valuesForFierFieldAttack],
])('should generating array of values are possible attack', (index, charType, expected) => {
   expect(callCalculator(index,charType, true)).toEqual(expected);
});