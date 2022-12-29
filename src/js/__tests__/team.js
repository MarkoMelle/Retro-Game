import Team from '../team';
import Character from '../char';

test('should iterize the characters', () => {
  const received = [];
  const team = new Team();
  team.addChar(new Character('Демон', 'Demon'));
  team.addChar(new Character('Лучник', 'Bowman'));
  received.push(team.next());
  received.push(team.next());
  received.push(team.next());
  const expected = [{
    value: new Character('Демон', 'Demon'),
    done: false,
  }, {
    value: new Character('Лучник', 'Bowman'),
    done: false,
  }, { value: undefined, done: true }];
  expect(received).toEqual(expected);
});
