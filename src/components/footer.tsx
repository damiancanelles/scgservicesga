
"use client";

import { Footer } from "flowbite-react";
import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";

export function FooterC() {
  return (
    <Footer container>
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="https://scgservicesga.com"
              src="/logo.svg"
              alt="SCG Services Logo"
              name="SCG Services"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Follow us" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.linkedin.com/company/scg-services-llc/">Linkedin</Footer.Link>
                <Footer.Link href="https://www.instagram.com/scgservicesga?utm_source=qr&igsh=MWw1Z3pwdDR5eG45eQ==">Instagram</Footer.Link>
                <Footer.Link href="https://www.facebook.com/share/ZEREuPBU9amrQ35k/">Facebook</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="/policy">Privacy Policy</Footer.Link>
                <Footer.Link href="/terms">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="SCG Services" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="https://www.facebook.com/share/ZEREuPBU9amrQ35k/" icon={BsFacebook} />
            <Footer.Icon href="https://www.instagram.com/scgservicesga?utm_source=qr&igsh=MWw1Z3pwdDR5eG45eQ==" icon={BsInstagram} />
            <Footer.Icon href="https://www.linkedin.com/company/scg-services-llc/" icon={BsLinkedin} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
