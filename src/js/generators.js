import Team from './Team';

export function* characterGenerator(allowedTypes, maxLevel) {
  const typeId = () => {
    const min = 0;
    const max = Math.floor(allowedTypes.length);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const level = () => {
    const min = 1;
    const max = Math.floor(maxLevel);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  while (true) yield new allowedTypes[typeId()](level());
}

export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const team = [];
  const playerGenerator = characterGenerator(allowedTypes, maxLevel);
  for (let index = 0; index < characterCount; index += 1) {
    team.push(playerGenerator.next().value);
  }
  return (new Team(team));
}

/** Генератор случайной позиции в соотвествующем столбце */
export function generateStartPositon(boardSize, teamNumber, characterCount) {
  /** Возвращает ключ для получения рандомной позиции */
  const rand = (arrLength) => Math.floor(Math.random() * arrLength);

  if (teamNumber === 1) {
    let positionArr = [];
    const positionResult = [];
    /** Убирает пропуски в массиве */
    const compact = (Array) => {
      const result = [];
      for (const item of Array) {
        if (item !== undefined) {
          result.push(item);
        }
      }
      positionArr = result;
    };
    for (let i = 0; i < boardSize; i += 1) {
      positionArr.push(i * boardSize);
      positionArr.push(i * boardSize + 1);
    }
    for (let i = 0; i < characterCount; i += 1) {
      const key = rand(positionArr.length);
      const positionNumber = positionArr[key];
      delete positionArr[key];
      compact(positionArr);
      positionResult.push(positionNumber);
    }
    return positionResult;
  } if (teamNumber === 2) {
    let positionResult = generateStartPositon(boardSize, 1, characterCount);
    return positionResult = positionResult.map((item) => item + (boardSize - characterCount));
  }
}
