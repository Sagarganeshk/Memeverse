"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Meme {
  id: string;
  name: string;
  url: string;
  likes: number;
  comments: number;
}

interface MemeCardProps {
  meme: Meme;
  ranking?: number;
}

const MemeCard: React.FC<MemeCardProps> = ({ meme, ranking }) => {
  const router = useRouter();

  if (!meme) return null;

  return (
    <motion.div
      className="bg-gray-200 dark:bg-gray-800 p-3 rounded-xl shadow-lg relative cursor-pointer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onClick={() => router.push(`/meme/${meme.id}`)}
    >
      {/* Ranking Badge */}
      {ranking !== undefined && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
          #{ranking}
        </div>
      )}

      {/* Image Container with Fixed Aspect Ratio */}
      <div className="w-full h-[300px] flex justify-center items-center bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
        <Image
          src={meme.url}
          alt={meme.name}
          width={300}
          height={300}
          className="rounded-lg w-full h-full object-contain"
          loading="lazy"
        />
      </div>

      {/* Meme Title */}
      <p className="mt-2 text-center font-semibold">{meme.name}</p>

      {/* Likes & Comments */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        ❤️ {meme.likes} | 💬 {meme.comments}
      </p>
    </motion.div>
  );
};

export default MemeCard;
