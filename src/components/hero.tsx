import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroImg from "@/assets/heders-hero.jpg";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-zinc-100 to-zinc-300 py-24 flex items-center">
      <div className="container mx-auto px-6 lg:px-8 flex flex-col space-y-6 lg:flex-row lg:space-y-0 items-center justify-evenly">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="max-w-md xl:max-w-xl text-center lg:text-left"
        >
          <h1 className="text-5xl xl:text-6xl text-pretty font-extrabold tracking-tight text-zinc-900">
            Elevate Your Workstation Gear
          </h1>
          <p className="mt-6 md:text-lg xl:text-xl text-zinc-700">
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
              className="border-zinc-700 text-gray-900 hover:bg-gray-200"
            >
              Shop DLX Collection
            </Button>
          </div>
        </motion.div>

        {/* Right Image */}
        <div className="h-[43rem] overflow-hidden rounded-2xl">
          <img
            src={HeroImg.src}
            alt="Premium Headphones"
            width={500}
            height={400}
            className=" shadow-2xl object-contain rounded-2xl object-bottom"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
