import { Trek, Story, FAQItem } from '../types';

export const getAssetUrl = (path: string) => {
  const base = import.meta.env.BASE_URL || './';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanBase = base.endsWith('/') ? base : `${base}/`;
  return `${cleanBase}${cleanPath}`;
};

export const TREKS: Trek[] = [
  {
    id: 'kedarkantha',
    name: 'Kedarkantha Summit',
    region: 'Uttarakhand · Govind Pashu National Park',
    days: 6,
    maxAltitude: '12,500 ft',
    difficulty: 'Easy',
    price: 9500,
    image: getAssetUrl('images/kedarkantha.jpg'),
    alt: 'Pine forest ridges leading toward snowy Kedarkantha peak',
    tagline: 'Your first high Himalayan winter summit without suffering through technical ice walls.',
    description: 'A classic ridge climb starting from the alpine village of Sankri. You walk through dense oak and pine woods, pitch camp beside the frozen Juda Ka Talab, and push for the peak at 4 AM to watch dawn wash over Bandarpoonch and Black Peak.',
    highlights: [
      '360-degree panorama of 13 major Garhwal peaks from the summit cairn',
      'Camp beneath clearing pine canopies at Juda Ka Talab (9,100 ft)',
      'Manageable 4 to 5 hour daily trail days suited for fit first-timers',
      'Full crampon and microspike gear check on day 3'
    ],
    bestSeason: 'December to April (Winter snow) · May to June (Spring green)'
  },
  {
    id: 'hampta-pass',
    name: 'Hampta Pass Crossing',
    region: 'Himachal Pradesh · Kullu to Spiti',
    days: 5,
    maxAltitude: '14,100 ft',
    difficulty: 'Moderate',
    price: 11200,
    image: getAssetUrl('images/hampta.jpg'),
    alt: 'Granite ridges and glacial river valley on Hampta Pass crossing',
    tagline: 'Green alpine meadows on day two; stark Martian desert in Spiti on day four.',
    description: 'A dramatic pass crossing linking the lush valleys of Manali with the stark moonscape of Chandra Valley in Spiti. You ford glacial streams, climb steep moraine fields, and cross the pass before descending to camp beside turquoise Chandratal lake.',
    highlights: [
      'Stark landscape shift: pine glades in Kullu to arid desert in Lahaul',
      'Exhilarating river crossings on day 2 and day 3 under safety ropes',
      'Camp at Shea Goru under sheer granite faces',
      'Post-pass sunset expedition to Chandratal (Moon Lake)'
    ],
    bestSeason: 'Mid-June to October'
  },
  {
    id: 'valley-of-flowers',
    name: 'Valley of Flowers & Hemkund',
    region: 'Uttarakhand · Chamoli District',
    days: 6,
    maxAltitude: '14,400 ft',
    difficulty: 'Moderate',
    price: 10800,
    image: getAssetUrl('images/valley.jpg'),
    alt: 'Misty glacial valley with blooming wildflowers and rugged peaks',
    tagline: '520 wild floral species blooming in a glacial trough once mapped by Frank Smythe.',
    description: 'A UNESCO World Heritage valley carpeted in blue poppies, brahma kamal, and Himalayan bellflowers. Base out of Ghangaria to explore the floral valley floor, then climb the stone stairs to the glacial lake of Hemkund Sahib at 14,400 ft.',
    highlights: [
      'Walk alongside Pushpawati river in the core UNESCO reserve',
      'Climb to the high-altitude glacial lake at Hemkund Sahib (14,400 ft)',
      'Lodging in Ghangaria guest houses instead of alpine tents',
      'Led by botanist-trained local guides from Govindghat'
    ],
    bestSeason: 'July to September (Peak bloom)'
  },
  {
    id: 'brahmatal',
    name: 'Brahmatal Ridge Trek',
    region: 'Uttarakhand · Chamoli District',
    days: 6,
    maxAltitude: '12,250 ft',
    difficulty: 'Moderate',
    price: 9800,
    image: getAssetUrl('images/brahmatal.jpg'),
    alt: 'Tents pitched on snow under a clear starry Himalayan ridge',
    tagline: 'Look right into the sheer 7,000-metre south face of Mount Trishul.',
    description: 'While Kedarkantha gets crowded in peak December, Brahmatal offers silent snow ridges and unmatched front-row views of Mount Trishul and Nanda Ghunti. Walk across frozen alpine tarns and camp on wind-sculpted white ridges.',
    highlights: [
      'Unobstructed views of Mount Trishul (7,120 m) and Nanda Ghunti',
      'Camp at Bekaltal beside a frozen oak forest lake',
      'Wide open ridge walk with zero tree cover on summit day',
      'Fewer batches, quiet campsites, true isolation'
    ],
    bestSeason: 'December to March'
  },
  {
    id: 'goechala',
    name: 'Goechala Pass Expedition',
    region: 'Sikkim · Kanchenjunga Biosphere',
    days: 11,
    maxAltitude: '15,100 ft',
    difficulty: 'Hard',
    price: 21500,
    image: getAssetUrl('images/goechala.jpg'),
    alt: 'Icy peaks of the Kanchenjunga range with prayer flags in foreground',
    tagline: 'Stand close enough to touch the third highest mountain on Earth.',
    description: 'Our most demanding trek. From the rhododendron forests of Yuksom, you ascend deep into the Sikkim Himalaya. The final midnight push to Viewpoint 1 rewards you with first light hitting Kanchenjunga (8,586 m) and Pandim.',
    highlights: [
      'Direct view of Kanchenjungas massive southeast face',
      'Walk through ancient moss forests and flowering rhododendron groves',
      'High-altitude camp at Dzongri and Thansing',
      'Strict 1:4 guide-to-trekker ratio for maximum safety'
    ],
    bestSeason: 'April to May · October to November'
  }
];

