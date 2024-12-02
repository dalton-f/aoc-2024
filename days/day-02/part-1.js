const fs = require("fs");

let text = fs.readFileSync("days/day-02/input.txt", "utf-8");

const reports = text.trim().split("\n");

let safeReportCount = 0;

for (const report of reports) {
  // Convert all values to integers
  const levels = report.split(" ").map(Number);

  console.log(`Levels: ${levels}`);

  // Check a report is increasing or decreasing
  const isAscending = levels.every(
    (level, index) => index === 0 || level > levels[index - 1]
  );

  const isDescending = levels.every(
    (level, index) => index === 0 || level < levels[index - 1]
  );

  console.log(
    `Report: ${report}, isAscending: ${isAscending}, isDescending: ${isDescending}`
  );

  // If the report is not ascending or descending, it is not safe so skip it
  if (!isAscending && !isDescending) continue;

  // Calculate the differences between each subsequent level in the report
  const differences = levels
    .slice(1)
    .map((level, index) => Math.abs(level - levels[index]));

  console.log(`Report: ${report}, Differences: ${differences}`);

  // Check that every difference is at least one and at most three
  const isSafeReport = differences.every((value) => value >= 1 && value <= 3);

  if (isSafeReport) safeReportCount++;
}

console.log(`Safe report count: ${safeReportCount}`);
