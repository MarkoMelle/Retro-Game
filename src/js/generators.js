import Team from './Team';

export const getRandom = (arrLength) => Math.floor(Math.random() * arrLength);

/**
 * Generates a random character with a random level
 * @param  allowedTypes
 * @param  maxLevel
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  // Generating a random index for an array of types
  const typeId = () => {
    const min = 0;
    const max = Math.floor(allowedTypes.length);
    return Math.floor(Math.random() * (max - min)) + min;
  };
  // Generates random level from 1 to maxLevel
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

  // Creates a team with a given number of random characters
  for (let index = 0; index < characterCount; index += 1) {
    team.push(playerGenerator.next().value);
  }
  return (new Team(team));
}
/**
 * Generates a random starting position
*/
export function generateStartPositon(boardSize, teamNumber, characterCount) {
  let positionResult = [];
  if (teamNumber === 1) {
    let positionArr = [];
    /** Removes empty values in the array */
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
      const key = getRandom(positionArr.length);
      const positionNumber = positionArr[key];
      delete positionArr[key];
      compact(positionArr);
      positionResult.push(positionNumber);
    }
    return positionResult;
  } if (teamNumber === 2) {
    positionResult = generateStartPositon(boardSize, 1, characterCount);
    positionResult = positionResult.map((item) => item + (boardSize - characterCount));
  }
  return positionResult;
}
