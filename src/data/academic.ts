export type AcademicItem = {
  title: string
  org: string
  timeframe: string
  details: string[]
}

export const academicTimeline: AcademicItem[] = [
  {
    title: 'B.Tech Computer Engineering',
    org: 'Charusat University',
    timeframe: '2024 — 2028',
    details: [
      'Key subjects: Data Structures, Operating System, DBMS, Computer Networks',
      'Software Engineering and Machine Learning fundamentals',
    ],
  },
  {
    title: 'Core Subject Focus',
    org: 'Computer Engineering Track',
    timeframe: 'Ongoing',
    details: [
      'DSA: problem-solving + complexity awareness',
      'DBMS: normalization, indexing, SQL design',
      'CN + OS: processes, scheduling, protocols',
    ],
  },
  {
    title: 'Projects + Practical Learning',
    org: 'Development & AI',
    timeframe: 'Ongoing',
    details: [
      'Full stack apps with clean APIs and secure patterns',
      'AI experiments: datasets, training, evaluation',
    ],
  },
]
