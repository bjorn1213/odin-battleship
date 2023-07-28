export default function gameboardFactory() {
  let occupiedCoordinates = [];
  let placements = {};

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

  function getAllCoordinates(location) {
    const start = location[0];
    const stop = location[1];
    let coordinates = [];

    if (start[0] === stop[0]) {
      let yStart = Math.min(start[1], stop[1]);
      let yStop = Math.max(start[1], stop[1]);
      let x = start[0];

      for (let y = yStart; y <= yStop; y++) {
        coordinates.push([x, y]);
      }
    } else {
      let xStart = Math.min(start[0], stop[0]);
      let xStop = Math.max(start[0], stop[0]);
      let y = start[0];

      for (let x = xStart; x <= xStop; x++) {
        coordinates.push([x, y]);
      }
    }

    return coordinates;
  }

  function locationIsNotOccupied(location) {
    const coordinates = getAllCoordinates(location);

    for (let coordinate of coordinates) {
      if (occupiedCoordinates.includes(coordinate)) {
        return false;
      }
    }
    return true;
  }

  function validateShipPlacement(ship, location) {
    if (!validOrientation(location)) {
      throw new Error("Placement orientation is wrong.");
    }
    if (!validPlacementLength(ship.getLength(), location)) {
      throw new Error("Ship length <> placement position length.");
    }
    if (!placementWithinGrid(location)) {
      throw new Error("Placement is not within 10x10 grid.");
    }
    if (!locationIsNotOccupied(location)) {
      throw new Error("Placement overlaps with ship.");
    }
  }

  function placeShip(ship, location) {
    validateShipPlacement(ship, location);

    const coordinates = getAllCoordinates(location);
    for (let coordinate of coordinates) {
      placements[coordinate] = ship;
      occupiedCoordinates.push(coordinate);
    }
  }

  return { placeShip };
}
