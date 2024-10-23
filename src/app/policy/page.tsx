// pages/privacy-policy.tsx
import Head from 'next/head';

const PrivacyPolicy = () => {
  const privacyPolicy = `
    Your Junk Removal Company is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, 
    and protect any information that you provide when using our website and services.
    
    1. **Information We Collect:** We may collect personal information such as your name, contact details, and payment information 
    when you book a service with us. We also collect non-personal information like your IP address for analytics purposes.
    
    2. **How We Use Your Information:** The personal information we collect is used to process your requests, communicate with you, 
    and improve our services. We will never sell, distribute, or lease your personal information to third parties unless required by law.
    
    3. **Security:** We are committed to ensuring that your information is secure. We have implemented suitable physical, electronic, 
    and managerial procedures to safeguard and secure the information we collect online.
    
    4. **Cookies:** Our website may use cookies to enhance your experience. You can choose to accept or decline cookies through your browser settings.
    
    5. **Third-Party Links:** Our website may contain links to other sites. We are not responsible for the privacy practices or content of 
    third-party websites.

    6. **Your Consent:** By using our services, you consent to the collection and use of your information as described in this Privacy Policy. 
    We may update this policy from time to time, so please check this page periodically.
    
    If you have any questions regarding this Privacy Policy, please contact us at privacy@yourjunkremovalcompany.com.
  `;

  return (
    <div className="flex flex-col items-center px-4 py-8 md:pt-40">
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
      </header>
      <section className="max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Your Privacy Matters</h2>
        <article className="text-gray-700 leading-relaxed whitespace-pre-line">
          <p>{privacyPolicy}</p>
        </article>
      </section>
      <footer className="text-center mt-8">
        <p className="text-gray-500">&copy; 2024 Your Junk Removal Company</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
