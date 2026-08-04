import { imagesForFolder, withPrimary } from "@/lib/productImages";

export interface NutritionFacts {
  servingSize: string;
  calories: number;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  totalCarb: string;
  dietaryFiber: string;
  totalSugars: string;
  protein: string;
  vitaminC?: string;
  calcium?: string;
  iron?: string;
  vitaminA?: string;
  magnesium?: string;
}

export interface Review {
  name: string;
  location: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  avatar: string;
}

export interface PrepStep {
  icon: string;
  label: string;
  detail: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  longDescription: string;
  benefits: string[];
  usage: string;
  images: string[];
  badge?: string;
  category: string;
  weight?: string;
  nutritionFacts?: NutritionFacts;
  prepSteps?: PrepStep[];
  reviews?: Review[];
}

const teaPrepSteps: PrepStep[] = [
  { icon: "📏", label: "Measure", detail: "1 tsp per 8 oz cup" },
  { icon: "🌡️", label: "Heat Water", detail: "Bring water to 195–205°F" },
  { icon: "⏱️", label: "Steep", detail: "5–10 minutes covered" },
  { icon: "🫙", label: "Strain", detail: "Pour through fine strainer" },
  { icon: "☕", label: "Enjoy", detail: "Sweeten with honey if desired" },
];

const seedPrepSteps: PrepStep[] = [
  { icon: "📏", label: "Measure", detail: "3 kernels per serving" },
  { icon: "🥣", label: "Add to Yogurt", detail: "Stir into yogurt or oatmeal" },
  { icon: "🥤", label: "Or Blend", detail: "Add to your morning smoothie" },
  { icon: "🥗", label: "Or Sprinkle", detail: "Toss onto salads or soups" },
  { icon: "✅", label: "Daily Routine", detail: "Enjoy as part of daily wellness" },
];

const shilajitPrepSteps: PrepStep[] = [
  { icon: "🥄", label: "Measure", detail: "Pea-sized portion (250–500mg)" },
  { icon: "🌡️", label: "Warm Liquid", detail: "Use warm water or milk" },
  { icon: "🌀", label: "Dissolve", detail: "Stir until fully dissolved" },
  { icon: "☕", label: "Drink", detail: "Consume within 5 minutes" },
  { icon: "🌅", label: "Best Time", detail: "Morning for all-day energy" },
];

