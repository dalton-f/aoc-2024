////////////////////////////////////////////////////////////////
// Advent of Code 2024 Day 2 - Red-Nosed Reports
// Link: https://adventofcode.com/2024/day/2
////////////////////////////////////////////////////////////////

const fs = require("fs");

let text = fs.readFileSync("days/day-02/input.txt", "utf-8");

const reports = text.trim().split("\n");

let safeReportCount = 0;

const isSafe = (report) => {
  const levels = report.split(" ").map(Number);

  const isAscending = levels.every(
    (level, index) => index === 0 || level > levels[index - 1]
  );

  const isDescending = levels.every(
    (level, index) => index === 0 || level < levels[index - 1]
  );

  // If the report is not ascending or descending, it is not safe so skip it
  if (!isAscending && !isDescending) return false;

  // Check the differences in values
  for (let i = 0; i < levels.length - 1; i++) {
    const diff = Math.abs(levels[i + 1] - levels[i]);

    // If the difference is not >= 1 or <= 3 then skip it
    if (diff < 1 || diff > 3) return false;
  }

  return true;
};

for (const report of reports) {
  let isOkay = false;

  const reportVariants = [];

  const levels = report.split(" ").map(Number);

  // Loop over each level and generate a variant that doesn't include itself
  for (let i = 0; i < levels.length; i++) {
    const variant = levels.slice(0, i).concat(levels.slice(i + 1));

    reportVariants.push(variant.join(" "));
  }

  // For each variant check if it is safe
  for (const variant of reportVariants) {
    // If a variant of the report is safe, that must mean that the actual report is safe based on the problem dapener, so we can add it to the total
    if (isSafe(variant)) isOkay = true;
  }

  if (isOkay) safeReportCount++;
}

console.log(`Safe report count: ${safeReportCount}`);
