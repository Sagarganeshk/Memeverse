"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { uploadMeme } from "@/redux/memeSlice";
import NextImage from "next/image";
import { motion } from "framer-motion";

const UploadPage = () => {
  const dispatch = useAppDispatch();
  const uploading = useAppSelector((state) => state.memes.uploading);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [finalImage, setFinalImage] = useState<string | null>(null);
  const [aiMeme, setAiMeme] = useState<string | null>(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      setFinalImage(null);
    }
  };

  // Generate meme preview on canvas
  const updatePreview = useCallback(() => {
    if (!previewUrl || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.src = previewUrl;

    img.onload = () => {
      const maxWidth = 500;
      const maxHeight = 500;
      let width = img.width;
      let height = img.height;

      // Resize image to fit within max dimensions
      if (width > height && width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      } else if (height > maxHeight) {
        width = (maxHeight / height) * width;
        height = maxHeight;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, width, height);

      // Add meme text
      ctx.font = "bold 30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;

      ctx.strokeText(topText, width / 2, 40);
      ctx.fillText(topText, width / 2, 40);
      ctx.strokeText(bottomText, width / 2, height - 20);
      ctx.fillText(bottomText, width / 2, height - 20);
    };
  }, [previewUrl, topText, bottomText]);

  // Automatically update preview when inputs change
  useEffect(() => {
    if (previewUrl) {
      updatePreview();
    }
  }, [previewUrl, updatePreview]);

  // Upload Meme
  const handleUpload = async (image: string | null) => {
    if (!image) return alert("Generate meme before uploading");

    try {
      const blob = await fetch(image).then((res) => res.blob());
      const file = new File([blob], "meme.png", { type: "image/png" });

      dispatch(uploadMeme({ file, caption: `${topText} - ${bottomText}` }));
      alert("Meme uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  // Download Meme
  const handleDownload = (image: string | null) => {
    if (!image) return;
    const link = document.createElement("a");
    link.href = image;
    link.download = "meme.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulated AI Meme Generation
  const generateAIMeme = () => {
    setAiGenerating(true);
    setTimeout(() => {
      setAiMeme("https://api.memegen.link/images/doge/AI_Generated/Meme.png"); // Replace with real API later
      setAiGenerating(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto p-8 m-10 border rounded-lg flex flex-col items-center gap-6
    bg-gradient-to-r from-blue-400 to-blue-600 dark:from-gray-900 dark:to-gray-700 text-white shadow-lg">
      
      {/* Upload and Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <div className="flex flex-col gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border p-2 rounded text-gray-700 bg-white"
          />
          <input
            type="text"
            placeholder="Top Text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
            className="border p-2 rounded text-center text-gray-800"
          />
          <input
            type="text"
            placeholder="Bottom Text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
            className="border p-2 rounded text-center text-gray-800"
          />
        </div>

        {/* Meme Preview */}
        <div className="flex justify-center items-center">
          {previewUrl ? (
            <canvas
              ref={canvasRef}
              className="border rounded-lg shadow-lg w-100 h-100"
            />
          ) : (
            <p className="text-gray-300">No preview available</p>
          )}
        </div>
      </div>

      {/* Generate Meme Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          if (canvasRef.current) {
            setFinalImage(canvasRef.current.toDataURL());
          }
        }}
        className="bg-yellow-500 text-black p-2 rounded font-bold"
        disabled={!previewUrl}
      >
        Generate Meme
      </motion.button>

      {/* AI Generated Meme Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={generateAIMeme}
        className="bg-purple-500 text-white p-2 rounded font-bold"
        disabled={aiGenerating}
      >
        {aiGenerating ? "Generating..." : "Generate AI Meme"}
      </motion.button>

      {/* Uploaded & AI Generated Meme Display */}
      {[finalImage, aiMeme].map(
        (image, index) =>
          image && (
            <div key={index} className="flex flex-col items-center gap-4">
              <NextImage src={image} alt="Meme" width={400} height={400} />
              <div className="flex gap-4">
                <button
                  onClick={() => handleUpload(image)}
                  className="bg-green-500 text-white p-2 rounded font-bold"
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Upload Meme"}
                </button>
                <button
                  onClick={() => handleDownload(image)}
                  className="bg-gray-700 text-white p-2 rounded font-bold"
                >
                  Download Meme
                </button>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default UploadPage;