export const products: Product[] = [
  {
    id: "dried-calendula-flowers",
    name: "Organic Dried Calendula Flowers",
    price: 19.99,
    description: "Sun-kissed calendula blooms harvested at peak potency, rich in antioxidants and skin-soothing compounds.",
    longDescription:
      "Experience the natural goodness of our Organic Dried Calendula Flowers. Sourced from pristine organic farms, these vibrant golden blooms are carefully harvested at peak potency to preserve their essential nutrients including vitamins A and C. Known for their remarkable skin-soothing and anti-inflammatory properties, calendula flowers have been treasured for centuries in traditional herbalism. Enjoy as a soothing herbal tea, add to skincare preparations, or use as a beautiful culinary garnish.",
    benefits: [
      "Boosts immunity naturally",
      "Supports healthy, radiant skin",
      "Helps reduce inflammation",
      "Relieves stress and anxiety",
      "Rich in antioxidants & Vitamin A",
    ],
    usage: "Steep 1 tsp in 8 oz of hot water for 5-7 minutes. Can also be used in skincare preparations and as a culinary garnish.",
    images: imagesForFolder("Calendulaflowers"),
    badge: "Best Seller",
    category: "Flowers",
    weight: "4 oz",
    prepSteps: teaPrepSteps,
    nutritionFacts: {
      servingSize: "1 tsp (2g)",
      calories: 5,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "1g",
      dietaryFiber: "0g",
      totalSugars: "0g",
      protein: "0g",
      vitaminA: "2%",
      vitaminC: "4%",
      calcium: "1%",
      iron: "1%",
    },
    reviews: [
      {
        name: "Sandra M.",
        location: "Austin, TX",
        rating: 5,
        title: "Absolutely beautiful quality!",
        body: "These calendula flowers are stunning — so vibrant and fragrant. I use them for tea and in my DIY face oil. The quality is far superior to what I was buying at the local health store.",
        date: "March 2025",
        avatar: "S",
      },
      {
        name: "Priya K.",
        location: "Seattle, WA",
        rating: 5,
        title: "My skin has never looked better",
        body: "I've been brewing calendula tea daily for 6 weeks and my skin has genuinely improved. Less redness, more glow. Silk Savings is my go-to now.",
        date: "February 2025",
        avatar: "P",
      },
      {
        name: "Rachel T.",
        location: "Denver, CO",
        rating: 4,
        title: "Great for relaxing tea rituals",
        body: "Lovely floral aroma and such a calming cup of tea. I love the resealable bag — keeps everything fresh. Will definitely reorder.",
        date: "January 2025",
        avatar: "R",
      },
    ],
  },
  {
    id: "bitter-apricot-seeds-8oz",
    name: "Organic Bitter Apricot Seeds (8 oz)",
    price: 19.99,
    description: "Raw, unprocessed bitter apricot kernels — sustainably sourced, 100% pure organic, USDA certified.",
    longDescription:
      "Our Organic Bitter Apricot Seeds (8 oz) are carefully sourced and minimally processed to preserve all their natural goodness. These raw, unprocessed kernels have been used in traditional wellness practices across many cultures. Sustainably sourced, premium quality kernels for a healthy and natural lifestyle. Rich in healthy fats and protein, they make a distinctive addition to your daily wellness routine. Enjoy 3 kernels daily — add to yogurt, smoothies, salads, or soups.",
    benefits: [
      "100% natural and organic",
      "Raw and unprocessed kernels",
      "USDA Organic, Non-GMO certified",
      "No preservatives or additives",
      "Traditional wellness support",
    ],
    usage: "Enjoy 3 kernels daily. Add to yogurt, blend into smoothies, sprinkle on salads, or stir into soups.",
    images: imagesForFolder("8oz apricot"),
    badge: "Popular",
    category: "Seeds & Kernels",
    weight: "8 oz",
    prepSteps: seedPrepSteps,
    nutritionFacts: {
      servingSize: "3 kernels (1g)",
      calories: 5,
      totalFat: "0.5g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "0g",
      dietaryFiber: "0g",
      totalSugars: "0g",
      protein: "0.1g",
      calcium: "0%",
      iron: "0%",
    },
    reviews: [
      {
        name: "James L.",
        location: "Phoenix, AZ",
        rating: 5,
        title: "Pure, fresh, and exactly as described",
        body: "I've ordered from several companies and Silk Savings has the freshest, most consistent kernels. Great value for the quality. Fast shipping too.",
        date: "April 2025",
        avatar: "J",
      },
      {
        name: "Maria G.",
        location: "Miami, FL",
        rating: 5,
        title: "Very happy with this purchase",
        body: "I add 3 seeds to my morning yogurt every day. The packaging is excellent and the seeds smell fresh. Will be a repeat customer.",
        date: "March 2025",
        avatar: "M",
      },
    ],
  },
  {
    id: "bitter-apricot-seeds-1lb",
    name: "Organic Bitter Apricot Seeds (1 lb)",
    price: 29.99,
    description: "Value-size 1 lb bag of raw, unprocessed bitter apricot kernels — 100% pure organic, USDA certified.",
    longDescription:
      "Our 1 lb value-size bag of Organic Bitter Apricot Seeds is perfect for those who use bitter apricot kernels regularly as part of their wellness routine. Carefully sourced and minimally processed to preserve all their natural goodness, these raw, unprocessed kernels have been used in traditional wellness practices across many cultures. Sustainably sourced, premium quality kernels — USDA Organic, 100% Organic, and Non-GMO certified.",
    benefits: [
      "Best value — 1 lb bulk supply",
      "100% natural and organic",
      "Raw and unprocessed kernels",
      "USDA Organic, Non-GMO certified",
      "No preservatives or additives",
    ],
    usage: "Enjoy 3 kernels daily. Add to yogurt, blend into smoothies, sprinkle on salads, or stir into soups.",
    images: withPrimary(imagesForFolder("1Lb apricot"), "IMG_0574"),
    badge: "Best Value",
    category: "Seeds & Kernels",
    weight: "1 lb",
    prepSteps: seedPrepSteps,
    nutritionFacts: {
      servingSize: "3 kernels (1g)",
      calories: 5,
      totalFat: "0.5g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "0g",
      dietaryFiber: "0g",
      totalSugars: "0g",
      protein: "0.1g",
      calcium: "0%",
      iron: "0%",
    },
    reviews: [
      {
        name: "Robert D.",
        location: "Chicago, IL",
        rating: 5,
        title: "Best value bulk buy",
        body: "The 1 lb bag is the way to go. Excellent quality, great price, and the resealable bag keeps them fresh for months.",
        date: "April 2025",
        avatar: "R",
      },
    ],
  },
  {
    id: "dried-rose-petals",
    name: "Dried Rose Petals",
    price: 14.99,
    description: "Delicate, aromatic rose petals packed with natural antioxidants and Vitamin C for beauty and wellness.",
    longDescription:
      "Our Dried Rose Petals are carefully sourced and gently dried to preserve their natural color, aroma, and nutritional profile. Packed with natural antioxidants like flavonoids and Vitamin C, these petals are a delightful way to support your overall well-being. Their delicate aroma and soothing properties make them a perfect addition to your favorite teas, baths, and skincare routines. Enjoy as a naturally sweet, guilt-free herbal experience.",
    benefits: [
      "Rich in antioxidants & Vitamin C",
      "Supports skin health and radiance",
      "Helps reduce inflammation",
      "Calming for stress and anxiety",
      "Naturally sweet floral flavor",
    ],
    usage: "Steep 1 tsp in 8 oz of hot water for 3-5 minutes for a beautiful floral tea. Add to bathwater for a spa-like soak, or use in skincare routines.",
    images: imagesForFolder("Rosepetals", "Dried rose perals"),
    badge: "Fan Favorite",
    category: "Flowers",
    weight: "1 oz",
    prepSteps: [
      { icon: "📏", label: "Measure", detail: "1 tsp of rose petals" },
      { icon: "🌡️", label: "Heat Water", detail: "Bring to 195°F (just below boiling)" },
      { icon: "⏱️", label: "Steep", detail: "3–5 minutes for light floral notes" },
      { icon: "🫙", label: "Strain", detail: "Pour through a fine mesh strainer" },
      { icon: "🌸", label: "Enjoy", detail: "Add honey or lemon for extra flavor" },
    ],
    nutritionFacts: {
      servingSize: "1 tsp (1g)",
      calories: 3,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "1g",
      dietaryFiber: "0g",
      totalSugars: "0g",
      protein: "0g",
      vitaminC: "5%",
      calcium: "1%",
      iron: "1%",
    },
    reviews: [
      {
        name: "Emily W.",
        location: "Portland, OR",
        rating: 5,
        title: "Like drinking a flower garden",
        body: "The aroma when I open the bag is absolutely divine. The tea is delicate, soothing, and pairs beautifully with a little raw honey. My favorite evening ritual now.",
        date: "March 2025",
        avatar: "E",
      },
      {
        name: "Natalie B.",
        location: "Nashville, TN",
        rating: 5,
        title: "Gorgeous and so fragrant",
        body: "I use these in my bath and as tea — both are amazing. The petals are deep pink and look exactly like the photos. Great packaging.",
        date: "February 2025",
        avatar: "N",
      },
    ],
  },
  {
    id: "dried-yarrow-herb",
    name: "Dried Yarrow Herb",
    price: 19.99,
    description: "Full-spectrum yarrow harvested from leaves, stems, and flowers for maximum herbal potency and immune support.",
    longDescription:
      "Our Dried Yarrow Herb is carefully harvested from the entire yarrow plant — leaves, stems, and flowers — to ensure full-spectrum herbal potency. Certified organic and non-GMO, free from additives, they deliver a clean and authentic herbal infusion experience. With a delicately herbaceous flavor profile and gentle floral notes with a smooth, earthy finish, yarrow tea has been a beloved traditional remedy for centuries. Packed with essential nutrients like vitamins A and C, potassium, and fiber.",
    benefits: [
      "Supports and boosts immunity",
      "Aids healthy digestion",
      "Natural anti-inflammatory properties",
      "Calming for stress and anxiety",
      "100% organic, non-GMO, additive-free",
    ],
    usage: "Steep 1 tsp of dried yarrow in 8 oz of hot water for 5-10 minutes. Strain and enjoy. May be sweetened with honey.",
    images: withPrimary(imagesForFolder("Yarrowherb"), "Yarrow Herbs (6)"),
    category: "Herbs & Leaves",
    weight: "4 oz",
    prepSteps: teaPrepSteps,
    nutritionFacts: {
      servingSize: "1 tsp (2g)",
      calories: 10,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "1g",
      dietaryFiber: "1g",
      totalSugars: "0g",
      protein: "0g",
      vitaminA: "0%",
      vitaminC: "0%",
      calcium: "2%",
      iron: "2%",
    },
    reviews: [
      {
        name: "Thomas H.",
        location: "Salt Lake City, UT",
        rating: 5,
        title: "Great herbal tea with real benefits",
        body: "I brew yarrow every morning during cold season and I've noticed I get sick far less often. Really pleased with the freshness and quality of these leaves.",
        date: "January 2025",
        avatar: "T",
      },
    ],
  },
  {
    id: "dried-lemon-grass",
    name: "Organic Dried Lemon Grass",
    price: 16.99,
    description: "Refreshing, citrusy lemongrass with a bright uplifting aroma — perfect for wellness teas and culinary use.",
    longDescription:
      "Experience the refreshing, bright, and citrusy flavor of our Organic Dried Lemon Grass — ideal for making a light, revitalizing tea or as a vibrant aromatic botanical in culinary creations. This ancient herb is cherished for a variety of traditional wellness practices, known to promote clarity and relaxation. Its distinct and uplifting aroma makes it a purifying addition to your collection. Also perfect for traditional Southeast Asian recipes.",
    benefits: [
      "Promotes mental clarity and relaxation",
      "Bright, uplifting citrus flavor",
      "USDA Organic certified",
      "Non-GMO and chemical-free",
      "Versatile culinary ingredient",
    ],
    usage: "Steep 1-2 tsp in 8 oz of boiling water for 5 minutes. Can also be used in soups, curries, and marinades for a bright citrus note.",
    images: withPrimary(imagesForFolder("Lemongrass"), "ChatGPT Image Jul 25, 2026, 09_30_27 AM"),
    category: "Herbs & Leaves",
    weight: "4 oz",
    prepSteps: [
      { icon: "📏", label: "Measure", detail: "1–2 tsp per 8 oz cup" },
      { icon: "🌡️", label: "Boil Water", detail: "Full rolling boil (212°F)" },
      { icon: "⏱️", label: "Steep", detail: "5 minutes covered" },
      { icon: "🫙", label: "Strain", detail: "Remove lemongrass stalks" },
      { icon: "🍋", label: "Serve", detail: "Add ginger or lemon slice" },
    ],
    nutritionFacts: {
      servingSize: "1 tsp (2g)",
      calories: 5,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "1g",
      dietaryFiber: "0g",
      totalSugars: "0g",
      protein: "0g",
      vitaminC: "3%",
      calcium: "1%",
      iron: "2%",
    },
    reviews: [
      {
        name: "Lin C.",
        location: "San Francisco, CA",
        rating: 5,
        title: "So refreshing and authentic",
        body: "I grew up drinking lemongrass tea and this is as good as what my grandmother made. Very aromatic, clean flavor. I also use it in Thai cooking. Highly recommend.",
        date: "April 2025",
        avatar: "L",
      },
    ],
  },
  {
    id: "dried-rue-herb",
    name: "Dried Rue Herb",
    price: 17.99,
    description: "An intensely aromatic traditional botanical with a complex bitter-sweet flavor and rich cultural heritage.",
    longDescription:
      "Our Dried Rue Herb offers a strong, complex, aromatic, and bitter-sweet taste with distinct musky-floral notes, a potent herbaceous aroma, a smooth earthy finish, and profound rue undertones. Carefully harvested from the entire rue bloom — leaves and flowers — to ensure full-spectrum herbal potency and fragrance. Certified organic and non-GMO, free from additives. Used for centuries in traditional wellness practices across Mediterranean and Latin American cultures.",
    benefits: [
      "100% organically sourced",
      "Full-spectrum herbal potency",
      "Rich traditional wellness history",
      "Certified non-GMO & additive-free",
      "Intense, complex aromatic profile",
    ],
    usage: "Use sparingly — steep a small pinch in 8 oz of hot water for 5 minutes. Consult a healthcare provider before use if pregnant.",
    images: withPrimary(imagesForFolder("Rue herb"), "rue herb tea"),
    category: "Herbs & Leaves",
    weight: "2 oz",
    prepSteps: [
      { icon: "🤏", label: "Small Pinch", detail: "Use just a small pinch" },
      { icon: "🌡️", label: "Heat Water", detail: "Bring to 195°F" },
      { icon: "⏱️", label: "Steep", detail: "Exactly 5 minutes — no more" },
      { icon: "🫙", label: "Strain Well", detail: "Remove all herb material" },
      { icon: "☕", label: "Enjoy", detail: "Sweeten with honey to balance bitterness" },
    ],
    nutritionFacts: {
      servingSize: "1 pinch (0.5g)",
      calories: 2,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "0g",
      dietaryFiber: "0g",
      totalSugars: "0g",
      protein: "0g",
      calcium: "0%",
      iron: "1%",
    },
    reviews: [
      {
        name: "Carmen V.",
        location: "Los Angeles, CA",
        rating: 5,
        title: "Exactly what I was looking for",
        body: "Very hard to find good quality rue. This is fresh, potent, and packaged beautifully. My abuela used this for years and I'm glad I found a reliable source.",
        date: "March 2025",
        avatar: "C",
      },
    ],
  },
  {
    id: "dried-juniper-berries",
    name: "Dried Juniper Berries",
    price: 18.99,
    description: "Natural, woodsy dried juniper berries packed with antioxidants — perfect for warming traditional tea and culinary use.",
    longDescription:
      "Experience the natural, woodsy flavor of our Dried Juniper Berries — perfect for making a warming, traditional tea. These berries are naturally packed with antioxidants. Their robust aroma and purifying properties make them a unique addition to your wellness routine. Also great for gin production and culinary use. Sourced from the pristine Himalaya Mountains — committed to providing only chemical-free, organic products for your health.",
    benefits: [
      "Supports urinary tract health",
      "Promotes healthy digestion",
      "Packed with natural antioxidants",
      "Supports natural detoxification",
      "USDA Organic, Non-GMO, Vegan",
    ],
    usage: "Steep 1 tsp in 8 oz of hot water for 5-8 minutes for a warming herbal tea. Also excellent as a culinary spice in marinades, sauces, and gin-inspired recipes.",
    images: withPrimary(imagesForFolder("Juniper berries"), "Juniper"),
    badge: "New",
    category: "Herbs & Leaves",
    weight: "4 oz",
    prepSteps: [
      { icon: "📏", label: "Measure", detail: "1 tsp whole berries" },
      { icon: "🫙", label: "Lightly Crush", detail: "Gently crush to release oils" },
      { icon: "🌡️", label: "Heat Water", detail: "Bring water to a full boil" },
      { icon: "⏱️", label: "Steep", detail: "5–8 minutes covered" },
      { icon: "🌲", label: "Strain & Enjoy", detail: "Strain and sip warm" },
    ],
    nutritionFacts: {
      servingSize: "1 tsp (3g)",
      calories: 25,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "0g",
      dietaryFiber: "1g",
      totalSugars: "<1g",
      protein: "<1g",
      vitaminC: "15%",
      calcium: "2%",
      iron: "2%",
    },
    reviews: [
      {
        name: "Derek P.",
        location: "Burlington, VT",
        rating: 5,
        title: "Fresh and woodsy — perfect quality",
        body: "I use these for tea and also in cooking game meat. Outstanding quality and freshness. The aroma when the bag is opened is incredible.",
        date: "February 2025",
        avatar: "D",
      },
    ],
  },
  {
    id: "wild-sea-buckthorn",
    name: "Wild Sea Buckthorn Berries",
    price: 22.99,
    description: "Potent wild-harvested sea buckthorn berries — a superberry bursting with vitamins, antioxidants, and vitality.",
    longDescription:
      "Our Wild Sea Buckthorn Berries are harvested from wild-growing plants to ensure maximum potency and nutritional density. These small but mighty superberries are renowned for being one of nature's most nutrient-dense foods, rich in vitamins C, A, E, and K, plus omega fatty acids and powerful antioxidants. USDA Organic certified, 100% Organic, and Non-GMO — they energize your day and support overall vitality.",
    benefits: [
      "Boosts immunity powerfully",
      "Rich in vitamins C, A, E & K",
      "Supports glowing skin health",
      "Energizes and supports vitality",
      "Wild-harvested, USDA Organic",
    ],
    usage: "Add 1 tsp to 8 oz of hot water, steep for 10 minutes, strain, and enjoy. Can also be blended into smoothies or sprinkled over yogurt and oatmeal.",
    images: imagesForFolder("Wild sea buckthron"),
    badge: "New",
    category: "Seeds & Kernels",
    weight: "5 oz",
    prepSteps: [
      { icon: "📏", label: "Measure", detail: "1 tsp per serving" },
      { icon: "🌡️", label: "Hot Water", detail: "Water at 195°F" },
      { icon: "⏱️", label: "Steep", detail: "10 minutes for full infusion" },
      { icon: "🫙", label: "Strain", detail: "Strain through fine mesh" },
      { icon: "🍊", label: "Enjoy", detail: "Naturally tart — add honey to taste" },
    ],
    nutritionFacts: {
      servingSize: "1 tsp (3g)",
      calories: 10,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "2g",
      dietaryFiber: "1g",
      totalSugars: "1g",
      protein: "0g",
      vitaminC: "20%",
      vitaminA: "8%",
      calcium: "2%",
      iron: "3%",
    },
    reviews: [
      {
        name: "Anna J.",
        location: "Minneapolis, MN",
        rating: 5,
        title: "The most nutrient-dense thing I buy",
        body: "Sea buckthorn is truly a superfood and this is the best source I've found. Very tart but so potent. I blend it into smoothies every morning.",
        date: "April 2025",
        avatar: "A",
      },
    ],
  },
  {
    id: "dried-senna-leaves",
    name: "Dried Senna Leaves",
    price: 16.99,
    description: "Natural mild-flavored Senna Leaves (Senna alexandrina) — a centuries-old botanical for digestive support.",
    longDescription:
      "Experience the natural and mild flavor of Dried Senna Leaves (Senna alexandrina), traditionally used for digestive support. These leaves, with their distinct, slightly earthy and subtle flavor, have been used for centuries. Their properties make them a valuable and time-honored botanical for your collection. Certified USDA Organic, Non-GMO, Vegan, Gluten-Free, Preservatives-Free, and Additives-Free.",
    benefits: [
      "Relieves constipation naturally",
      "Supports healthy digestion",
      "Promotes regular bowel movements",
      "Gentle overnight digestive support",
      "USDA Organic, Vegan, Gluten-Free",
    ],
    usage: "Steep 1 tsp in 8 oz of hot water for 10 minutes. Drink once daily, preferably in the evening. Do not use for more than 1–2 weeks continuously.",
    images: withPrimary(imagesForFolder("Seena leaves"), "ChatGPT Image Jul 25, 2026, 10_12_19 AM"),
    badge: "New",
    category: "Herbs & Leaves",
    weight: "4 oz",
    prepSteps: [
      { icon: "📏", label: "Measure", detail: "1 tsp of dried leaves" },
      { icon: "🌡️", label: "Boil Water", detail: "Full boil (212°F)" },
      { icon: "⏱️", label: "Steep", detail: "10 minutes — steep longer for stronger effect" },
      { icon: "🫙", label: "Strain", detail: "Remove all leaf material" },
      { icon: "🌙", label: "Drink at Night", detail: "Best taken in the evening before bed" },
    ],
    nutritionFacts: {
      servingSize: "1 tsp (2g)",
      calories: 20,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "2mg",
      totalCarb: "1g",
      dietaryFiber: "1g",
      totalSugars: "0g",
      protein: "0g",
      vitaminC: "5%",
      calcium: "4%",
      iron: "6%",
      magnesium: "4%",
    },
    reviews: [
      {
        name: "Grace O.",
        location: "Houston, TX",
        rating: 5,
        title: "Gentle and effective",
        body: "I was looking for a natural digestive support option and this has been wonderful. Gentle overnight action, exactly as described. Love that it's USDA organic.",
        date: "April 2025",
        avatar: "G",
      },
      {
        name: "Kevin R.",
        location: "Philadelphia, PA",
        rating: 4,
        title: "Works as advertised",
        body: "Good quality, well packaged. I make one cup in the evening and notice results by morning. Will reorder.",
        date: "March 2025",
        avatar: "K",
      },
    ],
  },
  {
    id: "shilajit-resin",
    name: "Sun Dried Shilajit Resin",
    price: 49.99,
    description: "Lab-tested, 100% organic sun-dried Shilajit resin — the ancient mineral-rich superfood for energy and vitality.",
    longDescription:
      "Shilajit is a powerful, naturally occurring substance that has been prized in Ayurvedic medicine for thousands of years. Our Sun Dried Shilajit Resin is 100% organic, lab-tested for purity and potency, and sourced from pristine mountain ranges. Rich in fulvic acid and over 84 trace minerals, Shilajit supports energy, cognitive function, and overall vitality. Each jar comes with a measuring spatula for easy, precise serving.",
    benefits: [
      "Boosts energy and stamina naturally",
      "Supports cognitive focus and clarity",
      "Rich in fulvic acid & 84+ trace minerals",
      "Lab-tested for purity and potency",
      "Supports overall vitality and well-being",
    ],
    usage: "Use the included spatula to measure a pea-sized portion (250-500mg). Dissolve in warm water, milk, or your favorite beverage. Take once daily, preferably in the morning.",
    images: imagesForFolder("Shilajit"),
    badge: "Premium",
    category: "Seeds & Kernels",
    weight: "30g",
    prepSteps: shilajitPrepSteps,
    nutritionFacts: {
      servingSize: "pea-sized (300mg)",
      calories: 0,
      totalFat: "0g",
      saturatedFat: "0g",
      transFat: "0g",
      cholesterol: "0mg",
      sodium: "0mg",
      totalCarb: "0g",
      dietaryFiber: "0g",
      totalSugars: "0g",
      protein: "0g",
      calcium: "2%",
      iron: "3%",
      magnesium: "5%",
    },
    reviews: [
      {
        name: "Michael S.",
        location: "New York, NY",
        rating: 5,
        title: "Real Shilajit — you can tell the difference",
        body: "I've tried several brands and this is the real deal. Dissolves perfectly, has the authentic tar-like texture, and the effects on energy and focus have been noticeable within 2 weeks.",
        date: "March 2025",
        avatar: "M",
      },
      {
        name: "Aisha B.",
        location: "Atlanta, GA",
        rating: 5,
        title: "Premium quality, worth every penny",
        body: "Incredible product. I stir it into warm milk every morning. My energy levels are significantly better and I feel more mentally sharp throughout the day.",
        date: "February 2025",
        avatar: "A",
      },
    ],
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);

export const categories = [...new Set(products.map((p) => p.category))];

export const allReviews = products
  .flatMap((p) => (p.reviews || []).map((r) => ({ ...r, productName: p.name, productId: p.id })))
  .sort(() => Math.random() - 0.5)
  .slice(0, 6);
