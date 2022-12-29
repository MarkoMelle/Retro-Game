/* eslint-disable max-len */
import PositionedCharacter from './PositionedCharacter';
import { generateTeam, generateStartPositon } from './generators';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import callCalculator from './callsCalculators';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.selected = {
      index: undefined,
      type: undefined,
    };
    this.isCharMove = true;
  }

  init() {
    this.gamePlay.drawUi('prairie');

    // Team 1
    this.team1 = generateTeam([Bowman, Swordsman, Magician], 4, 2);
    const positionTeam1 = generateStartPositon(this.gamePlay.boardSize, 1, 2);
    this.team1.characters[0].team = 'team1';
    this.team1.characters[1].team = 'team1';
    this.team1.characters[0].position = positionTeam1[0];
    this.team1.characters[1].position = positionTeam1[1];

    // Team 2
    // const positionTeam2 = generateStartPositon(this.gamePlay.boardSize, 2, 2);
    // this.team2 = generateTeam([Daemon, Vampire, Undead], 4, 2);
    // this.team2.characters[0].team = 'team2';
    // this.team2.characters[1].team = 'team2';
    // this.team2.characters[0].position = positionTeam2[0];
    // this.team2.characters[1].position = positionTeam2[1];

    this.characters = [
      this.team1.characters[0],
      this.team1.characters[1],
      // this.team2.characters[0],
      // this.team2.characters[1],
    ];

    this.charPosition = () => {
      return [
        new PositionedCharacter(this.team1.characters[0], this.characters[0].position),
        new PositionedCharacter(this.team1.characters[1], this.characters[1].position),
        // new PositionedCharacter(this.team2.characters[0], this.characters[2].position),
        // new PositionedCharacter(this.team2.characters[1], this.characters[3].position),
      ]
    }

    this.gamePlay.redrawPositions(this.charPosition());

    // Обработчки
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));
  }

  onCellClick(index) {
    const indexInfo = {
      isChar: false,
      isEnemy: false,
      isEmpty: false
    };

    this.characters.forEach((char) => {
      if (char.position === index && char.team === 'team1') {
        indexInfo.isChar = true;
      } else if (char.position === index && char.team === 'team2') {
        indexInfo.isEnemy = true;
      }
    }); 

    if (!indexInfo.isChar && !indexInfo.isEnemy) {
      indexInfo.isEmpty = true;
    }

    this.gamePlay.deselectCell(this.selected.index | 0);

    if (!indexInfo.isEmpty) {
      this.characters.forEach((char) => {
        if (char.position === index && char.team === 'team1') {
          this.gamePlay.selectCell(index);
          this.selected.index = index;
          this.selected.type = char.type;
          this.selected.possiblePass = callCalculator(this.selected.index, this.selected.type, false);
          this.selected.possibleAttack = callCalculator(this.selected.index, this.selected.type, true);
          this.selected.char = char
          this.selected.isSelected = true
          return
        } else if (char.position === index && char.team === 'team2') {
          const damage = Math.max(this.selected.char.attack - char.defence, this.selected.char.attack * 0.1);
          this.gamePlay.showDamage(index,damage).then(()=>{
            char.health -= damage;
            this.gamePlay.redrawPositions(this.charPosition());
          })
        }
      })
    } else if (indexInfo.isEmpty && this.selected.index && this.selected.possiblePass.includes(index)) {
      this.selected.char.position = index;
      this.gamePlay.redrawPositions(this.charPosition());
      this.gamePlay.deselectCell(index);
      this.selected.index = false
    } else if(indexInfo.isEnemy){

    } else {
      this.selected.isSelected = false
      this.gamePlay.setCursor('auto')
    }
  }

  onCellEnter(index) {
    const indexInfo = {
      isChar: false,
      isEnemy: false,
      isEmpty: false
    };
    this.characters.forEach((char) => {
      if (char.position === index && char.team === 'team1') {
        indexInfo.isChar = true;
      } else if (char.position === index && char.team === 'team2') {
        indexInfo.isEnemy = true;
      }
    });

    if (!indexInfo.isChar && !indexInfo.isEnemy) {
      indexInfo.isEmpty = true;
    }


    if (this.selected.isSelected) {
      this.characters.forEach((char) => {
        if (indexInfo.isEnemy && this.selected.possibleAttack.includes(index)) {
          this.gamePlay.setCursor('crosshair');
        } else if (indexInfo.isEnemy) {
          this.gamePlay.setCursor('not-allowed');
        } else if (indexInfo.isChar) {
          this.gamePlay.setCursor('pointer');
        } else {
          this.gamePlay.setCursor('auto')
        }

        if (char.position === index) {
          this.gamePlay.showCellTooltip(`🎖${char.level} ⚔${char.attack} 🛡${char.defence}❤${char.health}`, index);
        }
        if (indexInfo.isEmpty && index !== this.selected.index && this.selected.isSelected && this.selected.possibleAttack.includes(index)) {
          this.gamePlay.selectCell(index, 'green');
          console.log(index)
        }
      });
    }
  }

  onCellLeave(index) {
    if (index !== this.selected.index) {
      this.gamePlay.deselectCell(index);
    }
  }

  // checkChracterType(char) {
  //   return ['bowman', 'swordsman', 'magician'].find((i) => i === char);
  // }
}
