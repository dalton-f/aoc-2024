////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 18: RAM Run
// Link: https://adventofcode.com/2024/day/18
////////////////////////////////////////////////////////////////

const fs = require("fs");
const input = fs
  .readFileSync("days/day-18/input.txt", "utf8")
  .trim()
  .split("\n");

const gridSize = 70;

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const bfs = (grid) => {
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
        return true;
      }

      visited.add(`${nr},${nc}`);
      queue.push([nr, nc, d + 1]);
    }
  }

  return false;
};

console.time("Speed");

// Generate a 2d grid with the given size + 1 because of zero-indexing, and fill with zeros
let grid = Array.from(Array(gridSize + 1), (_) => Array(gridSize + 1).fill(0));

// Loop over each byte one by one
for (let i = 0; i < input.length; i++) {
  const byte = input[i];

  const [c, r] = byte.split(",");

  // Add corrupted memory to the grid square
  grid[r][c] = 1;

  // Run a bfs to check for an exit (assuming the first 1024 are valid)

  if (i >= 1024) {
    const hasValidExit = bfs(grid);

    if (!hasValidExit) {
      console.log("Part 2:", byte);
      break;
    }
  }
}

console.timeEnd("Speed");
