/** The three lead magnets. Titles and subtitles are taken from the guides themselves. */
export const guides = [
  {
    slug: "relocation-readiness-checklist",
    tag: "Study & relocate",
    title: "Relocation Readiness Checklist",
    sub: "The 29 checks to settle before you spend money on a visa application",
    file: "/guides/relocation-readiness-checklist.pdf",
  },
  {
    slug: "cv-checklist",
    tag: "Career",
    title: "The CV Checklist",
    sub: "31 checks, and the six that decide whether a human ever reads it",
    file: "/guides/cv-checklist.pdf",
  },
  {
    slug: "documentation-gap-checklist",
    tag: "Business",
    title: "The Documentation Gap Checklist",
    sub: "What a corporate client, a bank or a funder will ask you for — and what most Nigerian SMEs cannot produce",
    file: "/guides/documentation-gap-checklist.pdf",
  },
] as const;

export const guideBySlug = (s: string | undefined) => guides.find((g) => g.slug === s);
