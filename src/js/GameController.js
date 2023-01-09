/* eslint-disable max-len */
/* eslint no-param-reassign: ["error", { "props": true, "ignorePropertyModificationsFor": ["char"] }] */

import themes from './themes';
import Team from './Team';
import PositionedCharacter from './PositionedCharacter';
import { generateTeam, generateStartPositon, getRandom } from './generators';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import callCalculator from './callCalculators';
import npcMoveController from './NpcController';
import GameState from './GameState';
import GamePlay from './GamePlay';
import advancedCharPars from './advancedCharPars';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.gameState = new GameState();
    this.stateService = stateService;
    this.selected = {};
    this.isCharMove = true;
    this.charPosition = [];
    this.level = 0;
    this.isGameOver = false;

    // Event Handlers
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));

    this.gamePlay.addNewGameListener(() => {
      this.gameState.from(this, this.level + 1);
      this.selected.isSelected = false;
      this.gamePlay.deselectCell(this.selected.index || 0);
      this.level = 0;
      this.init();
      this.isGameOver = false;
      this.isCharMove = true;
    });

    this.gamePlay.addLoadGameListener(() => {
      this.load(this.gameState);
    });

    this.gamePlay.addSaveGameListener(() => {
      this.getCharacters();
      this.gameState.from(this);
      this.stateService.save(this.gameState);
    });
  }

  /**
   * Loads a saved game session from local storage
   */
  load(state) {
    try {
      this.gameState.from(this.stateService.load());
      this.level = state.level;
      this.isCharMove = state.isCharMove;
      this.isGameOver = state.isGameOver;
      this.characters = [];
      this.selected.isSelected = false;
      advancedCharPars.call(this, state.characters);
      this.team1 = new Team([this.characters[0], this.characters[1]]);
      this.team2 = new Team([this.characters[2], this.characters[3]]);
      this.gamePlay.drawUi(themes[this.level]);
      this.gamePlay.redrawPositions(this.getCharPosition());
    } catch (e) {
      GamePlay.showMessage('Сохранения отсутствуют');
    }
  }

  /**
  * initializes a new game
  */
  init() {
    this.gamePlay.drawUi(themes[0]);

    // Team 1
    this.team1 = generateTeam([Bowman, Swordsman, Magician], 4, 2);
    // Generating random positions
    const positionTeam1 = generateStartPositon(this.gamePlay.boardSize, 1, 2);
    this.team1.characters[0].team = 'team1';
    this.team1.characters[1].team = 'team1';
    this.team1.characters[0].position = positionTeam1[0];
    this.team1.characters[1].position = positionTeam1[1];
    // Increases levels
    GameController.levelUp(this.team1.characters[0], true);
    GameController.levelUp(this.team1.characters[1], true);

    // Team 2
    const positionTeam2 = generateStartPositon(this.gamePlay.boardSize, 2, 2);
    this.team2 = generateTeam([Daemon, Vampire, Undead], 4, 2);
    // Generating random positions
    this.team2.characters[0].team = 'team2';
    this.team2.characters[1].team = 'team2';
    this.team2.characters[0].position = positionTeam2[0];
    this.team2.characters[1].position = positionTeam2[1];
    // Increases levels
    GameController.levelUp(this.team2.characters[0], true);
    GameController.levelUp(this.team2.characters[1], true);

    this.getCharacters = () => {
      // Removing the dead from team 1
      this.team1.characters = this.team1.characters.filter((char) => (char.health > 0 ? char : false));

      // Removing the dead from team 2
      this.team2.characters = this.team2.characters.filter((char) => (char.health > 0 ? char : false));

      let result = [
        this.team1.characters[0] && this.team1.characters[0].health > 0 ? this.team1.characters[0] : undefined,
        this.team1.characters[1] && this.team1.characters[1].health > 0 ? this.team1.characters[1] : undefined,
        this.team2.characters[0] && this.team2.characters[0].health > 0 ? this.team2.characters[0] : undefined,
        this.team2.characters[1] && this.team2.characters[1].health > 0 ? this.team2.characters[1] : undefined,
      ];

      result = result.filter((e) => e);
      this.characters = result;
      // Checking for the end of the round or if a player loses
      if (this.characters.length <= 2) {
        const team1 = [];
        const team2 = [];
        this.characters.forEach((char) => {
          if (char.team === 'team1') {
            team1.push(char);
          } else {
            team2.push(char);
          }
        });
        if (team2.length === 0) {
          this.nextLevel();
        } else if (team1.length === 0) {
          this.isGameOver = true;
        }
      }
    };

    this.getCharacters();

    this.getCharPosition = () => {
      this.charPosition = [];
      const result = [];
      this.characters.forEach((char) => {
        result.push(new PositionedCharacter(char, char.position));
        this.charPosition.push(char.position);
      });
      return result;
    };

    this.gamePlay.redrawPositions(this.getCharPosition());
  }

  /**
   * Click logic
   * @param index selected cell index
   */
  onCellClick(index) {
    this.gamePlay.deselectCell(this.selected.index || 0);
    if (!this.isGameOver && this.isCharMove) {
      this.getCharacters();

      // Checking cell properties
      const cellInfo = {
        isChar: false,
        isEnemy: false,
        isEmpty: false,
      };
      this.characters.forEach((char) => {
        if (char.position === index && char.team === 'team1') {
          cellInfo.isChar = true;
        } else if (char.position === index && char.team === 'team2') {
          cellInfo.isEnemy = true;
        }
      });
      if (!cellInfo.isChar && !cellInfo.isEnemy) {
        cellInfo.isEmpty = true;
      }

      // The logic of selecting a character or attacking an enemy
      if (!cellInfo.isEmpty) {
        this.characters.forEach((char) => {
          if (char.position === index && cellInfo.isChar) {
            // selecting a character
            this.gamePlay.selectCell(index);
            this.selected.index = index;
            this.selected.type = char.type;
            this.selected.possiblePass = callCalculator(this.selected.index, this.selected.type, false);
            this.selected.possibleAttack = callCalculator(this.selected.index, this.selected.type, true);
            this.selected.char = char;
            this.selected.isSelected = true;
          } else if (this.selected.isSelected && char.position === index && cellInfo.isEnemy && this.selected.possibleAttack.includes(index)) {
            // attacking enemy
            const damage = Math.round(Math.max(this.selected.char.attack - char.defence, this.selected.char.attack * 0.1));
            this.gamePlay.showDamage(index, damage).then(() => {
              char.health -= damage;
              this.isCharMove = false;
              this.selected.isSelected = false;
              this.gamePlay.setCursor('pointer');
              this.getCharacters();
              this.gamePlay.redrawPositions(this.getCharPosition());
              this.npcMove();
            });
          } else if (this.selected.isSelected && cellInfo.isEnemy && !this.selected.possibleAttack.includes(index)) {
            // Ignore attacks outside the radius
            this.gamePlay.selectCell(this.selected.index);
          }
        });
      } else if (cellInfo.isEmpty && this.selected.isSelected && this.selected.possiblePass.includes(index)) {
        // character move
        this.selected.char.position = index;
        this.gamePlay.redrawPositions(this.getCharPosition());
        this.gamePlay.deselectCell(index);
        this.selected.isSelected = false;
        this.gamePlay.setCursor('pointer');
        this.isCharMove = false;
        this.npcMove();
      } else {
        // Missclick
        this.selected.isSelected = false;
      }
    }
  }

  onCellEnter(index) {
    if (!this.isGameOver) {
      // Checking cell properties
      const cellInfo = {
        isChar: false,
        isEnemy: false,
        isEmpty: true,
      };
      this.characters.forEach((char) => {
        if (char.position === index && char.team === 'team1') {
          cellInfo.isChar = true;
          cellInfo.isEmpty = false;
        } else if (char.position === index && char.team === 'team2') {
          cellInfo.isEnemy = true;
          cellInfo.isEmpty = false;
        }
      });

      // Cursor logic
      this.characters.forEach((char) => {
        if (this.selected.isSelected) {
          if (cellInfo.isEnemy && this.selected.possibleAttack.includes(index)) {
            this.gamePlay.setCursor('crosshair');
          } else if (cellInfo.isEnemy) {
            this.gamePlay.setCursor('not-allowed');
          } else if (cellInfo.isChar || cellInfo.isEmpty) {
            this.gamePlay.setCursor('pointer');
          } else {
            this.gamePlay.setCursor('auto');
          }
          if (cellInfo.isEmpty && index !== this.selected.index && this.selected.isSelected && this.selected.possiblePass.includes(index)) {
            this.gamePlay.selectCell(index, 'green');
          }
        }
        if (char.position === index) {
          this.gamePlay.showCellTooltip(`🎖${char.level} ⚔${char.attack} 🛡${char.defence}❤${char.health}`, index);
        }
      });
    }
  }

  onCellLeave(index) {
    if (index !== this.selected.index) {
      this.gamePlay.deselectCell(index);
    }
    this.gamePlay.hideCellTooltip(index);
  }

  /**
   * Calls the NPC's logic
   */
  npcMove() {
    npcMoveController.bind(this)();
  }

  /**
   * Increases the level of a character
   */
  static levelUp(char, isSpawn = false) {
    if (isSpawn) {
      const spawnLevelUp = (amount) => {
        let counter = 0;
        const callBack = () => {
          if (counter <= amount) {
            counter += 1;

            const getRandomFactor = () => {
              let element = 1;
              const result = [];
              for (let index = 0; index <= 20; index += 1) {
                result.push(element);
                element += 0.01;
              }
              return result;
            };
            const randomFactor = getRandomFactor();
            char.attack = Math.round(char.attack * randomFactor[getRandom(randomFactor.length)]);// нигде не прописан принцие просчет в случае спавна, было взят рандом до 20%
            char.defence = Math.round(char.defence * randomFactor[getRandom(randomFactor.length)]);// нигде не прописан принцие просчет в случае спавна, было взят рандом до 20%
            callBack(amount);
          }
        };
        if (counter !== amount) {
          callBack(amount);
        }
      };
      spawnLevelUp(char.level);
    } else {
      if (char.level === 4) {
        char.health = char.health + 80 > 100 ? 100 : char.health + 80;
        return;
      }
      char.level += 1;
      char.attack = Math.round(Math.max(char.attack, char.attack * (80 + char.health) * 0.01));
      char.defence = Math.round(Math.max(char.defence, char.defence * (80 + char.health) * 0.01));
      char.health = char.health + 80 > 100 ? 100 : char.health + 80;
    }
  }

  /**
   * The logic of starting a new round
   */
  nextLevel() {
    this.isCharMove = true;
    if (this.level <= 2 && !this.isGameOver) {
      this.level += 1;
      /**
       * Generates a new enemy team
       */
      const positionTeam2 = generateStartPositon(this.gamePlay.boardSize, 2, 2);

      this.team2 = generateTeam([Daemon, Vampire, Undead], 4, 2);
      this.team2.characters[0].team = 'team2';
      this.team2.characters[1].team = 'team2';
      this.team2.characters[0].position = positionTeam2[0];
      this.team2.characters[1].position = positionTeam2[1];
      GameController.levelUp(this.team2.characters[0], true);
      GameController.levelUp(this.team2.characters[1], true);
      // New starting positions and adding a new character if needed
      if (this.characters.length < 2) {
        // If there is one character left, raise his level, create a new team of one character and add the remaining
        GameController.levelUp(this.characters[0]);
        this.team1 = generateTeam([Bowman, Swordsman, Magician], 4, 1);
        this.team1.characters.push(this.characters[0]);
        const positionTeam1 = generateStartPositon(this.gamePlay.boardSize, 1, 2);
        this.team1.characters[0].team = 'team1';
        this.team1.characters[1].team = 'team1';
        this.team1.characters[0].position = positionTeam1[0];
        this.team1.characters[1].position = positionTeam1[1];
      } else {
        this.characters.forEach((char) => {
          GameController.levelUp(char);
        });
        const positionTeam1 = generateStartPositon(this.gamePlay.boardSize, 1, 2);
        this.team1.characters[0].position = positionTeam1[0];
        this.team1.characters[1].position = positionTeam1[1];
      }
      this.getCharacters();
      this.gamePlay.redrawPositions(this.getCharPosition());
      this.gamePlay.drawUi(themes[this.level]);
    } else {
      this.isGameOver = true;
    }
  }
}
