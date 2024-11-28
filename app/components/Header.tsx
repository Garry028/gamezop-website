"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  FaBars,
  FaBasketballBall,
  FaChess,
  FaGamepad,
  FaHeart,
  FaMountain,
  FaPuzzlePiece,
  FaRunning,
} from "react-icons/fa";

import { useRouter } from "next/navigation";
import { FiSearch, FiX } from "react-icons/fi";
import Logo from "../assets/gamezop-logo-dark.avif";
import Button from "./ui/Button";

const Header: React.FC = () => {
  const router = useRouter();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const navigationItems: { icon: JSX.Element; label: string }[] = [
    { icon: <FaRunning />, label: "Action" },
    { icon: <FaMountain />, label: "Adventure" },
    { icon: <FaGamepad />, label: "Arcade" },
    { icon: <FaPuzzlePiece />, label: "Puzzle & Logic" },
    { icon: <FaBasketballBall />, label: "Sports & Racing" },
    { icon: <FaChess />, label: "Strategy" },
    { icon: <FaHeart />, label: "My Favourites" },
  ];

  const onClickOnButton = (category: string) => {
    const newUrl = `?category=${encodeURIComponent(category)}`;
    router.push(newUrl);
  };

  const onSearch = () => {
    if (searchQuery.trim().length > 0) {
      const newUrl = `?search=${encodeURIComponent(searchQuery)}`;
      router.push(newUrl);
      setShowSearch(false);
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Left Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <Image src={Logo} alt="Gamezop Logo" width={140} height={40} />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-4">
          {navigationItems.map((item, index) => (
            <Button
              key={index}
              icon={item.icon}
              label={item.label}
              onClick={() => onClickOnButton(item.label)}
            />
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button
            className="p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiSearch className="w-6 h-6" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="xl:hidden p-2 rounded-full hover:bg-white hover:bg-opacity-20 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
      </nav>
      {/* Search Bar */}
      {showSearch && (
        <div className="bg-gray-100">
          <div className="container mx-auto py-2">
            <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
              <FiSearch className="text-gray-500 ml-4" />
              <input
                type="text"
                placeholder="Search for games"
                className="w-full py-2 px-4 outline-none bg-transparent text-gray-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
              />
              <button
                className="p-2"
                onClick={() => {
                  setSearchQuery("");
                  const newUrl = window.location.pathname;
                  router.push(newUrl);
                }}
              >
                <FiX className="w-5 h-5 text-gray-500 mr-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className="xl:hidden bg-white text-gray-800">
          <div className="px-6 py-4 space-y-2">
            {navigationItems.map((item, index) => (
              <Button
                key={index}
                icon={item.icon}
                label={item.label}
                fullWidth
                onClick={() => onClickOnButton(item.label)}
              />
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
