import gameboardFactory from "../gameboard";
import shipFactory from "../ship";

test("That gameboard is defined", () => {
  const gameboard = gameboardFactory();

  expect(gameboard).toBeDefined();
});

test("That gameboard can place ship on board", () => {
  const ship = shipFactory(3);
  const gameboard = gameboardFactory();

  gameboard.placeShip(ship, [
    [1, 1],
    [1, 3],
  ]);
});

test("That ship and placement location should have the same length", () => {
  const ship = shipFactory(3);
  const gameboard = gameboardFactory();
  let location = [
    [1, 1],
    [1, 4],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).toThrow();

  location = [
    [1, 1],
    [2, 1],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).toThrow();

  location = [
    [1, 1],
    [3, 1],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).not.toThrow();
});

test("That placement location should be horizontal or vertical", () => {
  const ship = shipFactory(3);
  const gameboard = gameboardFactory();
  let location = [
    [3, 1],
    [1, 4],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).toThrow();

  location = [
    [1, 6],
    [2, 1],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).toThrow();

  location = [
    [1, 3],
    [1, 1],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).not.toThrow();
});

test("That placement location should be within 10x10 grid", () => {
  const ship = shipFactory(3);
  const gameboard = gameboardFactory();
  let location = [
    [0, 1],
    [0, 3],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).toThrow();

  location = [
    [10, 10],
    [8, 10],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).not.toThrow();

  location = [
    [-1, -3],
    [-1, -1],
  ];

  expect(() => {
    gameboard.placeShip(ship, location);
  }).toThrow();
});

test("That no ships can be placed on top of each other", () => {
  const ship1 = shipFactory(3);
  const ship2 = shipFactory(3);
  const gameboard = gameboardFactory();

  const location1 = [
    [1, 1],
    [1, 3],
  ];

  const location2 = [
    [1, 1],
    [3, 1],
  ];

  gameboard.placeShip(ship1, location1);

  expect(() => {
    gameboard.placeShip(ship2, location2);
  }).toThrow();
});
