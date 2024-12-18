////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 18: RAM Run
// Link: https://adventofcode.com/2024/day/18
////////////////////////////////////////////////////////////////

const fs = require("fs");
const input = fs
  .readFileSync("days/day-18/input.txt", "utf8")
  .trim()
  .split("\n");

const bytes = 1024;
const gridSize = 70;

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

// Generate a 2d grid with the given size + 1 because of zero-indexing, and fill with zeros
let grid = Array.from(Array(gridSize + 1), (_) => Array(gridSize + 1).fill(0));

// Load the first x bytes of the memory input to add walls to the grid
for (let i = 0; i < bytes; i++) {
  const byte = input[i];

  const [c, r] = byte.split(",");

  grid[r][c] = 1;
}

const queue = [[0, 0, 0]];
const visited = new Set(`0,0`);

// Do a BFS
while (queue.length) {
  // Row coordinate, column coordinate, distance from start (steps taken)
  const [r, c, d] = queue.shift();

  for (const dir of dirs) {
    const [dx, dy] = dir;
    // Apply directional offsets to get next node
    const [nr, nc] = [r + dx, c + dy];

    // If out of grid, ignore it
    if (nr < 0 || nc < 0 || nr > gridSize || nc > gridSize) continue;

    // If there is a corrupted memory block at next position, skip it
    if (grid[nr][nc] === 1) continue;

    // If already seen, skip it
    if (visited.has(`${nr},${nc}`)) continue;

    // Found the end, so exit
    if (nr === gridSize && nc === gridSize) {
      console.log("Part 1:", d + 1);
      process.exit(0);
    }

    visited.add(`${nr},${nc}`);
    queue.push([nr, nc, d + 1]);
  }
}
