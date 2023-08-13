export default function playerFactory() {
  function attack(gameboard, attackCoordinates) {
    // if no coordinates are specified, pick a random unattacked grid point
    if (!attackCoordinates) {
      let foundCoordinate = false;
      let x;
      let y;
      let tries = 0;
      let attackTries = [","];
      while (!foundCoordinate && tries < 10 * 10) {
        while (attackTries.includes([x, y].toString())) {
          x = 1 + Math.floor(Math.random() * 10);
          y = 1 + Math.floor(Math.random() * 10);
        }
        attackTries.push([x, y].toString());
        tries++;

        if (!gameboard.coordinateHasBeenAttacked([x, y])) {
          foundCoordinate = true;
          gameboard.receiveAttack([x, y]);
        }
      }
    } else {
      // else attack specified coordinates
      gameboard.receiveAttack(attackCoordinates);
    }
  }

  return { attack };
}
