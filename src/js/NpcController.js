/* eslint-disable max-len */
import { getRandom } from './generators';
import callCalculator from './callsCalculators';

export default function npcMoveController() {
   this.getCharacters()
   // Проверка возможности атаки и выбор сильного персонажа НАЧАЛО
   const getNpcSortedByAttack = (filter) => {
      this.getCharPosition();
      let attack = 0;
      let index = 0;
      if (filter === 'max') {
         this.team2.characters.forEach((npm, i) => {
            if (npm.attack > attack) {
               attack = npm.attack;
               index = i;
            }
         });
      } else {
         this.team2.characters.forEach((npm, i) => {
            if (npm.attack < attack) {
               attack = npm.attack;
               index = i;
            }
         });
      }
      return this.team2.characters[index];
   };

   let npcPossibleAttack = callCalculator(getNpcSortedByAttack('max').position, getNpcSortedByAttack('max').type, true);
   if (npcPossibleAttack.includes(this.team1.positions.pos1) || (npcPossibleAttack.includes(this.team1.positions.pos2))) {
      this.npc.char = getNpcSortedByAttack('max');
      this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
      this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
      this.npc.attackIsPossible = true;
   } else {
      npcPossibleAttack = callCalculator(getNpcSortedByAttack('min').position, getNpcSortedByAttack('min').type, true);
      if (npcPossibleAttack.includes(this.team1.positions.pos1) || (npcPossibleAttack.includes(this.team1.positions.pos2))) {
         this.npc.char = getNpcSortedByAttack('min');
         this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
         this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
         this.npc.attackIsPossible = true;
      } else {
         this.npc.char = this.team2.characters[getRandom(this.team2.characters.length)];
         this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
         this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
         this.npc.attackIsPossible = false;
      }
   }

   // Проверка возможности атаки и выброр сильного персонажа Конец
   if (this.npc.attackIsPossible) {
      let userCharIndex = () => {
         return this.npc.possibleAttack.find((e) => {
            if (e === this.team1.positions.pos1 || e === this.team1.positions.pos2) {
               return e;
            }
         });
      }
      let userChar = this.characters.find((e) => {
         if (e.position === userCharIndex()) {
            return e;
         }
      });
      
      const damage = Math.floor(Math.max(this.npc.char.attack - userChar.defence, this.npc.char.attack * 0.1));
      this.gamePlay.showDamage(userCharIndex(), damage).then(() => {
         userChar.health -= damage;
         this.getCharacters();
         this.gamePlay.redrawPositions(this.getCharPosition());
         this.isCharMove = true;
      });
   } else {
      const step = () => {
         this.npc.char.position = this.npc.possiblePass[getRandom(this.npc.possiblePass.length)];
         if (!this.charPosition.includes(this.npc.char.position)) {
         } else {
            step();
         }
      };
      console.log(this.npc)
      step();

      this.gamePlay.redrawPositions(this.getCharPosition());
      this.isCharMove = true;
   }
}
