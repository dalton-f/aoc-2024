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

const incorrectlyOrderedUpdates = [];

let total = 0;

for (const rule of rules) {
  const [priorityNumber, secondaryNumber] = rule.split("|").map(Number);

  // Create a hashmap where a key is a number and the value is an array of numbers that it must be befer
  if (orders[priorityNumber]) {
    orders[priorityNumber].push(secondaryNumber);
  } else {
    orders[priorityNumber] = [secondaryNumber];
  }
}

// For every update
for (const update of updates) {
  let isNotCorrectlyOrdered = false;

  let nums = update.split(",").map(Number);

  // Loop over each number
  for (let i = 0; i < nums.length - 1; i++) {
    // Look at each pair
    const currNumber = nums[i];
    const nextNumber = nums[i + 1];

    // Make sure that the pair follows the rules
    const rules = orders[currNumber];

    const nextRules = orders[nextNumber];

    // Check both rules at the same time, as swapping will have the same effect and will otherwise reverse itself
    if (
      (rules && !rules.includes(nextNumber)) ||
      (nextRules && nextRules.includes(currNumber))
    ) {
      // Do the swap in place
      [nums[i + 1], nums[i]] = [nums[i], nums[i + 1]];

      isNotCorrectlyOrdered = true;

      // Go over the update again in a passback to fix any other values
      i -= 2;
    }
  }

  // For part 2, we use the same logic as a bove just swithced to store the incorrectly ordered updates
  if (isNotCorrectlyOrdered) {
    incorrectlyOrderedUpdates.push(nums);
  }
}

for (const update of incorrectlyOrderedUpdates) {
  const middle = Math.floor(update.length / 2);

  total += update[middle];
}

console.log(total);
