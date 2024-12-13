////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 13: Claw Contraption
// Link: https://adventofcode.com/2024/day/13
////////////////////////////////////////////////////////////////

// two buttons A and B
// A costs 3 tokens, B costs 1

// each button is configured to move the claw right along X and forward along Y each time pressed
// one prize, where the claw must be positioned exactly above it on X and Y

// what is the smallest possible number of tokens to spend to win as many prizes as possible
// there is a possibility that no combination reaches a prize

// the goal in this problem will always be to reach a point where ax * i + bx * j === prizeX && ay * i + by * j === prizeY
// we can try to solve for this directly when testing if the values are correct. where:

// ax * i + bx * j = px
// ay * i + by * j = py

// these two equations can become a system of linear equations with two variables and two equations (namely, i and j will always be in both equations) meaning there is a unique solution
// knowing that there is only ONE unique solution, this solution will always be the lowest, and this question is a bit of a track question

// to solve for i and j, we have to remove one of these variables in both, to do this we can ensure that the coefficent is the same so:

// ax * i + bx * j = px (* by)
// ay * i + by * j = py (* bx)

// becomes

// ax * by * i + bx * by * j = px * by
// ay * bx * i + by * bx * j = py * bx

// we can subtract the above equations because they both have the term bx * by * j, cancelling them out

// ax * by * i - ay * bx * i = px * by - py * bx (this equations eliminates j and we only have i which is what we are trying to find)

// we can group this equation to become:

// (ax * by - ay * bx) * i = px * by - py * bx

// dividing by (ax * by - ay * bx) gives

// i = px * by - py * bx / (ax * by - ay * bx)

// given the above equation, we have to ensure that ax * by !== ay * bx otherwise we would be dividing by zero, but we can assume this is false

// ax * by - ay * bx = 0 would cause the case to fail because we are solving for the interception of two lines, one going through prize (by / bx) and the other through the origin (ay / ax)
// if these lines are parallel, they dont intercept (or infinetely intersect)

// so i = px * by - py * bx / (ax * by - ay * bx) is one of our key equations, but we still need to find j
// we can isolate j from the original equation ax * i + bx * j = px by (subtracting ax * i) to get
// bx * j = px - ax * i
// then divide by bx to isolate j
// j = (px - ax * i) / bx

// another way to explain the above equation is that ax * i is how far we have travelled on x so far, the difference from px = how much left to go and then divide by bx to get button presses

// two key equations are:

// i = px * by - py * bx / (ax * by - ay * bx)
// j = (px - ax * i) / bx

const fs = require("fs");

const text = fs.readFileSync("days/day-13/input.txt", "utf-8");

const clawMachines = text.trim().split(/\n\s*\n/);

let total = 0;

console.time("Speed");

// Loop over each claw machine block
for (const clawMachine of clawMachines) {
  const [buttonA, buttonB, prize] = clawMachine.split("\n");

  // Extract the data converted into numbers

  // Could use regex to find all digits the simply have one big array destructure
  const [ax, ay] = buttonA
    .split(":")[1]
    .trim()
    .split(", ")
    .map((coordinate) => parseInt(coordinate.split("+")[1]));

  const [bx, by] = buttonB
    .split(":")[1]
    .trim()
    .split(", ")
    .map((coordinate) => parseInt(coordinate.split("+")[1]));

  let [prizeX, prizeY] = prize
    .split(": ")[1]
    .trim()
    .split(", ")
    .map((coordinate) => parseInt(coordinate.split("=")[1]));

  // Add 10000000000000 for the unit conversion in part 2
  prizeX += 10000000000000;
  prizeY += 10000000000000;

  // i === countA and j === countB where each variable is the count of that buttons presses
  // i = px * by - py * bx / (ax * by - ay * bx)
  let countA = (prizeX * by - prizeY * bx) / (ax * by - ay * bx);

  // j = (px - ax * i) / bx
  let countB = (prizeX - ax * countA) / bx;

  // As long as both are integers, we do not have a fractional solution
  if (countA % 1 === 0 && countB % 1 === 0) {
    // 3 tokens for A, 1 for B
    total += countA * 3 + countB;
  }
}

console.timeEnd("Speed");

console.log(`The minimum tokens used to get maximum prizes is ${total}`);
