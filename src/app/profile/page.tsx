"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { updateProfile } from "@/redux/userSlice";
import AvatarUpload from "@/components/AvatarUpload";
import MemeCard from "@/components/MemeCard";
import InfiniteScroll from "@/components/InfiniteScroll";
import Image from "next/image";
import { motion } from "framer-motion";

const UserProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const uploadedMemes = useSelector((state: RootState) => state.memes.memes);

  const [name, setName] = useState(user.name || "");
  const [bio, setBio] = useState(user.bio || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(
    user.avatar || "/default-avatar.png"
  );
  const [showUploaded, setShowUploaded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [memesToShow, setMemesToShow] = useState(6);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const { name, bio, avatar } = JSON.parse(storedProfile);
      setName(name);
      setBio(bio);
      setAvatarPreview(avatar);
    }
  }, []);

  const handleAvatarUpload = (file: File) => {
    setAvatar(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatarPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProfile = () => {
    const avatarUrl = avatar ? avatarPreview : user.avatar;
    const updatedProfile = { name, bio, avatar: avatarUrl };

    dispatch(updateProfile(updatedProfile));
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  };

  const loadMoreMemes = () => {
    setLoading(true);
    setTimeout(() => {
      setMemesToShow((prev) => prev + 6);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-6 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Profile Section */}
      <motion.div
        className="bg-white dark:bg-gray-900 p-8 shadow-lg rounded-xl max-w-lg mx-auto relative text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Avatar */}
        <div className="relative w-24 h-24 mx-auto">
          <Image
            src={avatarPreview}
            alt="Avatar"
            width={100}
            height={100}
            className="rounded-full border-4 border-gray-300 dark:border-gray-700 object-cover"
          />
          <div className="absolute -bottom-2 right-2">
            <AvatarUpload onUpload={handleAvatarUpload} />
          </div>
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white text-center"
          />

          <textarea
            placeholder="Write a short bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-600 text-black dark:text-white resize-none text-center"
            rows={3}
          />

          <motion.button
            onClick={handleSaveProfile}
            whileHover={{ scale: 1.05 }}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Save Profile
          </motion.button>
        </div>
      </motion.div>

      {/* Meme Display */}
      <div className="mt-12">
        <div className="flex justify-center space-x-4">
          <motion.button
            className={`px-6 py-2 rounded-lg font-bold transition ${
              showUploaded
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-black"
                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowUploaded(true)}
          >
            Uploaded Memes
          </motion.button>
          <motion.button
            className={`px-6 py-2 rounded-lg font-bold transition ${
              !showUploaded
                ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-black"
                : "bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowUploaded(false)}
          >
            Liked Memes
          </motion.button>
        </div>

        {/* Meme Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {uploadedMemes.slice(0, memesToShow).map((meme) => (
            <motion.div
              key={meme.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <MemeCard meme={meme} />
            </motion.div>
          ))}
        </div>

        {/* Infinite Scroll */}
        <InfiniteScroll loadMore={loadMoreMemes} isLoading={loading} />
      </div>

      {/* Footer */}
      <footer className="text-center mt-12 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Built by <span className="font-semibold text-blue-600">Sagar Ganesh</span> 🚀
        </p>
      </footer>
    </div>
  );
};

export default UserProfile;
