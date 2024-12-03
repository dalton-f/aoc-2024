const fs = require("fs");

let text = fs.readFileSync("days/day-03/input.txt", "utf-8");

let total = 0;

// Create a regex to match mul(x,y) where x and y are any digit value
const regex = /mul\(\d+,\d+\)/g;

// Get a non-corrupted array of all multiplication matches in the memory
const calculations = text.match(regex);

// Loop over the calculations
for (let i = 0; i < calculations.length; i++) {
  let calculation = calculations[i];

  // Remove the "mul" string and the brackets, to get a string with two numbers seperated by a number
  calculation = calculation
    .split("")
    .slice(4, calculation.length - 1)
    .join("");

  // Extract the values
  const [value_1, value_2] = calculation.split(",");

  // Get the sum of products
  const product = value_1 * value_2;

  total += product;
}

console.log(total);
