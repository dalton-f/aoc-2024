////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 6 - Guard Gallivant
// Link: https://adventofcode.com/2024/day/6
////////////////////////////////////////////////////////////////

const fs = require("fs");

const text = fs.readFileSync("days/day-06/input.txt", "utf-8");

const map = text
  .trim()
  .split("\n")
  .map((row) => row.split(""));

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

// Loops over the entire map to fetch the i, j coordinates of the guard

for (let i = 0; i < map.length; i++) {
  for (let j = 0; j < map[i].length; j++) {
    if (map[i][j] === guardSymbol) {
      guardRow = i;
      guardCol = j;
      break;
    }
  }
}

let direction = 0;

// Track distinct visited positions using a set to save on additional checks
const visited = new Set();
visited.add(`${guardRow},${guardCol}`);

while (true) {
  const nextRow = guardRow + directions[direction][0];
  const nextCol = guardCol + directions[direction][1];

  // If the guard has moved out of the map, stop searching
  if (
    nextRow < 0 ||
    nextRow >= map.length ||
    nextCol < 0 ||
    nextCol >= map[0].length
  ) {
    break;
  }

  // Rotate by 90 degrees if the next part of the map is obstructed
  if (map[nextRow][nextCol] === obstruction) {
    // Funny modulus trick can be used, or simply use the below conditions
    if (direction === 3) direction = 0;
    else direction++;

    // direction = (direction + 1) % 4;
  } else {
    // Move forward
    guardRow = nextRow;
    guardCol = nextCol;
  }

  visited.add(`${guardRow},${guardCol}`);
}

console.log(visited.size);
