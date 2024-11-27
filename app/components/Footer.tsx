import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import IconGamezop from "../assets/gamezop-logo-dark.avif";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-x-10">
          {/* Logo and Description */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <div className="flex items-center mb-4">
              <Image
                src={IconGamezop}
                alt="Gamezop Logo"
                width={150}
                height={50}
              />
            </div>
            <p className="text-sm leading-relaxed">
              Gamezop is a plug-and-play gaming platform that any app or website
              can integrate to bring casual gaming for its users. Gamezop also
              operates Quizzop, a quizzing platform, that digital products can
              add as a trivia section.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Partner With Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media and Contact */}
          <div className="md:w-1/3">
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-white hover:text-gray-300">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <FaLinkedinIn size={24} />
              </a>
            </div>
            <p className="text-sm leading-relaxed">
              Increase ad revenue and engagement on your app / website with
              games, quizzes, astrology, and cricket content. Visit:{" "}
              <a
                href="https://business.gamezop.com"
                className="underline hover:text-gray-300"
              >
                business.gamezop.com
              </a>
            </p>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-300 my-8"></div>

        {/* Bottom Section */}
        <div className="text-center text-sm">
          © 2024 Advergame Technologies Pvt. Ltd. (&quot;ATPL&quot;). Gamezop® &
          Quizzop® are registered trademarks of ATPL.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
