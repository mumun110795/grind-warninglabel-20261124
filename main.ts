import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one line this entry exists to deliver: a safety warning label
// that should come printed on every human being.
const WARNING_LINE =
  "WARNING: Runs on 2 hours of sleep and total confidence. May say 'I'm fine' while malfunctioning. Do not let near a send button after midnight.";

const MAX_LINE_LENGTH = 160;

function resolveOutputDir(): string {
  const fromEnv = process.env.OUTPUT_DIR;
  return fromEnv && fromEnv.length > 0 ? fromEnv : "/output";
}

function main(): void {
  // Self-check before writing anything: the label has to be a single
  // non-empty line that fits inside the competition's hard limit.
  if (WARNING_LINE.length === 0 || WARNING_LINE.length > MAX_LINE_LENGTH) {
    throw new Error(
      `Warning line must be 1-${MAX_LINE_LENGTH} characters, got ${WARNING_LINE.length}`,
    );
  }
  if (WARNING_LINE.includes("\n") || WARNING_LINE.includes("\r")) {
    throw new Error("Warning line must be exactly one line");
  }

  const outDir = resolveOutputDir();

  // Create the output directory if needed. Only ever create it here —
  // never remove it: on the grading runner it may be a mounted volume.
  mkdirSync(outDir, { recursive: true });

  const entryPath = join(outDir, "entry.txt");
  writeFileSync(entryPath, WARNING_LINE, "utf8");

  console.log(`Wrote ${WARNING_LINE.length} characters to ${entryPath}`);
}

main();
