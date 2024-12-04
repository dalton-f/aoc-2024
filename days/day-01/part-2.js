////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 1 - Historian Hysteria
// Link: https://adventofcode.com/2024/day/1
////////////////////////////////////////////////////////////////

// For the second part of the puzzle, we need to get the count how many times a given number in the left list appears in the right list
// Using this we can multiply the two values and take the sum to calculate the similarity score

// The first thing that comes to mind is to use a hashmap. We can repeat the process of part 1 to generate two seperate lists, then do a count

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

const occurenceMap = {};

// I am not the biggest fan of using nested loops here - feels quite inefficient

for (let i = 0; i < list_one.length; i++) {
  const value_1 = list_one[i];

  // Set all similarity counts to 0 by default
  occurenceMap[value_1] = 0;

  for (let j = 0; j < list_two.length; j++) {
    const value_2 = list_two[j];

    // If the values match, increase the occurence value
    if (parseInt(value_1) === parseInt(value_2)) {
      occurenceMap[value_1] += 1;
    }
  }
}

// Loop through the list once more to get the similarity score of each value and total up a sum
for (let i = 0; i < list_one.length; i++) {
  const value = list_one[i];

  sum += value * occurenceMap[value];
}

console.log(sum);
