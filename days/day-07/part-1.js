////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 7 - Bridge Repair
// Link: https://adventofcode.com/2024/day/7
////////////////////////////////////////////////////////////////

const fs = require("fs");

const text = fs.readFileSync("days/day-07/input.txt", "utf-8");

const calibrationEquations = text.split("\n");

let total = 0;

const operators = ["+", "*"];

const evaluateValidEquations = (numbers, target, current) => {
  // Base case: one number left
  if (numbers.length === 1) {
    // If this number is the final number as part of an equation and can reach target, the expression is valid
    return current + numbers[0] === target || current * numbers[0] === target;
  }

  // Recursive case: try each operator by narrowing down the numbers array by every second element
  return (
    evaluateValidEquations(numbers.slice(1), target, current + numbers[0]) ||
    evaluateValidEquations(numbers.slice(1), target, current * numbers[0])
  );
};

// Loop over each equation
for (const calibrationEquation of calibrationEquations) {
  let [target, numbers] = calibrationEquation.split(": ");

  // Ensure all data is type integer/number before using it in calculations
  target = parseInt(target);
  numbers = numbers.split(" ").map(Number);

  // Recursively check valid equations to see if they meet the target
  if (evaluateValidEquations(numbers, target, 0)) total += target;
}

console.log(total);
