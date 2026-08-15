// Lead Developer: Siva Shree
// Theme: Dark Cyber-Industrial

export type ProductCategory = "Crushers" | "Washing Plants" | "Screening" | "Spare Parts";

export interface Product {
  slug: string;
  name: string;
  price: string;
  capacity?: string;
  category: ProductCategory;
  type: string;
  desc: string;
  isFlagship: boolean; // true = 300-frame scroller, false = Three.js .glb interactive model
}

export const productsData: Product[] = [
  // ==========================================
  // FLAGSHIP MACHINERY (3D Frame Scrollers)
  // ==========================================
  {
    slug: "bucket-sand-washing",
    name: "Bucket Sand Washing Machine",
    price: "₹ 18.00 LAKH",
    capacity: "50-100 TPH",
    category: "Washing Plants",
    type: "Sand Washer",
    desc: "Provides both M-sand and P-sand output with an inbuilt planetary gearbox designed for heavy sludge removal.",
    isFlagship: true,
  },
  {
    slug: "vibrating-screen-14x4",
    name: "GECO Vibrating Screen 14 x 4",
    price: "₹ 8.00 LAKH",
    capacity: "Varies",
    category: "Screening",
    type: "Vibrating Screen",
    desc: "High-frequency screening for precise material separation. Built with heavy-duty side plates for maximum durability.",
    isFlagship: true,
  },
  {
    slug: "secondary-jaw-30x10",
    name: "Secondary Jaw Crusher 30x10",
    price: "₹ 13.00 LAKH",
    capacity: "20–50 TPH",
    category: "Crushers",
    type: "Jaw Crusher",
    desc: "Optimized for recycling, construction, and heavy stone crushing. Engineered to deliver high-yield secondary reduction.",
    isFlagship: true,
  },
  {
    slug: "horizontal-shaft-impactor",
    name: "Horizontal Shaft Impactor 100 TPH",
    price: "₹ 16.50 LAKH",
    capacity: "100 TPH",
    category: "Crushers",
    type: "Impact Crusher",
    desc: "Features a 760mm rotor size for maximum impact efficiency. Ideal for producing cubical shaped aggregates.",
    isFlagship: true,
  },
  {
    slug: "cone-crusher-200tph",
    name: "Cone Crusher Manufacturer 200 TPH",
    price: "₹ 60.00 LAKH",
    capacity: "200 TPH",
    category: "Crushers",
    type: "Cone Crusher",
    desc: "Heavy-duty secondary crushing for the toughest granite and ores. Incorporates advanced hydraulic clearing systems.",
    isFlagship: true,
  },
  {
    slug: "stone-crusher-30x08",
    name: "Stone Crusher 30 x 08",
    price: "₹ 12.60 LAKH",
    capacity: "50 TPH",
    category: "Crushers",
    type: "Jaw Crusher",
    desc: "Features a 150x250 mm jaw opening size for primary stage crushing of hard rock materials.",
    isFlagship: true,
  },
  {
    slug: "stone-crusher-plant",
    name: "Mobile Stone Crusher Plant",
    price: "₹ 80.00 LAKH",
    capacity: "50–100 TPH",
    category: "Crushers",
    type: "Mobile Crushing Plant",
    desc: "Wheel-mounted chassis for rapid deployment across quarry sites. Fully integrated crushing and screening circuit.",
    isFlagship: true,
  },
  {
    slug: "vibrating-screen-machine",
    name: "Vibrating Screen Machine",
    price: "₹ 13.50 LAKH",
    capacity: "Custom",
    category: "Screening",
    type: "Vibrating Screen",
    desc: "Built for extreme load capacities and continuous operational sorting in harsh mining environments.",
    isFlagship: true,
  },

  // ==========================================
  // SECONDARY PRODUCTS (Three.js .glb Models)
  // ==========================================
  {
    slug: "spare-blowbar",
    name: "High Chrome Blowbar",
    price: "Request Quote",
    category: "Spare Parts",
    type: "Wear Part",
    desc: "High-chrome alloy blowbars designed to maximize wear life in horizontal shaft impactors.",
    isFlagship: false,
  },
  {
    slug: "spare-jaw-plate",
    name: "Crusher Jaw Plate",
    price: "Request Quote",
    category: "Spare Parts",
    type: "Wear Part",
    desc: "Manganese steel jaw plates cast for high impact and abrasion resistance.",
    isFlagship: false,
  },
  {
    slug: "spare-idler-roller",
    name: "Conveyor Idler Roller",
    price: "Request Quote",
    category: "Spare Parts",
    type: "Conveyor Component",
    desc: "Sealed bearing idler rollers built to support heavy bulk material transport.",
    isFlagship: false,
  },
  {
    slug: "spare-rotor-tip",
    name: "VSI Crusher Rotor Tip",
    price: "Request Quote",
    category: "Spare Parts",
    type: "Wear Part",
    desc: "Tungsten carbide tipped rotor inserts for Vertical Shaft Impactors.",
    isFlagship: false,
  },
];

// Helper functions for easy data fetching in your components
export const getProductBySlug = (slug: string): Product | undefined => {
  return productsData.find((product) => product.slug === slug);
};

export const getProductsByCategory = (category: ProductCategory): Product[] => {
  return productsData.filter((product) => product.category === category);
};