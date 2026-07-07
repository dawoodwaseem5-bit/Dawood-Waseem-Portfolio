"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-transparent">
      <div className="relative flex items-center justify-between py-5 px-4 md:px-8">
        {/* Logo */}
        <div className="flex flex-shrink-0 items-center">
          <Link href="/" className="text-[#16f2b3] text-3xl font-bold">
            DAWOOD WASEEM
          </Link>
        </div>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu Links */}
        <ul
          className={`${
            isOpen ? "block animate-slideDown" : "hidden"
          } absolute left-0 top-[100%] z-50 w-full bg-black/90 backdrop-blur-md md:static md:flex md:w-auto md:flex-row md:space-x-1 md:bg-transparent transition-all duration-300 ease-in-out`}
        >
          {[
            { href: "/#about", label: "ABOUT" },
            { href: "/#experience", label: "EXPERIENCE" },
            { href: "/#skills", label: "SKILLS" },
            { href: "/#education", label: "EDUCATION" },
            { href: "/#projects", label: "PROJECTS" },
          ].map((link) => (
            <li key={link.href} className="w-full md:w-auto">
              <Link
                className="block px-4 py-3 text-lg font-medium text-white transition-all duration-300 hover:text-pink-500 hover:translate-x-1"
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
