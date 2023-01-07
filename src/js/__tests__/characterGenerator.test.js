import Character from '../Character'
import { generateTeam } from '../generators';
import Bowman from '../characters/Bowman';
import Magician from '../characters/Magician';
import Swordsman from '../characters/Swordsman';

//Функции расширенного теста
import './funcsForTests/toBeAllowedTypes'
import './funcsForTests/toBeWithinRange'

test('should return char extends from Character', () => {
   const received = new Bowman(1);
   expect(received).toBeInstanceOf(Character)
})

test('should throw error if created char from Character', () => {
   expect(() => {
      new Character(1, 'bowman')
   }).toThrow('Ошибка данных');
})

test('should create a character with With the right properties', () => {
   const received = new Bowman(1);
   const expected = {
      level: 1,
      attack: 25,
      defence: 25,
      health: 50,
      type: 'bowman'
   }
   expect(received).toEqual(expected)
})


const allowedTypes = [Bowman, Swordsman, Magician];
const received = generateTeam(allowedTypes, 4, 50);

test('generator should create 50 characters from the first to 4 levels', () => {
   for (let i = 0; i < 50; i++) {
      expect(received.characters[i].level).toBeWithinRange(1,4)
   }
});

test('generator should make type of character random from a given array of values', () => {
   for (let i = 0; i < 50; i++) {
      expect(received.characters[i]).toBeAllowedType(allowedTypes)
   }
})



