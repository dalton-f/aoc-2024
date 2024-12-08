////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 8 - Resonant Collinearity
// Link: https://adventofcode.com/2024/day/8
////////////////////////////////////////////////////////////////

const fs = require("fs");

const text = fs.readFileSync("days/day-08/input.txt", "utf-8");

const grid = text.split("\n").map((row) => row.split(""));

// Store all index based variables
const rows = grid.length;
const columns = grid[0].length - 1;

const antennaLocations = {};

// Loop over the grid and generate a hashmap of the antenna locations
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    const char = grid[i][j];

    if (char === ".") continue;

    if (antennaLocations[char]) antennaLocations[char].push([i, j]);
    else antennaLocations[char] = [[i, j]];
  }
}

// Find the antinodes for each antenna
for (const char in antennaLocations) {
  const locations = antennaLocations[char];
  const numLocations = locations.length;

  // Loop over all potential permutations of antenna locations
  for (let i = 0; i < numLocations; i++) {
    for (let j = i + 1; j < numLocations; j++) {
      const [x1, y1] = locations[i];
      const [x2, y2] = locations[j];

      // Calculate the xy distance between each pair
      const dx = x1 - x2;
      const dy = y1 - y2;

      // Calculate the position the antinodes on either side
      // If we don't multiple by two and use the identical offset, we will just reach the pair coordinates
      const antinode1 = [x1 - dx * 2, y1 - dy * 2];
      const antinode2 = [x2 + dx * 2, y2 + dy * 2];

      // For both antinodes
      for (const node of [antinode1, antinode2]) {
        const [x, y] = node;

        // Check if the antinode is within the grid
        if (0 <= x && x < rows && 0 <= y && y < columns) {
          //   console.log(
          //     `A valid antinodes for the pair: (${x1},${y1}) and (${x2},${y2}) is (${node})`
          //   );

          // Add the antinode to the grid
          grid[x][y] = "#";
        }
      }
    }
  }
}

// Visualise the grid
// console.log(grid.map((row) => row.join("")).join("\n"));

// Doing this manually instead of increasing it directly after checking antinodes because it was creating an off by one error and I don't know why
// This also helps to visualise

let antinodeCount = 0;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    if (grid[i][j] === "#") antinodeCount++;
  }
}

console.log(`Total antinodes: ${antinodeCount}`);
