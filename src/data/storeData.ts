export type ProductCategory =
  | 'School & Exam'
  | 'Pens & Writing'
  | 'Art & Craft'
  | 'Office & Files';

export interface ProductVariant {
  id: string;
  label: string;
  price: number;
}

export interface ProductItem {
  id: string;
  name: string;
  category: ProductCategory;
  packSummary: string;
  availability: 'In Stock' | 'Bulk Ready';
  description: string;
  image: string;
  variants: ProductVariant[];
}

export interface CartItem {
  key: string;
  productId: string;
  name: string;
  variantLabel: string;
  category: string;
  unitPrice: number;
  quantity: number;
  image: string;
  isPrintJob?: boolean;
}

export interface PrintServiceOption {
  id: string;
  name: string;
  ratePerUnit: number;
  unitLabel: string;
  note: string;
  supportsDoubleSided: boolean;
}

export const BRANCH_INFO = {
  brandName: 'VRM Stationery',
  branchTitle: 'VRM Second Branch',
  addressLine1: 'Cheyyur Road (Near Railway Gate)',
  addressLine2: 'Sothupakkam - 603319, Tamil Nadu',
  fullAddress: 'VRM Stationery (Second Branch), Cheyyur Road (Near Railway Gate), Sothupakkam - 603319',
  phoneRaw: '9790586876',
  phoneDisplay: '+91 97905 86876',
  whatsappNumber: '919790586876',
  weekdayHours: 'Mon – Sat · 8:30 AM – 9:30 PM',
  sundayHours: 'Sunday · 9:30 AM – 2:00 PM',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Cheyyur+Road+Sothupakkam+603319',
};

export const STORE_IMAGES = {
  hero: '/src/assets/images/hero_vrm_stationery_1794845606226.jpg',
  school: '/src/assets/images/cat_notebooks_school_1794845606109.jpg',
  pens: '/src/assets/images/cat_pens_writing_1794845607192.jpg',
  art: '/src/assets/images/cat_art_craft_1794845607512.jpg',
  office: '/src/assets/images/cat_office_files_1794845608017.jpg',
  print: '/src/assets/images/service_print_binding_1794845608755.jpg',
};

export const CATALOG_CATEGORIES: Array<'All' | ProductCategory> = [
  'All',
  'School & Exam',
  'Pens & Writing',
  'Art & Craft',
  'Office & Files',
];

