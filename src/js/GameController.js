/* eslint-disable max-len */
import themes from './themes';
import PositionedCharacter from './PositionedCharacter';
import { generateTeam, generateStartPositon, getRandom } from './generators';
import Bowman from './characters/Bowman';
import Daemon from './characters/Daemon';
import Magician from './characters/Magician';
import Swordsman from './characters/Swordsman';
import Undead from './characters/Undead';
import Vampire from './characters/Vampire';
import callCalculator from './callsCalculators';
import npcMoveController from './NpcController';
import GameState from './GameState';

const gameState = new GameState();
export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.selected = {};
    this.isCharMove = true;
    this.charPosition = []
    this.level = 0
    this.isGameOver = false;

    // Обработчки
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addCellLeaveListener(this.onCellLeave.bind(this));

    this.gamePlay.addNewGameListener(() => {
      gameState.from(this);
      this.selected.isSelected = false;
      this.gamePlay.deselectCell(this.selected.index | 0);
      this.level = 0;
      this.init()
      this.isGameOver = false;
      this.isCharMove = true;
    })

    this.gamePlay.addLoadGameListener(() => {

    })

    this.gamePlay.addSaveGameListener(() => {

    })
  }

  init() {
    this.gamePlay.drawUi(themes[0]);
    // Team 1
    /**
     * Генерируем команду
     */
    this.team1 = generateTeam([Bowman, Swordsman, Magician], 4, 2);
    /**
     * Генерируем рандомные позиции
     */
    let positionTeam1 = generateStartPositon(this.gamePlay.boardSize, 1, 2);
    this.team1.characters[0].team = 'team1';
    this.team1.characters[1].team = 'team1';
    this.team1.characters[0].position = positionTeam1[0];
    this.team1.characters[1].position = positionTeam1[1];
    /**
     * Повышаем уровни
     */
    this.levelUp(this.team1.characters[0], true)
    this.levelUp(this.team1.characters[1], true)

    // Team 2
    let positionTeam2 = generateStartPositon(this.gamePlay.boardSize, 2, 2);
    this.team2 = generateTeam([Daemon, Vampire, Undead], 4, 2);
    this.team2.characters[0].team = 'team2';
    this.team2.characters[1].team = 'team2';
    this.team2.characters[0].position = positionTeam2[0];
    this.team2.characters[1].position = positionTeam2[1];
    this.levelUp(this.team2.characters[0], true)
    this.levelUp(this.team2.characters[1], true)

    this.getCharacters = () => {
      //Удаляем мертвых из команды 1
      this.team1.characters = this.team1.characters.filter(char => {
        if (char.health > 0) {
          return char;
        }
      })

      //Удаляем мертвых из команды 2
      this.team2.characters = this.team2.characters.filter(char => {
        if (char.health > 0) {
          return char;
        }
      })

      let result = [
        this.team1.characters[0] && this.team1.characters[0].health > 0 ? this.team1.characters[0] : undefined,
        this.team1.characters[1] && this.team1.characters[1].health > 0 ? this.team1.characters[1] : undefined,
        this.team2.characters[0] && this.team2.characters[0].health > 0 ? this.team2.characters[0] : undefined,
        this.team2.characters[1] && this.team2.characters[1].health > 0 ? this.team2.characters[1] : undefined,
      ];

      result = result.filter((e) => e);
      this.characters = result;
      // Проверка на случай конца раунда или проигрыша игрока
      if (this.characters.length <= 2) {
        const team1 = []
        const team2 = []
        this.characters.forEach(char => {
          if (char.team === 'team1') {
            team1.push(char)
          } else {
            team2.push(char)
          }
        })
        if (team2.length === 0) {
          this.nextLevel()
        } else if (team1.length === 0) {

          this.isGameOver = true;
        }
      }
    };

    this.getCharacters();

    this.getCharPosition = () => {
      this.charPosition = []
      let result = [];
      this.characters.forEach(char => {
        result.push(new PositionedCharacter(char, char.position))
        this.charPosition.push(char.position)
      })
      return result;
    };

    this.gamePlay.redrawPositions(this.getCharPosition());
  }

  // Логика

  onCellClick(index) {
    this.gamePlay.deselectCell(this.selected.index | 0);
    if (!this.isGameOver && this.isCharMove) {
      // Опеределение свойств клетки
      this.getCharacters();
      const indexInfo = {
        isChar: false,
        isEnemy: false,
        isEmpty: false,
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
      // Опеределение свойств клетки конец

      if (!indexInfo.isEmpty) {
        this.characters.forEach((char) => {
          // Выбор персонажа
          if (char.position === index && indexInfo.isChar) {
            this.gamePlay.selectCell(index);
            this.selected.index = index;
            this.selected.type = char.type;
            this.selected.possiblePass = callCalculator(this.selected.index, this.selected.type, false);
            this.selected.possibleAttack = callCalculator(this.selected.index, this.selected.type, true);
            this.selected.char = char;
            this.selected.isSelected = true;
          }
          // Атака
          else if (this.selected.isSelected && char.position === index && indexInfo.isEnemy && this.selected.possibleAttack.includes(index)) {
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
          }
          // Игнор атаки не в радиусе
          else if (this.selected.isSelected && indexInfo.isEnemy && !this.selected.possibleAttack.includes(index)) {
            this.gamePlay.selectCell(this.selected.index);
          }
        });
      }
      // Ход
      else if (indexInfo.isEmpty && this.selected.isSelected && this.selected.possiblePass.includes(index)) {
        this.selected.char.position = index;
        this.gamePlay.redrawPositions(this.getCharPosition());
        this.gamePlay.deselectCell(index);
        this.selected.isSelected = false;
        this.gamePlay.setCursor('pointer');
        this.isCharMove = false;
        this.npcMove();
      }
      // Миссклик
      else {
        this.selected.isSelected = false;
      }
    }
  }

  onCellEnter(index) {
    if (!this.isGameOver) {
      // Опеределение свойств клетки начало
      const indexInfo = {
        isChar: false,
        isEnemy: false,
        isEmpty: true,
      };
      this.characters.forEach((char) => {
        if (char.position === index && char.team === 'team1') {
          indexInfo.isChar = true;
          indexInfo.isEmpty = false
        } else if (char.position === index && char.team === 'team2') {
          indexInfo.isEnemy = true;
          indexInfo.isEmpty = false
        }
      });
      // Опеределение свойств клетки конец

      this.characters.forEach((char) => {
        if (this.selected.isSelected) {
          if (indexInfo.isEnemy && this.selected.possibleAttack.includes(index)) {
            this.gamePlay.setCursor('crosshair');
          } else if (indexInfo.isEnemy) {
            this.gamePlay.setCursor('not-allowed');
          } else if (indexInfo.isChar || indexInfo.isEmpty) {
            this.gamePlay.setCursor('pointer');
          } else {
            this.gamePlay.setCursor('auto');
          }
          if (indexInfo.isEmpty && index !== this.selected.index && this.selected.isSelected && this.selected.possiblePass.includes(index)) {
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
   * Вызывает логику NPC
   */
  npcMove() {
    npcMoveController.bind(this)();
  }

  /**
   * Повышает уровень персонажа
   */
  levelUp(char, isSpawn = false) {
    if (isSpawn) {
      const spawnLevelUp = (amount) => {
        let counter = 0;
        let callBack = (amount) => {
          if (counter <= amount) {
            counter += 1;

            const getRandomFactor = () => {
              let element = 1
              const result = []
              for (let index = 0; index <= 20; index += 1) {
                result.push(element)
                element += 0.01
              }
              return result
            }
            let randomFactor = getRandomFactor();
            char.attack = Math.round(char.attack * randomFactor[getRandom(randomFactor.length)])//нигде не прописан принцие просчет в случае спавна, было взят рандом до 20%
            char.defence = Math.round(char.defence * randomFactor[getRandom(randomFactor.length)])//нигде не прописан принцие просчет в случае спавна, было взят рандом до 20%
            callBack(amount);
          }
        }
        if (counter != amount) {
          callBack(amount)
        }
      }
      spawnLevelUp(char.level)
    } else {
      if (char.level === 4) {
        char.health = char.health + 80 > 100 ? 100 : char.health + 80;
        return
      }
      char.level += 1;
      char.attack = Math.round(Math.max(char.attack, char.attack * (80 + char.health) / 100));
      char.defence = Math.round(Math.max(char.defence, char.defence * (80 + char.health) / 100));
      char.health = char.health + 80 > 100 ? 100 : char.health + 80;
    }

  }

  /**
   * Логика начала нового раунда
   */
  nextLevel() {

    this.isCharMove = true;
    if (this.level <= 2 && !this.isGameOver) {
      this.level += 1;
      /**
       * Генереруем новую команду противника
       */
      const positionTeam2 = generateStartPositon(this.gamePlay.boardSize, 2, 2);

      this.team2 = generateTeam([Daemon, Vampire, Undead], 4, 2);
      this.team2.characters[0].team = 'team2';
      this.team2.characters[1].team = 'team2';
      this.team2.characters[0].position = positionTeam2[0];
      this.team2.characters[1].position = positionTeam2[1];
      this.levelUp(this.team2.characters[0], true)
      this.levelUp(this.team2.characters[1], true)
      // Новые старотовые позиции и добавление новго персонажа при необхожимости
      if (this.characters.length < 2) {
        // Если остался один, повышает ему уровень, создает новую команду из одного персонажа и пушит туда оставшегося
        this.levelUp(this.characters[0])
        this.team1 = generateTeam([Bowman, Swordsman, Magician], 4, 1);
        this.team1.characters.push(this.characters[0]);
        const positionTeam1 = generateStartPositon(this.gamePlay.boardSize, 1, 2);
        this.team1.characters[0].team = 'team1';
        this.team1.characters[1].team = 'team1';
        this.team1.characters[0].position = positionTeam1[0];
        this.team1.characters[1].position = positionTeam1[1];
      } else {
        this.characters.forEach(char => {
          this.levelUp(char);
        })
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
