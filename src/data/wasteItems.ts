export type WasteCategory = 'biodegradable' | 'recyclable' | 'non-biodegradable';

export interface WasteItem {
  id: string;
  name: string;
  category: WasteCategory;
  material: string;
  decompositionLabel: string;
  decompositionDays: number;
  binInstruction: string;
  preparationStep: string;
  whyItMatters: string;
  keywords: string[];
  hint: string;
}

export interface CategoryMeta {
  id: WasteCategory;
  label: string;
  shortLabel: string;
  summary: string;
  examples: string;
  binColorLabel: string;
  accentHex: string;
  surfaceClass: string;
  borderClass: string;
  textClass: string;
  barClass: string;
}

export const CATEGORY_META: Record<WasteCategory, CategoryMeta> = {
  biodegradable: {
    id: 'biodegradable',
    label: 'Biodegradable',
    shortLabel: 'Compost & Organic',
    summary:
      'Natural plant, food, and untreated fiber matter that microbes break down into nutrient-rich soil within weeks or months.',
    examples: 'Fruit peels, coffee grounds, dry leaves, soiled paper napkins',
    binColorLabel: 'Compost / Organic Bin',
    accentHex: '#15803D',
    surfaceClass: 'bg-[#F0FAF4]',
    borderClass: 'border-[#BBE5C8]',
    textClass: 'text-[#14532D]',
    barClass: 'bg-[#16A34A]',
  },
  recyclable: {
    id: 'recyclable',
    label: 'Recyclable',
    shortLabel: 'Clean Recovery',
    summary:
      'Clean, sorted raw materials—metals, rigid plastics, glass, and dry paper—that factories can reprocess into new products.',
    examples: 'Aluminum cans, clear PET bottles, glass jars, dry cardboard',
    binColorLabel: 'Recycling Bin',
    accentHex: '#BE185D',
    surfaceClass: 'bg-[#FDF0F6]',
    borderClass: 'border-[#F7C6DC]',
    textClass: 'text-[#9D174D]',
    barClass: 'bg-[#DB2777]',
  },
  'non-biodegradable': {
    id: 'non-biodegradable',
    label: 'Non-Biodegradable',
    shortLabel: 'Residual & Special',
    summary:
      'Synthetic, multi-layer, or contaminated materials that cannot decompose safely in soil or be economically recycled curbside.',
    examples: 'Chip bags, polystyrene foam, disposable diapers, broken ceramics',
    binColorLabel: 'Residual / Special Bin',
    accentHex: '#6B2158',
    surfaceClass: 'bg-[#F8EFF6]',
    borderClass: 'border-[#E2C6DC]',
    textClass: 'text-[#581C49]',
    barClass: 'bg-[#7E2268]',
  },
};

