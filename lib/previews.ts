export type Preview = {
  slug: string; title: string; category: string; description: string;
  image: string; source: string; number: string; format: string;
  duration: string; featured?: boolean; takeaway: string; prompts: string[];
};

// Add an entry and its self-contained HTML + thumbnail to public/ to extend the library.
export const previews: Preview[] = [
  {
    slug: 'how-a-chip-is-made', title: 'How a chip is made', category: 'Hardware',
    description: 'From a blank piece of silicon to billions of possibilities. Follow the layers that make a microchip.',
    image: '/images/chip.svg', source: '/previews/chip-making.html', number: '01',
    format: '10-step animation', duration: '3 min exploration', featured: true,
    takeaway: 'Chips are built through repeated cycles of adding material, patterning it with light, and selectively removing it.',
    prompts: ['Press Play to follow the full sequence.', 'Compare Develop and Etch. What changes in each?', 'Jump to Connect to see the wiring above the switches.'],
  },
  {
    slug: 'the-nearby-copy', title: 'The nearby copy', category: 'Computer science',
    description: 'A filing cabinet, two little trays, and the surprisingly simple idea that makes apps faster.',
    image: '/images/cache.svg', source: '/previews/cache.html', number: '02',
    format: 'Interactive experiment', duration: '2 min exploration',
    takeaway: 'A cache keeps recently used data nearby. Repeated requests get faster, but a small cache must make room for new items.',
    prompts: ['Request A twice and compare the response times.', 'Try A → A → B → C → A to see an eviction.', 'Watch the hit rate change as you repeat requests.'],
  },
];
export const categories = ['All explorations', ...new Set(previews.map(p => p.category))];
export const findPreview = (slug: string) => previews.find(p => p.slug === slug);
