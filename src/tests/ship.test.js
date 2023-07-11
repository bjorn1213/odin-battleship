import shipFactory from "../ship";

test("That ship is defined", () => {
  let ship = shipFactory();

  expect(ship).toBeDefined();
});

test("That ship has a correct length", () => {
  const length = 10;
  const ship = shipFactory(length);

  expect(ship.getLength()).toBe(length);
});

test("That two ships can have independent lengths", () => {
  const length1 = 5;
  const ship1 = shipFactory(length1);

  const length2 = 7;
  const ship2 = shipFactory(length2);

  expect(ship1.getLength()).toBe(length1);
  expect(ship2.getLength()).toBe(length2);
});

test("That ship can report hits", () => {
  const ship = shipFactory(10);

  expect(ship.getHits()).toBe(0);
});

test("That ship can be hit, and hits are incremented", () => {
  const ship = shipFactory(10);
  ship.hit();

  expect(ship.getHits()).toBe(1);
});

test("That ship cannot be hit more than length", () => {
  const ship = shipFactory(2);
  ship.hit();
  ship.hit();
  ship.hit();

  expect(ship.getHits()).toBe(2);
});

test("That ship correctly reports if sunk", () => {
  const ship = shipFactory(2);

  ship.hit();
  expect(ship.isSunk()).toBe(false);

  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
