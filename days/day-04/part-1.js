const fs = require("fs");

let text = fs.readFileSync("days/day-04/input.txt", "utf-8");

let total = 0;

let lines = text.split("\n");

// HORIONTAL CHECKS
for (const line of lines) {
  for (let i = 0; i < line.length; i++) {
    const group = line.slice(i, i + 4);

    if (group === "XMAS" || group === "SAMX") total++;
  }
}

// VERTICAL CHECKS
for (let i = 0; i < lines[0].length; i++) {
  for (let j = 0; j < lines.length - 3; j++) {
    const group = [
      lines[j][i],
      lines[j + 1][i],
      lines[j + 2][i],
      lines[j + 3][i],
    ].join("");

    if (group === "XMAS" || group === "SAMX") total++;
  }
}

// FORWARD DIAGONAL CHECKS
for (let i = 0; i < lines[0].length; i++) {
  for (let j = 0; j < lines.length - 3; j++) {
    const group = [
      lines[j][i],
      lines[j + 1][i + 1],
      lines[j + 2][i + 2],
      lines[j + 3][i + 3],
    ].join("");

    if (group === "XMAS" || group === "SAMX") total++;
  }
}

// BACKWARD DIAGONAL CHECKS
for (let i = 0; i < lines[0].length; i++) {
  for (let j = 0; j < lines.length - 3; j++) {
    const group = [
      lines[j][i],
      lines[j + 1][i - 1],
      lines[j + 2][i - 2],
      lines[j + 3][i - 3],
    ].join("");

    if (group === "XMAS" || group === "SAMX") total++;
  }
}

console.log(total);
