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

// Save initial position
let startingRow = guardRow;
let startingCol = guardCol;

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
    direction = (direction + 1) % 4;
  } else {
    // Move forward
    guardRow = nextRow;
    guardCol = nextCol;
  }

  visited.add(`${guardRow},${guardCol}`);
}

// Using part 1 path simulate to generate all distinct squares that the guard will be on
// We can use ths to brute force a cycle detection in a more efficent way than testing all squares that the guard may never reach

let potentialObstacles = 0;

// Similar traversal to part one
const isCyclic = (row, col) => {
  if (map[row][col] === obstruction || map[row][col] === guardSymbol)
    return false;

  // Ensure to reset the values
  direction = 0;

  guardRow = startingRow;
  guardCol = startingCol;

  // Check for an obstruction at a given index
  map[row][col] = obstruction;

  const visitedOrientations = new Set();

  while (true) {
    const nextRow = guardRow + directions[direction][0];
    const nextCol = guardCol + directions[direction][1];

    // We can detect a loop if we reach the same row, col and orientation more than once

    if (visitedOrientations.has(`${guardRow},${guardCol},${direction}`)) {
      // Return map to its previous state
      map[row][col] = ".";
      return true;
    }

    visitedOrientations.add(`${guardRow},${guardCol},${direction}`);

    // If the guard leaves the map, it is not stuck in a loop
    if (
      nextRow < 0 ||
      nextRow >= map.length ||
      nextCol < 0 ||
      nextCol >= map[0].length
    ) {
      // Return map to its previous state
      map[row][col] = ".";
      return false;
    }

    // Rotate by 90 degrees if the next part of the map is obstructed
    if (map[nextRow][nextCol] === obstruction) {
      direction = (direction + 1) % 4;
    } else {
      // Move forward
      guardRow = nextRow;
      guardCol = nextCol;
    }
  }
};

for (const position of visited) {
  const [row, col] = position.split(",");

  if (isCyclic(row, col)) potentialObstacles++;
}

console.log(potentialObstacles);
