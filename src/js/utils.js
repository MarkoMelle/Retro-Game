export function calcTileType(index, boardSize) {
  if (index === 0) {
    return 'top-left';
  } if (index === boardSize - 1) {
    return 'top-right';
  } if (boardSize ** 2 - index === boardSize) {
    return 'bottom-left';
  } if (index === boardSize ** 2 - 1) {
    return 'bottom-right';
  } if (index % boardSize === 0) {
    return 'left';
  } if (index > boardSize && (index + 1) % boardSize === 0) {
    return 'right';
  } if (index > boardSize * (boardSize - 1) && index < (boardSize ** 2 - 1)) {
    return 'bottom';
  } if (index > 0 && index < (boardSize - 1)) {
    return 'top';
  }
  return 'center';
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