export const STORIES: Story[] = [
  {
    id: '1',
    name: 'Tanya Sengupta',
    credential: 'IIT Delhi, 23 · First high-altitude trek',
    trek: 'Kedarkantha Peak (Winter)',
    quote: 'I was terrified about fitness and altitude sickness. Altitude kept the group to just eight of us. Our guide, Deepak, checked our blood oxygen twice a day, forced us to drink garlic soup, and paced the summit push so calmly that everyone reached the top without anyone vomiting or falling behind.',
    year: 'Batch of Jan 2026'
  },
  {
    id: '2',
    name: 'Rohan Mehra',
    credential: 'Software Engineer, Bangalore · Solo traveller',
    trek: 'Hampta Pass Crossing',
    quote: 'Commercial operators herd 40 people per batch like a package tour. Here, eight of us crossed the pass together, cooked by the river at Shea Goru, and talked about real things around the stove. It felt like walking with friends who just happen to know mountain rescue.',
    year: 'Batch of Aug 2025'
  },
  {
    id: '3',
    name: 'Meera Kulkarni',
    credential: 'St. Xavier’s Mumbai, 21 · College group of 4',
    trek: 'Valley of Flowers',
    quote: 'No hidden rental fees at base camp, no surprise charges for permits or gear. What they quoted on the website was exactly what we paid down to the rupee. Clean high-altitude sleeping bags that actually kept us warm at minus four.',
    year: 'Batch of Sep 2025'
  },
  {
    id: '4',
    name: 'Kabir Varma',
    credential: 'Product Designer, Pune · Solo traveller',
    trek: 'Brahmatal Ridge',
    quote: 'Waking up on the ridge at 5 AM with tea in hand and Trishul glowing pink right in front of us. No loud speakers, no generator noise, just crisp silence and snow. The best seven days of my entire year.',
    year: 'Batch of Feb 2026'
  }
];

