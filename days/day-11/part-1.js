////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 11 - Plutonian Pebbles
// Link: https://adventofcode.com/2024/day/11
////////////////////////////////////////////////////////////////

// Stones in a straight line
// Consistently change
// Stone order is always preserved

// First applicable rule of:

// If the stone is 0, it is replaced by a stone with the number 1.
// If the stone is a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone.
// Otherwise, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.

// How many stones will you have after them changing through the rules 25 times

const fs = require("fs");

const text = fs.readFileSync("days/day-11/input.txt", "utf-8");

// Convert to numbers immediately so I don't have to worry about multiplication etc
const stones = text.split(" ").map(Number);

// Amount of times the stones are passed through transform stones
const blinks = 25;

const transformStones = (stones) => {
  const transformedStones = [];

  // Loop over the stones array
  for (let i = 0; i < stones.length; i++) {
    const stone = stones[i];
    const length = String(stone).length;

    // If the stone is zero, replace it with 1
    if (stone === 0) {
      transformedStones.push(1);

      // Ensure that only the first applicable rule is applied
      continue;
    }

    // If the stone has an even amount of digits - I think bitwise could be used for the length % 2 and length / 2 here, although I do not think it'd be much quicker
    if (length % 2 === 0) {
      const stoneString = String(stone);

      // Split it into two stones - using parseInt will already remove the leading zeroes
      const left = parseInt(stoneString.slice(0, length / 2));
      const right = parseInt(stoneString.slice(length / 2, length));

      // Creating a new array instead of splicing in the old array increases the performance greately
      transformedStones.push(left);
      transformedStones.push(right);

      continue;
    }

    // Doesn't meet the two above rules, so multiply by 2024
    transformedStones.push(stone * 2024);
  }

  return transformedStones;
};

// 0 1 10 99 999 should become 1 2024 1 0 9 9 2021976 after 1 blink
// 125 17 should become 253000 1 7 after 1 blink and 253 0 2024 14168 after 2

let transformedStones = stones;

for (let i = 0; i < blinks; i++) {
  transformedStones = transformStones(transformedStones);
}

console.log(
  `After ${blinks} transformations, the stones have a length of ${transformedStones.length}`
);
