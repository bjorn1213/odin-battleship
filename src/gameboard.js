export default function gameboardFactory() {
  let occupiedCoordinates = [];
  let placements = {};
  const HORIZONTAL = "horizontal";
  const VERTICAL = "vertical";
  const validOrientations = [HORIZONTAL, VERTICAL];

  // placement validators
  function validCoordinate(coordinates) {
    for (let coordinate of coordinates) {
      if (coordinate < 1 || coordinate > 10) {
        return false;
      }
    }
    return true;
  }

  function placementWithinGrid(shipLength, location, orientation) {
    const endLocation =
      orientation === HORIZONTAL
        ? [location[0] + shipLength, location[1]]
        : [location[0], location[1] - shipLength];
    return validCoordinate(location) && validCoordinate(endLocation);
  }

  function getAllCoordinates(shipLength, location, orientation) {
    const start = location;
    const stop =
      orientation === HORIZONTAL
        ? [location[0] + shipLength, location[1]]
        : [location[0], location[1] - shipLength];
    let coordinates = [];

    if (orientation === VERTICAL) {
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

  function locationIsNotOccupied(shipLength, location, orientation) {
    const coordinates = getAllCoordinates(shipLength, location, orientation);

    for (let coordinate of coordinates) {
      if (occupiedCoordinates.includes(coordinate)) {
        return false;
      }
    }
    return true;
  }

  function validateShipPlacement(ship, location, orientation) {
    if (!validOrientations.includes(orientation.toLowerCase())) {
      throw new Error(`Orientation must be ${HORIZONTAL} or ${VERTICAL}`);
    }
    if (location.length !== 2) {
      throw new Error(
        "Placement location must contain exactly 2 values (x, y) coordinate"
      );
    }

    const shipLength = ship.getLength();

    if (!placementWithinGrid(shipLength, location, orientation)) {
      throw new Error("Placement is not within 10x10 grid.");
    }
    if (!locationIsNotOccupied(shipLength, location, orientation)) {
      throw new Error("Placement overlaps with ship.");
    }
  }

  function placeShip(ship, location, orientation) {
    validateShipPlacement(ship, location, orientation);

    const coordinates = getAllCoordinates(
      ship.getLength(),
      location,
      orientation
    );
    for (let coordinate of coordinates) {
      placements[coordinate] = ship;
      occupiedCoordinates.push(coordinate);
    }
  }

  return { placeShip };
}