export const GALLERY_PHOTOS = [
  {
    url: getAssetUrl('images/gallery-1.jpg'),
    alt: 'Trekkers from behind navigating a ridge trail toward a snow-capped Himalayan summit',
    caption: 'Final ridge ascent, Kedarkantha (12,500 ft)',
    span: 'col-span-1 md:col-span-1'
  },
  {
    url: getAssetUrl('images/gallery-2.jpg'),
    alt: 'Illuminated tents at night on a snow ridge under the Milky Way and mountain shadows',
    caption: 'Campsite under the stars, Bekaltal',
    span: 'col-span-1 md:col-span-2'
  },
  {
    url: getAssetUrl('images/gallery-3.jpg'),
    alt: 'Buddhist prayer flags fluttering against jagged Himalayan granite walls',
    caption: 'Prayer flags at 14,000 ft, Hampta ridge',
    span: 'col-span-1 md:col-span-2'
  },
  {
    url: getAssetUrl('images/gallery-4.jpg'),
    alt: 'Himalayan peaks towering over a winding gravel trail with small group of hikers',
    caption: 'Crossing into Spiti Valley through Hampta Pass',
    span: 'col-span-1 md:col-span-1'
  },
  {
    url: getAssetUrl('images/gallery-5.jpg'),
    alt: 'Glacial valley mist settling over vibrant Himalayan flora',
    caption: 'Morning mist over Pushpawati river valley',
    span: 'col-span-1 md:col-span-1'
  },
  {
    url: getAssetUrl('images/gallery-6.jpg'),
    alt: 'Trekker standing quietly on a high pass observing distant Himalayan mountain ranges',
    caption: 'Summit silence at Goechala Viewpoint 1',
    span: 'col-span-1 md:col-span-2'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'fitness',
    question: 'How fit do I actually need to be for my first trek?',
    answer: 'You do not need marathon fitness. If you can jog 5 kilometres in 35 minutes or walk briskly up 4 flights of stairs without gasping for breath, you are ready for Kedarkantha, Brahmatal, or Valley of Flowers. When you register, we give you a simple 4-week bodyweight and cardio routine that fits around university or office hours.'
  },
  {
    id: 'pack',
    question: 'What do I need to pack versus what Altitude provides?',
    answer: 'We provide heavy expedition gear: four-season waterproof tents, sub-zero sleeping bags (-10°C rated), microspikes, gaiters, safety harnesses, and all camp cookware. You only bring your personal layers: one good pair of broken-in trekking boots, a fleece jacket, a down jacket, thermal inner wear, and a 50–60L backpack. We also offer rental gear at base camp for items you do not own.'
  },
  {
    id: 'safety',
    question: 'What happens in a medical or weather emergency?',
    answer: 'Every trek leader is certified by the Nehru Institute of Mountaineering (NIM) or the Himalayan Mountaineering Institute (HMI) with Wilderness First Aid (WFA). Every batch carries pulse oximeters, blood pressure monitors, high-altitude medical kits, and portable oxygen cylinders. If Acute Mountain Sickness (AMS) symptoms persist, the protocol is immediate descent with a dedicated porter. Every participant is covered under comprehensive mountain rescue insurance.'
  },
  {
    id: 'refunds',
    question: 'What is your refund and cancellation policy?',
    answer: 'Things happen — exams get rescheduled, leave gets rejected. If you cancel up to 15 days before the trek start date, you receive a 100% voucher credit valid for 18 months, or an 85% cash refund. If government authorities close a pass due to extreme weather, we divert to a safe alternative trail or issue a full trek voucher.'
  },
  {
    id: 'solo',
    question: 'Can I join as a solo traveller?',
    answer: 'About 60% of our trekkers join solo. Because batches are small (6 to 10 people max), everyone connects quickly around the dinner tent on the very first night. You will share a spacious tent with another trekker of the same gender, or you can opt for a solo tent add-on if you prefer personal space.'
  },
  {
    id: 'seasons',
    question: 'Which season is best for which trek?',
    answer: 'Winter (December to March) is magical for snow treks like Kedarkantha and Brahmatal. Summer (May to June) brings green meadows, clear river streams, and mild temperatures. Monsoon (July to August) is the only window to see the Valley of Flowers in full bloom and Hampta Pass with blooming meadows. Autumn (October to November) gives the clearest blue skies and sharpest mountain peaks.'
  }
];