export const WASTE_ITEMS: WasteItem[] = [
  {
    id: 'banana-peel',
    name: 'Banana Peel',
    category: 'biodegradable',
    material: 'Organic fruit fiber',
    decompositionLabel: '2–5 weeks',
    decompositionDays: 28,
    binInstruction: 'Place in home compost or municipal organic bin.',
    preparationStep: 'Remove any small plastic produce sticker before composting.',
    whyItMatters:
      'In a landfill without oxygen, fruit scraps release methane; in compost they create potassium-rich humus.',
    keywords: ['banana', 'fruit', 'peel', 'food scraps', 'kitchen waste', 'organic'],
    hint: 'Natural plant tissue rich in moisture and soft cellulose.',
  },
  {
    id: 'coffee-grounds',
    name: 'Coffee Grounds & Paper Filter',
    category: 'biodegradable',
    material: 'Roasted plant bean & unbleached paper',
    decompositionLabel: '4–8 weeks',
    decompositionDays: 45,
    binInstruction: 'Compost grounds together with unbleached paper filters.',
    preparationStep: 'Drain excess hot water so compost bins do not turn soggy.',
    whyItMatters:
      'Coffee grounds add nitrogen to compost piles and help earthworms aerate garden soil.',
    keywords: ['coffee', 'espresso', 'grounds', 'filter', 'tea', 'tea bag'],
    hint: 'Plant-derived organic matter that feeds soil microbes.',
  },
  {
    id: 'eggshells',
    name: 'Crushed Eggshells',
    category: 'biodegradable',
    material: 'Calcium carbonate & thin organic membrane',
    decompositionLabel: '3–6 months',
    decompositionDays: 140,
    binInstruction: 'Add to backyard compost or green waste bin.',
    preparationStep: 'Rinse briefly and crush into small flakes to speed breakdown.',
    whyItMatters:
      'Eggshells balance compost acidity and enrich finished soil with essential calcium.',
    keywords: ['egg', 'eggshell', 'shell', 'baking', 'breakfast'],
    hint: 'Natural mineral shell from kitchen prep—safe for soil.',
  },
  {
    id: 'dry-leaves',
    name: 'Dry Leaves & Garden Twigs',
    category: 'biodegradable',
    material: 'Plant cellulose & lignin',
    decompositionLabel: '2–6 months',
    decompositionDays: 120,
    binInstruction: 'Layer into compost as brown carbon material or yard waste.',
    preparationStep: 'Shred thick twigs or tough leaves to accelerate microbial activity.',
    whyItMatters:
      'Dry leaves balance wet kitchen scraps and keep compost piles oxygenated without odor.',
    keywords: ['leaves', 'yard', 'garden', 'twigs', 'grass', 'clippings', 'branches'],
    hint: 'Yard trimmings made purely of natural plant fibers.',
  },
  {
    id: 'greasy-pizza-box',
    name: 'Oil-Soaked Pizza Box Base',
    category: 'biodegradable',
    material: 'Grease-contaminated corrugated paper',
    decompositionLabel: '2–3 months',
    decompositionDays: 75,
    binInstruction: 'Compost the greasy bottom half; recycle only the clean top lid.',
    preparationStep: 'Tear off the clean lid for paper recycling and shred the oily base for compost.',
    whyItMatters:
      'Cooking oil ruins recycled paper pulp batches, whereas compost microbes happily digest paper and vegetable oils.',
    keywords: ['pizza', 'pizza box', 'greasy', 'oil', 'napkin', 'soiled paper'],
    hint: 'Paper fibers soaked in food oil cannot be repulped into clean paper.',
  },
  {
    id: 'wooden-chopsticks',
    name: 'Untreated Wooden Chopsticks',
    category: 'biodegradable',
    material: 'Unfinished bamboo or birch wood',
    decompositionLabel: '4–9 months',
    decompositionDays: 180,
    binInstruction: 'Snap in half and place in municipal organics or compost.',
    preparationStep: 'Ensure they are unpainted and free of glossy lacquer.',
    whyItMatters:
      'Small bamboo and wood utensils are too short for standard paper sorting screens, making composting ideal.',
    keywords: ['chopsticks', 'bamboo', 'wood', 'popsicle stick', 'toothpick'],
    hint: 'Raw plant-based wood fiber with zero synthetic coating.',
  },
  {
    id: 'paper-napkin',
    name: 'Used Paper Napkin (Food Only)',
    category: 'biodegradable',
    material: 'Short-fiber paper tissue',
    decompositionLabel: '2–4 weeks',
    decompositionDays: 21,
    binInstruction: 'Compost when soiled with food; place in residual if wiped with chemicals.',
    preparationStep: 'Keep cleaning-spray towels out of compost.',
    whyItMatters:
      'Tissue fibers are already too short for recycling mills, so composting returns them cleanly to the earth.',
    keywords: ['napkin', 'tissue', 'paper towel', 'serviette'],
    hint: 'Short cellulose fibers soaked with food moisture.',
  },
  {
    id: 'cotton-fabric',
    name: '100% Cotton Scrap',
    category: 'biodegradable',
    material: 'Natural plant cellulose textile',
    decompositionLabel: '3–5 months',
    decompositionDays: 120,
    binInstruction: 'Compost in small strips if 100% natural cotton and undyed/non-synthetic.',
    preparationStep: 'Cut away polyester stitching, zippers, or synthetic tags first.',
    whyItMatters:
      'Pure natural fibers break down completely, unlike polyester blends that shed persistent microfibers.',
    keywords: ['cotton', 'cloth', 'rag', 'natural fiber', 'linen'],
    hint: 'Pure plant fiber with no synthetic polyester threads.',
  },
  {
    id: 'orange-peel',
    name: 'Citrus & Orange Peels',
    category: 'biodegradable',
    material: 'Organic citrus rind',
    decompositionLabel: '1–6 months',
    decompositionDays: 90,
    binInstruction: 'Compost in moderate amounts or municipal organics.',
    preparationStep: 'Chop into quarters so thick rinds decompose faster.',
    whyItMatters:
      'Citrus rinds return organic carbon to soil; chopping prevents them from matting together.',
    keywords: ['orange', 'lemon', 'lime', 'citrus', 'peel', 'rind'],
    hint: 'Thick fruit rind packed with natural oils and plant fiber.',
  },
  {
    id: 'pet-water-bottle',
    name: 'Clear PET Plastic Bottle',
    category: 'recyclable',
    material: 'PET (#1) thermoplastic resin',
    decompositionLabel: '450 years',
    decompositionDays: 164250,
    binInstruction: 'Place empty, dry bottle in the recycling bin.',
    preparationStep: 'Empty liquid, quick-rinse, and screw the cap back on so small caps do not get lost.',
    whyItMatters:
      'Clear PET (#1) is one of the highest-value plastics for spinning into new bottles and textiles.',
    keywords: ['water bottle', 'plastic bottle', 'pet', 'soda bottle', 'drink bottle'],
    hint: 'Stamped #1 on the base—designed to be melted and remolded.',
  },
  {
    id: 'aluminum-can',
    name: 'Aluminum Beverage Can',
    category: 'recyclable',
    material: 'Refined aluminum alloy',
    decompositionLabel: '80–200 years',
    decompositionDays: 54750,
    binInstruction: 'Rinse lightly and drop in metal/mixed recycling.',
    preparationStep: 'Do not crush cans flat if your local facility uses optical 3D sorters.',
    whyItMatters:
      'Recycling aluminum saves 95% of the energy needed to mine new bauxite ore and can repeat infinitely.',
    keywords: ['aluminum', 'soda can', 'beer can', 'tin can', 'metal can', 'pop can'],
    hint: 'Infinitely recoverable metal that never loses structural quality.',
  },
  {
    id: 'cardboard-box',
    name: 'Corrugated Cardboard Box',
    category: 'recyclable',
    material: 'Unsoiled kraft wood pulp',
    decompositionLabel: '2–3 months (if wet)',
    decompositionDays: 75,
    binInstruction: 'Flatten completely and keep dry in the paper recycling stream.',
    preparationStep: 'Remove thick packing tape strips and foam inserts.',
    whyItMatters:
      'Dry cardboard fibers can be repulped 5 to 7 times, saving trees and water.',
    keywords: ['cardboard', 'shipping box', 'parcel', 'carton', 'delivery box'],
    hint: 'Clean, dry wood-pulp sheets ready for paper mills.',
  },
  {
    id: 'glass-jar',
    name: 'Clear Glass Food Jar',
    category: 'recyclable',
    material: 'Silica soda-lime glass',
    decompositionLabel: '1,000,000+ years',
    decompositionDays: 365000000,
    binInstruction: 'Rinse food residue and place in glass recycling.',
    preparationStep: 'Separate metal lids (both are recyclable, just separated at the plant).',
    whyItMatters:
      'Glass is 100% endlessly recyclable without loss of purity or strength, cutting furnace energy use.',
    keywords: ['glass', 'jar', 'jam jar', 'pickle jar', 'wine bottle', 'glass bottle'],
    hint: 'Endless closed-loop material—do not confuse with ceramic mugs or Pyrex.',
  },
  {
    id: 'hdpe-milk-jug',
    name: 'HDPE Milk or Detergent Jug',
    category: 'recyclable',
    material: 'HDPE (#2) high-density polyethylene',
    decompositionLabel: '400–500 years',
    decompositionDays: 164250,
    binInstruction: 'Rinse thoroughly and recycle with rigid plastics.',
    preparationStep: 'Wash out milk residue so it does not spoil neighboring paper recyclables.',
    whyItMatters:
      'HDPE (#2) is sturdy, widely accepted, and commonly turned into outdoor lumber, piping, and new jugs.',
    keywords: ['milk jug', 'detergent bottle', 'shampoo bottle', 'hdpe', 'jug'],
    hint: 'Thick, opaque rigid plastic stamped #2.',
  },
  {
    id: 'newspaper-magazine',
    name: 'Newspapers & Office Paper',
    category: 'recyclable',
    material: 'Clean bleached or unbleached pulp',
    decompositionLabel: '4–6 weeks',
    decompositionDays: 35,
    binInstruction: 'Place flat and dry in paper recycling.',
    preparationStep: 'Keep away from food liquids and remove plastic mailing sleeves.',
    whyItMatters:
      'Recycling 1 ton of clean office paper saves roughly 17 mature trees and 7,000 gallons of water.',
    keywords: ['paper', 'newspaper', 'magazine', 'notebook', 'mail', 'envelope'],
    hint: 'Clean dry sheets with intact long paper fibers.',
  },
  {
    id: 'steel-tin-can',
    name: 'Steel Soup or Tin Can',
    category: 'recyclable',
    material: 'Tin-plated steel',
    decompositionLabel: '50–100 years',
    decompositionDays: 27375,
    binInstruction: 'Rinse out food sauces and place in mixed recycling.',
    preparationStep: 'Tuck the sharp cut lid inside the can or recycle flat if safe.',
    whyItMatters:
      'Magnets pull steel effortlessly from sorting belts, making it one of the most reliably recycled materials.',
    keywords: ['soup can', 'steel can', 'tin', 'beans can', 'pet food can'],
    hint: 'Magnetic metal container that sorting magnets capture instantly.',
  },
  {
    id: 'clean-aluminum-foil',
    name: 'Clean Aluminum Foil Ball',
    category: 'recyclable',
    material: 'Rolled aluminum sheet',
    decompositionLabel: '200–400 years',
    decompositionDays: 109500,
    binInstruction: 'Wipe clean of food and roll into a tennis-ball-sized sphere before recycling.',
    preparationStep: 'Tiny flat foil scraps fall through sorting screens—crumple clean foil together into a 2-inch+ ball.',
    whyItMatters:
      'Balling clean foil helps sorting machines recognize it as recoverable metal instead of flat paper.',
    keywords: ['foil', 'aluminum foil', 'tin foil', 'baking tray'],
    hint: 'Pure metal sheet—just needs to be clean and balled up.',
  },
  {
    id: 'tetra-pak-carton',
    name: 'Rinsed Beverage Carton',
    category: 'recyclable',
    material: 'Paperboard with thin poly-aluminum barrier',
    decompositionLabel: '5–10 years',
    decompositionDays: 2555,
    binInstruction: 'Check local rules—most municipal recycling programs now recover cartons.',
    preparationStep: 'Drain completely, rinse once, and flatten without removing the spout.',
    whyItMatters:
      'Specialized hydrapulpers separate the high-grade paperboard from the thin barrier film for reuse.',
    keywords: ['carton', 'milk carton', 'juice box', 'oat milk', 'tetra pak'],
    hint: 'Aseptic carton accepted in modern carton-recovery recycling streams.',
  },
  {
    id: 'chip-bag',
    name: 'Foil-Lined Snack & Chip Bag',
    category: 'non-biodegradable',
    material: 'Metallized multi-layer polypropylene film',
    decompositionLabel: '80–150 years',
    decompositionDays: 40150,
    binInstruction: 'Place in residual waste (or specialized mail-in film drop-off if available).',
    preparationStep: 'Shake out crumbs; never put multi-layer wrappers in curbside recycling.',
    whyItMatters:
      'The fused plastic-and-aluminum layers cannot be separated by standard recycling machinery.',
    keywords: ['chip bag', 'chips', 'snack wrapper', 'candy wrapper', 'crisp packet', 'foil wrapper'],
    hint: 'Look at the shiny inside—aluminum fused permanently to plastic film.',
  },
  {
    id: 'styrofoam-cup',
    name: 'Polystyrene Foam (Styrofoam)',
    category: 'non-biodegradable',
    material: 'Expanded polystyrene (#6 EPS)',
    decompositionLabel: '500+ years',
    decompositionDays: 182500,
    binInstruction: 'Dispose in residual waste unless your city has a dedicated EPS foam drop-off.',
    preparationStep: 'Do not place foam trays or packing peanuts in curbside recycling bins.',
    whyItMatters:
      'EPS foam is 95% air, crumbles into microplastics in waterways, and jams optical recycling sorters.',
    keywords: ['styrofoam', 'foam', 'foam cup', 'takeout container', 'packing peanuts', 'polystyrene'],
    hint: 'Lightweight #6 expanded foam that shatters into persistent beads.',
  },
  {
    id: 'disposable-diaper',
    name: 'Disposable Diapers & Sanitary Pads',
    category: 'non-biodegradable',
    material: 'Superabsorbent polymer gel & bleached synthetic nonwovens',
    decompositionLabel: '450–500 years',
    decompositionDays: 164250,
    binInstruction: 'Seal securely and dispose in general residual waste.',
    preparationStep: 'Never flush down toilets or place in compost or recycling.',
    whyItMatters:
      'Synthetic absorbent gels and biohazard contamination prevent both composting and mechanical recycling.',
    keywords: ['diaper', 'nappy', 'sanitary pad', 'wet wipe', 'baby wipe', 'tampon'],
    hint: 'Contains synthetic absorbent polymers and hygiene bio-waste.',
  },
  {
    id: 'broken-ceramic',
    name: 'Broken Ceramic Mug or Plate',
    category: 'non-biodegradable',
    material: 'Kiln-fired glazed clay',
    decompositionLabel: '1,000,000+ years',
    decompositionDays: 365000000,
    binInstruction: 'Wrap safely in newspaper and place in residual waste (or donate intact pieces).',
    preparationStep: 'Never mix ceramics or Pyrex with glass jars—they melt at completely different temperatures.',
    whyItMatters:
      'A single ceramic shard inside a glass furnace creates fatal weak spots in thousands of new glass bottles.',
    keywords: ['ceramic', 'mug', 'plate', 'pottery', 'porcelain', 'pyrex', 'mirror'],
    hint: 'High-heat kiln-fired clay does not melt with standard bottle glass.',
  },
  {
    id: 'plastic-cutlery',
    name: 'Single-Use Plastic Cutlery & Straws',
    category: 'non-biodegradable',
    material: 'Polystyrene or polypropylene (#5/#6)',
    decompositionLabel: '200–400 years',
    decompositionDays: 109500,
    binInstruction: 'Place in residual waste unless labeled ASTM D6400 industrial compostable with access to commercial composting.',
    preparationStep: 'Keep small straws and forks out of curbside recycling—they fall through sorting gears.',
    whyItMatters:
      'Small utensils slip between mechanical sorting screens and contaminate recovered paper or glass.',
    keywords: ['straw', 'plastic fork', 'plastic spoon', 'cutlery', 'utensil', 'stirrer'],
    hint: 'Too small and mixed-resin for municipal MRF sorting screens.',
  },
  {
    id: 'blister-pack',
    name: 'Medicine Blister Pack',
    category: 'non-biodegradable',
    material: 'PVC plastic fused to aluminum foil backing',
    decompositionLabel: '300+ years',
    decompositionDays: 109500,
    binInstruction: 'Place empty blister packs in residual waste (or pharmacy take-back programs).',
    preparationStep: 'Never flush unused pills; return expired medication to a pharmacy drop-box.',
    whyItMatters:
      'PVC plastic and foil backing are heat-sealed together, making separation impossible curbside.',
    keywords: ['blister pack', 'pill pack', 'medicine', 'tablet wrapper'],
    hint: 'Mixed PVC shell welded directly onto thin aluminum foil.',
  },
  {
    id: 'plastic-lined-coffee-cup',
    name: 'Disposable Paper Coffee Cup',
    category: 'non-biodegradable',
    material: 'Paper cup coated inside with waterproof polyethylene film',
    decompositionLabel: '20–30 years',
    decompositionDays: 9125,
    binInstruction: 'Recycle the cardboard sleeve and lid if accepted; place the plastic-lined cup in residual waste.',
    preparationStep: 'Empty leftover liquid before tossing.',
    whyItMatters:
      'Although it looks like paper, the hidden waterproof plastic lining prevents standard paper recycling and backyard composting.',
    keywords: ['coffee cup', 'takeaway cup', 'paper cup', 'starbucks cup', 'cup'],
    hint: 'Looks like paper on the outside, but hides a waterproof plastic inner lining.',
  },
  {
    id: 'toothpaste-tube',
    name: 'Laminated Toothpaste Tube',
    category: 'non-biodegradable',
    material: 'Multi-layer plastic and aluminum laminate',
    decompositionLabel: '500 years',
    decompositionDays: 182500,
    binInstruction: 'Dispose in residual waste unless marked #2 HDPE mono-material.',
    preparationStep: 'Squeeze completely empty before discarding.',
    whyItMatters:
      'Traditional tubes fuse aluminum barriers between plastic sheets alongside residual paste.',
    keywords: ['toothpaste', 'tube', 'lotion tube', 'ointment tube'],
    hint: 'Multi-layer barrier laminate holding stubborn paste residue.',
  },
  {
    id: 'used-battery',
    name: 'Alkaline or Lithium Battery',
    category: 'non-biodegradable',
    material: 'Heavy metals, electrolytes & steel casing',
    decompositionLabel: '100+ years (toxic leach)',
    decompositionDays: 36500,
    binInstruction: 'NEVER put in regular trash or curbside bins—take to an e-waste or hardware store battery drop-off.',
    preparationStep: 'Tape over lithium battery terminals with clear tape to prevent fire risk.',
    whyItMatters:
      'Batteries cause fires in garbage trucks and leach toxic heavy metals into groundwater if landfilled.',
    keywords: ['battery', 'aa battery', 'lithium', 'e-waste', 'charger', 'electronics'],
    hint: 'Contains reactive chemicals and metals needing special e-waste drop-off.',
  },
  {
    id: 'bubble-wrap',
    name: 'Bubble Wrap & Plastic Mailers',
    category: 'non-biodegradable',
    material: 'LDPE (#4) flexible plastic film',
    decompositionLabel: '400+ years',
    decompositionDays: 146000,
    binInstruction: 'Keep out of curbside bins (unless your city specifies film); reuse or drop at grocery store film bins.',
    preparationStep: 'Pop and reuse for shipping, or cut off paper labels before store drop-off.',
    whyItMatters:
      'Thin plastic films wrap around rotating recycling gears and shut down entire sorting facilities.',
    keywords: ['bubble wrap', 'plastic bag', 'mailer', 'grocery bag', 'film', 'cling wrap'],
    hint: 'Stretchy plastic film that tangles sorting rollers in curbside plants.',
  },
  {
    id: 'receipt-paper',
    name: 'Glossy Thermal Paper Receipt',
    category: 'non-biodegradable',
    material: 'BPA/BPS chemically coated thermal paper',
    decompositionLabel: '1–5 years (chemical residue)',
    decompositionDays: 730,
    binInstruction: 'Place in residual waste—never recycle or compost thermal receipts.',
    preparationStep: 'Opt for digital receipts whenever offered.',
    whyItMatters:
      'Thermal developer coatings contaminate recycled paper batches and introduce synthetic phenols into compost.',
    keywords: ['receipt', 'thermal paper', 'store receipt', 'ticket'],
    hint: 'Shiny heat-sensitive paper coated with chemical color developers.',
  },
  {
    id: 'tea-leaves-loose',
    name: 'Loose Tea Leaves & Herbal Stems',
    category: 'biodegradable',
    material: 'Dried Camellia sinensis & botanicals',
    decompositionLabel: '2–4 weeks',
    decompositionDays: 21,
    binInstruction: 'Compost directly into garden soil or organic waste bins.',
    preparationStep: 'Watch out for silky pyramid tea bags—many are nylon/PET plastic; tear open and compost the leaves only.',
    whyItMatters:
      'Loose tea leaves break down swiftly into nitrogen-rich organic matter without microplastics.',
    keywords: ['tea leaves', 'loose tea', 'herbal', 'chamomile', 'matcha'],
    hint: 'Pure dried botanical leaves with fast microbial breakdown.',
  },
];

export function matchWasteQuery(query: string): WasteItem[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const tokens = normalized.split(/\s+/).filter(Boolean);

  return WASTE_ITEMS.map((item) => {
    const haystack = [
      item.name,
      item.material,
      ...item.keywords,
    ]
      .join(' ')
      .toLowerCase();

    let score = 0;
    if (item.name.toLowerCase() === normalized) score += 100;
    if (item.name.toLowerCase().includes(normalized)) score += 50;
    if (item.keywords.some((k) => k === normalized)) score += 60;
    if (item.keywords.some((k) => k.includes(normalized) || normalized.includes(k))) score += 30;

    for (const token of tokens) {
      if (haystack.includes(token)) score += 10;
    }

    return { item, score };
  })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);
}
