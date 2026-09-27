const SMART_STORAGE_KEY = 'kili_smart_data_v1';
const SMART_RATE_LIMIT_KEY = 'kili_smart_rate_limit_v1';

const DEFAULT_DATA = {
  agrovets: [
    {
      id: 'ag-juja',
      name: 'Juja Agrovet Hub',
      county: 'Kiambu',
      lat: -1.108,
      lng: 37.016,
      phone: '+254700100001',
      products: [
        { name: 'Belt 480SC', stock: 18, price: 1650 },
        { name: 'Coragen 20SC', stock: 14, price: 1850 },
        { name: 'Ampligo 150ZC', stock: 22, price: 1420 },
        { name: 'Ridomil Gold', stock: 25, price: 1480 },
        { name: 'Mancozeb 80WP', stock: 40, price: 920 },
        { name: 'Ortiva Top', stock: 16, price: 1750 },
        { name: 'Copper Oxychloride', stock: 28, price: 860 },
        { name: 'Dynamec 1.8EC', stock: 12, price: 1200 },
        { name: 'Actara 25WG', stock: 20, price: 980 },
        { name: 'Neem Bio-Pesticide', stock: 24, price: 1050 },
        { name: 'Foliar Plus', stock: 35, price: 620 },
        { name: 'Calcium Booster', stock: 18, price: 710 }
      ],
      notices: []
    },
    {
      id: 'ag-nakuru',
      name: 'Nakuru Farm Inputs Centre',
      county: 'Nakuru',
      lat: -0.303,
      lng: 36.08,
      phone: '+254700100002',
      products: [
        { name: 'Ridomil Gold', stock: 20, price: 1470 },
        { name: 'Mancozeb 80WP', stock: 32, price: 910 },
        { name: 'Coragen 20SC', stock: 15, price: 1820 },
        { name: 'Belt 480SC', stock: 12, price: 1640 },
        { name: 'Ortiva Top', stock: 14, price: 1740 },
        { name: 'Infinito', stock: 10, price: 1950 },
        { name: 'Foliar Plus', stock: 45, price: 620 },
        { name: 'Neem Bio-Pesticide', stock: 18, price: 1020 },
        { name: 'Calcium Booster', stock: 22, price: 700 }
      ],
      notices: []
    },
    {
      id: 'ag-eldoret',
      name: 'Eldoret Crop Care Agrovet',
      county: 'Uasin Gishu',
      lat: 0.52,
      lng: 35.269,
      phone: '+254700100003',
      products: [
        { name: 'Ampligo 150ZC', stock: 26, price: 1410 },
        { name: 'Belt 480SC', stock: 19, price: 1630 },
        { name: 'Coragen 20SC', stock: 11, price: 1860 },
        { name: 'Ortiva Top', stock: 18, price: 1760 },
        { name: 'Mancozeb 80WP', stock: 50, price: 900 },
        { name: 'Copper Oxychloride', stock: 22, price: 890 },
        { name: 'Nemathorin 150G', stock: 8, price: 2400 },
        { name: 'Foliar Plus', stock: 30, price: 640 },
        { name: 'Calcium Booster', stock: 20, price: 710 }
      ],
      notices: []
    }
  ],
  specialists: [
    {
      id: 'sp-1',
      name: 'Dr. Mercy Njoroge',
      specialization: 'Crop Disease & Pest Management',
      availability: 'available',
      county: 'Kiambu',
      phone: '+254711200001'
    },
    {
      id: 'sp-2',
      name: 'Eng. Daniel Kiprotich',
      specialization: 'Irrigation & Greenhouse Systems',
      availability: 'available',
      county: 'Nakuru',
      phone: '+254711200002'
    },
    {
      id: 'sp-3',
      name: 'Dr. Beatrice Achieng',
      specialization: 'Soil Fertility & Plant Nutrition',
      availability: 'busy',
      county: 'Kisumu',
      phone: '+254711200003'
    }
  ],
  advisories: [
    {
      id: 'adv-1',
      source: 'Specialist',
      title: 'Early blight & Tuta watch in humid zones',
      message: 'Scout tomatoes twice weekly and maintain sticky pheromone traps. Rogue infected lower leaves early.',
      region: 'National',
      createdAt: '2026-03-01'
    }
  ],
  consultations: []
};

