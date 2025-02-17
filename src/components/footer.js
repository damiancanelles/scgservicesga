"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl + "/api/home?populate=*");
        const fetchedData = await response.json();
        setData(fetchedData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (!data || !data.contact) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  // Validate form
  const validateForm = () => {
    let newErrors = {};

    if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email.trim())) {
      newErrors.email = "Invalid email format.";
    }

    if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when user types
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop submission if validation fails

    setStatus("loading");

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: formData.email, // User's email
          name: formData.name,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" }); // Reset form
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("error");
    }
  };

  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-6">
        <div id="contact-form" className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h4 className="text-2xl font-semibold text-white mb-4">Contact Us</h4>
            <p className="text-gray-400">📞 {data.contact.phone_number}</p>
            <p className="text-gray-400">📧 {data.contact.email}</p>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-md">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-400 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={`w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-red-500"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-400 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your email"
                  className={`w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                    errors.email ? "border-red-500 focus:ring-red-500" : "focus:ring-red-500"
                  }`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-400 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Your message"
                  rows="4"
                  className={`w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 ${
                    errors.message ? "border-red-500 focus:ring-red-500" : "focus:ring-red-500"
                  }`}
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 focus:outline-none"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {/* Status Messages */}
              {status === "success" && (
                <p className="text-green-500 mt-2 text-sm">✅ Message sent successfully!</p>
              )}
              {status === "error" && (
                <p className="text-red-500 mt-2 text-sm">❌ Failed to send message.</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; 2025 SCG Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
