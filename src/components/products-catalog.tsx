"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";
import { Search } from "lucide-react";
import HeadPhone from "@/assets/headphone-two.png";

const headphones = [
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
];

const categories = ["All", "Wireless", "Over-Ear", "On-Ear", "In-Ear"];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const type = params.get("headphone");
      setSelectedCategory(type ?? "All");
    }
  }, [selectedCategory]);
  // console.log(`params: ${JSON.stringify(selectedCategory)}`);

  const filteredHeadphones = headphones.filter(
    (headphone) =>
      (selectedCategory === "All" || headphone.category === selectedCategory) &&
      headphone.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const updateQueryParam = (newType: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("headphone", newType);
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
    setSelectedCategory(newType);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-3xl font-bold text-black mb-8">Headphone Catalog</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="flex space-x-4 mb-4 md:mb-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => updateQueryParam(category)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
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
        {filteredHeadphones.map((headphone) => (
          <ProductCard key={headphone.id} {...headphone} />
        ))}
      </div>

      {filteredHeadphones.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No headphones found matching your criteria. {selectedCategory}
        </p>
      )}
    </div>
  );
}
