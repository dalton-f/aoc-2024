const fs = require("fs");

let text = fs.readFileSync("days/day-03/input.txt", "utf-8");

let total = 0;

let isEnabled = true;

// Loop over input and gather group of threes to check for the start of a "mul" instruction
for (let i = 0; i < text.length; i++) {
  const group = text.slice(i, i + 4);

  // Before doing the calculations, check every grouping of 7 and 4 characters to test for do() and dont() commands

  if (text.slice(i, i + 7) === "don't()") isEnabled = false;

  if (text.slice(i, i + 4) === "do()") isEnabled = true;

  // If it isn't a multiplication, ignore it
  if (group !== "mul(") continue;

  // Otherwise, given this info "mul(X,Y)" where X and Y are each 1-3 digit" we can check to grab the calculation
  let offset = i + 4;

  // Keep incrementing the offset until we reach the end of the calculation
  while (text[offset] !== ")") offset++;

  let calculation = text.slice(i, offset);

  // Remove the prefix "mul" and the brackets

  calculation = calculation
    .split("")
    .splice(4, calculation.length - 1)
    .join("");

  const [value_1, value_2] = calculation.split(",");

  // Ignores any values that are greater than 3 - this would indicate that the final character was not a closing bracket so we can ignore it

  if (value_1.length > 3 || value_2.length > 3) continue;

  // Only add to the total if enabled
  if (isEnabled) {
    const product = value_1 * value_2;

    total += product;
  }
}

console.log(total);