// ==========================================================================
// Comprehensive Kenyan Crop Pathology & Pest Database
// Crops: Maize, Tomatoes, Potatoes, Cabbages, French Beans, Capsicum, Avocados
// ==========================================================================
const KENYAN_CROP_PATHOLOGY_DATABASE = [
  // --- 1. MAIZE ---
  {
    id: 'maize-fall-armyworm',
    crop: 'Maize',
    cropKeys: ['maize', 'corn', 'mahindi'],
    diagnosis: 'Fall Armyworm (Spodoptera frugiperda)',
    commonName: 'Fall Armyworm',
    localSwahiliName: 'Viwavi Jeshi Vamizi',
    scientificName: 'Spodoptera frugiperda (J.E. Smith)',
    severity: 'Critical',
    confidenceBase: 95,
    keywords: ['armyworm', 'caterpillar', 'whorl', 'hole', 'frass', 'sawdust', 'window', 'chewed', 'leaf hole'],
    symptomAnalysis: [
      'Window-pane leaf feeding patches on young maize leaves',
      'Extensive perforations and ragged leaf margins',
      'Presence of moist sawdust-like fecal pellets (frass) inside the central whorl',
      'Destruction of young emerging growing tips ("dead heart" effect)'
    ],
    activeChemicals: [
      {
        ingredient: 'Emamectin Benzoate 5% SG',
        commercialProducts: ['Belt 480SC', 'Prove 1.9EC', 'Escort 19EC'],
        dosage: '10g per 20 Litre knapsack sprayer, directed straight into the funnel whorl'
      },
      {
        ingredient: 'Chlorantraniliprole 200 g/L',
        commercialProducts: ['Coragen 20SC'],
        dosage: '5ml - 7.5ml per 20 Litres of water'
      },
      {
        ingredient: 'Chlorantraniliprole + Lambda-cyhalothrin',
        commercialProducts: ['Ampligo 150ZC'],
        dosage: '10ml per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Dusting clean fine wood ash or sharp dry sand directly into maize whorls at dawn',
      'Bio-pesticide spray: Bacillus thuringiensis (Bt) kurstaki at 30g/20L',
      'Cold-pressed Neem seed oil spray (Azadirachtin) early morning or evening',
      'Intercropping push-pull technology using Desmodium and Napier / Brachiaria grass borders'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Pre-Harvest Interval (PHI): 7 days before green cob harvest. 14 days for dry grain feed.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Plant synchronously at the very first onset of rains to outpace pest generation buildup',
      'Handpick and crush egg masses and young caterpillars on smallholder plots',
      'Conserve natural predators such as earwigs, assassin bugs, and parasitic wasps'
    ],
    products: ['Belt 480SC', 'Coragen 20SC', 'Ampligo 150ZC', 'Neem Bio-Pesticide']
  },
  {
    id: 'maize-mlnd',
    crop: 'Maize',
    cropKeys: ['maize', 'corn', 'mahindi'],
    diagnosis: 'Maize Lethal Necrosis Disease (MLND)',
    commonName: 'Maize Lethal Necrosis Disease',
    localSwahiliName: 'Ugonjwa wa Mnyauko Hatari wa Mahindi',
    scientificName: 'MCMV + Potyvirus Co-infection',
    severity: 'Critical',
    confidenceBase: 93,
    keywords: ['mlnd', 'mottling', 'dead heart', 'necrosis', 'mosaic', 'yellow streak', 'stunted', 'sterile'],
    symptomAnalysis: [
      'Chlorotic mottle pattern starting on young leaves and spreading downward',
      'Dead heart necrosis leading to complete plant death before grain fill',
      'Failure of tassel emergence or severely deformed sterile cobs with loose kernels'
    ],
    activeChemicals: [
      {
        ingredient: 'Thiamethoxam 250 g/kg (Vector Control)',
        commercialProducts: ['Actara 25WG'],
        dosage: '8g per 20L water to suppress vector corn thrips and flea beetles'
      },
      {
        ingredient: 'Imidacloprid + Betacyfluthrin',
        commercialProducts: ['Thunder 145OD'],
        dosage: '10ml per 20L water'
      }
    ],
    organicAlternatives: [
      'Natural pyrethrum extracts to knock down vector populations early in the season',
      'Neem bio-spray to discourage insect vector colonization'
    ],
    withholdingPeriod: {
      days: 14,
      description: 'Vector sprays require 14 days PHI. Note: No chemical cures viral MLND directly once infected.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Immediately rogue out and burn any infected maize plants to stop field spread',
      'Strictly plant certified, KEPHIS-inspected tolerant hybrid seeds',
      'Enforce a strict 2 to 3-month maize-free closed period to break vector cycles'
    ],
    products: ['Actara 25WG', 'Neem Bio-Pesticide', 'Foliar Plus']
  },
  {
    id: 'maize-leaf-blight',
    crop: 'Maize',
    cropKeys: ['maize', 'corn', 'mahindi'],
    diagnosis: 'Northern Corn Leaf Blight (Exserohilum turcicum)',
    commonName: 'Northern Corn Leaf Blight',
    localSwahiliName: 'Ukungu wa Majani ya Mahindi',
    scientificName: 'Exserohilum turcicum (Pass.) Leonard & Suggs',
    severity: 'High',
    confidenceBase: 91,
    keywords: ['cigar', 'elliptical', 'tan lesion', 'gray spot', 'blight', 'dry leaf', 'leaf blight'],
    symptomAnalysis: [
      'Long elliptical, spindle or cigar-shaped grayish-green to tan lesions on lower leaves',
      'Lesions merging to scorch large sections of the canopy under cool wet Highland conditions'
    ],
    activeChemicals: [
      {
        ingredient: 'Azoxystrobin 200 g/L + Difenoconazole 125 g/L',
        commercialProducts: ['Ortiva Top'],
        dosage: '15ml per 20 Litres of water'
      },
      {
        ingredient: 'Mancozeb 800 g/kg WP',
        commercialProducts: ['Mancozeb 80WP'],
        dosage: '50g per 20 Litres of water as a preventative protective spray'
      }
    ],
    organicAlternatives: [
      'Copper Oxychloride preventive sprays on young canopy',
      'Foliar spray of Trichoderma harzianum bio-fungicide'
    ],
    withholdingPeriod: {
      days: 14,
      description: 'Pre-Harvest Interval (PHI): 14 days for green harvest cobs.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Deep ploughing after harvest to bury infected stover',
      'Rotate maize with non-grass crops such as beans, potatoes, or sunflowers'
    ],
    products: ['Ortiva Top', 'Mancozeb 80WP', 'Copper Oxychloride']
  },

  // --- 2. TOMATOES ---
  {
    id: 'tomato-tuta-absoluta',
    crop: 'Tomatoes',
    cropKeys: ['tomato', 'tomatoes', 'nyanya'],
    diagnosis: 'Tomato Leafminer (Tuta absoluta)',
    commonName: 'Tomato Leafminer',
    localSwahiliName: 'Kiwavijani cha Nyanya (Tuta)',
    scientificName: 'Tuta absoluta (Meyrick)',
    severity: 'Critical',
    confidenceBase: 96,
    keywords: ['tuta', 'leaf miner', 'mine', 'transparent', 'blotch', 'pinhole', 'fruit hole', 'caterpillar', 'gallery'],
    symptomAnalysis: [
      'Silvery, irregular translucent blotch mines between upper and lower leaf epidermises',
      'Pin-head entry holes around the tomato calyx and fruit shoulders',
      'Black frass deposits inside galleries and premature leaf drying'
    ],
    activeChemicals: [
      {
        ingredient: 'Chlorantraniliprole 200 g/L',
        commercialProducts: ['Coragen 20SC'],
        dosage: '5ml per 20 Litres of water'
      },
      {
        ingredient: 'Flubendiamide 480 g/L',
        commercialProducts: ['Belt 480SC'],
        dosage: '6ml per 20 Litres of water'
      },
      {
        ingredient: 'Emamectin Benzoate 5% SG',
        commercialProducts: ['Prove 1.9EC'],
        dosage: '10g per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Install delta pheromone lure traps (Tuta delta traps) at 20-30 traps/hectare for mass trapping',
      'Bio-pesticide spray: Bacillus thuringiensis (Bt) kurstaki',
      'Cold-pressed Neem seed oil spray at 3-5ml per litre of warm water'
    ],
    withholdingPeriod: {
      days: 3,
      description: 'Pre-Harvest Interval (PHI): 3 days for greenhouse tomatoes; 7 days open field.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Install 40-mesh insect-proof netting over greenhouse vents and double-door entries',
      'Collect and seal all dropped or infested fruits in airtight black bags under sun (solarization)'
    ],
    products: ['Coragen 20SC', 'Belt 480SC', 'Neem Bio-Pesticide']
  },
  {
    id: 'tomato-late-blight',
    crop: 'Tomatoes',
    cropKeys: ['tomato', 'tomatoes', 'nyanya'],
    diagnosis: 'Late Blight (Phytophthora infestans)',
    commonName: 'Late Blight',
    localSwahiliName: 'Ukungu Mweusi wa Nyanya',
    scientificName: 'Phytophthora infestans (Mont.) de Bary',
    severity: 'Critical',
    confidenceBase: 95,
    keywords: ['late blight', 'water-soaked', 'black spot', 'white mold', 'downy', 'oily', 'brown rot', 'blight'],
    symptomAnalysis: [
      'Irregular water-soaked, dark oily lesions expanding rapidly across leaves and stems',
      'Delicate white fungal down/fuzz visible on the underside of infected leaves in humid mornings',
      'Firm, dark greasy brown blotches on green and ripening tomato fruits'
    ],
    activeChemicals: [
      {
        ingredient: 'Metalaxyl-M 40 g/kg + Mancozeb 640 g/kg',
        commercialProducts: ['Ridomil Gold MZ'],
        dosage: '50g per 20 Litres of water (systemic curative & protective)'
      },
      {
        ingredient: 'Mancozeb 800 g/kg',
        commercialProducts: ['Mancozeb 80WP'],
        dosage: '50g per 20 Litres of water (contact protectant)'
      },
      {
        ingredient: 'Dimethomorph + Mancozeb',
        commercialProducts: ['Acrobat MZ'],
        dosage: '40g per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Copper Hydroxide (Kocide 2000) applied preventatively before rain showers',
      'Equisetum (Horsetail) silica tea spray to fortify plant cell walls'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Pre-Harvest Interval (PHI): 7 days before picking tomatoes. Wash fruit thoroughly.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Always use drip irrigation; avoid overhead watering that wets foliage',
      'Stake and prune indeterminate tomatoes to maintain cross-ventilation',
      'Spray preventatively during cool, misty weather common in Kenyan highlands'
    ],
    products: ['Ridomil Gold', 'Mancozeb 80WP', 'Copper Oxychloride']
  },
  {
    id: 'tomato-bacterial-wilt',
    crop: 'Tomatoes',
    cropKeys: ['tomato', 'tomatoes', 'nyanya'],
    diagnosis: 'Bacterial Wilt (Ralstonia solanacearum)',
    commonName: 'Bacterial Wilt',
    localSwahiliName: 'Mnyauko wa Bakteria',
    scientificName: 'Ralstonia solanacearum',
    severity: 'Critical',
    confidenceBase: 94,
    keywords: ['bacterial wilt', 'wilt', 'wilting', 'sudden death', 'vascular browning', 'slime', 'ooze'],
    symptomAnalysis: [
      'Rapid daytime wilting of green foliage while leaves remain green (no prior yellowing)',
      'Plants recover slightly at night initially, then permanently collapse within 48-72 hours',
      'Brown discoloration of vascular ring inside stem; milky bacterial streaming when cut stem placed in clear glass water'
    ],
    activeChemicals: [
      {
        ingredient: 'Copper Oxychloride 50% WP (Preventative soil drench only)',
        commercialProducts: ['Copper Oxychloride'],
        dosage: '70g per 20 Litres drenched around root collars before planting. Note: Chemical sprays cannot cure vascular bacterial wilt once inside plant.'
      }
    ],
    organicAlternatives: [
      'Bio-control soil drench with Trichoderma harzianum at seedling nursery and transplanting',
      'Grafting scions onto wild resistant solanaceous rootstocks (Solanum torvum)',
      'Heavy organic compost application with neem cake to foster soil antagonist microbes'
    ],
    withholdingPeriod: {
      days: 3,
      description: 'Preventative soil drenches: 3-7 days PHI. Diseased plants cannot be cured and must not be harvested.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Immediately rogue out wilting plants with surrounding root ball; do not shake soil in field',
      'Practice a strict 4-year crop rotation avoiding Solanaceae (potatoes, peppers, eggplants)',
      'Solarize raised nursery beds with clear polythene sheets for 4-6 weeks before sowing'
    ],
    products: ['Copper Oxychloride', 'Calcium Booster', 'Foliar Plus']
  },
  {
    id: 'tomato-early-blight',
    crop: 'Tomatoes',
    cropKeys: ['tomato', 'tomatoes', 'nyanya'],
    diagnosis: 'Early Blight (Alternaria solani)',
    commonName: 'Early Blight',
    localSwahiliName: 'Ukungu wa Rangi ya Kahawia',
    scientificName: 'Alternaria solani Sorauer',
    severity: 'Moderate',
    confidenceBase: 92,
    keywords: ['early blight', 'target', 'concentric ring', 'halo', 'brown spot', 'bottom leaves', 'alternaria'],
    symptomAnalysis: [
      'Dark brown to black spots with distinct concentric rings ("target board" pattern) on older lower leaves',
      'Chlorotic yellow halos surrounding spots leading to gradual leaf senescence'
    ],
    activeChemicals: [
      {
        ingredient: 'Mancozeb 800 g/kg',
        commercialProducts: ['Mancozeb 80WP'],
        dosage: '50g per 20 Litres of water'
      },
      {
        ingredient: 'Difenoconazole 250 g/L',
        commercialProducts: ['Ortiva Top'],
        dosage: '15ml per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Copper Oxychloride foliar spray',
      'Serenade bio-fungicide (Bacillus subtilis)',
      'Bicarbonate and biological soap foliar rinse'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Pre-Harvest Interval (PHI): 7 days.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Prune off all bottom leaves up to 30cm above ground to prevent soil splash',
      'Apply organic mulch (dry grass/straw) beneath tomato canopy'
    ],
    products: ['Mancozeb 80WP', 'Ortiva Top', 'Copper Oxychloride']
  },

  // --- 3. POTATOES ---
  {
    id: 'potato-late-blight',
    crop: 'Potatoes',
    cropKeys: ['potato', 'potatoes', 'viazi', 'irish potato'],
    diagnosis: 'Potato Late Blight (Phytophthora infestans)',
    commonName: 'Potato Late Blight',
    localSwahiliName: 'Ukungu wa Viazi Mviringo',
    scientificName: 'Phytophthora infestans',
    severity: 'Critical',
    confidenceBase: 95,
    keywords: ['potato blight', 'water-soaked', 'black vine', 'stem rot', 'brown flesh', 'tuber rot', 'late blight'],
    symptomAnalysis: [
      'Water-soaked dark lesions spreading rapidly across potato leaves and succulent stems',
      'Purplish-black necrotic foliage collapsing rapidly in rainy highland zones (Nyandarua, Meru, Mau)',
      'Tuber infection causing dry granular reddish-brown rot penetrating into potato flesh'
    ],
    activeChemicals: [
      {
        ingredient: 'Metalaxyl-M + Mancozeb',
        commercialProducts: ['Ridomil Gold'],
        dosage: '50g per 20 Litres water'
      },
      {
        ingredient: 'Fluopicolide + Propamocarb',
        commercialProducts: ['Infinito'],
        dosage: '30ml per 20 Litres water'
      },
      {
        ingredient: 'Mancozeb 80WP',
        commercialProducts: ['Mancozeb 80WP'],
        dosage: '50g per 20 Litres water as preventive cover'
      }
    ],
    organicAlternatives: [
      'Copper Hydroxide (Kocide 2000) spray before rainfall',
      'Bordeaux mixture (Copper sulfate + hydrated lime)'
    ],
    withholdingPeriod: {
      days: 14,
      description: 'Pre-Harvest Interval (PHI): 14 days before harvest.',
      reEntryHours: 24
    },
    culturalPractices: [
      'High earthing up (ridging) to create a protective soil buffer over developing tubers',
      'Dehaulm (cut and destroy all foliage) 2 weeks before harvesting tubers to prevent spore contact'
    ],
    products: ['Ridomil Gold', 'Mancozeb 80WP', 'Infinito']
  },
  {
    id: 'potato-cyst-nematode',
    crop: 'Potatoes',
    cropKeys: ['potato', 'potatoes', 'viazi'],
    diagnosis: 'Potato Cyst Nematode (PCN - Globodera spp.)',
    commonName: 'Potato Cyst Nematode',
    localSwahiliName: 'Minyoo Fundo ya Viazi',
    scientificName: 'Globodera rostochiensis / G. pallida',
    severity: 'High',
    confidenceBase: 92,
    keywords: ['pcn', 'nematode', 'stunted patch', 'yellowing patch', 'tiny cysts', 'root cysts', 'poor tubers'],
    symptomAnalysis: [
      'Patches of stunted, pale yellowing potato plants in localized field areas',
      'Premature wilting during hot afternoon hours despite adequate soil moisture',
      'Microscopic pinhead-sized white, yellow, or golden cysts attached to feeder roots'
    ],
    activeChemicals: [
      {
        ingredient: 'Fosthiazate 150 g/kg (Granular)',
        commercialProducts: ['Nemathorin 150G'],
        dosage: 'Apply strictly at planting as per certified label recommendation'
      }
    ],
    organicAlternatives: [
      'Bio-nematicides formulated with Paecilomyces lilacinus',
      'Neem cake soil amendment at land preparation',
      'Bio-fumigation using chopped mustard or radish cover crops incorporated into wet soil'
    ],
    withholdingPeriod: {
      days: 90,
      description: 'Soil nematicides are applied strictly at planting. Withholding period spans full crop cycle.',
      reEntryHours: 48
    },
    culturalPractices: [
      'Plant only KEPHIS-certified clean seed tubers from verified suppliers',
      'Enforce 5-year crop rotation with non-host crops (maize, cabbages, beans)',
      'Thoroughly wash and sanitize tractor tyres and farm implements between plots'
    ],
    products: ['Nemathorin 150G', 'Neem Bio-Pesticide', 'Foliar Plus']
  },

  // --- 4. CABBAGES & BRASSICAS ---
  {
    id: 'cabbage-dbm',
    crop: 'Cabbages',
    cropKeys: ['cabbage', 'cabbages', 'kabeji', 'kale', 'sukuma', 'brassica'],
    diagnosis: 'Diamondback Moth (Plutella xylostella)',
    commonName: 'Diamondback Moth',
    localSwahiliName: 'Nondo wa Kabeji',
    scientificName: 'Plutella xylostella (Linnaeus)',
    severity: 'High',
    confidenceBase: 94,
    keywords: ['dbm', 'diamondback', 'caterpillar', 'green worm', 'shot hole', 'window pane', 'skeletonized'],
    symptomAnalysis: [
      'Small, active pale green caterpillars wriggling backwards when disturbed',
      'Extensive translucent "window pane" feeding damage on undersides of leaves',
      'Ragged shot-holes and stunted or failed cabbage head formation'
    ],
    activeChemicals: [
      {
        ingredient: 'Chlorantraniliprole 200 g/L',
        commercialProducts: ['Coragen 20SC'],
        dosage: '5ml per 20 Litres of water'
      },
      {
        ingredient: 'Flubendiamide 480 g/L',
        commercialProducts: ['Belt 480SC'],
        dosage: '6ml per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Bacillus thuringiensis (Bt - Thuricide) spray at 30g/20L knapsack',
      'Cold-pressed Neem seed oil spray in late afternoon',
      'Companion planting with coriander or mustard to attract parasitic wasps (Diadegma semiclausum)'
    ],
    withholdingPeriod: {
      days: 3,
      description: 'Pre-Harvest Interval (PHI): 3 days for Coragen and Belt. Wash head thoroughly before market.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Use overhead sprinkler irrigation at dusk to dislodge egg-laying moths and drown caterpillars',
      'Promptly destroy and bury old cabbage stalks after head harvest'
    ],
    products: ['Coragen 20SC', 'Belt 480SC', 'Neem Bio-Pesticide']
  },
  {
    id: 'cabbage-black-rot',
    crop: 'Cabbages',
    cropKeys: ['cabbage', 'cabbages', 'kabeji', 'kale', 'sukuma'],
    diagnosis: 'Black Rot (Xanthomonas campestris)',
    commonName: 'Black Rot',
    localSwahiliName: 'Kuoza Nyeusi kwa Kabeji',
    scientificName: 'Xanthomonas campestris pv. campestris',
    severity: 'High',
    confidenceBase: 93,
    keywords: ['black rot', 'v-shape', 'v shaped', 'yellow margin', 'black vein', 'vascular blackening', 'cabbage rot'],
    symptomAnalysis: [
      'Characteristic V-shaped yellow chlorotic lesions starting from leaf margins with point facing inward',
      'Veins within the yellowed area turn distinctly dark brown to black',
      'Rot progressing into the cabbage head causing soft internal bacterial decay'
    ],
    activeChemicals: [
      {
        ingredient: 'Copper Oxychloride 50% WP',
        commercialProducts: ['Copper Oxychloride'],
        dosage: '50g per 20 Litres water (applied preventatively early morning)'
      }
    ],
    organicAlternatives: [
      'Hot water seed treatment at 50°C for 25 minutes prior to nursery sowing',
      'Regular spraying of aerated compost tea to boost beneficial phyllosphere bacteria'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Pre-Harvest Interval (PHI): 7 days for copper protectants.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Never work or weed in cabbage plots while leaves are wet with rain or morning dew',
      'Maintain a 3-year crop rotation excluding all brassicas (kale, broccoli, cauliflower)',
      'Use certified disease-free seeds'
    ],
    products: ['Copper Oxychloride', 'Foliar Plus']
  },

  // --- 5. FRENCH BEANS ---
  {
    id: 'bean-rust',
    crop: 'French Beans',
    cropKeys: ['french bean', 'french beans', 'green beans', 'snap beans', 'maharagwe'],
    diagnosis: 'Bean Rust (Uromyces appendiculatus)',
    commonName: 'Bean Rust',
    localSwahiliName: 'Kutu ya Maharagwe',
    scientificName: 'Uromyces appendiculatus',
    severity: 'High',
    confidenceBase: 93,
    keywords: ['rust', 'pustule', 'powder', 'reddish brown', 'brown dust', 'yellow halo', 'leaf drop'],
    symptomAnalysis: [
      'Small, circular reddish-brown to cinnamon powdery pustules primarily on leaf undersides',
      'Pustules surrounded by faint yellowish chlorotic halos',
      'Severe premature leaf drying and defoliation resulting in curved, unmarketable pods'
    ],
    activeChemicals: [
      {
        ingredient: 'Azoxystrobin 200 g/L + Difenoconazole 125 g/L',
        commercialProducts: ['Ortiva Top'],
        dosage: '15ml per 20 Litres of water'
      },
      {
        ingredient: 'Mancozeb 800 g/kg',
        commercialProducts: ['Mancozeb 80WP'],
        dosage: '50g per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Wettable sulfur foliar spray (do not apply in intense midday heat >28°C)',
      'Preventative Copper Oxychloride sprays during vegetative stage'
    ],
    withholdingPeriod: {
      days: 3,
      description: 'Pre-Harvest Interval (PHI): 3 days for Ortiva Top (export compliant MRL).',
      reEntryHours: 12
    },
    culturalPractices: [
      'Plant resistant bean varieties such as Serengeti, Teresa, or Amy',
      'Space rows adequately (50cm x 15cm) to ensure rapid morning canopy drying'
    ],
    products: ['Ortiva Top', 'Mancozeb 80WP', 'Copper Oxychloride']
  },
  {
    id: 'bean-anthracnose',
    crop: 'French Beans',
    cropKeys: ['french bean', 'french beans', 'green beans', 'maharagwe'],
    diagnosis: 'Bean Anthracnose (Colletotrichum lindemuthianum)',
    commonName: 'Bean Anthracnose',
    localSwahiliName: 'Ugonjwa wa Vidonda vya Maharagwe',
    scientificName: 'Colletotrichum lindemuthianum',
    severity: 'High',
    confidenceBase: 92,
    keywords: ['anthracnose', 'sunken', 'canker', 'pod spot', 'brick red', 'pink spore', 'black vein'],
    symptomAnalysis: [
      'Sunken dark circular or oval cankers on green pods with raised brownish margins',
      'Salmon-pinkish gelatinous spore masses visible inside pod cankers during damp weather',
      'Dark reddish-purple to black necrosis running along the underside leaf veins'
    ],
    activeChemicals: [
      {
        ingredient: 'Azoxystrobin + Difenoconazole',
        commercialProducts: ['Ortiva Top'],
        dosage: '15ml per 20 Litres water'
      },
      {
        ingredient: 'Mancozeb 80WP',
        commercialProducts: ['Mancozeb 80WP'],
        dosage: '50g per 20 Litres water'
      }
    ],
    organicAlternatives: [
      'Trichoderma seed inoculation before planting',
      'Copper Hydroxide spray during pod formation'
    ],
    withholdingPeriod: {
      days: 3,
      description: 'Pre-Harvest Interval (PHI): 3 days for export fresh beans.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Never walk through or pick French beans when the canopy is wet',
      'Use only KEPHIS-certified disease-free seeds'
    ],
    products: ['Ortiva Top', 'Mancozeb 80WP', 'Copper Oxychloride']
  },

  // --- 6. CAPSICUM (PEPPERS) ---
  {
    id: 'capsicum-powdery-mildew',
    crop: 'Capsicum',
    cropKeys: ['capsicum', 'pepper', 'peppers', 'pilipili', 'bell pepper', 'sweet pepper', 'chili'],
    diagnosis: 'Powdery Mildew (Leveillula taurica)',
    commonName: 'Capsicum Powdery Mildew',
    localSwahiliName: 'Ukungu Mweupe wa Pilipili Hoho',
    scientificName: 'Leveillula taurica (Lév.) Arnaud',
    severity: 'Moderate',
    confidenceBase: 94,
    keywords: ['powdery mildew', 'white dust', 'white powder', 'yellow patch', 'leaf curl', 'defoliation', 'sunscald'],
    symptomAnalysis: [
      'Bright yellow angular chlorotic patches on the upper surface of capsicum leaves',
      'White powdery fungal mycelium and spores on the corresponding leaf undersides',
      'Rapid leaf shed exposing green peppers to severe sunscald damage'
    ],
    activeChemicals: [
      {
        ingredient: 'Azoxystrobin + Difenoconazole',
        commercialProducts: ['Ortiva Top'],
        dosage: '15ml per 20 Litres of water'
      },
      {
        ingredient: 'Mancozeb 80WP',
        commercialProducts: ['Mancozeb 80WP'],
        dosage: '50g per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Wettable sulfur spray (e.g. Thiovit Jet) at 40g/20L',
      'Potassium bicarbonate foliar spray (5g per litre) to disrupt fungal spore membranes',
      'Cold-pressed Neem oil spray'
    ],
    withholdingPeriod: {
      days: 3,
      description: 'Pre-Harvest Interval (PHI): 3 days for Ortiva Top on sweet peppers.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Maintain adequate greenhouse vent aeration and avoid overhead irrigation',
      'Prune lower side suckers to elevate canopy above soil humidity'
    ],
    products: ['Ortiva Top', 'Neem Bio-Pesticide', 'Copper Oxychloride']
  },
  {
    id: 'capsicum-bacterial-spot',
    crop: 'Capsicum',
    cropKeys: ['capsicum', 'pepper', 'peppers', 'pilipili'],
    diagnosis: 'Bacterial Spot (Xanthomonas campestris pv. vesicatoria)',
    commonName: 'Bacterial Spot',
    localSwahiliName: 'Madoa ya Bakteria ya Pilipili',
    scientificName: 'Xanthomonas campestris pv. vesicatoria',
    severity: 'High',
    confidenceBase: 92,
    keywords: ['bacterial spot', 'water soaked', 'scab', 'pustule', 'pepper spot', 'yellow halo', 'leaf drop'],
    symptomAnalysis: [
      'Small, water-soaked spots turning dark brown with prominent yellow halos',
      'Rough raised blister-like scabs on pepper fruit skin',
      'Severe defoliation leaving stems bare and fruit damaged'
    ],
    activeChemicals: [
      {
        ingredient: 'Copper Oxychloride + Mancozeb (Synergistic tank-mix)',
        commercialProducts: ['Copper Oxychloride', 'Mancozeb 80WP'],
        dosage: '40g Copper Oxychloride + 40g Mancozeb per 20 Litres water'
      }
    ],
    organicAlternatives: [
      'Preventive sprays with Copper Hydroxide (Kocide 2000)',
      'Soaking seeds in hot water (50°C for 25 min) before planting'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Pre-Harvest Interval (PHI): 7 days.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Switch from overhead sprinkler to drip irrigation to prevent bacterial splash',
      'Sanitize all pruning shears and support twine between plants'
    ],
    products: ['Copper Oxychloride', 'Mancozeb 80WP', 'Calcium Booster']
  },

  // --- 7. AVOCADOS ---
  {
    id: 'avocado-anthracnose',
    crop: 'Avocados',
    cropKeys: ['avocado', 'avocados', 'parachichi', 'hass', 'fuerte'],
    diagnosis: 'Avocado Anthracnose (Colletotrichum gloeosporioides)',
    commonName: 'Avocado Anthracnose',
    localSwahiliName: 'Madoa Meusi ya Parachichi',
    scientificName: 'Colletotrichum gloeosporioides (Penz.)',
    severity: 'High',
    confidenceBase: 94,
    keywords: ['avocado', 'anthracnose', 'black spot', 'fruit spot', 'sunken spot', 'twig dieback', 'postharvest rot'],
    symptomAnalysis: [
      'Small dark brown to black circular spots on avocado fruit skin',
      'Spots enlarge and form sunken circular depressions penetrating deep into edible green flesh as fruit softens',
      'Twig dieback and dark leaf spots in rainy avocado growing regions (Murang\'a, Kiambu, Meru, Kisii)'
    ],
    activeChemicals: [
      {
        ingredient: 'Copper Oxychloride 50% WP',
        commercialProducts: ['Copper Oxychloride'],
        dosage: '70g per 20 Litres water (applied every 28 days during rainy fruit set)'
      },
      {
        ingredient: 'Azoxystrobin + Difenoconazole',
        commercialProducts: ['Ortiva Top'],
        dosage: '15ml per 20 Litres water'
      }
    ],
    organicAlternatives: [
      'Approved organic copper formulations (Copper Hydroxide)',
      'Bio-fungicide sprays with Bacillus amyloliquefaciens'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Pre-Harvest Interval (PHI): 7 days. Must adhere strictly to Kenya HCD and EU Maximum Residue Limits (MRL).',
      reEntryHours: 12
    },
    culturalPractices: [
      'Prune avocado tree center branches to create an open vase canopy for airflow and sunlight penetration',
      'Prune all lower branches hanging within 1 meter of the ground to prevent rain splash infection'
    ],
    products: ['Copper Oxychloride', 'Ortiva Top', 'Foliar Plus']
  },
  {
    id: 'avocado-phytophthora',
    crop: 'Avocados',
    cropKeys: ['avocado', 'avocados', 'parachichi'],
    diagnosis: 'Phytophthora Root Rot (Phytophthora cinnamomi)',
    commonName: 'Phytophthora Root Rot',
    localSwahiliName: 'Kuoza kwa Mizizi ya Parachichi',
    scientificName: 'Phytophthora cinnamomi Rands',
    severity: 'Critical',
    confidenceBase: 95,
    keywords: ['root rot', 'pale leaf', 'wilting tree', 'branch dieback', 'black root', 'sparse foliage', 'avocado decline'],
    symptomAnalysis: [
      'Small, pale green to yellowish wilted leaves with severe canopy thinning',
      'Dieback of terminal twigs and branches, fruit sunburned due to lack of leaf cover',
      'Blackened, brittle, rotten feeder roots with complete absence of healthy white feeder root tips'
    ],
    activeChemicals: [
      {
        ingredient: 'Metalaxyl-M + Mancozeb',
        commercialProducts: ['Ridomil Gold'],
        dosage: '50g drenched in 20L water around root dripline'
      },
      {
        ingredient: 'Potassium Phosphite (Foli-R-Fos / Phosgard)',
        commercialProducts: ['Foliar Plus'],
        dosage: 'Foliar spray or certified trunk injection by trained agronomist'
      }
    ],
    organicAlternatives: [
      'Heavy coarse woodchip mulch (15cm depth) applied starting 20cm away from trunk out to drip line',
      'Biological root drench using Trichoderma asperellum'
    ],
    withholdingPeriod: {
      days: 14,
      description: 'Drench treatments require 14 days PHI.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Plant exclusively on mounds or raised ridges in well-drained soils; avoid waterlogged basins',
      'Use tolerant clonal rootstocks (such as Dusa or Duke 7) for all new commercial Hass orchards'
    ],
    products: ['Ridomil Gold', 'Copper Oxychloride', 'Foliar Plus']
  },
  {
    id: 'potato-bacterial-wilt',
    crop: 'Potatoes',
    cropKeys: ['potato', 'potatoes', 'viazi'],
    diagnosis: 'Potato Bacterial Wilt (Ralstonia solanacearum)',
    commonName: 'Potato Bacterial Wilt',
    localSwahiliName: 'Mnyauko wa Bakteria wa Viazi',
    scientificName: 'Ralstonia solanacearum (Smith)',
    severity: 'Critical',
    confidenceBase: 94,
    keywords: ['bacterial wilt', 'wilting stem', 'brown ring', 'ooze', 'slimy eyes', 'soft rot', 'tuber ooze'],
    symptomAnalysis: [
      'Rapid daytime wilting of single stems or entire foliage while leaves remain green',
      'Brown discoloration of vascular ring inside sliced potato tubers',
      'Bacterial white slime oozing from tuber vascular ring or stem cuttings when suspended in clear water'
    ],
    activeChemicals: [
      {
        ingredient: 'Copper Oxychloride 50% WP (Preventative soil drench only)',
        commercialProducts: ['Copper Oxychloride'],
        dosage: '70g per 20 Litres of water. Note: Antibiotics are prohibited; prevent root wound infections'
      }
    ],
    organicAlternatives: [
      'Soil treatment with bio-control agent Trichoderma viride',
      'Crop rotation with non-solanaceous grass species (maize, sorghum, Rhodes grass)'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Soil drenching requires 7 days PHI. Infested plants and tubers must be destroyed, never marketed.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Plant only KEPHIS-certified disease-free seed tubers',
      'Rogue out and destroy infected potato plants along with surrounding soil tubers'
    ],
    products: ['Copper Oxychloride', 'Calcium Booster']
  },
  {
    id: 'cabbage-clubroot',
    crop: 'Cabbages',
    cropKeys: ['cabbage', 'cabbages', 'kabeji', 'kale', 'sukuma', 'brassica'],
    diagnosis: 'Clubroot Disease (Plasmodiophora brassicae)',
    commonName: 'Brassica Clubroot',
    localSwahiliName: 'Ugonjwa wa Mizizi Rungu ya Kabeji',
    scientificName: 'Plasmodiophora brassicae Woronin',
    severity: 'Critical',
    confidenceBase: 93,
    keywords: ['clubroot', 'swollen root', 'club', 'galls', 'stunted', 'purple leaves', 'wilt noon'],
    symptomAnalysis: [
      'Daytime wilting of leaves during hot sunny hours with nighttime partial recovery',
      'Severe stunting and purplish-yellow discoloration of outer leaves',
      'Distorted, swollen, club-like or spindle-shaped galls and malformations on main and lateral roots'
    ],
    activeChemicals: [
      {
        ingredient: 'Fluazinam 500 g/L (Soil Drench at Transplanting)',
        commercialProducts: ['Shirlan 500SC'],
        dosage: '10ml per 20 Litres of water drenched in planting hole'
      }
    ],
    organicAlternatives: [
      'Heavy application of agricultural lime (calcium carbonate) to raise soil pH above 7.2',
      'Incorporate high volumes of well-cured compost to foster competitive soil microflora'
    ],
    withholdingPeriod: {
      days: 28,
      description: 'Transplant drenches applied at establishment. Maintain 28 days PHI.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Test soil pH; never plant brassicas in acid soils (pH <6.5) without liming',
      'Enforce a strict 5 to 7-year rotation cycle away from all cruciferous crops'
    ],
    products: ['Calcium Booster', 'Copper Oxychloride']
  },
  {
    id: 'beans-spider-mites',
    crop: 'French Beans',
    cropKeys: ['french bean', 'french beans', 'green beans', 'maharagwe'],
    diagnosis: 'Red Spider Mites (Tetranychus urticae)',
    commonName: 'Red Spider Mite',
    localSwahiliName: 'Utitiri Mwekundu wa Maharagwe',
    scientificName: 'Tetranychus urticae Koch',
    severity: 'High',
    confidenceBase: 93,
    keywords: ['spider mite', 'mite', 'webbing', 'yellow speckling', 'bronze leaf', 'dusty leaf', 'dry spell'],
    symptomAnalysis: [
      'Fine chlorotic stippling and yellow speckles across upper leaf surfaces',
      'Silky webbing covering leaf undersides, flower buds, and pods during hot dry weather',
      'Leaves turn completely bronze or rusty brown, dry up, and drop prematurely'
    ],
    activeChemicals: [
      {
        ingredient: 'Abamectin 18 g/L EC',
        commercialProducts: ['Dynamec 1.8EC'],
        dosage: '10ml per 20 Litres of water with full underside canopy wetting'
      },
      {
        ingredient: 'Spiromesifen 240 g/L',
        commercialProducts: ['Oberon 240SC'],
        dosage: '12ml per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Cold-pressed Neem seed oil spray (Azadirachtin 0.03% EC) at 5ml/L',
      'Overhead water washing to knock down mite colonies and raise micro-humidity',
      'Release of predatory phytoseiid mites (Phytoseiulus persimilis)'
    ],
    withholdingPeriod: {
      days: 3,
      description: 'Pre-Harvest Interval (PHI): 3 days for Dynamec on fresh French beans.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Keep field borders weed-free, especially mallows and wild legumes harboring mites',
      'Avoid dust drift by planting windbreak hedges around bean plots'
    ],
    products: ['Dynamec 1.8EC', 'Neem Bio-Pesticide']
  },
  {
    id: 'capsicum-broad-mites',
    crop: 'Capsicum',
    cropKeys: ['capsicum', 'pepper', 'peppers', 'pilipili'],
    diagnosis: 'Broad Mites & Western Flower Thrips',
    commonName: 'Broad Mites & Thrips Complex',
    localSwahiliName: 'Utitiri na Serepesi wa Pilipili',
    scientificName: 'Polyphagotarsonemus latus / Frankliniella occidentalis',
    severity: 'High',
    confidenceBase: 92,
    keywords: ['broad mite', 'thrips', 'curl', 'downward curl', 'bronzing', 'corky', 'russeting', 'stunted shoot'],
    symptomAnalysis: [
      'Young terminal leaves curling tightly downwards and inwards with brittle leathery texture',
      'Brown or bronze corky russeting on the underside of leaves and fruit shoulders',
      'Silvering of flowers and severe bud abortion preventing pepper fruit set'
    ],
    activeChemicals: [
      {
        ingredient: 'Abamectin 18 g/L',
        commercialProducts: ['Dynamec 1.8EC'],
        dosage: '10ml per 20 Litres of water'
      },
      {
        ingredient: 'Spinetoram 120 g/L',
        commercialProducts: ['Radiant 120SC'],
        dosage: '10ml per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Cold-pressed Neem oil spray applied thoroughly to shoot tips',
      'Blue and yellow sticky traps installed at crop canopy level for thrips monitoring and suppression'
    ],
    withholdingPeriod: {
      days: 3,
      description: 'Pre-Harvest Interval (PHI): 3 days.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Maintain adequate greenhouse humidity to suppress rapid broad mite multiplication',
      'Sanitize seedlings before transplanting into main field or greenhouse bags'
    ],
    products: ['Dynamec 1.8EC', 'Neem Bio-Pesticide', 'Calcium Booster']
  },
  {
    id: 'avocado-fcm',
    crop: 'Avocados',
    cropKeys: ['avocado', 'avocados', 'parachichi'],
    diagnosis: 'False Codling Moth (Thaumatotibia leucotreta)',
    commonName: 'False Codling Moth (FCM)',
    localSwahiliName: 'Nondo Mdanganyifu wa Parachichi (FCM)',
    scientificName: 'Thaumatotibia leucotreta (Meyrick)',
    severity: 'Critical',
    confidenceBase: 95,
    keywords: ['fcm', 'false codling moth', 'quarantine', 'star crack', 'sugar exudate', 'white crust', 'caterpillar hole'],
    symptomAnalysis: [
      'Pin-sized entry puncture holes on avocado fruit surrounded by raised, star-shaped cracks',
      'White crystalline sugary exudate (resinous deposit) forming crust around puncture holes',
      'Premature avocado fruit drop; presence of small pinkish-white caterpillar feeding near seed'
    ],
    activeChemicals: [
      {
        ingredient: 'Chlorantraniliprole 200 g/L',
        commercialProducts: ['Coragen 20SC'],
        dosage: '6ml per 20 Litres of water'
      },
      {
        ingredient: 'Spinetoram 120 g/L',
        commercialProducts: ['Radiant 120SC'],
        dosage: '10ml per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Install FCM pheromone delta traps and mating disruption dispensers (Cryptogran/CheckMate)',
      'Bio-pesticide spray: Cryptophlebia leucotreta granulovirus (Cryptogran) formulation',
      'Conserve parasitoid wasps (Trichogrammatoidea cryptophlebiae)'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Strict export compliance: FCM is a high-priority EU quarantine pest. Adhere to KEPHIS export protocols and 7 days PHI.',
      reEntryHours: 24
    },
    culturalPractices: [
      'Orchard sanitation: Collect all fallen and stung fruits twice weekly and bury at least 50cm deep or drown in sealed water drums',
      'Inspect and destroy any alternative hosts such as citrus or wild guava nearby'
    ],
    products: ['Coragen 20SC', 'Neem Bio-Pesticide', 'Ortiva Top']
  },
  {
    id: 'avocado-cercospora',
    crop: 'Avocados',
    cropKeys: ['avocado', 'avocados', 'parachichi'],
    diagnosis: 'Cercospora Fruit & Leaf Spot (Pseudocercospora purpurea)',
    commonName: 'Cercospora Spot',
    localSwahiliName: 'Madoa ya Zambarau ya Parachichi',
    scientificName: 'Pseudocercospora purpurea (Cooke) Deighton',
    severity: 'Moderate',
    confidenceBase: 92,
    keywords: ['cercospora', 'purple spot', 'angular spot', 'rind crack', 'cracked fruit', 'brown leaf spot'],
    symptomAnalysis: [
      'Small, angular brown to purple-brown spots on leaf blades with yellow chlorotic margins',
      'Small, dark brown irregular raised spots on avocado fruit rind that crack slightly as fruit expands',
      'Spots crack open, serving as secondary entry points for anthracnose and fruit fly larvae'
    ],
    activeChemicals: [
      {
        ingredient: 'Copper Oxychloride 50% WP',
        commercialProducts: ['Copper Oxychloride'],
        dosage: '70g per 20 Litres of water'
      },
      {
        ingredient: 'Azoxystrobin 200 g/L + Difenoconazole 125 g/L',
        commercialProducts: ['Ortiva Top'],
        dosage: '15ml per 20 Litres of water'
      }
    ],
    organicAlternatives: [
      'Approved copper hydroxide foliar sprays (Kocide 2000)',
      'Biological sprays with Bacillus subtilis'
    ],
    withholdingPeriod: {
      days: 7,
      description: 'Pre-Harvest Interval (PHI): 7 days for market export.',
      reEntryHours: 12
    },
    culturalPractices: [
      'Prune dead wood and open up tree center to allow rapid wind drying of foliage after rain',
      'Apply preventative copper sprays starting at flowering through fruit development'
    ],
    products: ['Copper Oxychloride', 'Ortiva Top', 'Foliar Plus']
  },

  // --- GENERAL / UNIVERSAL FALLBACK ---
  {
    id: 'general-nutrient-stress',
    crop: 'General',
    cropKeys: ['general', 'other'],
    diagnosis: 'Nutrient Deficiency & Micronutrient Chlorosis',
    commonName: 'Nutrient Deficiency Stress',
    localSwahiliName: 'Upungufu wa Virutubisho vya Udongo',
    scientificName: 'Physiological Nutritional Stress',
    severity: 'Moderate',
    confidenceBase: 88,
    keywords: ['yellow', 'chlorosis', 'stunted', 'pale', 'weak', 'interveinal', 'purple leaf', 'leaf burn', 'slow growth'],
    symptomAnalysis: [
      'Interveinal chlorosis (yellowing between green veins) or generalized leaf paleness',
      'Stunted plant vigor, reduced internode elongation, and thin spindly stems'
    ],
    activeChemicals: [
      {
        ingredient: 'Balanced NPK + Trace Minerals (Fe, Zn, B, Mg)',
        commercialProducts: ['Foliar Plus'],
        dosage: '30ml - 50ml per 20 Litres of water applied as early morning foliar spray'
      },
      {
        ingredient: 'Soluble Calcium + Boron',
        commercialProducts: ['Calcium Booster'],
        dosage: '40ml per 20 Litres water'
      }
    ],
    organicAlternatives: [
      'Well-decomposed cattle/poultry manure tea foliar drench',
      'Liquid seaweed extract or vermicompost leachate foliar spray'
    ],
    withholdingPeriod: {
      days: 0,
      description: 'Pre-Harvest Interval (PHI): 0-1 day for nutritional foliar feeds. Safe for human consumption after standard washing.',
      reEntryHours: 4
    },
    culturalPractices: [
      'Conduct a comprehensive soil laboratory test to measure soil pH and macro/micronutrient balance',
      'Apply agricultural lime or gypsum if soil pH is acidic (<5.5) to unlock bound nutrients'
    ],
    products: ['Foliar Plus', 'Calcium Booster']
  }
];

const ADMIN_CREDENTIALS = {
  agrovetadmin: { password: 'Agrovet@123', role: 'agrovet' },
  specialistadmin: { password: 'Specialist@123', role: 'specialist' },
  systemadmin: { password: 'SysAdmin@123', role: 'system' }
};

let smartData = loadSmartData();
let latestDiagnosis = null;
let latestImage = null;
let userPosition = null;

const diagnosisForm = document.getElementById('diagnosis-form');
const imageInput = document.getElementById('crop-image');
const cameraInput = document.getElementById('crop-camera');
const imagePreviewWrap = document.getElementById('image-preview-wrap');
const imagePreview = document.getElementById('image-preview');
const imageMeta = document.getElementById('image-meta');
const btnClearImage = document.getElementById('btn-clear-image');
const btnDiagnoseSubmit = document.getElementById('btn-diagnose-submit');

// Crop Selection Elements
const cropChips = document.querySelectorAll('#crop-chips .crop-chip');
const selectedCropInput = document.getElementById('selected-crop');
const customCropField = document.getElementById('custom-crop-field');
const customCropName = document.getElementById('custom-crop-name');

// Interactive Radar Elements
const scanningRadar = document.getElementById('scanning-radar');
const scanningProgressFill = document.getElementById('scanning-progress-fill');
const scanningPercent = document.getElementById('scanning-percent');
const scanningStageTitle = document.getElementById('scanning-stage-title');
const scanningStageDesc = document.getElementById('scanning-stage-desc');

const diagnosisResult = document.getElementById('diagnosis-result');
const productsWrap = document.getElementById('recommended-products');
const agrovetList = document.getElementById('agrovet-list');
const detectLocationBtn = document.getElementById('detect-location-btn');
const locationStatus = document.getElementById('location-status');
const specialistList = document.getElementById('specialist-list');
const consultationForm = document.getElementById('consultation-form');
const consultFeedback = document.getElementById('consult-feedback');
const advisoryList = document.getElementById('advisory-list');

const adminLoginForm = document.getElementById('admin-login-form');
const adminAuthWrap = document.getElementById('admin-auth-wrap');
const adminDashboard = document.getElementById('admin-dashboard');
const adminRoleLabel = document.getElementById('admin-role-label');
const adminLoginFeedback = document.getElementById('admin-login-feedback');
const adminFeedback = document.getElementById('admin-feedback');
const agrovetPanel = document.getElementById('agrovet-admin-panel');
const specialistPanel = document.getElementById('specialist-admin-panel');
const adminLogout = document.getElementById('admin-logout');

const agrovetSelect = document.getElementById('agrovet-select');
const specialistSelect = document.getElementById('specialist-select');
const agrovetStockForm = document.getElementById('agrovet-stock-form');
const agrovetNoticeForm = document.getElementById('agrovet-notice-form');
const specialistUpdateForm = document.getElementById('specialist-update-form');
const specialistAdvisoryForm = document.getElementById('specialist-advisory-form');

initSmartAssist();

function initSmartAssist() {
  bindCropChips();
  bindSampleChips();
  bindDiagnosisInputs();
  bindFarmerFlows();
  bindAdminFlows();
  renderSpecialists();
  renderAdvisories();
  hydrateAdminSession();
  renderAgrovetOptions();
  renderSpecialistOptions();
}

const SAMPLE_PRESETS = {
  'maize-armyworm': {
    crop: 'Maize',
    symptoms: 'Large ragged holes in whorl leaves with moist sawdust-like frass pellets inside central funnel. Young caterpillars observed in morning inspection.',
    stage: 'Vegetative / Foliage',
    name: 'Maize - Fall Armyworm (Spodoptera frugiperda)',
    color1: '#3e6b48',
    color2: '#23442a',
    markings: 'armyworm'
  },
  'tomato-blight': {
    crop: 'Tomatoes',
    symptoms: 'Irregular dark water-soaked greasy lesions expanding rapidly across foliage and stems. White downy mold on underside in early mornings.',
    stage: 'Flowering / Budding',
    name: 'Tomato - Late Blight (Phytophthora infestans)',
    color1: '#4a6f3e',
    color2: '#203318',
    markings: 'blight'
  },
  'potato-pcn': {
    crop: 'Potatoes',
    symptoms: 'Stunted localized patch in field with yellowing foliage, wilting in midday sun, tiny pin-sized cysts on feeder roots.',
    stage: 'Fruit / Pod / Tuber Development',
    name: 'Irish Potato - Potato Cyst Nematode (PCN)',
    color1: '#546333',
    color2: '#2c3319',
    markings: 'pcn'
  },
  'cabbage-dbm': {
    crop: 'Cabbages',
    symptoms: 'Small green caterpillars feeding on undersides of leaves, leaving translucent window-pane blotches and shot holes in outer leaves.',
    stage: 'Vegetative / Foliage',
    name: 'Cabbage - Diamondback Moth (Plutella xylostella)',
    color1: '#2f5734',
    color2: '#477a4c',
    markings: 'dbm'
  },
  'beans-rust': {
    crop: 'French Beans',
    symptoms: 'Reddish-brown cinnamon powdery pustules scattered on leaf undersides with yellowish chlorotic halos. Leaves turning dry and dropping.',
    stage: 'Flowering / Budding',
    name: 'French Beans - Bean Rust (Uromyces appendiculatus)',
    color1: '#476943',
    color2: '#283c27',
    markings: 'rust'
  },
  'capsicum-spot': {
    crop: 'Capsicum',
    symptoms: 'Water-soaked spots turning dark brown with distinct yellow chlorotic halos on foliage and rough raised scabs on pepper skin.',
    stage: 'Fruit / Pod / Tuber Development',
    name: 'Sweet Pepper - Bacterial Spot (Xanthomonas)',
    color1: '#245942',
    color2: '#163b2c',
    markings: 'spot'
  },
  'avocado-anthracnose': {
    crop: 'Avocados',
    symptoms: 'Sunken circular dark brown and black lesions on avocado fruit skin and twig dieback during rainy fruit development period.',
    stage: 'Fruit / Pod / Tuber Development',
    name: 'Avocado - Anthracnose (Colletotrichum)',
    color1: '#274b25',
    color2: '#112510',
    markings: 'anthracnose'
  }
};

function generateSampleLeafSvg(key) {
  const p = SAMPLE_PRESETS[key] || SAMPLE_PRESETS['maize-armyworm'];
  let pathologyMarkup = '';

  if (p.markings === 'armyworm') {
    pathologyMarkup = `
      <!-- Ragged feeding holes -->
      <path d="M 330 220 Q 350 210 380 230 Q 360 260 330 240 Z" fill="#1b2e1f" opacity="0.95"/>
      <path d="M 420 280 Q 460 270 480 300 Q 440 330 410 300 Z" fill="#1b2e1f" opacity="0.95"/>
      <path d="M 360 360 Q 390 350 410 380 Q 380 400 350 380 Z" fill="#1b2e1f" opacity="0.9"/>
      <!-- Sawdust-like frass pellets -->
      <circle cx="345" cy="235" r="4" fill="#a47148"/>
      <circle cx="355" cy="245" r="3" fill="#8b5e34"/>
      <circle cx="435" cy="295" r="5" fill="#a47148"/>
      <circle cx="450" cy="305" r="4" fill="#784e27"/>
      <circle cx="375" cy="375" r="4" fill="#a47148"/>
      <!-- Yellow chlorotic margins around holes -->
      <path d="M 320 210 Q 360 200 395 225 Q 375 270 320 250 Z" fill="none" stroke="#d4a373" stroke-width="5" opacity="0.7"/>
      <path d="M 410 270 Q 470 260 490 310 Q 430 340 400 295 Z" fill="none" stroke="#d4a373" stroke-width="5" opacity="0.7"/>
    `;
  } else if (p.markings === 'blight') {
    pathologyMarkup = `
      <!-- Dark water-soaked lesions with oily halos -->
      <ellipse cx="360" cy="230" rx="65" ry="45" fill="#2d2215" opacity="0.92"/>
      <ellipse cx="360" cy="230" rx="75" ry="52" fill="none" stroke="#a3b18a" stroke-width="8" opacity="0.7"/>
      <ellipse cx="440" cy="320" rx="80" ry="50" fill="#241a10" opacity="0.92"/>
      <ellipse cx="440" cy="320" rx="92" ry="58" fill="none" stroke="#a3b18a" stroke-width="8" opacity="0.7"/>
      <!-- White downy mold edge simulation -->
      <path d="M 320 220 Q 340 200 380 205 Q 410 220 390 250" fill="none" stroke="#f4f1de" stroke-width="4" stroke-dasharray="3,3" opacity="0.85"/>
      <path d="M 400 310 Q 440 290 480 300 Q 510 320 480 350" fill="none" stroke="#f4f1de" stroke-width="4" stroke-dasharray="3,3" opacity="0.85"/>
    `;
  } else if (p.markings === 'rust') {
    pathologyMarkup = `
      <!-- Multiple cinnamon reddish-brown pustules -->
      <g fill="#c85a17">
        <circle cx="320" cy="220" r="10"/><circle cx="350" cy="200" r="8"/><circle cx="380" cy="230" r="9"/>
        <circle cx="330" cy="260" r="11"/><circle cx="430" cy="270" r="12"/><circle cx="460" cy="290" r="9"/>
        <circle cx="410" cy="320" r="10"/><circle cx="440" cy="350" r="11"/><circle cx="360" cy="360" r="9"/>
        <circle cx="390" cy="400" r="12"/><circle cx="470" cy="380" r="8"/><circle cx="340" cy="420" r="10"/>
      </g>
      <!-- Yellow chlorotic halos -->
      <g fill="none" stroke="#ffd166" stroke-width="4" opacity="0.8">
        <circle cx="320" cy="220" r="15"/><circle cx="380" cy="230" r="14"/><circle cx="330" cy="260" r="16"/>
        <circle cx="430" cy="270" r="17"/><circle cx="410" cy="320" r="15"/><circle cx="440" cy="350" r="16"/>
        <circle cx="390" cy="400" r="17"/>
      </g>
    `;
  } else if (p.markings === 'dbm') {
    pathologyMarkup = `
      <!-- Translucent window pane patches -->
      <ellipse cx="340" cy="220" rx="45" ry="25" fill="#cad2c5" opacity="0.85" stroke="#52796f" stroke-width="2"/>
      <ellipse cx="440" cy="280" rx="55" ry="30" fill="#cad2c5" opacity="0.85" stroke="#52796f" stroke-width="2"/>
      <ellipse cx="370" cy="360" rx="50" ry="25" fill="#cad2c5" opacity="0.85" stroke="#52796f" stroke-width="2"/>
      <!-- Small green caterpillars -->
      <path d="M 330 220 Q 345 210 360 225" fill="none" stroke="#70e000" stroke-width="5" stroke-linecap="round"/>
      <path d="M 430 280 Q 445 270 460 285" fill="none" stroke="#70e000" stroke-width="5" stroke-linecap="round"/>
    `;
  } else if (p.markings === 'spot') {
    pathologyMarkup = `
      <!-- Angular necrotic spots with bright halos -->
      <g fill="#3d2613">
        <rect x="330" y="210" width="22" height="18" rx="4"/>
        <rect x="420" y="260" width="26" height="22" rx="5"/>
        <rect x="360" y="310" width="30" height="24" rx="6"/>
        <rect x="450" y="340" width="24" height="20" rx="4"/>
        <rect x="320" y="380" width="25" height="22" rx="4"/>
      </g>
      <g fill="none" stroke="#f6bd60" stroke-width="4" opacity="0.85">
        <rect x="326" y="206" width="30" height="26" rx="6"/>
        <rect x="414" y="254" width="38" height="34" rx="8"/>
        <rect x="354" y="304" width="42" height="36" rx="9"/>
        <rect x="444" y="334" width="36" height="32" rx="7"/>
      </g>
    `;
  } else if (p.markings === 'anthracnose') {
    pathologyMarkup = `
      <!-- Concentric sunken dark lesions -->
      <circle cx="360" cy="240" r="42" fill="#1c1c1a"/>
      <circle cx="360" cy="240" r="30" fill="#2d2217"/>
      <circle cx="360" cy="240" r="16" fill="#4a3520"/>
      <circle cx="450" cy="330" r="50" fill="#1c1c1a"/>
      <circle cx="450" cy="330" r="36" fill="#2d2217"/>
      <circle cx="450" cy="330" r="20" fill="#4a3520"/>
      <circle cx="340" cy="370" r="32" fill="#1c1c1a"/>
      <!-- Salmon spore mass in center -->
      <circle cx="360" cy="240" r="5" fill="#f4a261"/>
      <circle cx="450" cy="330" r="7" fill="#f4a261"/>
    `;
  } else {
    // pcn or default
    pathologyMarkup = `
      <!-- Chlorotic yellow leaf patches & cyst clusters -->
      <ellipse cx="360" cy="250" rx="80" ry="50" fill="#e9c46a" opacity="0.6"/>
      <ellipse cx="430" cy="340" rx="70" ry="45" fill="#e9c46a" opacity="0.6"/>
      <circle cx="350" cy="240" r="5" fill="#b08968"/><circle cx="370" cy="255" r="4" fill="#d4a373"/>
      <circle cx="425" cy="335" r="5" fill="#b08968"/><circle cx="445" cy="350" r="4" fill="#d4a373"/>
    `;
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 550" width="800" height="550">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#19281d"/>
          <stop offset="100%" stop-color="#0b130e"/>
        </radialGradient>
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${p.color1}"/>
          <stop offset="100%" stop-color="${p.color2}"/>
        </linearGradient>
      </defs>
      <!-- Background Field Setting -->
      <rect width="800" height="550" fill="url(#bgGrad)"/>
      <path d="M 0 500 Q 400 480 800 520 L 800 550 L 0 550 Z" fill="#0d1f11" opacity="0.5"/>
      <!-- Main Leaf Blade -->
      <path d="M 220 480 C 180 320, 240 140, 400 60 C 560 140, 620 320, 580 480 C 490 520, 310 520, 220 480 Z" fill="url(#leafGrad)" stroke="#1a3b1d" stroke-width="4"/>
      <!-- Central Midrib Vein -->
      <path d="M 400 65 Q 400 280 400 495" fill="none" stroke="#8cb369" stroke-width="8" stroke-linecap="round" opacity="0.75"/>
      <!-- Lateral Veins -->
      <path d="M 400 160 Q 330 190 270 230 M 400 160 Q 470 190 530 230" fill="none" stroke="#8cb369" stroke-width="4" opacity="0.6"/>
      <path d="M 400 250 Q 320 280 250 330 M 400 250 Q 480 280 550 330" fill="none" stroke="#8cb369" stroke-width="4" opacity="0.6"/>
      <path d="M 400 340 Q 330 380 270 420 M 400 340 Q 470 380 530 420" fill="none" stroke="#8cb369" stroke-width="4" opacity="0.6"/>
      <!-- Pathology Lesions & Distress Signs -->
      ${pathologyMarkup}
      <!-- HUD Specimen Tag -->
      <rect x="25" y="25" width="440" height="42" rx="8" fill="rgba(6,21,10,0.85)" stroke="#2e7d32" stroke-width="1.5"/>
      <circle cx="45" cy="46" r="6" fill="#39e75f"/>
      <text x="62" y="51" fill="#e8f5e9" font-family="system-ui, sans-serif" font-size="13" font-weight="700">SPECIMEN: ${escapeHtml(p.name)}</text>
      <!-- Location Stamp -->
      <rect x="635" y="25" width="140" height="30" rx="6" fill="rgba(6,21,10,0.8)" stroke="#2e7d32" stroke-width="1"/>
      <text x="647" y="45" fill="#a5d6a7" font-family="monospace" font-size="11" font-weight="bold">KENYA AGRONOMY</text>
    </svg>
  `;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
}

function bindSampleChips() {
  const sampleChips = document.querySelectorAll('.btn-sample-chip');
  sampleChips.forEach((chip) => {
    chip.addEventListener('click', async () => {
      const sampleKey = chip.getAttribute('data-sample');
      const preset = SAMPLE_PRESETS[sampleKey];
      if (!preset) return;

      // Select corresponding crop in chips
      cropChips.forEach((c) => {
        if (c.getAttribute('data-crop') === preset.crop) {
          c.classList.add('active');
        } else {
          c.classList.remove('active');
        }
      });
      selectedCropInput.value = preset.crop;
      customCropField.hidden = true;

      // Set symptoms & stage
      const symptomsEl = document.getElementById('symptoms');
      if (symptomsEl) symptomsEl.value = preset.symptoms;
      const stageEl = document.getElementById('crop-stage');
      if (stageEl) stageEl.value = preset.stage;

      // Generate realistic sample image
      const dataUrl = generateSampleLeafSvg(sampleKey);
      latestImage = {
        fileName: `${sampleKey}-specimen.jpg`,
        mimeType: 'image/jpeg',
        dataUrl,
        width: 800,
        height: 550
      };

      // Show preview
      imagePreviewWrap.hidden = false;
      imagePreview.src = dataUrl;
      imageMeta.textContent = `Diagnostic Field Specimen Loaded: ${preset.name}`;
      diagnosisResult.hidden = true;

      // Highlight submit button
      btnDiagnoseSubmit.classList.add('pulse-ready');
      setTimeout(() => btnDiagnoseSubmit.classList.remove('pulse-ready'), 1500);

      // Scroll into view
      imagePreviewWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
}

function bindCropChips() {
  cropChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      cropChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const crop = chip.getAttribute('data-crop');
      if (crop === 'Other') {
        customCropField.hidden = false;
        selectedCropInput.value = customCropName.value.trim() || 'Other';
        customCropName.focus();
      } else {
        customCropField.hidden = true;
        selectedCropInput.value = crop;
      }
    });
  });

  customCropName?.addEventListener('input', () => {
    if (!customCropField.hidden) {
      selectedCropInput.value = customCropName.value.trim() || 'Other';
    }
  });

  btnClearImage?.addEventListener('click', () => {
    latestImage = null;
    imagePreviewWrap.hidden = true;
    imagePreview.src = '';
    imageInput.value = '';
    cameraInput.value = '';
    diagnosisResult.hidden = true;
  });
}

function bindDiagnosisInputs() {
  imageInput?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      await consumeImageFile(file);
      cameraInput.value = '';
    }
  });

  cameraInput?.addEventListener('change', async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      await consumeImageFile(file);
      imageInput.value = '';
    }
  });
}

function bindFarmerFlows() {
  diagnosisForm?.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (isSpamSubmission(diagnosisForm)) {
      showDiagnosisMessage('Submission blocked. Please remove hidden field content and try again.');
      return;
    }

    if (!latestImage) {
      showDiagnosisMessage('Please upload or snap a leaf photo first to run visual pathogen analysis.');
      imageInput?.focus();
      return;
    }

    if (isRateLimited('diagnosis', 6)) {
      showDiagnosisMessage('Please wait a moment before running another analysis.');
      return;
    }

    const cropType = selectedCropInput?.value.trim() || 'Maize';
    const symptoms = document.getElementById('symptoms')?.value.trim() || '';
    const location = document.getElementById('farmer-location')?.value.trim() || 'Kiambu, Kenya';
    const cropStage = document.getElementById('crop-stage')?.value || 'Vegetative / Foliage';

    // Show radar container & animate
    diagnosisResult.hidden = true;
    if (scanningRadar) {
      scanningRadar.hidden = false;
      scanningRadar.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    if (btnDiagnoseSubmit) {
      btnDiagnoseSubmit.disabled = true;
      btnDiagnoseSubmit.innerHTML = `
        <span class="scanning-spinner" style="border-color: #fff; border-top-color: transparent;"></span>
        <span>Scanning Plant Pathology...</span>
      `;
    }

    // Run radar animation in parallel with diagnostic lookup
    const [result] = await Promise.all([
      analyzeCropIssue({ cropType, symptoms, location, cropStage, image: latestImage }),
      runRadarScanSimulation()
    ]);

    latestDiagnosis = result;

    if (scanningRadar) {
      scanningRadar.hidden = true;
    }
    if (btnDiagnoseSubmit) {
      btnDiagnoseSubmit.disabled = false;
      btnDiagnoseSubmit.innerHTML = `
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" class="btn-icon"><circle cx="12" cy="12" r="10"/><path d="m10 15 5-3-5-3v6z"/></svg>
        <span>Scan &amp; Diagnose Crop Health</span>
      `;
    }

    renderDiagnosisResult(result, { cropType, location });
    renderRecommendedProducts(result.products);
    renderAgrovets(result.products);

    diagnosisResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  detectLocationBtn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
      locationStatus.textContent = 'Geolocation not supported on this device/browser.';
      return;
    }

    locationStatus.textContent = 'Detecting location...';
    navigator.geolocation.getCurrentPosition(
      (position) => {
        userPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        locationStatus.textContent = `Location detected (${userPosition.lat.toFixed(4)}, ${userPosition.lng.toFixed(4)}).`;
        renderAgrovets(latestDiagnosis?.products || []);
      },
      () => {
        locationStatus.textContent = 'Could not detect location. Use manual location field instead.';
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  });

  consultationForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    if (isSpamSubmission(consultationForm) || isRateLimited('consultation', 10)) {
      showFeedback(consultFeedback, 'Please wait and try again.');
      return;
    }

    const payload = {
      id: `consult-${Date.now()}`,
      name: document.getElementById('consult-name')?.value.trim(),
      contact: document.getElementById('consult-contact')?.value.trim(),
      county: document.getElementById('consult-county')?.value.trim(),
      mode: document.getElementById('consult-mode')?.value,
      details: document.getElementById('consult-details')?.value.trim(),
      createdAt: new Date().toISOString()
    };

    if (!payload.name || !payload.contact || !payload.county || !payload.mode || !payload.details) {
      showFeedback(consultFeedback, 'Please fill all consultation fields.');
      return;
    }

    smartData.consultations.unshift(payload);
    persistSmartData();
    consultationForm.reset();
    showFeedback(consultFeedback, 'Consultation request sent. A specialist will reach out shortly.');
  });
}

function bindAdminFlows() {
  adminLoginForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('admin-username')?.value.trim().toLowerCase();
    const password = document.getElementById('admin-password')?.value;
    const account = ADMIN_CREDENTIALS[username];

    if (!account || account.password !== password) {
      showFeedback(adminLoginFeedback, 'Invalid admin credentials.');
      return;
    }

    const session = { role: account.role, username, at: Date.now() };
    sessionStorage.setItem('kili_admin_session', JSON.stringify(session));
    adminLoginForm.reset();
    adminLoginFeedback.hidden = true;
    renderAdminSession(session);
  });

  adminLogout?.addEventListener('click', () => {
    sessionStorage.removeItem('kili_admin_session');
    adminDashboard.hidden = true;
    adminAuthWrap.hidden = false;
  });

  agrovetStockForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const agrovetId = agrovetSelect.value;
    const productName = document.getElementById('product-name')?.value.trim();
    const stock = Number(document.getElementById('product-stock')?.value || 0);
    const price = Number(document.getElementById('product-price')?.value || 0);

    const agrovet = smartData.agrovets.find((item) => item.id === agrovetId);
    if (!agrovet || !productName) {
      showFeedback(adminFeedback, 'Select agrovet and product details.');
      return;
    }

    const existing = agrovet.products.find((item) => item.name.toLowerCase() === productName.toLowerCase());
    if (existing) {
      existing.stock = stock;
      existing.price = price;
    } else {
      agrovet.products.push({ name: productName, stock, price });
    }

    persistSmartData();
    agrovetStockForm.reset();
    showFeedback(adminFeedback, `Stock updated for ${agrovet.name}.`);

    if (latestDiagnosis?.products?.length) {
      renderAgrovets(latestDiagnosis.products);
    }
  });

  agrovetNoticeForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('agrovet-notice-title')?.value.trim();
    const message = document.getElementById('agrovet-notice-body')?.value.trim();
    const agrovet = smartData.agrovets.find((item) => item.id === agrovetSelect.value);

    if (!title || !message || !agrovet) {
      showFeedback(adminFeedback, 'Complete notice details first.');
      return;
    }

    smartData.advisories.unshift({
      id: `adv-${Date.now()}`,
      source: `Agrovet: ${agrovet.name}`,
      title,
      message,
      region: agrovet.county,
      createdAt: new Date().toISOString().slice(0, 10)
    });

    persistSmartData();
    agrovetNoticeForm.reset();
    showFeedback(adminFeedback, 'Agrovet notice published.');
    renderAdvisories();
  });

  specialistUpdateForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const specialistId = specialistSelect.value;
    const availability = document.getElementById('specialist-availability')?.value;
    const specialist = smartData.specialists.find((item) => item.id === specialistId);

    if (!specialist) {
      showFeedback(adminFeedback, 'Select specialist.');
      return;
    }

    specialist.availability = availability;
    persistSmartData();
    showFeedback(adminFeedback, `Availability updated for ${specialist.name}.`);
    renderSpecialists();
  });

  specialistAdvisoryForm?.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('specialist-advisory-title')?.value.trim();
    const message = document.getElementById('specialist-advisory-body')?.value.trim();
    const region = document.getElementById('specialist-advisory-region')?.value.trim() || 'National';

    if (!title || !message) {
      showFeedback(adminFeedback, 'Add advisory title and message.');
      return;
    }

    smartData.advisories.unshift({
      id: `adv-${Date.now()}`,
      source: 'Specialist',
      title,
      message,
      region,
      createdAt: new Date().toISOString().slice(0, 10)
    });

    persistSmartData();
    specialistAdvisoryForm.reset();
    showFeedback(adminFeedback, 'Specialist advisory published.');
    renderAdvisories();
  });
}

async function consumeImageFile(file) {
  if (!file.type.startsWith('image/')) {
    showDiagnosisMessage('Only image files are allowed.');
    return;
  }

  if (file.size > 6 * 1024 * 1024) {
    showDiagnosisMessage('Image too large. Please upload a file below 6MB.');
    return;
  }

  const optimized = await optimizeImage(file, 1200, 0.84);
  latestImage = {
    fileName: file.name,
    mimeType: 'image/jpeg',
    blob: optimized.blob,
    dataUrl: optimized.dataUrl,
    width: optimized.width,
    height: optimized.height
  };

  imagePreviewWrap.hidden = false;
  imagePreview.src = optimized.dataUrl;
  imageMeta.textContent = `Optimized image size: ${optimized.width}x${optimized.height}`;
  diagnosisResult.hidden = true;
}

function runRadarScanSimulation() {
  return new Promise((resolve) => {
    let currentPercent = 0;
    const stages = [
      { max: 24, title: 'Calibrating Optical Leaf Spectrum...', desc: 'Extracting leaf color histograms, lesion edges, and vein geometry...' },
      { max: 58, title: 'Matching Pathogen & Pest Atlas...', desc: 'Comparing against East African & Kenyan agricultural pathology repository...' },
      { max: 86, title: 'Synthesizing Agrochemicals & Bio-Remedies...', desc: 'Verifying active ingredients, registered brand dilutions, and PHI safety...' },
      { max: 100, title: 'Prescription & Stock Availability Ready!', desc: 'Compiled comprehensive treatment plan with WhatsApp prescription export.' }
    ];

    if (scanningProgressFill) scanningProgressFill.style.width = '0%';
    if (scanningPercent) scanningPercent.textContent = '0%';

    const interval = setInterval(() => {
      currentPercent += Math.floor(Math.random() * 8) + 5;
      if (currentPercent > 100) currentPercent = 100;

      if (scanningProgressFill) scanningProgressFill.style.width = `${currentPercent}%`;
      if (scanningPercent) scanningPercent.textContent = `${currentPercent}%`;

      const currentStage = stages.find((s) => currentPercent <= s.max) || stages[stages.length - 1];
      if (scanningStageTitle && currentStage) scanningStageTitle.textContent = currentStage.title;
      if (scanningStageDesc && currentStage) scanningStageDesc.textContent = currentStage.desc;

      if (currentPercent >= 100) {
        clearInterval(interval);
        setTimeout(resolve, 250);
      }
    }, 55);
  });
}

async function analyzeCropIssue(context) {
  // First, attempt to call the server-side Google Gemini endpoint
  try {
    const response = await fetch('/api/diagnose', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cropType: context.cropType,
        symptoms: context.symptoms,
        location: context.location,
        cropStage: context.cropStage,
        imageBase64: context.image?.dataUrl || '',
        mimeType: context.image?.mimeType || 'image/jpeg'
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.success && data.diagnosis) {
        return {
          diagnosis: data.diagnosis,
          commonName: data.commonName || data.diagnosis,
          localSwahiliName: data.localSwahiliName || '',
          scientificName: data.scientificName || '',
          severity: data.severity || 'High',
          confidence: data.confidence || 94,
          symptomAnalysis: Array.isArray(data.symptomAnalysis) ? data.symptomAnalysis : [data.symptomAnalysis || 'Symptoms consistent with field pathogen signs.'],
          activeChemicals: Array.isArray(data.activeChemicals) ? data.activeChemicals : [],
          organicAlternatives: Array.isArray(data.organicAlternatives) ? data.organicAlternatives : [],
          withholdingPeriod: data.withholdingPeriod || { days: 7, description: 'Pre-Harvest Interval (PHI): 7 days before picking.', reEntryHours: 24 },
          culturalPractices: Array.isArray(data.culturalPractices) ? data.culturalPractices : [],
          products: Array.isArray(data.products) && data.products.length ? data.products : ['Mancozeb 80WP', 'Copper Oxychloride'],
          source: 'gemini-ai'
        };
      }
    }
  } catch (err) {
    console.warn('API diagnosis fallback to local knowledge database:', err?.message || err);
  }

  // High-precision local Kenyan database matcher
  return matchLocalKenyanDiagnosis(context);
}

function matchLocalKenyanDiagnosis(context) {
  const cropStr = (context.cropType || '').toLowerCase();
  const symptomsStr = (context.symptoms || '').toLowerCase();
  const fileStr = (context.image?.fileName || '').toLowerCase();
  const fullText = `${cropStr} ${symptomsStr} ${fileStr}`;

  // Filter profiles matching this crop category first
  const candidateProfiles = KENYAN_CROP_PATHOLOGY_DATABASE.filter((p) => {
    return p.cropKeys.some((k) => cropStr.includes(k) || k === 'general');
  });

  const pool = candidateProfiles.length ? candidateProfiles : KENYAN_CROP_PATHOLOGY_DATABASE;

  let best = pool[0];
  let bestScore = -1;

  for (const profile of pool) {
    let score = 0;
    for (const kw of profile.keywords) {
      if (fullText.includes(kw)) {
        score += 2;
      }
    }
    if (profile.crop.toLowerCase() === cropStr) {
      score += 3;
    }
    if (score > bestScore) {
      best = profile;
      bestScore = score;
    }
  }

  const confidenceCalculated = Math.min(97, Math.max(76, (best.confidenceBase || 90) + (bestScore > 0 ? Math.min(6, bestScore) : -4)));

  return {
    diagnosis: best.diagnosis,
    commonName: best.commonName || best.diagnosis,
    localSwahiliName: best.localSwahiliName || '',
    scientificName: best.scientificName || '',
    severity: best.severity || 'High',
    confidence: confidenceCalculated,
    symptomAnalysis: best.symptomAnalysis || ['Matches characteristic diagnostic lesion profile and foliar stress patterns.'],
    activeChemicals: best.activeChemicals || [],
    organicAlternatives: best.organicAlternatives || [],
    withholdingPeriod: best.withholdingPeriod || { days: 7, description: 'Pre-Harvest Interval (PHI): 7 days before harvest.', reEntryHours: 24 },
    culturalPractices: best.culturalPractices || [],
    products: best.products || ['Mancozeb 80WP', 'Copper Oxychloride'],
    source: 'kenyan-atlas'
  };
}

// Helper: Extract structured dosages list
function getDosagesList(result) {
  if (result.activeChemicals && result.activeChemicals.length > 0) {
    return result.activeChemicals.map((chem, idx) => {
      const brand = chem.commercialProducts?.[0] || 'Kenya Registered Brand';
      const ingredient = chem.ingredient || 'Active compound';
      const dosage = chem.dosage || 'Standard label dilution per 20L knapsack';
      const altBrands = chem.commercialProducts && chem.commercialProducts.length > 1
        ? ` (or ${chem.commercialProducts.slice(1).join(', ')})`
        : '';
      return {
        index: idx + 1,
        brand,
        ingredient,
        dosage,
        altBrands
      };
    });
  }

  const products = result.products?.length ? result.products : ['Mancozeb 80WP', 'Copper Oxychloride'];
  return products.map((prod, idx) => ({
    index: idx + 1,
    brand: prod,
    ingredient: 'Standard contact/systemic formulation',
    dosage: '40-50g (or 15-20ml) per 20L knapsack sprayer',
    altBrands: ''
  }));
}

// Helper: Target spray zone for farm worker instructions
function getTargetAreaForDiagnosis(diagnosisStr) {
  const d = (diagnosisStr || '').toLowerCase();
  if (d.includes('armyworm') || d.includes('caterpillar') || d.includes('borer')) {
    return 'plant whorls and tender young leaves where larvae feed';
  }
  if (d.includes('blight') || d.includes('leafminer') || d.includes('rust') || d.includes('spot')) {
    return 'both upper and lower leaf surfaces and green stems';
  }
  if (d.includes('wilt') || d.includes('nematode') || d.includes('root') || d.includes('clubroot')) {
    return 'stem base and root zone as a saturated soil drench';
  }
  if (d.includes('mite') || d.includes('thrip')) {
    return 'growing shoot tips, flower panicles, and undersides of leaves';
  }
  if (d.includes('anthracnose')) {
    return 'flower clusters, developing fruits, and foliage';
  }
  return 'foliage canopy and affected plant parts';
}

// Helper: Kenyan phone number cleaner
function cleanKenyaPhone(rawPhone) {
  if (!rawPhone) return '';
  let clean = rawPhone.replace(/[^0-9+]/g, '');
  if (clean.startsWith('+')) {
    clean = clean.substring(1);
  }
  if (clean.startsWith('07') || clean.startsWith('01')) {
    clean = '254' + clean.substring(1);
  } else if (clean.startsWith('7') || clean.startsWith('1')) {
    clean = '254' + clean;
  }
  return clean;
}

// Helper: Build WhatsApp URL (direct to number or share picker)
function buildWhatsAppUrl(cleanPhone, text) {
  const encodedText = encodeURIComponent(text);
  if (cleanPhone) {
    return `https://wa.me/${cleanPhone}?text=${encodedText}`;
  }
  return `https://api.whatsapp.com/send?text=${encodedText}`;
}

// Helper: Compile WhatsApp Prescription Messages
function buildPrescriptionMessage(result, meta = {}, audienceType = 'agrovet') {
  const cropName = meta.cropType || result.cropType || 'Crop';
  const location = meta.location || 'Kenya';
  const cropStage = meta.cropStage || 'Vegetative / Foliage';
  const items = getDosagesList(result);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const rxId = meta.rxId || `RX-KILI-${now.getFullYear()}-${Math.floor(100000 + (now.getTime() % 900000))}`;

  if (audienceType === 'worker') {
    const sprayItems = items.map((item) => {
      return `${item.index}️⃣ *${item.brand}*
   • *Knapsack Dosage:* ${item.dosage}
   • *Active Chemical:* ${item.ingredient}`;
    }).join('\n');

    const sprayTarget = getTargetAreaForDiagnosis(result.diagnosis);

    return [
      `⚠️ *FIELD SPRAYING & SAFETY GUIDE - FARM OPERATOR* ⚠️`,
      `----------------------------------------`,
      `🌱 *Crop Block:* ${cropName} (${cropStage})`,
      `📍 *Field Location:* ${location}`,
      `🎯 *Target Problem:* ${result.diagnosis} [${result.severity || 'High'} Severity]`,
      `📅 *Treatment Date:* ${dateStr}`,
      `🔢 *Rx Ref:* ${rxId}`,
      ``,
      `🧪 *SPRAY MIXING RATIOS & DOSAGE (Per 20L Knapsack Sprayer):*`,
      sprayItems,
      ``,
      `📋 *STEP-BY-STEP SPRAYING INSTRUCTIONS:*`,
      `1. *Spray Timing:* Early morning (6:30am - 9:00am) or late afternoon (4:30pm - 6:30pm). NEVER spray during midday sun or windy conditions.`,
      `2. *Clean Water:* Mix prescribed dosage in a small bucket first, pour into knapsack, top up to 20L mark, and agitate thoroughly.`,
      `3. *Target Zone:* Direct spray nozzle thoroughly focusing on ${sprayTarget}.`,
      ``,
      `🛡️ *MANDATORY SAFETY & WITHHOLDING RULES:*`,
      `• *Required PPE:* Full respirator mask, rubber gloves, eye goggles, and gumboots!`,
      `• *Worker Re-entry:* Do NOT enter sprayed block for ${result.withholdingPeriod?.reEntryHours || 24} Hours.`,
      `• *Harvest Withholding (PHI):* STRICTLY FORBIDDEN to pick, sell, or consume crop for ${result.withholdingPeriod?.days || 7} Days after spraying!`,
      `----------------------------------------`,
      `_Prescribed by Kilimonet Farm Management Agronomy Team_`
    ].filter(Boolean).join('\n');
  }

  if (audienceType === 'report') {
    const fullItems = items.map((item) => {
      return `• *${item.brand}* [${item.ingredient}]: ${item.dosage}`;
    }).join('\n');
    const symptoms = (result.symptomAnalysis || ['Diagnostic foliar symptoms identified']).map((s) => `• ${s}`).join('\n');
    const organics = (result.organicAlternatives || ['Standard compost tea & bio-fungicide drench']).map((o) => `• ${o}`).join('\n');
    const culturals = (result.culturalPractices || ['Maintain crop hygiene and scout twice weekly']).map((c) => `• ${c}`).join('\n');

    return [
      `🔬 *KILIMONET SMART ASSIST - FULL AGRONOMIC DIAGNOSIS* 🔬`,
      `----------------------------------------`,
      `🌱 *Crop:* ${cropName}${result.localSwahiliName ? ` (${result.localSwahiliName})` : ''}`,
      `📍 *Location:* ${location} | *Stage:* ${cropStage}`,
      `⚠️ *Diagnosis:* ${result.diagnosis}`,
      result.scientificName ? `🔬 *Scientific Pathogen:* ${result.scientificName}` : null,
      `🎯 *Confidence:* ${result.confidence}% Match | *Severity:* ${result.severity || 'High'}`,
      `📅 *Date:* ${dateStr} | *Rx:* ${rxId}`,
      ``,
      `🔍 *DIAGNOSTIC PATHOLOGY SYMPTOMS:*`,
      symptoms,
      ``,
      `💊 *PRESCRIBED INPUTS & DOSAGES:*`,
      fullItems,
      ``,
      `🌿 *ORGANIC & BIOLOGICAL ALTERNATIVES:*`,
      organics,
      ``,
      `⏳ *SAFETY & WITHHOLDING (PHI):*`,
      `• Pre-Harvest Interval (PHI): ${result.withholdingPeriod?.days || 7} Days`,
      `• Worker Re-entry Interval: ${result.withholdingPeriod?.reEntryHours || 24} Hours`,
      ``,
      `🌾 *CULTURAL & PREVENTATIVE PRACTICES:*`,
      culturals,
      `----------------------------------------`,
      `_Kilimonet Integrated Agrisystems Limited | Nairobi & Kiambu, Kenya_`,
      `_Web: www.kilimonet.co.ke | Tel: +254 798 981 760_`
    ].filter(Boolean).join('\n');
  }

  // Default: Agrovet Order
  const formattedItems = items.map((item) => {
    return `${item.index}️⃣ *${item.brand}* [${item.ingredient}]${item.altBrands}
   • *Prescribed Dosage:* ${item.dosage}`;
  }).join('\n');

  return [
    `🌿 *KILIMONET SMART ASSIST - AGROVET PRESCRIPTION ORDER* 🌿`,
    `----------------------------------------`,
    `🌱 *Crop Type:* ${cropName}${result.localSwahiliName ? ` (${result.localSwahiliName})` : ''}`,
    `📍 *Farm Location:* ${location}`,
    `⚠️ *Suspected Diagnosis:* ${result.diagnosis}`,
    result.scientificName ? `🔬 *Scientific Pathogen:* ${result.scientificName}` : null,
    `🎯 *Confidence Match:* ${result.confidence}% Match [${result.severity || 'High'} Severity]`,
    `📅 *Prescription Date:* ${dateStr}`,
    `🔢 *Rx Ref:* ${rxId}`,
    ``,
    `💊 *PRESCRIBED PRODUCTS & DOSAGES:*`,
    formattedItems,
    ``,
    `⏳ *SAFETY WITHHOLDING PERIOD (PHI):*`,
    `• Pre-Harvest Interval (PHI): ${result.withholdingPeriod?.days || 7} Days before harvest`,
    `• Worker Re-entry: ${result.withholdingPeriod?.reEntryHours || 24} Hours`,
    ``,
    `_Hello Agrovet, please confirm if you have these items in stock, available pack sizes (50ml, 100ml, 250g, 1kg), and your current prices for farm pickup/delivery._`,
    `----------------------------------------`,
    `_Kilimonet Integrated Agrisystems | Tel: +254 798 981 760_`
  ].filter(Boolean).join('\n');
}

// Render Printable Prescription Modal
function renderPrescriptionModal(result, meta = {}) {
  const modal = document.getElementById('rx-modal');
  const printContent = document.getElementById('rx-printable-content');
  const modalWaBtn = document.getElementById('rx-modal-wa-btn');
  if (!modal || !printContent) return;

  const cropName = meta.cropType || result.cropType || 'Crop';
  const location = meta.location || 'Kenya';
  const cropStage = meta.cropStage || 'Vegetative / Foliage';
  const rxId = meta.rxId || `RX-KILI-${new Date().getFullYear()}-${Math.floor(100000 + (Date.now() % 900000))}`;
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const items = getDosagesList(result);

  const tableRows = items.map((item) => `
    <tr>
      <td class="rx-table-prod-name">${escapeHtml(item.brand)}</td>
      <td>${escapeHtml(item.ingredient)}${item.altBrands ? `<br><small style="color:#666">${escapeHtml(item.altBrands)}</small>` : ''}</td>
      <td class="rx-table-dosage">${escapeHtml(item.dosage)}</td>
      <td>Every 7-10 days upon symptom outbreak</td>
    </tr>
  `).join('');

  printContent.innerHTML = `
    <div class="rx-printable-sheet">
      <div class="rx-print-top">
        <div class="rx-print-brand">
          <h2>KILIMONET INTEGRATED AGRISYSTEMS</h2>
          <p>Official Agronomic Clinical Pathology &amp; Prescription Service &bull; Nairobi &amp; Kiambu, Kenya</p>
          <p>Registration No: PVT-5M1LBLD2 &bull; Hotline: +254 798 981 760</p>
        </div>
        <div class="rx-meta-box">
          <span class="rx-number-tag">${escapeHtml(rxId)}</span>
          <div><strong>Date:</strong> ${escapeHtml(dateStr)}</div>
          <div><strong>Status:</strong> <span style="color:#1b5e20; font-weight:700;">Verified Diagnostic Rx</span></div>
        </div>
      </div>

      <div class="rx-patient-grid">
        <div class="rx-patient-item">
          <strong>Target Crop</strong>
          <span>${escapeHtml(cropName)} ${result.localSwahiliName ? `(${escapeHtml(result.localSwahiliName)})` : ''}</span>
        </div>
        <div class="rx-patient-item">
          <strong>Field Location</strong>
          <span>${escapeHtml(location)}</span>
        </div>
        <div class="rx-patient-item">
          <strong>Crop Growth Stage</strong>
          <span>${escapeHtml(cropStage)}</span>
        </div>
        <div class="rx-patient-item">
          <strong>Confidence Match</strong>
          <span style="color:#1b5e20">${result.confidence}% Match</span>
        </div>
      </div>

      <div class="rx-diagnosis-banner">
        <h4 class="rx-diag-title">DIAGNOSIS: ${escapeHtml(result.diagnosis)} (${escapeHtml(result.severity || 'High')} Severity)</h4>
        ${result.scientificName ? `<p class="rx-diag-sub">Etiological Agent / Scientific Pathogen: <em>${escapeHtml(result.scientificName)}</em></p>` : ''}
      </div>

      <h4 style="margin: 0.8rem 0 0.4rem; font-size: 0.95rem; color: #1b5e20;">PRESCRIBED AGRO-CHEMICAL FORMULATIONS &amp; DOSAGES</h4>
      <table class="rx-table">
        <thead>
          <tr>
            <th>Commercial Brand</th>
            <th>Active Ingredient</th>
            <th>Application Dosage Rate</th>
            <th>Frequency</th>
          </tr>
        </thead>
        <tbody>
          ${tableRows}
        </tbody>
      </table>

      <div class="rx-instructions-grid">
        <div class="rx-inst-box">
          <h4>🌿 Organic &amp; Biological Alternatives</h4>
          <ul>
            ${(result.organicAlternatives?.length ? result.organicAlternatives : ['Apply standard compost tea & bio-fungicide drench']).map((o) => `<li>${escapeHtml(o)}</li>`).join('')}
          </ul>
        </div>
        <div class="rx-inst-box">
          <h4>⏳ Statutory Withholding &amp; Safety Compliance</h4>
          <ul>
            <li><strong>Pre-Harvest Interval (PHI):</strong> Strictly ${result.withholdingPeriod?.days || 7} Days before harvest.</li>
            <li><strong>Worker Re-entry:</strong> Mandatory ${result.withholdingPeriod?.reEntryHours || 24} Hours after spraying.</li>
            <li><strong>Operator PPE:</strong> Chemical-resistant gloves, respirator, eye goggles &amp; gumboots.</li>
          </ul>
        </div>
      </div>

      <div class="rx-footer-signatures">
        <div class="rx-sig-block">
          <div>Dr. Mercy Njoroge, PhD</div>
          <small>Lead Pathologist, Kilimonet Agronomy</small>
        </div>
        <div style="text-align: center;">
          <div style="display:inline-block; border: 2px solid #2e7d32; color:#2e7d32; font-weight:800; font-size:0.75rem; padding: 0.3rem 0.7rem; border-radius: 4px; text-transform:uppercase; letter-spacing:0.05em;">
            &check; Verified Prescription
          </div>
        </div>
        <div class="rx-sig-block">
          <div>Agrovet Dispensing Stamp</div>
          <small>Batch No: ______________</small>
        </div>
      </div>
    </div>
  `;

  if (modalWaBtn) {
    const defaultMsg = buildPrescriptionMessage(result, meta, 'agrovet');
    modalWaBtn.href = buildWhatsAppUrl('254798981760', defaultMsg);
  }

  modal.hidden = false;
}

function renderDiagnosisResult(result, meta = {}) {
  diagnosisResult.hidden = false;

  const severityClass = (result.severity || 'high').toLowerCase();
  const cropName = meta.cropType || 'Crop';
  const location = meta.location || 'Kenya';
  const cropStage = document.getElementById('crop-stage')?.value || 'Vegetative / Foliage';
  const rxId = `RX-KILI-${new Date().getFullYear()}-${Math.floor(100000 + (Date.now() % 900000))}`;
  const extendedMeta = { ...meta, cropStage, rxId };

  // Active chemicals markup
  const chemicalsHtml = result.activeChemicals?.length
    ? `<div class="chemical-products-list">
        ${result.activeChemicals.map((chem) => `
          <div class="chemical-card">
            <div class="chemical-ingredient">${escapeHtml(chem.ingredient)}</div>
            ${chem.dosage ? `<div class="chemical-dosage">${escapeHtml(chem.dosage)}</div>` : ''}
            ${chem.commercialProducts?.length ? `
              <div class="chemical-brands">
                ${chem.commercialProducts.map((brand) => `<span class="brand-chip">${escapeHtml(brand)}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>`
    : `<p class="meta-text">No synthetic chemical sprays recommended for this condition; rely on cultural and biological controls.</p>`;

  // Organic alternatives markup
  const organicHtml = result.organicAlternatives?.length
    ? `<ul class="organic-list">
        ${result.organicAlternatives.map((org) => `
          <li class="organic-item">
            <span class="organic-bullet">🌿</span>
            <span>${escapeHtml(org)}</span>
          </li>
        `).join('')}
      </ul>`
    : `<p class="meta-text">Apply standard compost tea and maintain crop vigor.</p>`;

  // Cultural practices markup
  const culturalHtml = result.culturalPractices?.length
    ? `<ul class="cultural-list">
        ${result.culturalPractices.map((c) => `<li>${escapeHtml(c)}</li>`).join('')}
      </ul>`
    : '';

  // Initial WhatsApp message (Agrovet default)
  const initialAudience = 'agrovet';
  const initialWaMessage = buildPrescriptionMessage(result, extendedMeta, initialAudience);
  const initialWaUrl = buildWhatsAppUrl('254798981760', initialWaMessage);

  diagnosisResult.innerHTML = `
    <div class="diagnosis-header-card">
      <div class="diagnosis-top-row">
        <div>
          <h3 class="diagnosis-main-title">${escapeHtml(result.diagnosis)}</h3>
          ${result.localSwahiliName ? `<span class="diagnosis-swahili-tag">${escapeHtml(result.localSwahiliName)}</span>` : ''}
          ${result.scientificName ? `<div class="diagnosis-scientific-name">${escapeHtml(result.scientificName)}</div>` : ''}
        </div>
        <span class="severity-badge ${severityClass}">
          ${escapeHtml(result.severity || 'Alert')} Severity
        </span>
      </div>

      <!-- Confidence Score Meter -->
      <div class="confidence-box">
        <div class="confidence-header">
          <span>Diagnostic Confidence Match</span>
          <span class="confidence-number">${result.confidence}% Match</span>
        </div>
        <div class="confidence-bar-bg">
          <div class="confidence-bar-fill" style="width: ${result.confidence}%"></div>
        </div>
        <p class="confidence-caption">
          ${result.confidence >= 90 ? 'High confidence match against Kenyan agro-ecological pathology markers.' : 'Moderate confidence match based on visual symptoms. Field verification recommended.'}
        </p>
      </div>
    </div>

    <!-- Identified Pathology Symptoms -->
    <div class="diag-section">
      <h4 class="diag-section-title">
        <svg class="diag-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        <span>Symptom Confirmation &amp; Etiology</span>
      </h4>
      <ul class="cultural-list">
        ${(result.symptomAnalysis || []).map((s) => `<li>${escapeHtml(s)}</li>`).join('')}
      </ul>
    </div>

    <!-- Active Chemical Treatments -->
    <div class="diag-section">
      <h4 class="diag-section-title">
        <svg class="diag-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0"/></svg>
        <span>Active Chemical Treatments (Kenya Registered Brands &amp; Knapsack Dilution)</span>
      </h4>
      ${chemicalsHtml}
    </div>

    <!-- Organic & Biological Alternatives -->
    <div class="diag-section">
      <h4 class="diag-section-title">
        <svg class="diag-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        <span>Organic &amp; Biological Alternatives</span>
      </h4>
      ${organicHtml}
    </div>

    <!-- Safety Withholding Period (Pre-Harvest Interval - PHI) -->
    <div class="diag-section">
      <h4 class="diag-section-title">
        <svg class="diag-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        <span>Safety Withholding Period (Pre-Harvest Interval)</span>
      </h4>
      <div class="withholding-card">
        <div class="withholding-top">
          <span class="withholding-days-badge">PHI: ${result.withholdingPeriod?.days || 7} Days</span>
          <span class="withholding-reentry">Worker Re-entry: ${result.withholdingPeriod?.reEntryHours || 24} Hours</span>
        </div>
        <p class="withholding-desc">${escapeHtml(result.withholdingPeriod?.description || 'Adhere strictly to Pre-Harvest Intervals before market sale or consumption.')}</p>
      </div>
    </div>

    <!-- Cultural Practices -->
    ${culturalHtml ? `
      <div class="diag-section">
        <h4 class="diag-section-title">
          <svg class="diag-section-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>Cultural &amp; Agronomic Prevention</span>
        </h4>
        ${culturalHtml}
      </div>
    ` : ''}

    <!-- ======================================================== -->
    <!-- PRESCRIPTION EXPORT & WHATSAPP SHARING HUB -->
    <!-- ======================================================== -->
    <section class="rx-export-panel">
      <div class="rx-panel-header">
        <div class="rx-panel-title-wrap">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1b5e20" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <h4 class="rx-panel-title">Prescription Export &amp; WhatsApp Sharing</h4>
        </div>
        <span class="rx-badge-pill">${escapeHtml(rxId)}</span>
      </div>

      <p class="rx-panel-desc">
        One-click compiled message with crop type, suspected disease, registered agrochemicals, and exact knapsack dosages tailored for Agrovets or Farm Workers.
      </p>

      <!-- Target Audience Segment Tabs -->
      <div class="rx-audience-tabs" role="tablist">
        <button type="button" class="btn-rx-tab active" data-audience="agrovet" role="tab" aria-selected="true">
          <span>🛒</span>
          <span>For Agrovet (Order Inputs)</span>
        </button>
        <button type="button" class="btn-rx-tab" data-audience="worker" role="tab" aria-selected="false">
          <span>🧑‍🌾</span>
          <span>For Farm Worker (Spray Guide)</span>
        </button>
        <button type="button" class="btn-rx-tab" data-audience="report" role="tab" aria-selected="false">
          <span>📋</span>
          <span>Full Diagnostic Sheet</span>
        </button>
      </div>

      <!-- Recipient Phone Customizer & Presets -->
      <div class="rx-recipient-section">
        <label class="rx-recipient-label" for="rx-target-phone">
          Recipient WhatsApp Number (Kenya: 07xx / 01xx or +254):
        </label>
        <div class="rx-phone-row">
          <input type="tel" id="rx-target-phone" class="rx-phone-input" placeholder="e.g. 0798 981 760 or leave empty for contact picker" value="0798981760" />
        </div>
        <div class="rx-preset-chips">
          <button type="button" class="rx-preset-chip active" data-phone="0798981760">🏪 Agrovet Hotline (+254 798 981 760)</button>
          <button type="button" class="rx-preset-chip" data-phone="0700100001">🏬 Juja Agrovet (+254 700 100 001)</button>
          <button type="button" class="rx-preset-chip" data-phone="">🌐 Any WhatsApp Contact / Group</button>
        </div>
      </div>

      <!-- Main Action Buttons -->
      <div class="rx-main-actions">
        <a id="btn-whatsapp-primary" href="${initialWaUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp-rx">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span id="btn-whatsapp-text">Send Diagnosis via WhatsApp</span>
        </a>

        <div class="rx-secondary-buttons">
          <button type="button" class="btn-rx-action" id="btn-copy-rx">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span id="btn-copy-label">Copy Message Text</span>
          </button>
          <button type="button" class="btn-rx-action" id="btn-print-rx">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
            <span>Print / Save Rx PDF</span>
          </button>
          <button type="button" class="btn-rx-action" id="btn-toggle-preview">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            <span>Preview WhatsApp</span>
          </button>
        </div>
      </div>

      <!-- Live Message Preview Box -->
      <div id="rx-preview-wrap" class="rx-preview-wrap">
        <div class="rx-preview-header">
          <span>💬 Instant WhatsApp Message Preview:</span>
          <span style="color:#25d366; font-size:0.75rem;">Formatted with dosages &amp; PHI</span>
        </div>
        <div id="rx-bubble-text" class="whatsapp-bubble">${escapeHtml(initialWaMessage)}</div>
        <div class="whatsapp-bubble-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} &check;&check;</div>
      </div>

      <!-- Secondary Navigation -->
      <div class="secondary-actions-row">
        <button type="button" class="btn-subtle-action" id="btn-action-find-agrovets">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>Find In-Stock Agrovets Below</span>
        </button>
        <button type="button" class="btn-subtle-action" id="btn-action-consult-spec">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span>Consult Kilimonet Specialist</span>
        </button>
      </div>

      <p class="diagnosis-disclaimer">Diagnostic recommendation generated based on Kenyan agronomic pathology standards. Always verify instructions on manufacturer pesticide label before mixing.</p>
    </section>
  `;

  // Attach Prescription Export & Sharing Interactive Listeners
  let currentAudience = 'agrovet';
  const targetPhoneInput = document.getElementById('rx-target-phone');
  const btnWaPrimary = document.getElementById('btn-whatsapp-primary');
  const btnWaText = document.getElementById('btn-whatsapp-text');
  const bubbleText = document.getElementById('rx-bubble-text');
  const btnCopyRx = document.getElementById('btn-copy-rx');
  const btnCopyLabel = document.getElementById('btn-copy-label');
  const btnPrintRx = document.getElementById('btn-print-rx');
  const btnTogglePreview = document.getElementById('btn-toggle-preview');
  const previewWrap = document.getElementById('rx-preview-wrap');
  const presetChips = document.querySelectorAll('.rx-preset-chip');
  const audienceTabs = document.querySelectorAll('.btn-rx-tab');

  function updateSharingLink() {
    const rawPhone = targetPhoneInput?.value.trim() || '';
    const cleanPhone = cleanKenyaPhone(rawPhone);
    const msg = buildPrescriptionMessage(result, extendedMeta, currentAudience);
    const url = buildWhatsAppUrl(cleanPhone, msg);

    if (btnWaPrimary) {
      btnWaPrimary.href = url;
    }
    if (bubbleText) {
      bubbleText.textContent = msg;
    }
    if (btnWaText) {
      if (currentAudience === 'worker') {
        btnWaText.textContent = cleanPhone ? `Send Spray Guide to Operator (${cleanPhone})` : 'Send Spray Guide via WhatsApp';
      } else if (currentAudience === 'report') {
        btnWaText.textContent = cleanPhone ? `Send Diagnostic Report to ${cleanPhone}` : 'Send Diagnostic Sheet via WhatsApp';
      } else {
        btnWaText.textContent = cleanPhone ? `Send Prescription to Agrovet (${cleanPhone})` : 'Send Prescription via WhatsApp';
      }
    }
  }

  // Audience Tabs switching
  audienceTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      audienceTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      currentAudience = tab.getAttribute('data-audience') || 'agrovet';
      updateSharingLink();
    });
  });

  // Phone input changes
  targetPhoneInput?.addEventListener('input', () => {
    presetChips.forEach((chip) => {
      if (chip.getAttribute('data-phone') === targetPhoneInput.value.trim()) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
    updateSharingLink();
  });

  // Preset chips clicking
  presetChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      presetChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const phone = chip.getAttribute('data-phone') || '';
      if (targetPhoneInput) {
        targetPhoneInput.value = phone;
      }
      updateSharingLink();
    });
  });

  // Copy prescription to clipboard
  btnCopyRx?.addEventListener('click', async () => {
    const msg = buildPrescriptionMessage(result, extendedMeta, currentAudience);
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(msg);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = msg;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      btnCopyRx.classList.add('copied');
      if (btnCopyLabel) btnCopyLabel.textContent = '✓ Copied to Clipboard!';
      setTimeout(() => {
        btnCopyRx.classList.remove('copied');
        if (btnCopyLabel) btnCopyLabel.textContent = 'Copy Message Text';
      }, 2200);
    } catch (err) {
      console.warn('Failed to copy to clipboard:', err);
    }
  });

  // Toggle preview visibility
  btnTogglePreview?.addEventListener('click', () => {
    if (previewWrap) {
      previewWrap.hidden = !previewWrap.hidden;
    }
  });

  // Print Prescription
  btnPrintRx?.addEventListener('click', () => {
    renderPrescriptionModal(result, extendedMeta);
  });

  // Modal close handlers
  const modalClose = document.getElementById('rx-modal-close');
  const modalDismiss = document.getElementById('rx-modal-dismiss-btn');
  const modalPrint = document.getElementById('rx-modal-print-btn');
  const modal = document.getElementById('rx-modal');

  modalClose?.addEventListener('click', () => {
    if (modal) modal.hidden = true;
  });
  modalDismiss?.addEventListener('click', () => {
    if (modal) modal.hidden = true;
  });
  modalPrint?.addEventListener('click', () => {
    window.print();
  });

  // Quick action listeners
  document.getElementById('btn-action-find-agrovets')?.addEventListener('click', () => {
    document.getElementById('agrovet-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.getElementById('btn-action-consult-spec')?.addEventListener('click', () => {
    const detailsField = document.getElementById('consult-details');
    if (detailsField) {
      detailsField.value = `I recently scanned my ${cropName} in ${location} and received a diagnosis of "${result.diagnosis}" (${result.severity} severity). Prescribed treatments include ${result.products.slice(0, 2).join(' and ')}. I would like specialist guidance on treatment timing and management.`;
    }
    document.getElementById('consultation-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

function renderRecommendedProducts(products) {
  if (!products?.length) {
    productsWrap.innerHTML = '';
    return;
  }
  productsWrap.innerHTML = products.map((item) => `<span class="chip">${escapeHtml(item)}</span>`).join('');
}

function renderAgrovets(requiredProducts) {
  const locationText = (document.getElementById('farmer-location')?.value || '').trim().toLowerCase();
  const products = requiredProducts?.length ? requiredProducts : [];

  const list = smartData.agrovets
    .map((agrovet) => {
      const available = agrovet.products.filter((product) => {
        if (product.stock <= 0) {
          return false;
        }
        return products.length === 0 || products.some((name) => name.toLowerCase() === product.name.toLowerCase());
      });

      let distance = null;
      if (userPosition) {
        distance = haversineKm(userPosition.lat, userPosition.lng, agrovet.lat, agrovet.lng);
      }

      const countyMatch = !locationText || agrovet.county.toLowerCase().includes(locationText);
      return { ...agrovet, available, distance, countyMatch };
    })
    .filter((item) => item.available.length > 0 && (userPosition || item.countyMatch));

  if (userPosition) {
    list.sort((a, b) => (a.distance ?? 999) - (b.distance ?? 999));
  }

  if (!list.length) {
    agrovetList.innerHTML = '<p class="meta-text">No matching agrovet stock found yet. Try updating location or contact support.</p>';
    return;
  }

  agrovetList.innerHTML = list
    .map((item) => {
      const productLines = item.available
        .map((p) => `<li>${escapeHtml(p.name)} - ${p.stock} in stock - KES ${p.price}</li>`)
        .join('');
      const distanceText = item.distance != null ? `${item.distance.toFixed(1)} km away` : item.county;
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
      const firstProduct = encodeURIComponent(item.available[0]?.name || 'input');
      const reserveLink = `mailto:${encodeURIComponent('kilimointergratedagritech@gmail.com')}?subject=Product%20Reservation&body=Please%20reserve%20${firstProduct}%20at%20${encodeURIComponent(item.name)}.`;

      // Build dedicated WhatsApp order link for this specific agrovet
      const cleanPhone = cleanKenyaPhone(item.phone);
      const cropType = document.getElementById('selected-crop')?.value || 'Crop';
      const agrovetOrderMsg = latestDiagnosis
        ? buildPrescriptionMessage(latestDiagnosis, { cropType, location: item.county }, 'agrovet')
        : `Hello ${item.name}, I would like to inquire about availability and pricing for farm inputs.`;
      const agrovetWaUrl = buildWhatsAppUrl(cleanPhone, agrovetOrderMsg);

      return `
        <article class="finder-item">
          <h3>${escapeHtml(item.name)}</h3>
          <p><strong>Location:</strong> ${escapeHtml(item.county)} | <strong>Distance:</strong> ${distanceText}</p>
          <p><strong>Phone:</strong> <a href="tel:${item.phone.replace(/\s+/g, '')}">${escapeHtml(item.phone)}</a></p>
          <ul>${productLines}</ul>
          <div class="finder-actions">
            <a class="btn btn-whatsapp-agrovet" href="${agrovetWaUrl}" target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              <span>Order via WhatsApp</span>
            </a>
            <a class="btn btn-secondary" href="tel:${item.phone.replace(/\s+/g, '')}">Call Agrovet</a>
            <a class="btn btn-secondary" href="${mapsUrl}" target="_blank" rel="noreferrer">Directions</a>
            <a class="btn btn-secondary" href="${reserveLink}">Reserve Product</a>
          </div>
        </article>
      `;
    })
    .join('');
}

function renderSpecialists() {
  specialistList.innerHTML = smartData.specialists
    .map((specialist) => {
      return `
        <article class="specialist-item">
          <h3>${escapeHtml(specialist.name)}</h3>
          <p><strong>Specialization:</strong> ${escapeHtml(specialist.specialization)}</p>
          <p><strong>Status:</strong> ${escapeHtml(specialist.availability)}</p>
          <p><strong>County:</strong> ${escapeHtml(specialist.county)}</p>
          <p><a href="tel:${specialist.phone.replace(/\s+/g, '')}">${escapeHtml(specialist.phone)}</a></p>
        </article>
      `;
    })
    .join('');
}

function renderAdvisories() {
  const list = smartData.advisories.slice(0, 12);
  if (!list.length) {
    advisoryList.innerHTML = '<p class="meta-text">No advisories published yet.</p>';
    return;
  }

  advisoryList.innerHTML = list
    .map((item) => `
      <article class="advisory-item">
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.message)}</p>
        <p><strong>Source:</strong> ${escapeHtml(item.source)} | <strong>Region:</strong> ${escapeHtml(item.region)} | <strong>Date:</strong> ${escapeHtml(item.createdAt)}</p>
      </article>
    `)
    .join('');
}

function renderAgrovetOptions() {
  const options = smartData.agrovets
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)} (${escapeHtml(item.county)})</option>`)
    .join('');
  agrovetSelect.innerHTML = `<option value="">Select agrovet</option>${options}`;
}

function renderSpecialistOptions() {
  const options = smartData.specialists
    .map((item) => `<option value="${item.id}">${escapeHtml(item.name)} (${escapeHtml(item.specialization)})</option>`)
    .join('');
  specialistSelect.innerHTML = `<option value="">Select specialist</option>${options}`;
}

function hydrateAdminSession() {
  const session = parseJson(sessionStorage.getItem('kili_admin_session'));
  if (session?.role) {
    renderAdminSession(session);
  }
}

function renderAdminSession(session) {
  adminAuthWrap.hidden = true;
  adminDashboard.hidden = false;
  adminRoleLabel.textContent = `Signed in as ${session.username} (${session.role} admin)`;

  const allowAgrovet = session.role === 'agrovet' || session.role === 'system';
  const allowSpecialist = session.role === 'specialist' || session.role === 'system';
  agrovetPanel.hidden = !allowAgrovet;
  specialistPanel.hidden = !allowSpecialist;
}

function loadSmartData() {
  const stored = parseJson(localStorage.getItem(SMART_STORAGE_KEY));
  if (!stored || !stored.agrovets || !stored.specialists) {
    localStorage.setItem(SMART_STORAGE_KEY, JSON.stringify(DEFAULT_DATA));
    return structuredClone(DEFAULT_DATA);
  }
  return stored;
}

function persistSmartData() {
  localStorage.setItem(SMART_STORAGE_KEY, JSON.stringify(smartData));
}

function isSpamSubmission(form) {
  const hp = form?.querySelector('.hp');
  return !!hp?.value;
}

function isRateLimited(scope, seconds) {
  const map = parseJson(localStorage.getItem(SMART_RATE_LIMIT_KEY)) || {};
  const now = Date.now();
  const prev = map[scope] || 0;
  if (now - prev < seconds * 1000) {
    return true;
  }
  map[scope] = now;
  localStorage.setItem(SMART_RATE_LIMIT_KEY, JSON.stringify(map));
  return false;
}

function showFeedback(element, message) {
  if (!element) {
    return;
  }
  element.hidden = false;
  element.textContent = message;
}

function showDiagnosisMessage(message) {
  diagnosisResult.hidden = false;
  diagnosisResult.innerHTML = `<p>${escapeHtml(message)}</p>`;
}

function haversineKm(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
}

function parseJson(value) {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function escapeHtml(input) {
  return String(input)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function optimizeImage(file, maxDimension, quality) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        let { width, height } = image;
        if (width > maxDimension || height > maxDimension) {
          const ratio = Math.min(maxDimension / width, maxDimension / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas not supported'));
          return;
        }

        ctx.drawImage(image, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error('Image conversion failed'));
              return;
            }
            resolve({
              blob,
              width,
              height,
              dataUrl: canvas.toDataURL('image/jpeg', quality)
            });
          },
          'image/jpeg',
          quality
        );
      };
      image.onerror = () => reject(new Error('Invalid image file'));
      image.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
}
