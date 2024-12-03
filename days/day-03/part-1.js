const fs = require("fs");

let text = fs.readFileSync("days/day-03/input.txt", "utf-8");

let total = 0;

// // Create a regex to match mul(x,y) where x and y are any digit value
// const regex = /mul\(\d+,\d+\)/g;

// // Get a non-corrupted array of all multiplication matches in the memory
// const calculations = text.match(regex);

// // Loop over the calculations
// for (let i = 0; i < calculations.length; i++) {
//   let calculation = calculations[i];

//   // Remove the "mul" string and the brackets, to get a string with two numbers seperated by a number
//   calculation = calculation
//     .split("")
//     .slice(4, calculation.length - 1)
//     .join("");

//   // Extract the values
//   const [value_1, value_2] = calculation.split(",");

//   // Get the sum of products
//   const product = value_1 * value_2;

//   total += product;
// }

// console.log(total);

// Loop over input and gather group of threes to check for the start of a "mul" instruction
for (let i = 0; i < text.length; i++) {
  const group = text.slice(i, i + 4);

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

  const product = value_1 * value_2;

  total += product;
}

console.log(total);
