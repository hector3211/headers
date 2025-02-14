import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroImg from "@/assets/headphone-hero.jpg";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-zinc-100 to-zinc-300 py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="max-w-xl text-center lg:text-left"
        >
          <h1 className="text-5xl md:text-6xl text-pretty font-extrabold tracking-tight text-gray-900">
            Elevate Your Setup With Headers
          </h1>
          <p className="mt-6 text-xl text-gray-700">
            Explore our premium collection of keyboards, mice, headphones, and
            more. Whether you're gaming, working, or creating, find the perfect
            gear to enhance your experience.
          </p>
          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4 justify-center lg:justify-start">
            <a href={`/products?category=All&filter=All`}>
              <Button
                size="lg"
                className="text-white shadow-lg bg-lime-500 hover:bg-lime-500/90"
              >
                Shop Now
                <ArrowUpRight />
              </Button>
            </a>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-700 text-gray-900 hover:bg-gray-200"
            >
              Shop DLX Collection
            </Button>
          </div>
        </motion.div>

        {/* Right Image */}
        <div className="hidden md:block">
          <img
            src={HeroImg.src}
            alt="Premium Headphones"
            width={450}
            height={600}
            className="rounded-xl shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
