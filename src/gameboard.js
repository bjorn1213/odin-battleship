export default function gameboardFactory() {
  let occupiedCoordinates = [];
  let placements = {};
  let receivedAttacks = [];
  let ships = [];
  let lastAttackSuccesful = false;
  const HORIZONTAL = "horizontal";
  const VERTICAL = "vertical";
  const validOrientations = [HORIZONTAL, VERTICAL];

  // utility
  function getEndLocation(shipLength, location, orientation) {
    return orientation === HORIZONTAL
      ? [location[0] + shipLength, location[1]]
      : [location[0], location[1] - shipLength];
  }

  function getAllCoordinates(shipLength, location, orientation) {
    const start = location;
    const stop = getEndLocation(shipLength, location, orientation);
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

  function coordinateHasBeenAttacked(coordinates) {
    const x = coordinates[0];
    const y = coordinates[1];

    for (let attack of receivedAttacks) {
      if (attack[0] === x && attack[1] === y) return true;
    }
    return false;
  }

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
    const endLocation = getEndLocation(shipLength, location, orientation);
    return validCoordinate(location) && validCoordinate(endLocation);
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
    // location is the left top square on which the ship should be placed.
    // orientation indicates whether the rest of the ship extends right or down.
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

    ships.push(ship);
  }

  function receiveAttack(coordinates) {
    if (
      coordinateHasBeenAttacked(coordinates) ||
      !validCoordinate(coordinates)
    ) {
      return;
    }
    receivedAttacks.push(coordinates);
    lastAttackSuccesful = false;

    if (placements[coordinates]) {
      lastAttackSuccesful = true;
      const ship = placements[coordinates];
      ship.hit();
    }
  }

  function isFinished() {
    for (let ship of ships) {
      if (!ship.isSunk()) {
        return false;
      }
    }
    return true;
  }

  function lastAttackWasAHit() {
    return lastAttackSuccesful;
  }

  return {
    placeShip,
    receiveAttack,
    coordinateHasBeenAttacked,
    isFinished,
    lastAttackWasAHit,
  };
}
