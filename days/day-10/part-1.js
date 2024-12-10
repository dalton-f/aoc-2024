////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 10 - Hoof It
// Link: https://adventofcode.com/2024/day/10
////////////////////////////////////////////////////////////////

// Hiking trail = any path from 0 to 9 without using diagonal movement incremeting by 1 each time
// Trailhead - any position that starts a hiking trail, always with a height of 0
// Trailhead score - the number of 9-height positions it can reach (aka the number of hiking trails it has starting from it)

// Sum of the scores of all trailheads on your topographic map

const fs = require("fs");

const text = fs.readFileSync("days/day-10/input.txt", "utf-8");

const topographicMap = text
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const rows = topographicMap.length;
const cols = topographicMap[0].length;

// Up, down, left, right
const directions = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

let total = 0;

const trailheads = new Set();

// Find all potential starting coordinates of a hiking trail
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const char = parseInt(topographicMap[i][j]);

    if (char === 0) trailheads.add([i, j]);
  }
}

// Loop over all trailheads
for (const trailhead of trailheads) {
  // Use a stack for basic DFS to travel all directions from each point after a trailhead
  const stack = [trailhead];

  const visited = new Set();

  while (stack.length) {
    // Extract the index
    const index = stack.pop();
    const [x, y] = index;
    const current = parseInt(topographicMap[x][y]);

    // Track visited positions
    if (visited.has(`${x},${y}`)) continue;

    visited.add(`${x},${y}`);

    // We reached the end of the path, so add it to the total
    if (current === 9) {
      total++;
      continue;
    }

    for (const direction of directions) {
      // Get the next points coordinates
      const [xOffset, yOffset] = direction;
      const [nextX, nextY] = [x + xOffset, y + yOffset];

      // Ensure we are incrementing by one each time and still within the bounds of the map
      if (
        nextX >= 0 &&
        nextX < rows &&
        nextY >= 0 &&
        nextY < cols &&
        parseInt(topographicMap[nextX][nextY]) === current + 1 &&
        !visited.has(`${nextX},${nextY}`)
      ) {
        stack.push([nextX, nextY]);
      }
    }
  }
}

console.log(`Sum of trailhead scores is ${total}`);
