// Lead Developer: Raghul
// Theme: Dark Cyber-Industrial

export const siteConfig = {
  name: "Geco Grinding Centre",
  shortName: "GECO",
  description:
    "A leading manufacturer of heavy-duty crushing equipments, spare parts, and material handling solutions based in Coimbatore, Tamil Nadu.",
  url: "https://gecogrindingcentre.com", // Replace with actual production URL
  ogImage: "https://gecogrindingcentre.com/og-image.jpg", // Replace with actual OG image URL
  
  // Theme styling for meta tags
  themeColor: "#0A0B0E",
  accentColor: "#FFC700",

  // Core Company Details
  contact: {
    phone: "08047652002",
    email: "info@gecogrindingcentre.com", // Placeholder
    managingDirector: "Geco Crusher",
    address: {
      line1: "636/2, Shanmuga Nagar",
      line2: "Opp To Jayalakshmi Mills, Trichy Road",
      city: "Singanallur, Coimbatore",
      state: "Tamil Nadu",
      pincode: "641005",
      country: "India"
    },
    businessHours: "8AM – 8PM, Mon - Sat",
  },

  // Legal & Certifications
  legal: {
    gstNumber: "33AABFG1064F2ZZ",
    firmType: "Partnership",
    established: "01-07-2017",
  },

  // Developer Metadata
  author: {
    name: "Siva Shree",
    role: "Lead Developer",
  },

  // Navigation Structure (Centralized for easy updating)
  mainNav: [
    { title: "Home", href: "/" },
    { title: "Products & Services", href: "/products" },
    { title: "About Us", href: "/about" },
    { title: "Contact Us", href: "/contact" },
  ],
};

export type SiteConfig = typeof siteConfig;