export const CATALOG_ITEMS: ProductItem[] = [
  {
    id: 'king-ruled-notebooks',
    name: 'Long Size Bound Notebooks (172 Pages)',
    category: 'School & Exam',
    packSummary: '70 GSM bright paper',
    availability: 'Bulk Ready',
    description:
      'Sturdy stitched-and-bound long notebooks built for daily schoolwork and college lecture notes. Smooth 70 GSM bleed-resistant sheets.',
    image: STORE_IMAGES.school,
    variants: [
      { id: 'single-ruled', label: 'Single Book · Ruled', price: 65 },
      { id: 'pack-6-ruled', label: 'Pack of 6 · Ruled', price: 360 },
      { id: 'pack-6-unruled', label: 'Pack of 6 · Unruled', price: 360 },
    ],
  },
  {
    id: 'a4-spiral-registers',
    name: 'A4 Spiral Subject Registers (300 Pages)',
    category: 'School & Exam',
    packSummary: 'Twin-wire coil · Hard cover',
    availability: 'In Stock',
    description:
      'Lay-flat A4 spiral notebooks with laminated board covers and micro-perforated pages suited for board exam prep and college coursework.',
    image: STORE_IMAGES.school,
    variants: [
      { id: 'single-a4', label: 'Single Register · 300p', price: 145 },
      { id: 'set-3-a4', label: 'Pack of 3 · 300p', price: 410 },
    ],
  },
  {
    id: 'math-geometry-kit',
    name: 'Precision Metal Geometry & Exam Kit',
    category: 'School & Exam',
    packSummary: 'Compass, divider & scales',
    availability: 'In Stock',
    description:
      'Complete metal compass box with self-centering divider, 15 cm shatter-resistant ruler, set squares, protractor, eraser, and HB pencils.',
    image: STORE_IMAGES.school,
    variants: [
      { id: 'standard-tin', label: 'Standard Tin Box', price: 165 },
      { id: 'exam-combo', label: 'Box + Transparent Exam Pad', price: 255 },
    ],
  },
  {
    id: 'smooth-gel-pens',
    name: '0.5mm Waterproof Gel Pens',
    category: 'Pens & Writing',
    packSummary: 'Quick-dry blue & black ink',
    availability: 'Bulk Ready',
    description:
      'Crisp 0.5mm needle-point gel pens engineered for smudge-free exam writing and fast note-taking with cushioned grip barrels.',
    image: STORE_IMAGES.pens,
    variants: [
      { id: 'pack-5-blue', label: 'Pack of 5 · Blue Ink', price: 60 },
      { id: 'pack-10-mixed', label: 'Box of 10 · Blue & Black', price: 115 },
    ],
  },
  {
    id: 'pastel-highlighters',
    name: 'Chisel-Tip Study Highlighter Set',
    category: 'Pens & Writing',
    packSummary: 'Low-bleed archival tint',
    availability: 'In Stock',
    description:
      'Dual-line chisel nib markers in calm, high-legibility shades that highlight textbook print cleanly without soaking through standard notebook paper.',
    image: STORE_IMAGES.pens,
    variants: [
      { id: 'set-4', label: 'Set of 4 Shades', price: 110 },
      { id: 'set-6', label: 'Set of 6 Shades', price: 160 },
    ],
  },
  {
    id: 'student-fountain-pen',
    name: 'Classic Fine-Nib Fountain Pen & Cartridges',
    category: 'Pens & Writing',
    packSummary: 'Medium-fine iridium nib',
    availability: 'In Stock',
    description:
      'Balanced everyday fountain pen with smooth ink flow for cursive practice and neat handwriting, bundled with spare ink cartridges.',
    image: STORE_IMAGES.pens,
    variants: [
      { id: 'pen-2-cartridges', label: 'Pen + 2 Blue Cartridges', price: 185 },
      { id: 'pen-ink-bottle', label: 'Pen + 30ml Ink Bottle', price: 245 },
    ],
  },
  {
    id: 'watercolor-sketch-kit',
    name: 'A4 Cartridge Sketchpad & 12-Pan Watercolor',
    category: 'Art & Craft',
    packSummary: '160 GSM acid-free sheets',
    availability: 'In Stock',
    description:
      'Textured cartridge drawing pad paired with student-grade pigment cakes and two round synthetic brushes for school art projects.',
    image: STORE_IMAGES.art,
    variants: [
      { id: 'pad-only', label: 'A4 Sketchpad (36 Sheets)', price: 120 },
      { id: 'pad-paint-combo', label: 'Sketchpad + 12-Pan Paint Set', price: 275 },
    ],
  },
  {
    id: 'acrylic-pastel-bundle',
    name: 'Acrylic Tube Set & 25-Shade Oil Pastels',
    category: 'Art & Craft',
    packSummary: '12ml tubes · High pigment',
    availability: 'In Stock',
    description:
      'Rich opaque acrylic colours and smooth blending oil pastels suitable for chart posters, canvas boards, and science exhibition models.',
    image: STORE_IMAGES.art,
    variants: [
      { id: 'acrylic-12', label: '12 Acrylic Tubes (12ml)', price: 220 },
      { id: 'pastels-25', label: '25 Oil Pastels + Scraper', price: 140 },
    ],
  },
  {
    id: 'a4-copier-paper-ream',
    name: 'A4 80 GSM Copier Paper Ream (500 Sheets)',
    category: 'Office & Files',
    packSummary: 'Jam-free bright white',
    availability: 'Bulk Ready',
    description:
      'High-brightness 80 GSM A4 copier sheets designed for crisp double-sided laser and inkjet printing, official records, and school handouts.',
    image: STORE_IMAGES.office,
    variants: [
      { id: 'half-ream', label: '250 Sheets Pack', price: 185 },
      { id: 'full-ream', label: '500 Sheets Ream', price: 340 },
      { id: 'case-5', label: 'Office Box · 5 Reams', price: 1625 },
    ],
  },
  {
    id: 'lever-arch-box-file',
    name: 'Lever Arch Box File & Desk Stapler Kit',
    category: 'Office & Files',
    packSummary: 'Heavy board spine · No. 10 pins',
    availability: 'Bulk Ready',
    description:
      'Spine-labeled lever arch box file with reinforced finger ring, paired optionally with a steel desk stapler and sticky index notes.',
    image: STORE_IMAGES.office,
    variants: [
      { id: 'single-file', label: 'Single Lever Arch File', price: 155 },
      { id: 'file-stapler-set', label: '2 Box Files + Steel Stapler', price: 420 },
    ],
  },
];

export const PRINT_SERVICES: PrintServiceOption[] = [
  {
    id: 'bw-print',
    name: 'B&W Print / Xerox',
    ratePerUnit: 2,
    unitLabel: 'per page',
    note: 'Crisp 600 DPI laser print on 75 GSM A4 sheet (₹1.50/side for 50+ pages in-store).',
    supportsDoubleSided: true,
  },
  {
    id: 'color-print',
    name: 'Color Laser Print',
    ratePerUnit: 10,
    unitLabel: 'per page',
    note: 'Clean full-color diagrams, project covers, certificates, and college reports.',
    supportsDoubleSided: true,
  },
  {
    id: 'spiral-binding',
    name: 'Spiral Binding (PVC Covers)',
    ratePerUnit: 40,
    unitLabel: 'per book',
    note: 'Includes clear front sheet, textured back board, and durable coil spine.',
    supportsDoubleSided: false,
  },
  {
    id: 'lamination',
    name: 'Hot Pouch Lamination (A4 / ID)',
    ratePerUnit: 25,
    unitLabel: 'per sheet',
    note: '125-micron waterproof gloss seal for mark sheets, certificates, and ID cards.',
    supportsDoubleSided: false,
  },
];
