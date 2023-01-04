/* eslint-disable max-len */
import { getRandom } from './generators';
import callCalculator from './callsCalculators';

export default function npcMoveController() {
   this.getCharacters()
   // Проверка возможности атаки и выбор сильного персонажа НАЧАЛО
   let lastSortIndex = 0;
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
      lastSortIndex = index;
      return this.team2.characters[index];
   };

   const npcAttack = (char) => {
      const damage = Math.floor(Math.max(this.npc.char.attack - char.defence, this.npc.char.attack * 0.1));
      this.gamePlay.showDamage(char.position, damage).then(() => {
         char.health -= damage;
         this.getCharacters();
         this.gamePlay.redrawPositions(this.getCharPosition());
         this.isCharMove = true;
      });
   }


   for (let i = 0; i < this.characters.length; i++) {
      let lastSortChar;
      let npcPossibleAttack;
      const char = this.characters[i];
      lastSortChar = getNpcSortedByAttack('max');
      npcPossibleAttack = callCalculator(lastSortChar.position, lastSortChar.type, true);
      if (npcPossibleAttack.includes(char.position) && char.team === 'team1') {
         this.npc.char = lastSortChar;
         this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
         this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
         npcAttack(char);
         this.isCharMove = true;
         break
      } else {
         lastSortIndex = lastSortIndex === this.team2.characters.length - 1 ? 0 : lastSortIndex + 1;
         lastSortChar = this.team2.characters[lastSortIndex]
         npcPossibleAttack = callCalculator(lastSortChar.position, lastSortChar.type, true);
         if (npcPossibleAttack.includes(char.position) && char.team === 'team1') {
            this.npc.char = lastSortChar;
            this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
            this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
            npcAttack(char);
            this.isCharMove = true;
            break
         }
      }
   }

   // let npcPossibleAttack = callCalculator(getNpcSortedByAttack('max').position, getNpcSortedByAttack('max').type, true);
   // if (npcPossibleAttack.includes(this.team1.positions.pos1) || (npcPossibleAttack.includes(this.team1.positions.pos2))) {
   //    this.npc.char = getNpcSortedByAttack('max');
   //    this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
   //    this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
   //    this.npc.attackIsPossible = true;
   // } else {
   //    npcPossibleAttack = callCalculator(getNpcSortedByAttack('min').position, getNpcSortedByAttack('min').type, true);
   //    if (npcPossibleAttack.includes(this.team1.positions.pos1) || (npcPossibleAttack.includes(this.team1.positions.pos2))) {
   //       this.npc.char = getNpcSortedByAttack('min');
   //       this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
   //       this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
   //       this.npc.attackIsPossible = true;
   //    } else {
   //       this.npc.char = this.team2.characters[getRandom(this.team2.characters.length)];
   //       this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
   //       this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
   //       this.npc.attackIsPossible = false;
   //    }
   // }
   // Проверка возможности атаки и выброр сильного персонажа Конец

   function npcStep() {
      this.npc.char = this.team2.characters[getRandom(this.team2.characters.length)];
      this.npc.possibleAttack = callCalculator(this.npc.char.position, this.npc.char.type, true);
      this.npc.possiblePass = callCalculator(this.npc.char.position, this.npc.char.type, false);
      this.npc.char.position = this.npc.possiblePass[getRandom(this.npc.possiblePass.length)];
      if (!this.charPosition.includes(this.npc.char.position)) {
      } else {
         npcStep();
      }
      this.gamePlay.redrawPositions(this.getCharPosition());
      this.isCharMove = true;
   };
   if (!this.isCharMove) {
      npcStep.bind(this)()
   }
}

