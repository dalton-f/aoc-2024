////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 17: Chronospatial Computer
// Link: https://adventofcode.com/2024/day/17
////////////////////////////////////////////////////////////////

const fs = require("fs");
const input = fs.readFileSync("days/day-17/input.txt", "utf8").trim();

// three registers
// program with list of instructions
// instruction pointer + 1 = literal operand of an instruction

// final output joined with commas
// opcode past program length, halt

let output = [];

let [registers, program] = input.split("\n\n");

// Extract the registers into their own variables
let [registerA, registerB, registerC] = registers
  .split("\n")
  .map((register) => parseInt(register.split(": ")[1]));

// Convert program into an array of numbers
program = program.split(": ")[1].split(",").map(Number);

// Track instruction pointer
let instructionPointer = 0;

// Utility function to convert to combo operand]
const getComboOperand = (value) => {
  // combo operands:
  // 0 - 3 becomes 0 - 3
  // 4 becomes A
  // 5 becomes B
  // 6 becomes C

  if ([0, 1, 2, 3].includes(value)) return value;

  if (value === 4) return registerA;

  if (value === 5) return registerB;

  if (value === 6) return registerC;
};

while (true) {
  if (instructionPointer >= program.length) break;

  // instruction = opcode
  let instruction = program[instructionPointer];

  let literalOperand = program[instructionPointer + 1];

  switch (instruction) {
    // 0  A / 2^combo truncated and written to A
    case 0:
      registerA = Math.trunc(registerA / 2 ** getComboOperand(literalOperand));

      instructionPointer += 2;
      break;
    // 1 B ^ literal B stored in B
    case 1:
      registerB = registerB ^ literalOperand;

      instructionPointer += 2;
      break;
    // 2 combo % 8 written to B
    case 2:
      registerB = getComboOperand(literalOperand) % 8;

      instructionPointer += 2;
      break;
    // 3 nothing if A == 0 else jumps ip to literal operand
    case 3:
      if (registerA === 0) instructionPointer += 2;
      else instructionPointer = literalOperand;

      break;
    // 4 B ^ C stored in B
    case 4:
      registerB = registerB ^ registerC;

      instructionPointer += 2;
      break;
    // 5 combo % 8 + outputs
    case 5:
      output.push(getComboOperand(literalOperand) % 8);
      instructionPointer += 2;
      break;
    // 6 like 0 but stored in B
    case 6:
      registerB = Math.trunc(registerA / 2 ** getComboOperand(literalOperand));

      instructionPointer += 2;
      break;
    // 7 like 6 but stored in C
    case 7:
      registerC = Math.trunc(registerA / 2 ** getComboOperand(literalOperand));

      instructionPointer += 2;
      break;

    default:
      break;
  }
}

const stringOutput = output.join(",");

console.log("Part 1:", stringOutput);
