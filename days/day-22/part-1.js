////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 22: Monkey Market
// Link: https://adventofcode.com/2024/day/22
////////////////////////////////////////////////////////////////

// 15887950
// 16495136
// 527345
// 704524
// 1553684
// 12683156
// 11100544
// 12249484
// 7753432
// 5908254

const fs = require("fs");

const input = fs
  .readFileSync("days/day-22/input.txt", "utf8")
  .trim()
  .split("\n");

let total = 0n;

const evolutions = 2000;

console.time("Speed");

// To mix a value into the secret number, calculate the bitwise XOR of the given value and the secret number. Then, the secret number becomes the result of that operation.
const mix = (x, y) => x ^ y;

// To prune the secret number, calculate the value of the secret number modulo 16777216
const prune = (x) => x % 16777216n;

// Loop over all of the monkeys starting numbers
for (const initialSecretNumber of input) {
  // Use BigInt to prevent integer overflow and negative values
  let secretNumber = BigInt(initialSecretNumber);

  // Evolve the number an amount of times
  for (let i = 0; i < evolutions; i++) {
    // Calculate the result of multiplying the secret number by 64. Then, mix this result into the secret number. Finally, prune the secret number.
    secretNumber = prune(mix(secretNumber, secretNumber * 64n));

    // Calculate the result of dividing the secret number by 32. Round the result down to the nearest integer. Then, mix this result into the secret number. Finally, prune the secret number.
    secretNumber = prune(mix(secretNumber, secretNumber / 32n));

    // Calculate the result of multiplying the secret number by 2048. Then, mix this result into the secret number. Finally, prune the secret number.
    secretNumber = prune(mix(secretNumber, secretNumber * 2048n));
  }

  // Add the 2000th evolution to the total
  total += secretNumber;
}

console.log("Part 1:", total.toString());

console.timeEnd("Speed");
