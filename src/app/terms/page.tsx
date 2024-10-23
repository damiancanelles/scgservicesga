// pages/terms-and-conditions.tsx
import Head from 'next/head';

const TermsAndConditions = () => {
  const terms = `
    Welcome to Your Junk Removal Company!
    These terms and conditions outline the rules and regulations for the use of our services.
    By booking a service with us, you accept these terms. We aim to provide clean, efficient junk removal, 
    but we reserve the right to refuse any material deemed hazardous or illegal.
    Payment must be made in full upon completion of services. 
    Liability is limited to the services provided, and we are not responsible for any accidental damage to property. 
    Enjoy a clutter-free home or office!
  `;

  return (
    <div className="flex flex-col items-center px-4 py-8 md:pt-40">
      <Head>
        <title>Terms and Conditions</title>
      </Head>
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Say Goodbye to Junk, Hello to Clean</h1>
      </header>
      <section className="max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Terms and Conditions</h2>
        <article className="text-gray-700 leading-relaxed">
          <p>{terms}</p>
        </article>
      </section>
      <footer className="text-center mt-8">
        <p className="text-gray-500">&copy; 2024 Your Junk Removal Company</p>
      </footer>
    </div>
  );
};

export default TermsAndConditions;
