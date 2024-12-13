////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 13: Claw Contraption
// Link: https://adventofcode.com/2024/day/13
////////////////////////////////////////////////////////////////

// two buttons A and B
// A costs 3 tokens, B costs 1

// each button is configured to move the claw right along X and forward along Y each time pressed
// one prize, where the claw must be positioned exactly above it on X and Y

// what is the smallest possible number of tokens to spend to win as many prizes as possible
// there is a possibility that no combination reaches a prize
// button press <= 100 times

const fs = require("fs");

const text = fs.readFileSync("days/day-13/input.txt", "utf-8");

const clawMachines = text.trim().split(/\n\s*\n/);

let total = 0;

console.time("Speed");

// Loop over each claw machine block
for (const clawMachine of clawMachines) {
  const [buttonA, buttonB, prize] = clawMachine.split("\n");

  let min = Infinity;

  // Extract the data converted into numbers

  // Could use regex to find all digits the simply have one big array destructure
  const [ax, ay] = buttonA
    .split(":")[1]
    .trim()
    .split(", ")
    .map((coordinate) => parseInt(coordinate.split("+")[1]));

  const [bx, by] = buttonB
    .split(":")[1]
    .trim()
    .split(", ")
    .map((coordinate) => parseInt(coordinate.split("+")[1]));

  const [prizeX, prizeY] = prize
    .split(": ")[1]
    .trim()
    .split(", ")
    .map((coordinate) => parseInt(coordinate.split("=")[1]));

  // button press <= 100 times so can be brute forced in a grid - this basically tests every varation of a and b being pressed
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      // if button a being pressed i times and button b being pressed j times gets us to both target (prize) coordinates
      if (ax * i + bx * j === prizeX && ay * i + by * j === prizeY) {
        // Count it as a possible and record the minimum overall - 3 tokens for a and one for b
        min = Math.min(min, i * 3 + j);
      }
    }
  }

  // If not infinity, means price can be found within a finite case
  if (min !== Infinity) total += min;
}

console.timeEnd("Speed");

console.log(`The minimum tokens used to get maximum prizes is ${total}`);
