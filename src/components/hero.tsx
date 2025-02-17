import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import HeroImg from "@/assets/headers-final.jpg";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="pt-40 relative bg-gradient-to-br from-zinc-100 to-zinc-300 md:pt-0 flex items-center min-h-[calc(100vh-3rem)]">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between min-h-screen">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="max-w-md xl:max-w-2xl pl-[7%] text-center lg:text-left"
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
            <a href={`/products?category=DLX&filter=All`}>
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-700 text-gray-900 hover:bg-gray-200"
              >
                Shop DLX Collection
              </Button>
            </a>
          </div>
        </motion.div>

        {/* Right Image - Full Height */}
        <div className="hidden lg:block container ml-[8%] h-screen overflow-hidden">
          <img
            src={HeroImg.src}
            alt="Premium Headphones"
            className="w-full h-full object-cover object-center shadow-2xl"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}
