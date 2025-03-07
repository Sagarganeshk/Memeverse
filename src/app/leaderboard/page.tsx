"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { fetchMemes } from "@/redux/memeSlice";
import MemeCard from "@/components/MemeCard";
import { motion } from "framer-motion";

const Leaderboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const memes = useSelector((state: RootState) => state.memes.memes);

  useEffect(() => {
    if (memes.length === 0) {
      dispatch(fetchMemes());
    }
  }, [dispatch, memes.length]);

  const sortedMemes = [...memes].sort((a, b) => b.likes - a.likes);

  return (
    <div className="container mx-auto p-8 text-gray-900 dark:text-gray-100">
      {/* 🔥 Neon Animated Title */}
      <motion.h1
        className="text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 animate-pulse"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🚀🔥 MemeVerse Hall of Fame 🏆😂
      </motion.h1>

      <div className="bg-gray-200 dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <motion.h2
          className="text-2xl font-semibold text-center mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          🎖️ The Funniest of the Funniest! 🤣
        </motion.h2>

        {/* Ranking Legend */}
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">
          🥇 <span className="text-yellow-400 font-bold">Gold</span> for 1st place &nbsp;|&nbsp;
          🥈 <span className="text-gray-300 font-bold">Silver</span> for 2nd place &nbsp;|&nbsp;
          🥉 <span className="text-orange-400 font-bold">Bronze</span> for 3rd place
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sortedMemes.map((meme, index) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{
                scale: 1.1,
                rotate: index % 2 === 0 ? 2 : -2,
                boxShadow: index < 5 ? "0px 0px 20px rgba(255, 215, 0, 1)" : "0px 0px 10px rgba(0, 0, 0, 0.5)",
              }}
              className={`rounded-xl p-3 transition-transform duration-300 ${
                index === 0
                  ? "border-4 border-yellow-400"
                  : index === 1
                  ? "border-4 border-gray-300"
                  : index === 2
                  ? "border-4 border-orange-400"
                  : "border border-gray-600"
              }`}
            >
              <MemeCard meme={meme} ranking={index + 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
