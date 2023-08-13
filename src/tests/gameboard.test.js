import gameboardFactory from "../gameboard";
import shipFactory from "../ship";

test("That gameboard is defined", () => {
  const gameboard = gameboardFactory();

  expect(gameboard).toBeDefined();
});

describe("Ship placement on gameboard", () => {
  test("That gameboard can place ship on board", () => {
    const ship = shipFactory(3);
    const gameboard = gameboardFactory();

    gameboard.placeShip(ship, [1, 1], "horizontal");
  });

  test("That placement location should be horizontal or vertical", () => {
    const ship = shipFactory(3);
    const gameboard = gameboardFactory();
    let location = [3, 1];

    let orientation = "not horizontal"; // invalid orientation

    expect(() => {
      gameboard.placeShip(ship, location, orientation);
    }).toThrow();

    orientation = "verticaal"; // typo

    expect(() => {
      gameboard.placeShip(ship, location, orientation);
    }).toThrow();

    orientation = "horizontal";

    expect(() => {
      gameboard.placeShip(ship, location, orientation);
    }).not.toThrow();
  });

  test("That placement location should be within 10x10 grid", () => {
    const ship = shipFactory(3);
    const gameboard = gameboardFactory();
    let location = [0, 1];
    let orientation = "horizontal";

    expect(() => {
      gameboard.placeShip(ship, location, orientation);
    }).toThrow();

    location = [10, 10];
    orientation = "vertical";

    expect(() => {
      gameboard.placeShip(ship, location, orientation);
    }).not.toThrow();

    location = [-1, -3];

    expect(() => {
      gameboard.placeShip(ship, location, orientation);
    }).toThrow();
  });

  test("That no ships can be placed on top of each other", () => {
    const ship1 = shipFactory(3);
    const ship2 = shipFactory(3);
    const gameboard = gameboardFactory();

    const location1 = [1, 1];
    const orientation1 = "horizontal";

    const location2 = [1, 1];
    const orientation2 = "vertical";

    gameboard.placeShip(ship1, location1, orientation1);

    expect(() => {
      gameboard.placeShip(ship2, location2, orientation2);
    }).toThrow();
  });
});

describe("How the gameboard handles attacks", () => {
  test("That the gameboard registers a ship hit", () => {
    const ship = shipFactory(4);
    const gameboard = gameboardFactory();

    const location = [5, 5];
    const orientation = "horizontal";

    gameboard.placeShip(ship, location, orientation);
    gameboard.receiveAttack([5, 5]);

    expect(ship.getHits()).toBe(1);
  });

  test("That the gameboard prevents a double hit", () => {
    const ship = shipFactory(4);
    const gameboard = gameboardFactory();

    const location = [5, 5];
    const orientation = "horizontal";

    gameboard.placeShip(ship, location, orientation);
    gameboard.receiveAttack([5, 5]);
    gameboard.receiveAttack([5, 5]);

    expect(ship.getHits()).toBe(1);
  });

  test("If the gameboard remembers if the last attack was a miss", () => {
    const ship = shipFactory(4);
    const gameboard = gameboardFactory();

    const location = [5, 5];
    const orientation = "horizontal";

    gameboard.placeShip(ship, location, orientation);
    gameboard.receiveAttack([4, 4]);

    expect(gameboard.lastAttackWasAHit()).toBe(false);
  });

  test("If the gameboard remembers if the last attack was a hit", () => {
    const ship = shipFactory(4);
    const gameboard = gameboardFactory();

    const location = [5, 5];
    const orientation = "horizontal";

    gameboard.placeShip(ship, location, orientation);
    gameboard.receiveAttack([6, 5]);

    expect(gameboard.lastAttackWasAHit()).toBe(true);
  });
});

describe("Check if gameboard is finished", () => {
  test("That gameboard is not finished if there is a ship", () => {
    const ship = shipFactory(4);
    const gameboard = gameboardFactory();

    const location = [5, 5];
    const orientation = "horizontal";

    gameboard.placeShip(ship, location, orientation);

    expect(gameboard.isFinished()).toBe(false);
  });

  test("That gameboard is finished if there is no ship", () => {
    const gameboard = gameboardFactory();

    expect(gameboard.isFinished()).toBe(true);
  });

  test("That gameboard is finished if there is a ship and its attacked fully", () => {
    const gameboard = gameboardFactory();

    const ship = shipFactory(1);
    const location = [5, 5];
    const orientation = "horizontal";
    gameboard.placeShip(ship, location, orientation);
    gameboard.receiveAttack(location);

    expect(gameboard.isFinished()).toBe(true);
  });

  test("That gameboard is finished if there is a ship and its attacked fully 2", () => {
    const gameboard = gameboardFactory();

    const ship = shipFactory(3);
    const location = [1, 4];
    const orientation = "horizontal";
    gameboard.placeShip(ship, location, orientation);

    gameboard.receiveAttack([1, 4]);
    gameboard.receiveAttack([2, 4]);
    gameboard.receiveAttack([3, 4]);

    expect(gameboard.isFinished()).toBe(true);
  });
});
