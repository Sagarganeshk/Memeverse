# 🎨 MemeVerse
MemeVerse is a feature-rich, multi-page platform designed for meme enthusiasts to explore, create, and share memes effortlessly. With a sleek UI and robust functionality, it's the perfect hub for meme lovers.

## 🌟 Key Features
- **Discover Memes**: Browse the latest and trending memes powered by the Imgflip API.
- **Create Memes**: Personalize images with custom text and overlays.
- **Optimized Performance**: Utilizes `next/image` for blazing-fast image rendering.
- **State Handling**: Seamlessly managed via Redux Toolkit.
- **Theme Toggle**: Easily switch between dark and light modes.
- **Cloud Storage**: Upload and manage memes securely with Cloudinary.
- **Enhanced Speed**: Features like lazy loading, code splitting, and caching boost performance.

## 🛠️ Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, Framer Motion
- **State Management**: Redux Toolkit
- **Image Hosting**: Cloudinary
- **Meme API**: Imgflip API (for fetching memes)
- **Deployment**: Vercel

## 🚀 Getting Started

1️⃣ **Clone the Repository**
```sh
git clone https://github.com/Sagarganeshk/Memeverse.git
cd MemeVerse
```

2️⃣ **Install Dependencies**
```sh
npm install
```

3️⃣ **Set Up Environment Variables**  
Create a `.env.local` file and add the following:
```env
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset
NEXT_PUBLIC_CLOUDINARY_API_BASE=https://api.cloudinary.com/v1_1/your_cloud_name/image/upload
```

4️⃣ **Start the Development Server**
```sh
npm run dev
```

5️⃣ **Build & Deploy to Vercel**
```sh
npm run build
vercel deploy
```

🎉 **Dive into MemeVerse and unleash your creativity!**

