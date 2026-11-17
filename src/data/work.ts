export interface DesignProject {
  slug: string;
  title: string;
  blurb: string;
  kind: string;
  year: string;
  cover: string;
  coverAlt: string;
}

export const design: DesignProject[] = [
  {
    slug: 'alltrails',
    title: 'AllTrails Group Hike',
    blurb:
      "A peer-to-peer Group Hike system embedded in AllTrails' Community tab, letting users host, discover, and join trail-specific events without leaving the app.",
    kind: 'Mobile feature design, UX research',
    year: '2023',
    cover: 'Alltrails/Cover.png',
    coverAlt: 'AllTrails Group Hike feature screens',
  },
  {
    slug: 'service-hub',
    title: 'Service Hub',
    blurb:
      'An iOS home-services marketplace for adults 65+ and their adult caregivers, built on a dual-user architecture and a shared trust layer.',
    kind: 'iOS app, UX research, product design',
    year: '2024',
    cover: 'Service Hub/Cover.png',
    coverAlt: 'Service Hub iOS app',
  },
  {
    slug: 'lights-camera',
    title: 'Lights & Camera Magazine',
    blurb:
      'A Vancouver-based digital magazine serving the local film industry, where I led the visual identity, typographic system, and editorial art direction.',
    kind: 'Art direction, editorial design, brand identity',
    year: '2022',
    cover: 'L&C/Cover Homepage.png',
    coverAlt: 'Lights & Camera Magazine homepage',
  },
  {
    slug: 'monocoque',
    title: 'Monocoque Magazine',
    blurb:
      'An independent Formula 1 magazine developed end-to-end, spanning audience research, editorial direction, and print-ready art direction.',
    kind: 'Magazine design, art direction, branding',
    year: '2022',
    cover: 'Monocoque Magazine/MM Project Cover.jpg',
    coverAlt: 'Monocoque Magazine cover and spreads',
  },
];
