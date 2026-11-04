/** @type {import('next').NextConfig} */
const nextConfig = {
    // Fully static site: `next build` writes plain HTML/CSS/JS to ./out
    output: "export",
    reactStrictMode: false,
    images: {
        // No image server in a static export; Cloudinary URLs are already
        // resized/optimized via transformation params in the components.
        unoptimized: true,
    },
};

export default nextConfig;
