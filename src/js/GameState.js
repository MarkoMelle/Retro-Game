export default class GameState {
  constructor() {
    this.point = 0;
  }

  from(object, point = 0) {
    this.point += point; // Из 10 пункта, не понятно как и где это нужно использовать(счетчик очков)
    this.level = object.level;
    this.isCharMove = object.isCharMove;
    this.isGameOver = object.isGameOver;
    this.team1 = object.team1;
    this.team2 = object.team2;
    this.characters = object.characters;
    return null;
  }
}
