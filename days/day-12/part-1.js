////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 12: Garden Groups
// Link: https://adventofcode.com/2024/day/12
////////////////////////////////////////////////////////////////

// how much fence they need to order or how much it will cost
// fences around a garden plot, with a map of the plots as the input

// Each garden plot grows a single type of plant and is indicated by a single letter on the map.
// When multiple garden plots are growing the same type of plant and are touching (horizontally or vertically), they form a region

// example with 5 regions of plants A, B, C, D and E with price 140
// AAAA
// BBCD
// BBCC
// EEEC

// you need to know that region's area and perimeter

// plants of the same type can appear in multiple separate regions, and regions can even appear within other regions

// eg. 5 regions, 1 for O and 4 for X with price 772
// OOOOO
// OXOXO
// OOOOO
// OXOXO
// OOOOO

// price = area x perimeter
// total price is the sum of the prices of all the regions

const fs = require("fs");

const text = fs.readFileSync("days/day-12/input.txt", "utf-8");

const map = text
  .trim()
  .split("\n")
  .map((row) => row.trim().split(""));

const rows = map.length;
const cols = map[0].length;

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

console.time("Speed");

const seen = new Set();

let price = 0;

// Loop over the grid
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    // Skip visited cells
    if (seen.has(`${i},${j}`)) continue;

    const queue = [[i, j]];

    let area = 0;
    let perimeter = 0;

    // Do a BFS for the plot character
    while (queue.length) {
      // Get the next index to check
      const [x, y] = queue.shift();

      if (seen.has(`${x},${y}`)) continue;

      seen.add(`${x},${y}`);

      area += 1;

      // For every direction offset
      for (const dir of dirs) {
        const [xOffset, yOffset] = dir;
        const [nextX, nextY] = [x + xOffset, y + yOffset];

        // If still in the grid and matching the same character
        if (
          nextX >= 0 &&
          nextX < rows &&
          nextY >= 0 &&
          nextY < cols &&
          map[nextX][nextY] === map[x][y] &&
          !seen.has([nextX, nextY])
        ) {
          queue.unshift([nextX, nextY]);
        }
        // Otherwise assume it is a perimeter index
        else {
          perimeter += 1;
        }
      }
    }

    price += area * perimeter;
  }
}

console.log(price);

console.timeEnd("Speed");
