export default function gameboardFactory() {
  // placement validators
  function validOrientation(location) {
    const start = location[0];
    const stop = location[1];

    if (start[0] === stop[0] || start[1] === stop[1]) {
      return true;
    }
    return false;
  }

  function validPlacementLength(shipLength, location) {
    const start = location[0];
    const stop = location[1];
    let placementLength;

    if (start[0] === stop[0]) {
      placementLength = Math.abs(start[1] - stop[1]) + 1;
    } else {
      placementLength = Math.abs(start[0] - stop[0]) + 1;
    }

    return placementLength === shipLength;
  }

  function validCoordinate(coordinate) {
    if (coordinate >= 1 && coordinate <= 10) {
      return true;
    }
    return false;
  }

  function placementWithinGrid(location) {
    let returnValue = true;

    for (let coordinates of location) {
      for (let coordinate of coordinates) {
        returnValue = returnValue && validCoordinate(coordinate);
      }
    }
    return returnValue;
  }

  function placeShip(ship, location) {
    if (!validOrientation(location)) {
      throw new Error("Placement orientation is wrong.");
    }
    if (!validPlacementLength(ship.getLength(), location)) {
      throw new Error("Ship length <> placement position length.");
    }
    if (!placementWithinGrid(location)) {
      throw new Error("Placement is not within 10x10 grid.");
    }
  }

  return { placeShip };
}
