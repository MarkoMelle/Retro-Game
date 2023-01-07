import { calcTileType } from '../utils';

test.each([
  { index: 0, boardSize: 8, expected: 'top-left' },
  { index: 63, boardSize: 8, expected: 'bottom-right' },
  { index: 7, boardSize: 8, expected: 'top-right' },
  { index: 56, boardSize: 8, expected: 'bottom-left' },
  { index: 1, boardSize: 8, expected: 'top' },
  { index: 16, boardSize: 8, expected: 'left' },
  { index: 15, boardSize: 8, expected: 'right' },
  { index: 22, boardSize: 8, expected: 'center' },
])('should return the correct values', ({ index, boardSize, expected }) => {
  const received = calcTileType(index, boardSize);
  expect(received).toBe(expected);
});
