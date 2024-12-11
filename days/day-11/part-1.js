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

// All changes are going to happen in-place of the stones array
const transformStones = (stones) => {
  // Loop over the stones array
  for (let i = 0; i < stones.length; i++) {
    const stone = stones[i];
    const length = String(stone).length;

    // If the stone is zero, replace it with 1
    if (stone === 0) {
      console.log(
        `Stone ${stone} meets the first rule and transforms from 0 to 1`
      );

      stones[i] = 1;
      // Ensure that only the first applicable rule is applied
      continue;
    }

    // If the stone has an even amount of digits
    if (length % 2 === 0) {
      const stoneString = String(stone);

      // Split it into two stones - using parseInt will already remove the leading zeroes
      const left = parseInt(stoneString.slice(0, length / 2));
      const right = parseInt(stoneString.slice(length / 2, length));

      // Replace the current index of the stone with the two split stones
      stones.splice(i, 1, left, right);

      // Ensure this loop skips over the second split stone, otherwise it could get transformed again
      i++;

      console.log(
        `Stone ${stone} meets the second rule and is split into two stones: ${left} and ${right}`
      );

      continue;
    }

    // Doesn't meet the two above rules, so multiply by 2024

    console.log(
      `Stone ${stone} doesn't meet either of the first two rules so is multiplied by 2024 and transforms into ${
        stone * 2024
      }`
    );

    stones[i] = stone * 2024;
  }

  return stones;
};

// 0 1 10 99 999 should become 1 2024 1 0 9 9 2021976 after 1 blink
// 125 17 should become 253000 1 7 after 1 blink and 253 0 2024 14168 after 2

for (let i = 0; i < blinks; i++) {
  // Since everything happens in place of stone, we can just call this as many times as we want to transform the stones
  transformStones(stones);
}

console.log(
  `After ${blinks} transformations, the stones have a length of ${stones.length}`
);
