// Puzzle Summary - Part 1:

// Get the sum of the differences of pairs from both lists in ascending order

// My first idea is to extract both lists, sort them, and loop through them to get their difference and then sum
// This can simply be done with a couple of loops, .sort() and .reduce() - using .sort() means it would increase the time complexity

// The hardest part of this initial puzzle seems to be parsing the input - we can loop through it row by row and generate each list manually

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
  const difference = Math.max(value_1, value_2) - Math.min(value_1, value_2);

  // Add it to the sum
  sum += difference;
}

// Get the final sum as the total distance of both lists
console.log(sum);
