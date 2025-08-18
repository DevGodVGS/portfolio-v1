import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-gray-900 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            My <span className="text-indigo-400">Portfolio</span>
          </h1>

          {/* Desktop Nav with fade-in animation */}
          <nav className="hidden md:flex gap-6 font-medium">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx, duration: 0.4 }}
              >
                <Link
                  to={link.to}
                  className={`transition-colors duration-300 ${location.pathname === link.to
                      ? "text-indigo-400 font-semibold"
                      : "text-gray-300 hover:text-indigo-400"
                    }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-300 hover:text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Nav with animation */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-gray-800 text-gray-100 flex flex-col overflow-hidden"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`transition-colors duration-300 px-4 py-3 ${location.pathname === link.to
                      ? "text-indigo-400 font-semibold bg-gray-700"
                      : "text-gray-300 hover:text-indigo-400 hover:bg-gray-700"
                    } rounded-md mx-2 my-1`}
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center p-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Vishwa Gaurav Shukla. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
