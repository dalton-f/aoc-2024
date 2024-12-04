////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 1 - Historian Hysteria
// Link: https://adventofcode.com/2024/day/1
////////////////////////////////////////////////////////////////

const fs = require("fs");

let text = fs.readFileSync("days/day-01/input.txt", "utf-8");

// Split the input up into rows by every new line
let rows = text.trim().split("\n");

const list_one = [];
const list_two = [];

let sum = 0;

// Loop over the rows to populate the two above lists
for (const row of rows) {
  // Seperate the two value
  const [value_1, value_2] = row.split("   ");

  // Add them to their corresponding lists (is there an opportunity to expand this logic and do the sorting in place?)
  list_one.push(value_1);
  list_two.push(value_2);
}

// Sort both arrays by ascending order
list_one.sort((a, b) => a - b);
list_two.sort((a, b) => a - b);

// Assuming that both arrays are the same length, loop through them:
for (let i = 0; i < list_one.length; i++) {
  const value_1 = list_one[i];
  const value_2 = list_two[i];

  // Calculate the difference
  const difference = Math.abs(value_1 - value_2);

  // Add it to the sum
  sum += difference;
}

// Get the final sum as the total distance of both lists
console.log(sum);
