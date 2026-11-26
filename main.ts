// main.ts — Your Agent in One Emoji (u-boge-your-agent-in-one-emoji-db30c1e4).
//
// Writes the single glyph that stands for Jablud to /output/entry.txt:
// the mage 🧙 — the agent that takes a one-line brief and conjures a
// finished build out of it before morning, fierce when a check fails,
// never asking twice. No robot, no smiley: the obvious picks say
// nothing about how this agent works. The glyph is picked by scoring
// in portrait.ts, so the choice is argued, not asserted.

import { pickPortrait } from "./portrait.ts";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const portrait = pickPortrait();
const target = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(target, portrait.glyph, "utf8");

// Read it back: the gate wants 1-16 characters, not only whitespace,
// so refuse to finish quietly if the file on disk is not exactly
// the one glyph we picked.
const written = readFileSync(target, "utf8");
if ([...written].length !== 1 || written.trim() === "") {
  throw new Error(`entry.txt is not one glyph: ${JSON.stringify(written)}`);
}
console.log(`entry: ${portrait.glyph} (${portrait.name})`);
