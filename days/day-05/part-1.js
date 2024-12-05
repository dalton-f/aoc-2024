////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 5 - Print Queue
// Link: https://adventofcode.com/2024/day/5
////////////////////////////////////////////////////////////////

const fs = require("fs");

let text = fs.readFileSync("days/day-05/input.txt", "utf-8");

// Split at the instance of a new line with any amount of whitespace or new lines afterwards - unsure why \n\n doesn't split it correctly
const parts = text.trim().split(/\r?\n\s*\r?\n/);

// Split up the data
const rules = parts[0].split("\n");

const updates = parts[1].split("\n");

const orders = {};

const correctlyOrderedUpdates = [];

let total = 0;

for (const rule of rules) {
  const [priorityNumber, secondaryNumber] = rule.split("|");

  // Create a hashmap where a key is a number and the value is an array of numbers that it must be befer
  if (orders[priorityNumber]) {
    orders[priorityNumber].push(parseInt(secondaryNumber));
  } else {
    orders[priorityNumber] = [parseInt(secondaryNumber)];
  }
}

// For every update
for (const update of updates) {
  let isCorrectlyOrdered = true;

  let nums = update.split(",").map(Number);

  // Loop over each number
  for (let i = 0; i < nums.length - 1; i++) {
    // Look at each pair
    const currNumber = nums[i];
    const nextNumber = nums[i + 1];

    // Make sure that the pair follows the rules
    const rules = orders[currNumber];

    const nextRules = orders[nextNumber];

    // If the current number should be after the next number, it is wrong
    if (rules && !rules.includes(nextNumber)) isCorrectlyOrdered = false;

    // If the next number should be infront of the current number, it is wrong
    if (nextRules && nextRules.includes(currNumber)) isCorrectlyOrdered = false;
  }

  if (isCorrectlyOrdered) {
    correctlyOrderedUpdates.push(nums);
  }
}

for (const update of correctlyOrderedUpdates) {
  const middle = Math.floor(update.length / 2);

  total += update[middle];
}

console.log(total);
