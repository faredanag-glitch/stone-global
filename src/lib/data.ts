import marble from "@/assets/slab-marble.webp";
import granite from "@/assets/slab-granite.webp";
import onyx from "@/assets/slab-onyx.webp";
import limestone from "@/assets/slab-limestone.webp";
import lobby from "@/assets/app-lobby.webp";
import kitchen from "@/assets/app-kitchen.webp";
import bathroom from "@/assets/app-bathroom.webp";
import quarry from "@/assets/factory-quarry.webp";
import line from "@/assets/factory-line.webp";
import shipping from "@/assets/export-shipping.webp";

export type Category = "marble" | "granite" | "limestone" | "onyx";

export interface Product {
  id: string;
  name: string;
  category: Category;
  image: string;
  finish: string;
  origin: string;
}

export const slabImages = { marble, granite, onyx, limestone };

export const products: Product[] = [
  { id: "p1", name: "Galala Cream", category: "marble", image: marble, finish: "Polished", origin: "Galala, Egypt" },
  { id: "p2", name: "Sunny Menia", category: "marble", image: limestone, finish: "Honed", origin: "Menia, Egypt" },
  { id: "p3", name: "Royal Marfil", category: "marble", image: marble, finish: "Polished", origin: "Beni Suef, Egypt" },
  { id: "p4", name: "Verde Nile", category: "marble", image: marble, finish: "Brushed", origin: "Aswan, Egypt" },
  { id: "p5", name: "Aswan Black", category: "granite", image: granite, finish: "Flamed", origin: "Aswan, Egypt" },
  { id: "p6", name: "Royal Granite", category: "granite", image: granite, finish: "Polished", origin: "Aswan, Egypt" },
  { id: "p7", name: "Halayeb Black", category: "granite", image: granite, finish: "Leathered", origin: "Halayeb, Egypt" },
  { id: "p8", name: "Egyptian Onyx", category: "onyx", image: onyx, finish: "Polished", origin: "Western Desert" },
  { id: "p9", name: "Honey Onyx", category: "onyx", image: onyx, finish: "Backlit", origin: "Western Desert" },
  { id: "p10", name: "Silvia Limestone", category: "limestone", image: limestone, finish: "Honed", origin: "Suez, Egypt" },
  { id: "p11", name: "Samaha Beige", category: "limestone", image: limestone, finish: "Tumbled", origin: "Samalut, Egypt" },
  { id: "p12", name: "Imperial White", category: "marble", image: marble, finish: "Polished", origin: "Sinai, Egypt" },
];

export interface Project {
  id: string;
  name: string;
  country: string;
  sector: "hotels" | "malls" | "residential" | "government" | "commercial";
  material: string;
  type: string;
  scope: string;
  image: string;
}

export const projects: Project[] = [
  { id: "j1", name: "Royal Palm Hotel", country: "UAE", sector: "hotels", material: "Galala Cream Marble", type: "Lobby & Suites", scope: "12,000 m²", image: lobby },
  { id: "j2", name: "Grand Avenue Mall", country: "Saudi Arabia", sector: "malls", material: "Imperial White", type: "Flooring & Cladding", scope: "28,000 m²", image: line },
  { id: "j3", name: "Nile View Residences", country: "Egypt", sector: "residential", material: "Royal Marfil", type: "Interiors", scope: "9,500 m²", image: kitchen },
  { id: "j4", name: "Ministry Headquarters", country: "Qatar", sector: "government", material: "Aswan Black Granite", type: "Facade & Floors", scope: "15,000 m²", image: quarry },
  { id: "j5", name: "Azure Spa Resort", country: "Maldives", sector: "hotels", material: "Egyptian Onyx", type: "Spa & Baths", scope: "6,800 m²", image: bathroom },
  { id: "j6", name: "Metropolitan Tower", country: "USA", sector: "commercial", material: "Royal Granite", type: "Lobby & Cladding", scope: "11,200 m²", image: shipping },
  { id: "j7", name: "Bosphorus Villas", country: "Turkey", sector: "residential", material: "Sunny Menia", type: "Kitchens & Baths", scope: "7,400 m²", image: kitchen },
  { id: "j8", name: "Crescent Boulevard", country: "Kuwait", sector: "malls", material: "Silvia Limestone", type: "Flooring", scope: "19,300 m²", image: line },
];

export const applications = [
  { key: "kitchens", image: kitchen },
  { key: "bathrooms", image: bathroom },
  { key: "lobbies", image: lobby },
  { key: "villas", image: kitchen },
  { key: "commercial", image: line },
  { key: "residences", image: bathroom },
];

export const exportCountries = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "United States",
  "United Kingdom", "Germany", "France", "Italy", "Turkey", "India", "China",
  "Canada", "Australia", "Spain", "Greece", "Jordan", "Lebanon", "Nigeria", "Kenya",
];

export const testimonials = [
  { name: "James Whitfield", role: "Principal Architect, London", text: "The consistency and finish of Nile Stone's marble is the best we've sourced in fifteen years of practice." },
  { name: "Ahmed Al-Rashid", role: "Developer, Riyadh", text: "Reliable export, flawless quality control, and on-time delivery across three landmark towers." },
  { name: "Sofia Bianchi", role: "Interior Designer, Milan", text: "Their onyx selection rivals the finest Italian houses — truly world-class Egyptian stone." },
  { name: "David Chen", role: "Contractor, New York", text: "From quote to container, the most professional stone partner we have worked with internationally." },
];

export const heroStats = [
  { value: 20, suffix: "+", key: "countries" },
  { value: 500, suffix: "+", key: "projects" },
  { value: 50000, suffix: "+", key: "capacity" },
  { value: 18, suffix: "+", key: "years" },
];
