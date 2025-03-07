"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchMemes } from "@/redux/memeSlice";
import Link from "next/link";
import MemeCard from "@/components/MemeCard";
import { motion } from "framer-motion";

const Homepage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { memes, loading, error } = useSelector(
    (state: RootState) => state.memes
  );

  useEffect(() => {
    dispatch(fetchMemes());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-20 text-center flex-grow">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🎭 Welcome to <span className="text-blue-400">Meme</span>
          <span className="text-yellow-500">🔥Verse</span> 😂🚀
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          🎉 The ultimate place to create, explore, and share hilarious memes! 📢🤣
        </motion.p>

        <Link href="/explore">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-800 text-white px-6 py-3 rounded-lg text-lg shadow-md transition"
          >
            🔍 Start Exploring 🚀
          </motion.button>
        </Link>

        {/* Meme Masonry Grid */}
        <div className="mt-10 columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {loading &&
            Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-60 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
              ></div>
            ))}
          {error && <p className="text-red-500">{error}</p>}
          {!loading &&
            !error &&
            memes.slice(0, 12).map((meme, index) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <MemeCard meme={meme} />
              </motion.div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 mt-10">
        <p className="text-sm">
          Built by{" "}
          <span className="font-semibold text-blue-400">Sagar Ganesh</span> 🎨🔥🤣
        </p>
      </footer>
    </div>
  );
};

export default Homepage;
