import GamePlay from '../GamePlay';
import GameController from '../GameController';


test('should correctly display information about the character', () => {
   const gamePlay = new GamePlay();
   const html = document.createElement("div");
   html.id = '#game-container'
   gamePlay.bindToDOM(html);
   const gameCtrl = new GameController(gamePlay);
   gameCtrl.init();
   gameCtrl.team1.characters[0].positon = 0;
   gameCtrl.team1.characters[1].positon = 1;
   gameCtrl.team1.characters[0].level = 1;
   gameCtrl.team1.characters[0].attack = 1;
   gameCtrl.team1.characters[0].defence = 1;
   gameCtrl.team1.characters[0].health = 1;
   const char = gameCtrl.team1.characters[0];
   gamePlay.showCellTooltip(`🎖${char.level} ⚔${char.attack} 🛡${char.defence}❤${char.health}`, 0)
   const received = gamePlay.cells[0].title
   const expected = `🎖${1} ⚔${1} 🛡${1}❤${1}`
   expect(received).toBe(expected);
})