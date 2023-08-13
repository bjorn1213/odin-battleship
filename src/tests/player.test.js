import playerFactory from "../player";
import gameboardFactory from "../gameboard";
import shipFactory from "../ship";

test("That player is defined", () => {
  const player = playerFactory();

  expect(player).toBeDefined();
});

describe("A player attackig a gameboard", () => {
  test("That a player can attack a gameboard", () => {
    const player = playerFactory();
    const mockAttackFunction = jest.fn();
    const gameboard = {
      ...gameboardFactory(),
      receiveAttack: mockAttackFunction,
    };
    const attackCoordinates = [1, 1];

    player.attack(gameboard, attackCoordinates);

    expect(mockAttackFunction.mock.calls).toHaveLength(1);
  });

  test("That an attack is called with the correct arguments", () => {
    const player = playerFactory();
    const mockAttackFunction = jest.fn();
    const gameboard = {
      receiveAttack: mockAttackFunction,
    };
    const attackCoordinates = [5, 1];

    player.attack(gameboard, attackCoordinates);

    expect(mockAttackFunction.mock.calls[0][0].toString()).toBe(
      attackCoordinates.toString()
    );

    // also try different coordinate
    const attackCoordinates2 = [2, 3];

    player.attack(gameboard, attackCoordinates2);

    expect(mockAttackFunction.mock.calls[1][0].toString()).toBe(
      attackCoordinates2.toString()
    );
  });

  test("That a player can perform a random attack", () => {
    const player = playerFactory();
    const mockAttackFunction = jest.fn();
    let gameboard = gameboardFactory();

    const onlyOption = [2, 4];

    for (let i = 1; i < 11; i++) {
      for (let j = 1; j < 11; j++) {
        if (!(i === onlyOption[0] && j === onlyOption[1]))
          gameboard.receiveAttack([i, j]);
      }
    }

    gameboard = { ...gameboard, receiveAttack: mockAttackFunction };

    player.attack(gameboard);

    expect(mockAttackFunction.mock.calls[0][0].toString()).toBe(
      onlyOption.toString()
    );
  });
});

describe("Player types", () => {
  test("That a player is human", () => {
    const player = playerFactory("human");
    expect(player.isHuman()).toBe(true);
  });

  test("That a player is a computer by default", () => {
    const player = playerFactory();
    expect(player.isHuman()).toBe(false);
  });

  test("That a player is a computer when passed an argument different than 'human'", () => {
    const player = playerFactory("zorg");
    expect(player.isHuman()).toBe(false);
  });
});
