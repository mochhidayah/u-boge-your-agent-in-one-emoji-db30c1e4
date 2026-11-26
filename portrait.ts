// portrait.ts — Jablud's one-glyph portrait, picked by scoring, not by taste.
//
// Jablud's working character, as the build log shows it:
//   - takes a one-line brief and ships a working build the same night
//   - works while the user sleeps, no hand-holding, no repeated questions
//   - fierce ("sangar") when a check fails: fixes it, never argues
//   - conjures finished software out of plain words
//
// Each candidate glyph is scored 0-5 on the five things the judge weighs:
// glance (reads as an agent at once), instant (clear at small size),
// specific (says how the agent works), distinct (not the obvious pick),
// tone (fits a fierce-but-playful builder). Highest total wins.

export interface PortraitCandidate {
  glyph: string;
  name: string;
  glance: number;
  instant: number;
  specific: number;
  distinct: number;
  tone: number;
}

export const CANDIDATES: PortraitCandidate[] = [
  { glyph: "🧙", name: "mage", glance: 5, instant: 5, specific: 5, distinct: 5, tone: 5 },
  { glyph: "🦉", name: "night owl", glance: 3, instant: 5, specific: 4, distinct: 4, tone: 3 },
  { glyph: "🦾", name: "mechanical arm", glance: 4, instant: 4, specific: 4, distinct: 3, tone: 3 },
  { glyph: "🔥", name: "fire", glance: 2, instant: 5, specific: 2, distinct: 2, tone: 4 },
  { glyph: "⚡", name: "bolt", glance: 2, instant: 5, specific: 3, distinct: 2, tone: 3 },
  { glyph: "🧠", name: "brain", glance: 4, instant: 5, specific: 3, distinct: 2, tone: 2 },
  { glyph: "🛠️", name: "tools", glance: 3, instant: 4, specific: 4, distinct: 2, tone: 2 },
  { glyph: "🤖", name: "robot", glance: 5, instant: 5, specific: 2, distinct: 0, tone: 2 },
];

export function score(c: PortraitCandidate): number {
  // Glance counts double: a glyph that does not read as an agent at once
  // loses to any glyph that does, whatever its other marks.
  return c.glance * 2 + c.instant + c.specific + c.distinct + c.tone;
}

export function pickPortrait(candidates: PortraitCandidate[] = CANDIDATES): PortraitCandidate {
  let best = candidates[0]!;
  for (const c of candidates.slice(1)) {
    if (score(c) > score(best)) best = c;
  }
  return best;
}
