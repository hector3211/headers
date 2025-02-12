"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const reasons = [
  "Fast and Reliable Performance",
  "Seamless User Experience",
  "Advanced Security Features",
  "Highly Customizable Options",
  "24/7 Customer Support",
];

export default function Features() {
  return (
    <section className="relative py-16 md:py-24 min-h-[calc(100vh-10rem)] bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-16 text-center">
        {/* Title with subtle fade-in */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="text-4xl font-bold text-zinc-800 text-pretty tracking-tight"
        >
          Why <span className="text-zinc-900 text-[45px]">Headers</span>
        </motion.h2>

        <p className="mt-4 text-lg text-zinc-700">
          Discover the top reasons why our platform stands out.
        </p>

        {/* Animated Features */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
          {reasons.map((reason) => (
            <motion.div
              key={reason}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
              }}
              className="flex items-center space-x-4 p-4 bg-white shadow-lg rounded-2xl hover:scale-105 transition-transform duration-300"
            >
              <CheckCircle className="h-8 w-8 text-lime-500 flex-shrink-0" />
              <span className="text-lg text-gray-800 font-medium">
                {reason}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
