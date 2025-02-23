import { Mail, Phone } from "lucide-react"; // Importing Lucide icons

export default async function ContactBar() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  let contact = null;
  let error = null;

  try {
    const response = await fetch(`${apiUrl}/api/home?populate=*`, {
      cache: "no-store", // Ensures fresh data is fetched every request
    });

    if (!response.ok) throw new Error("Failed to fetch contact information");

    const fetchedData = await response.json();
    contact = fetchedData?.data?.contact || null;

    if (!contact) {
      throw new Error("Contact information not found in API response");
    }
  } catch (err) {
    error = err.message;
  }

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
