import { motion } from "framer-motion";

const brands = [
  "/logos/logitech.png",
  "/logos/razer.png",
  "/logos/corsair.png",
  "/logos/steelseries.png",
  "/logos/hyperx.png",
  // "/logos/asus.png",
  // "/logos/msi.png",
  // "/logos/alienware.png",
];

const SCROLL_SPEED = 10; // Speed of each scroll cycle (in seconds)

export default function BrandScroller() {
  return (
    <div className="relative w-full overflow-hidden py-4 bg-white">
      <div className="w-full flex items-center">
        {/* Wrapper for seamless looping */}
        <motion.div
          className="flex space-x-12"
          animate={{ x: [0, -1000] }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          }}
        >
          {/* Duplicate logos to create an infinite loop */}
          {[...brands, ...brands].map((brand, index) => (
            <div key={index} className="flex-shrink-0 w-32">
              <img
                src={brand}
                alt="Brand Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
