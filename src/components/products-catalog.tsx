"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";
import { Search } from "lucide-react";
import HeadPhone from "@/assets/headphone-two.png";
import Cables from "@/assets/cables.avif";
import MousePad from "@/assets/mousepad.avif";

const categories = [
  {
    name: "headphone",
    subCategories: ["All", "Wireless", "Over-Ear", "On-Ear", "In-Ear"],
  },
  {
    name: "cables",
    subCategories: ["All", "New", "Sale"],
  },
  {
    name: "accessories",
    subCategories: ["All", "Mousepads", "Mice", "Mouseskates"],
  },
];

const products = [
  // Headphones
  {
    id: "1",
    name: "AudioPhile Pro",
    category: "Over-Ear",
    price: 299.99,
    rating: 4,
    imageUrl: HeadPhone.src,
  },
  {
    id: "2",
    name: "BassBoost X",
    category: "Over-Ear",
    price: 249.99,
    rating: 5,
    imageUrl: HeadPhone.src,
  },
  {
    id: "3",
    name: "ClearSound Air",
    category: "In-Ear",
    price: 149.99,
    rating: 4,
    imageUrl: HeadPhone.src,
  },
  {
    id: "4",
    name: "SportsFit Elite",
    category: "In-Ear",
    price: 179.99,
    rating: 3,
    imageUrl: HeadPhone.src,
  },
  {
    id: "5",
    name: "StudioMaster",
    category: "On-Ear",
    price: 199.99,
    rating: 5,
    imageUrl: HeadPhone.src,
  },
  {
    id: "6",
    name: "TravelComfort",
    category: "On-Ear",
    price: 129.99,
    rating: 4,
    imageUrl: HeadPhone.src,
  },
  {
    id: "7",
    name: "GamerX Pro",
    category: "Wireless",
    price: 279.99,
    rating: 5,
    imageUrl: HeadPhone.src,
  },
  {
    id: "8",
    name: "AudiophileWireless",
    category: "In-Ear",
    price: 159.99,
    rating: 4,
    imageUrl: HeadPhone.src,
  },

  // Cables
  {
    id: "9",
    name: "UltraFast USB-C",
    category: "New",
    price: 19.99,
    rating: 5,
    imageUrl: Cables.src,
  },
  {
    id: "10",
    name: "HDMI Pro 4K",
    category: "New",
    price: 29.99,
    rating: 4,
    imageUrl: Cables.src,
  },
  {
    id: "11",
    name: "Lightning Speed Cable",
    category: "Sale",
    price: 24.99,
    rating: 4,
    imageUrl: Cables.src,
  },

  // Accessories
  {
    id: "12",
    name: "ComfortMouse Pad XL",
    category: "Mousepads",
    price: 39.99,
    rating: 5,
    imageUrl: MousePad.src,
  },
  {
    id: "13",
    name: "ErgoMouse Pro",
    category: "Mice",
    price: 59.99,
    rating: 5,
    imageUrl: MousePad.src,
  },
  {
    id: "14",
    name: "Precision Mouse Skates",
    category: "Mouseskates",
    price: 14.99,
    rating: 4,
    imageUrl: MousePad.src,
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMainCategory, setActiveMainCategory] = useState("headphone");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      const filter = params.get("filter");

      if (category) {
        setActiveMainCategory(category);
      }
      if (filter) {
        setSelectedCategory(filter);
      }
    }
  }, []);

  const updateURL = (mainCategory: string, filter: string = "All") => {
    const params = new URLSearchParams(window.location.search);

    params.set("category", mainCategory);
    if (filter !== "All") {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
    setActiveMainCategory(mainCategory);
    setSelectedCategory(filter);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesMainCategory = categories
      .find((cat) => cat.name === activeMainCategory)
      ?.subCategories.includes(product.category);

    const matchesSubCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesMainCategory && matchesSubCategory;
  });

  const currentCategories =
    categories.find((cat) => cat.name === activeMainCategory)?.subCategories ||
    [];

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-3xl font-bold text-black mb-8">Product Catalog</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <div className="flex flex-col space-y-6">
            <div>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => updateURL(category.name)}
                  className={`px-4 py-2 rounded-full ${
                    activeMainCategory === category.name
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </button>
              ))}
            </div>
            <div>
              {currentCategories.map((subCategory) => (
                <button
                  key={subCategory}
                  onClick={() => updateURL(activeMainCategory, subCategory)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap ${
                    selectedCategory === subCategory
                      ? "bg-black text-white"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                >
                  {subCategory}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search headphones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No headphones found matching your criteria. {selectedCategory}
        </p>
      )}
    </div>
  );
}
