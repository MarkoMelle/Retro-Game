export default class GameState {
  constructor() {
    this.level = 0;
  }
  from(object) {
    this.level += object.level
    return null;
  }
}
