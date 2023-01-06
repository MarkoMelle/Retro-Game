/* eslint-disable max-len */
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["char"] }] */
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';

export default function advancedCharPars(characters) {
  characters.forEach((char) => {
    if (char.type === 'bowman') {
      const result = new Bowman();
      result.level = char.level;
      result.attack = char.attack;
      result.defence = char.defence;
      result.health = char.health;
      result.team = char.team;
      result.position = char.position;
      this.characters.push(result);
    } else if (char.type === 'swordsman') {
      const result = new Swordsman();
      result.level = char.level;
      result.attack = char.attack;
      result.defence = char.defence;
      result.health = char.health;
      result.team = char.team;
      result.position = char.position;
      this.characters.push(result);
    } else if (char.type === 'magician') {
      const result = new Magician();
      result.level = char.level;
      result.attack = char.attack;
      result.defence = char.defence;
      result.health = char.health;
      result.team = char.team;
      result.position = char.position;
      this.characters.push(result);
    } else if (char.type === 'daemon') {
      const result = new Daemon();
      result.level = char.level;
      result.attack = char.attack;
      result.defence = char.defence;
      result.health = char.health;
      result.team = char.team;
      result.position = char.position;
      this.characters.push(result);
    } else if (char.type === 'undead') {
      const result = new Undead();
      result.level = char.level;
      result.attack = char.attack;
      result.defence = char.defence;
      result.health = char.health;
      result.team = char.team;
      result.position = char.position;
      this.characters.push(result);
    } else if (char.type === 'vampire') {
      const result = new Vampire();
      result.level = char.level;
      result.attack = char.attack;
      result.defence = char.defence;
      result.health = char.health;
      result.team = char.team;
      result.position = char.position;
      this.characters.push(result);
    }
  });
}
