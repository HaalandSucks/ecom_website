export type ProductCategory = "Men" | "Women";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  description: string;
  sizes: Array<"XS" | "S" | "M" | "L" | "XL">;
  colors: string[];
  rating: number;
  reviewCount: number;
  image: {
    src: string;
    alt: string;
  };
  badges?: string[];
};

export const products: Product[] = [
  {
    id: "p_men_oxford_shirt",
    slug: "mens-oxford-shirt",
    name: "Men’s Oxford Shirt",
    category: "Men",
    price: 1799,
    compareAtPrice: 2299,
    description:
      "A crisp, breathable oxford shirt that works for office days and weekends. Soft feel, structured collar, and a flattering regular fit.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Sky Blue", "White", "Navy"],
    rating: 4.6,
    reviewCount: 214,
    image: {
      src: "https://picsum.photos/seed/mens-oxford-shirt/1200/1500",
      alt: "Men wearing a light shirt",
    },
    badges: ["Best Seller"],
  },
  {
    id: "p_men_relaxed_denim",
    slug: "mens-relaxed-denim-jeans",
    name: "Men’s Relaxed Denim Jeans",
    category: "Men",
    price: 2499,
    description:
      "Relaxed-fit jeans with a clean wash and all-day comfort. Pair with tees, shirts, or hoodies—this one does it all.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Indigo", "Charcoal"],
    rating: 4.4,
    reviewCount: 98,
    image: {
      src: "https://picsum.photos/seed/mens-relaxed-denim-jeans/1200/1500",
      alt: "Denim jeans close-up",
    },
    badges: ["New"],
  },
  {
    id: "p_men_bomber",
    slug: "mens-bomber-jacket",
    name: "Men’s Bomber Jacket",
    category: "Men",
    price: 3999,
    compareAtPrice: 4999,
    description:
      "Lightweight bomber jacket with a smooth finish and classic ribbed hems. Easy layering for evenings and travel.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Olive"],
    rating: 4.7,
    reviewCount: 63,
    image: {
      src: "https://picsum.photos/seed/mens-bomber-jacket/1200/1500",
      alt: "Black bomber jacket on a hanger",
    },
    badges: ["Limited"],
  },
  {
    id: "p_men_polo",
    slug: "mens-knit-polo",
    name: "Men’s Knit Polo",
    category: "Men",
    price: 1599,
    description:
      "A soft knit polo that looks elevated without trying. Great drape, clean placket, and a modern silhouette.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Forest Green"],
    rating: 4.3,
    reviewCount: 41,
    image: {
      src: "https://picsum.photos/seed/mens-knit-polo/1200/1500",
      alt: "Polo shirt styling",
    },
  },
  {
    id: "p_women_wrap_dress",
    slug: "womens-wrap-dress",
    name: "Women’s Wrap Dress",
    category: "Women",
    price: 2899,
    compareAtPrice: 3499,
    description:
      "A flattering wrap dress with a waist tie and airy flow. Perfect for brunch, dates, or day-to-night styling.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral", "Midnight"],
    rating: 4.8,
    reviewCount: 326,
    image: {
      src: "https://picsum.photos/seed/womens-wrap-dress/1200/1500",
      alt: "Woman wearing a dress",
    },
    badges: ["Best Seller"],
  },
  {
    id: "p_women_blazer",
    slug: "womens-tailored-blazer",
    name: "Women’s Tailored Blazer",
    category: "Women",
    price: 4299,
    description:
      "A sharp tailored blazer with subtle structure and a clean lapel. Wear it over tees, blouses, or dresses for instant polish.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Sand", "Black"],
    rating: 4.5,
    reviewCount: 88,
    image: {
      src: "https://picsum.photos/seed/womens-tailored-blazer/1200/1500",
      alt: "Woman in a blazer",
    },
    badges: ["New"],
  },
  {
    id: "p_women_cotton_top",
    slug: "womens-cotton-top",
    name: "Women’s Cotton Top",
    category: "Women",
    price: 1199,
    description:
      "Minimal, soft, and breathable—your everyday staple top with a flattering neckline and easy fit.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Rose", "Black"],
    rating: 4.2,
    reviewCount: 57,
    image: {
      src: "https://picsum.photos/seed/womens-cotton-top/1200/1500",
      alt: "Woman wearing a simple top",
    },
  },
  {
    id: "p_women_wide_leg",
    slug: "womens-wide-leg-trousers",
    name: "Women’s Wide-Leg Trousers",
    category: "Women",
    price: 2699,
    description:
      "Wide-leg trousers with a relaxed drape and clean finish. Looks effortless with sneakers or heels.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Taupe", "Charcoal"],
    rating: 4.4,
    reviewCount: 102,
    image: {
      src: "https://picsum.photos/seed/womens-wide-leg-trousers/1200/1500",
      alt: "Wide-leg trousers detail",
    },
    badges: ["Trending"],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

