import { useEffect, useState } from "react";
import ProductCard from "@/components/product-card";
import { Search } from "lucide-react";
import HeadPhone from "@/assets/sen-headphones.avif";
import HeadPhoneTwo from "@/assets/headphones-four.avif";
import Cables from "@/assets/cables.avif";
import Mouse from "@/assets/mouse.png";
import MouseTwo from "@/assets/mouse-two.png";
import MousePad from "@/assets/mousepad.avif";
import MousePadTwo from "@/assets/mouse-pad.avif";
import { Button } from "./ui/button";

const categories = [
  {
    name: "All",
    categories: ["Headphones", "Accessories", "DLX", "Sale", "New"],
  },
  {
    name: "Headphones",
    category: "Headphones",
    subCategories: ["Wireless", "Over-Ear", "On-Ear", "In-Ear", "Sale", "New"],
  },
  {
    name: "Accessories",
    category: "Accessories",
    subCategories: ["Keyboard", "Mousepads", "Mice", "Cables", "Sale", "New"],
  },
  {
    name: "DLX",
    category: "DLX",
    subCategories: ["Keyboard", "Headphones", "Mousepads", "Mice"],
  },
];

const products = [
  // Headphones
  {
    id: "1",
    name: "AudioPhile Pro",
    category: "DLX",
    tags: ["Headphones", "Over-Ear", "New", "DLX"],
    price: 299.99,
    rating: 4,
    imageUrl: HeadPhone.src,
  },
  {
    id: "2",
    name: "BassBoost X",
    category: "Headphones",
    tags: ["Headphones", "On-Ear", "New"],
    price: 249.99,
    rating: 5,
    imageUrl: HeadPhone.src,
  },
  {
    id: "3",
    name: "ClearSound Air",
    category: "Headphones",
    tags: ["Headphones", "Wireless", "New"],
    price: 149.99,
    rating: 4,
    imageUrl: HeadPhone.src,
  },
  {
    id: "4",
    name: "SportsFit Elite",
    category: "DLX",
    tags: ["Headphones", "In-Ear", "Sale", "DLX"],
    price: 179.99,
    rating: 3,
    imageUrl: HeadPhone.src,
  },
  {
    id: "5",
    name: "StudioMaster",
    category: "Headphones",
    tags: ["Headphones", "Over-Ear", "Sale"],
    price: 199.99,
    rating: 5,
    imageUrl: HeadPhoneTwo.src,
  },
  {
    id: "6",
    name: "TravelComfort",
    category: "Headphones",
    tags: ["Headphones", "Wireless", "Sale"],
    price: 129.99,
    rating: 4,
    imageUrl: HeadPhoneTwo.src,
  },
  {
    id: "7",
    name: "GamerX Pro",
    category: "Headphones",
    tags: ["Headphones", "On-Ear", "Sale"],
    price: 279.99,
    rating: 5,
    imageUrl: HeadPhoneTwo.src,
  },
  {
    id: "8",
    name: "AudiophileWireless",
    category: "DLX",
    tags: ["Headphones", "Over-Ear", "New", "DLX"],
    price: 159.99,
    rating: 4,
    imageUrl: HeadPhoneTwo.src,
  },

  // Cables
  {
    id: "9",
    name: "UltraFast USB-C",
    category: "Accessories",
    tags: ["Accessories", "New", "Cables"],
    price: 19.99,
    rating: 5,
    imageUrl: Cables.src,
  },
  {
    id: "10",
    name: "HDMI Pro 4K",
    category: "Accessories",
    tags: ["Accessories", "New", "Cables"],
    price: 29.99,
    rating: 4,
    imageUrl: Cables.src,
  },
  {
    id: "11",
    name: "Lightning Speed Cable",
    category: "Accessories",
    tags: ["Accessories", "Sale", "Cables"],
    price: 24.99,
    rating: 4,
    imageUrl: Cables.src,
  },

  // Accessories
  {
    id: "12",
    name: "ComfortMouse Pad XL",
    category: "Accessories",
    tags: ["Accessories", "Mousepads", "DLX"],
    price: 39.99,
    rating: 5,
    imageUrl: MousePadTwo.src,
  },
  {
    id: "13",
    name: "Lamzu Thorn",
    category: "DLX",
    tags: ["Accessories", "Mice", "DLX"],
    price: 59.99,
    rating: 5,
    imageUrl: Mouse.src,
  },
  {
    id: "14",
    name: "Logitech G Pro",
    category: "Accessories",
    tags: ["Accessories", "Mice", "DLX"],
    price: 59.99,
    rating: 5,
    imageUrl: MouseTwo.src,
  },
  {
    id: "15",
    name: "Precision Mousepad",
    category: "DLX",
    tags: ["Accessories", "Mousepads", "DLX"],
    price: 14.99,
    rating: 4,
    imageUrl: MousePad.src,
  },
];

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMainCategory, setActiveMainCategory] = useState("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const category = params.get("category");
      const filter = params.getAll("filter");

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
    const paramsSize = params.getAll("filter").length;

    if (activeMainCategory === mainCategory) {
      // sub category
      if (selectedCategory.includes(filter)) {
        if (paramsSize === 1) {
          params.set("filter", "All");
          setSelectedCategory(["All"]);
        } else {
          const updatedFilters = selectedCategory.filter(
            (item) => item !== filter
          );
          params.delete("filter"); // Clear all filters first
          updatedFilters.forEach((item) => params.append("filter", item));
          setSelectedCategory(updatedFilters);
        }
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.pushState({}, "", newUrl);
        return;
      }
    }

    params.set("category", mainCategory);
    setActiveMainCategory(mainCategory);
    if (filter !== "All") {
      params.delete("filter");
      const updatedFlters = selectedCategory.includes("All")
        ? [filter]
        : [...selectedCategory, filter];
      updatedFlters.forEach((item) => params.append("filter", item));
      setSelectedCategory(updatedFlters);
    } else {
      params.set("filter", "All");
      setSelectedCategory(["All"]);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Ensure product has the active main category
    const matchesMainCategory =
      activeMainCategory === "All" || product.category === activeMainCategory;

    // Check if product matches selected subcategory (or include all if "All" is selected)
    const matchesSubCategory =
      selectedCategory.includes("All") ||
      selectedCategory.some((sub) => product.tags.includes(sub));

    return matchesSearch && matchesMainCategory && matchesSubCategory;
  });

  const currentCategories =
    activeMainCategory === "All"
      ? categories[0].categories // For "All", show all subcategories from categories
      : categories.find((cat) => cat.name === activeMainCategory)
          ?.subCategories || [];

  return (
    <div className="container mx-auto px-4 py-8 pt-32">
      <h1 className="text-3xl font-bold text-black mb-8">Product Catalog</h1>

      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div className="flex space-x-4 mb-4 md:mb-0">
          <div className="flex flex-col space-y-6">
            <div>
              {categories.map((category) => (
                <Button
                  variant={"outline"}
                  key={category.name}
                  onClick={() => updateURL(category.name)}
                  className={`px-4 py-2 rounded-full ${
                    activeMainCategory === category.name
                      ? "bg-lime-500 hover:bg-lime-500/90"
                      : "bg-gray-200 text-black hover:bg-gray-300"
                  }`}
                >
                  {category.name.charAt(0).toUpperCase() +
                    category.name.slice(1)}
                </Button>
              ))}
            </div>
            <div>
              {currentCategories &&
                currentCategories.length > 0 &&
                currentCategories.map((subCategory) => (
                  <Button
                    size={"sm"}
                    variant={"outline"}
                    key={subCategory}
                    onClick={() => updateURL(activeMainCategory, subCategory)}
                    className={`mx-1 rounded-full whitespace-nowrap ${
                      selectedCategory.includes(subCategory)
                        ? "bg-lime-500  hover:bg-lime-500/90"
                        : "hover:bg-gray-300"
                    }`}
                  >
                    {subCategory}
                  </Button>
                ))}
            </div>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 lg:min-w-[350px] py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-black"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            category={product.category}
            tags={product.tags}
            price={product.price}
            rating={product.rating}
            imageUrl={product.imageUrl}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-600 mt-8">
          No products found matching your criteria.
        </p>
      )}
    </div>
  );
}
