import ContactFormFooter from "./footerContactForm";

export default async function Footer() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const responseData = await fetch(apiUrl + "/api/home?populate=*");
  const data = await responseData.json();

  if (!data.data || !data.data.contact) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <footer className="bg-black py-12">
      <div className="container mx-auto px-6">
        <div id="contact-form" className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h4 className="text-2xl font-semibold text-white mb-4">Contact Us</h4>
            <p className="text-gray-400">📞 {data.data.contact.phone_number}</p>
            <p className="text-gray-400">📧 {data.data.contact.email}</p>
          </div>

          {/* Contact Form */}
          <ContactFormFooter /> {/* ✅ Now using the separate component */}
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; 2025 SCG Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
