"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User } from "lucide-react";
import { useStore } from "@nanostores/react";
import { shoppingCart } from "@/stores/cart-store";

const Links = [
  {
    title: "What's New",
    catagory: "All",
    filter: "New",
  },
  {
    title: "Products",
    catagory: "All",
    filter: "All",
  },
  {
    title: "Sale",
    catagory: "All",
    filter: "Sale",
  },
];

export default function Nav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const $cartItems = useStore(shoppingCart);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full transition-all duration-300 z-10 ${
        isScrolled
          ? "bg-white shadow-sm bg-opacity-90 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <span
                className={`text-4xl font-bold tracking-tighter text-primary`}
              >
                Headers
              </span>
            </a>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {Links.map((item, idx) => {
                  return (
                    <a
                      key={idx}
                      href={`/products?category=${item.catagory}${item.filter && `&filter=${item.filter}`}`}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isScrolled
                          ? "text-zinc-600 hover:text-primary"
                          : "text-zinc-500 hover:text-white hover:bg-zinc-700"
                      }`}
                    >
                      {item.title}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className={`mr-2 ${isScrolled ? "text-zinc-600" : ""}`}
            >
              <User className="h-5 w-5" />
              <span className="sr-only">User account</span>
            </Button>
            <a href="/cart">
              <Button
                variant="ghost"
                size="icon"
                className={isScrolled ? "text-zinc-600" : ""}
              >
                <ShoppingCart className="size-5" />
                <span
                  className={`size-4 ${$cartItems.length && "text-destructive"}`}
                >
                  {$cartItems.length}
                </span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
