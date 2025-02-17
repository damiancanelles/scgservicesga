"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ReviewsSection() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/api/reviews?populate=*`);
        const data = await response.json();
        setReviews(data.data || []); // Ensure it's always an array
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Auto change reviews every 30 seconds
  useEffect(() => {
    if (reviews.length > 2) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 2) % reviews.length);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [reviews]);

  const optimizeCloudinaryImage = (url, width = 800) => {
    if (!url.includes("res.cloudinary.com")) return url; // Return original URL if not Cloudinary
    return url.replace("/upload/", `/upload/f_auto,q_auto,c_scale,w_${width}/`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        xmlns="http://www.w3.org/2000/svg"
        className={`w-6 h-6 ${i < rating ? "text-yellow-500" : "text-gray-300"}`}
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ));
  };

  if (!reviews.length) {
    return (
      <div className="bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 uppercase tracking-wide">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-gray-700">No reviews available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 uppercase tracking-wide">
          What Our Clients Say
        </h2>
        <p className="mt-4 text-center text-lg text-gray-700">
          Here's what our biggest clients had to say about our work.
        </p>

        {/* Review Cards - Displays 2 at a Time */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.slice(currentIndex, currentIndex + 2).map((review, index) => (
            <div
              key={index}
              className="relative bg-gray-100 border border-gray-300 shadow-lg rounded-lg overflow-hidden p-8 transition-opacity duration-500 ease-in-out"
            >
              {/* Image Section - Increased Size & Full Circle */}
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden flex justify-center items-center bg-gray-200">
                <Image
                  src={optimizeCloudinaryImage(review.images?.[0]?.url, 500) || "/default-profile.png"}
                  alt={review.name}
                  width={160}
                  height={160}
                  className="rounded-full object-cover"
                />
              </div>

              {/* Review Content */}
              <div className="text-center mt-4">
                <p className="text-lg italic text-gray-700 leading-relaxed">
                  "{review.description?.[0]?.children?.[0]?.text || "No description available."}"
                </p>
                <div className="mt-6">
                  <span className="text-gray-900 font-bold text-xl">{review.name}</span>
                  <p className="text-gray-600 text-lg">{review.position}</p>
                  <div className="flex justify-center mt-4">
                    {renderStars(review.rating || 0)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
