////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 19: Linen Layout
// Link: https://adventofcode.com/2024/day/19
////////////////////////////////////////////////////////////////

// arrangement of towels
// every towel marked with a pattern of colored stripes
// each stripe can be white (w), blue (u), black (b), red (r) or green (g)

// list of designs - long sequence of stripe colors
// all of the towels' stripes must exactly match the desired

// available towel patterns = first line of the input
// the remaining lines each describe a design
// not all designs are possible
// 6 of 8 are possible, how many are possible

const fs = require("fs");
const input = fs.readFileSync("days/day-19/input.txt", "utf8").trim();

let [patterns, designs] = input.split("\n\n");

patterns = patterns.split(", ");
designs = designs.split("\n");

let total = 0;

console.time("Speed");

const canMakeDesign = (design) => {
  if (design.length === 0) return true;

  // Generate all groups of substrings within a given design string
  for (let i = 1; i <= design.length; i++) {
    const group = design.slice(0, i);

    // Check if the group is a valid pattern and can the rest of the design after it
    if (patterns.includes(group) && canMakeDesign(design.slice(i), patterns)) {
      return true;
    }
  }

  return false;
};

for (const design of designs) {
  let canMake = canMakeDesign(design, patterns);

  if (canMake) total++;
}

console.log("Part 1:", total);

console.timeEnd("Speed");
