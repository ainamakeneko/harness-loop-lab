import fs from "node:fs";
import { pathToFileURL } from "node:url";

export function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        field += character;
      }
    } else if (character === '"' && field === "") {
      quoted = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }
  if (quoted) throw new Error("CSV contains an unclosed quoted field.");
  row.push(field);
  if (row.some((value) => value !== "")) rows.push(row);
  return rows;
}

export function summarizeMonthlyCsv(text, month) {
  if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(month)) {
    throw new Error("Month must use YYYY-MM format.");
  }

  const [header, ...rows] = parseCsv(text);
  const expected = ["date", "activity", "count"];
  if (!header || expected.some((name, index) => header[index]?.trim().toLowerCase() !== name)) {
    throw new Error("CSV header must be: date,activity,count");
  }

  const totals = new Map();
  rows.forEach((row, index) => {
    const line = index + 2;
    if (row.length !== 3) throw new Error(`Line ${line} must have exactly 3 columns.`);
    const [date, rawActivity, rawCount] = row.map((value) => value.trim());
    const parsedDate = new Date(`${date}T00:00:00Z`);
    if (!/^\d{4}-(0[1-9]|1[0-2])-([012]\d|3[01])$/.test(date)
      || Number.isNaN(parsedDate.valueOf())
      || parsedDate.toISOString().slice(0, 10) !== date) {
      throw new Error(`Line ${line} has an invalid date; use YYYY-MM-DD.`);
    }
    if (!rawActivity) throw new Error(`Line ${line} has no activity.`);
    if (!/^\d+$/.test(rawCount) || !Number.isSafeInteger(Number(rawCount))) {
      throw new Error(`Line ${line} count must be a non-negative whole number.`);
    }
    if (date.startsWith(`${month}-`)) {
      totals.set(rawActivity, (totals.get(rawActivity) ?? 0) + Number(rawCount));
    }
  });
  return [...totals.entries()].sort(([left], [right]) => left.localeCompare(right));
}

function csvField(value) {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function renderReport(month, totals) {
  return [`month,activity,total`, ...totals.map(([activity, total]) => `${month},${csvField(activity)},${total}`)].join("\n") + "\n";
}

function main() {
  const [inputPath, month] = process.argv.slice(2);
  if (!inputPath || !month) {
    console.error("Usage: node monthly-report.js INPUT.csv YYYY-MM");
    process.exitCode = 1;
    return;
  }
  try {
    process.stdout.write(renderReport(month, summarizeMonthlyCsv(fs.readFileSync(inputPath, "utf8"), month)));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
