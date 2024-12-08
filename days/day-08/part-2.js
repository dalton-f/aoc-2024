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

    (antennaLocations[char] ||= []).push([i, j]);
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

      // For part 2, we need to continue to add the offset to account for the "effects of resonant harmonics"

      let node = [x1 - dx, y1 - dy];

      // Use two while loops, one for up and one for down

      while (
        node[0] >= 0 &&
        node[0] < rows &&
        node[1] >= 0 &&
        node[1] < columns
      ) {
        // Add the antinode to the grid
        grid[node[0]][node[1]] = "#";
        node = [node[0] - dx, node[1] - dy];
      }

      node = [x2 + dx, y2 + dy];

      while (
        node[0] >= 0 &&
        node[0] < rows &&
        node[1] >= 0 &&
        node[1] < columns
      ) {
        // Add the antinode to the grid
        grid[node[0]][node[1]] = "#";
        node = [node[0] + dx, node[1] + dy];
      }
    }
  }
}

// Visualise the grid
// console.log(grid.map((row) => row.join("")).join("\n"));

// Doing this manually instead of increasing it directly after checking antinodes because it was creating an off by one error and I don't know why
// This also helps to visualise

let antinodeCount = 0;

// Simple reiterate over the grid and count the antinodes
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < columns; j++) {
    if (grid[i][j] === "#") antinodeCount++;
  }
}

console.log(`Total antinodes: ${antinodeCount}`);
