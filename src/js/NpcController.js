/* eslint-disable max-len */
import { getRandom } from './generators';
import callCalculator from './callsCalculators';

export default function npcMoveController() {
   if (!this.isCharMove) {
      this.npc = {};
      this.getCharacters()
      // Проверка возможности атаки и выбор сильного персонажа НАЧАЛО
      let lastSortIndex = 0;
      const getNpcSortedByAttack = () => {
         this.getCharPosition();
         let attack = 0;
         let index = 0;
            this.team2.characters.forEach((npc, i) => {
               if (npc.attack > attack) {
                  attack = npc.attack;
                  index = i;
               }
            });
         lastSortIndex = index;
         return this.team2.characters[index];
      };

      const npcAttack = (char) => {
         const damage = Math.round(Math.max(this.npc.char.attack - char.defence, this.npc.char.attack * 0.1));
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
         lastSortChar = getNpcSortedByAttack();
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
      // Проверка возможности атаки и выброр сильного персонажа Конец

      // Произвольные ход сильнешим перснажем при отсутсвии возможности нанести атаку
      const npcStep = () => {
         this.npc.char = getNpcSortedByAttack();
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
         npcStep.call(this)
      }
   }
}

