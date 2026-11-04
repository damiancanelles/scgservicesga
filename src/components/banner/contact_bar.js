import { Mail, Phone } from "lucide-react"; // Importing Lucide icons
import { getHome } from "@/lib/content";

export default function ContactBar() {
  const contact = getHome().contact || null;
  const error = contact ? null : "Contact information not found";

  return (
    <div className="w-full bg-black py-4 text-white text-center border-t border-gray-700 px-4 lg:px-16">
      <div className="max-w-[95%] lg:max-w-[85%] mx-auto flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-16 text-gray-300 font-[Poppins] text-sm md:text-base">
        
        {/* Error Handling */}
        {error ? (
          <p className="text-red-500">Error loading contact info: {error}</p>
        ) : (
          <>
            {/* Phone Number */}
            {contact?.phone_number && (
              <p className="flex items-center space-x-3">
                <Phone size={20} className="text-red-500" />
                <span>{contact.phone_number}</span>
              </p>
            )}

            {/* Email */}
            {contact?.email && (
              <p className="flex items-center space-x-3">
                <Mail size={20} className="text-red-500" />
                <span>{contact.email}</span>
              </p>
            )}

            {/* Address - Uncomment when data is available */}
            {/* {contact?.address_first_line || contact?.city ? (
              <p className="flex items-center space-x-3">
                <MapPin size={20} className="text-red-500" />
                <span>
                  {contact.address_first_line}
                  {contact.address_second_line && `, ${contact.address_second_line}`}
                  {contact.city && `, ${contact.city}, ${contact.state} ${contact.zip_code}`}
                </span>
              </p>
            ) : null} */}
          </>
        )}
      </div>
    </div>
  );
}
