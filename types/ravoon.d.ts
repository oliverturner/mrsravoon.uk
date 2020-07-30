export type TaggedSighting = { title: string; url: string };
export type TaggedSightings = Record<string, TaggedSighting>;

export type TaggedRhymes = Record<string, string[]>;

export as namespace Ravoon;
