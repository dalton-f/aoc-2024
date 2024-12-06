////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 6 - Guard Gallivant
// Link: https://adventofcode.com/2024/day/6
////////////////////////////////////////////////////////////////

const fs = require("fs");

const text = fs.readFileSync("days/day-06/input.txt", "utf-8");

const map = text.trim().split("\n");

// Save variable definitions
const obstruction = "#";
const guardSymbol = "^";

// Up, right, down, left offsets
const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

// Get starting position
let guardRow = 0;
let guardCol = 0;

let potentialObstructions = 0;

// Loops over the entire map to fetch the i, j coordinates of the guard

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[0].length; j++) {
    if (map[i][j] === guardSymbol) {
      guardRow = i;
      guardCol = j;
      break;
    }
  }
}

let startingRow = guardRow;
let startingCol = guardCol;

// Loop over all squares and test if it loops with an  obstruction in it
for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    // Test all squares as obstructions
    map[i][j] = obstruction;

    // Locally reset the values
    let direction = 0;

    guardRow = startingRow;
    guardCol = startingCol;

    // Track distinct visited positions using a set to save on additional checks
    const visited = new Set();

    while (true) {
      const nextRow = guardRow + directions[direction][0];
      const nextCol = guardCol + directions[direction][1];

      // If visited with the same direction, it is a loop
      if (visited.has(`${guardRow},${guardCol},${directions[direction]}`)) {
        potentialObstructions++;
        // Always return the map to its previous state
        map[i][j] === ".";
        break;
      }

      // Add visited square before direction changes
      visited.add(`${guardRow},${guardCol},${directions[direction]}`);

      // If the guard has moved out of the map, stop searching
      if (
        nextRow < 0 ||
        nextRow >= map.length ||
        nextCol < 0 ||
        nextCol >= map[0].length
      ) {
        // Always return the map to its previous state
        map[i][j] === ".";
        break;
      }

      // Rotate by 90 degrees if the next part of the map is obstructed
      if (
        map[nextRow][nextCol] === obstruction ||
        (nextCol === i && nextRow === j)
      ) {
        direction = (direction + 1) % 4;
      } else {
        // Move forward
        guardRow = nextRow;
        guardCol = nextCol;
      }
    }
  }
}

console.log(potentialObstructions);
