import gameboardFactory from "../gameboard";
import shipFactory from "../ship";

test("That gameboard is defined", () => {
  const gameboard = gameboardFactory();

  expect(gameboard).toBeDefined();
});

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
