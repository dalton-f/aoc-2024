////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 25: Code Chronicle
// Link: https://adventofcode.com/2024/day/25
////////////////////////////////////////////////////////////////

const fs = require("fs");
const input = fs.readFileSync("days/day-25/input.txt", "utf8").trim();

let schematics = input.split("\n\n");

// Each schematic needs to be treated as a grid
schematics = schematics.map((schematic) =>
  schematic.split("\n").map((row) => row.split(""))
);

let total = 0;

const locks = [];
const keys = [];

// Seperate the data into locks and keys
for (const schematic of schematics) {
  if (schematic[0][0] === "#") locks.push(schematic);
  else keys.push(schematic);
}

// Test every key on every lock
for (const lock of locks) {
  for (const key of keys) {
    let match = true;

    // If there is any overlap between the key and the lock, then the key does not fit the lock
    for (let i = 0; i < lock.length; i++) {
      for (let j = 0; j < lock[i].length; j++) {
        if (lock[i][j] === "#" && key[i][j] === "#") {
          match = false;
          break;
        }
      }
    }

    // Otherwise assume it fits and increase the total
    if (match) total++;
  }
}

console.log("Part 1:", total);
