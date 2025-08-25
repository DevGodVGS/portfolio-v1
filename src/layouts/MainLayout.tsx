import React, { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

// Futuristic Background
const FuturisticBackground: React.FC = () => (
  <div className="absolute inset-0 -z-10">
    {/* Animated gradient beams */}
    <div className="absolute inset-0">
      <div className="absolute w-[200%] h-[200%] bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-pink-500/30 animate-spin-slow"></div>
    </div>
    {/* Neon grid overlay */}
    <div className="absolute inset-0 grid-pattern opacity-20"></div>
    {/* Floating glow orbs */}
    <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse-slow"></div>
    <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-50 animate-pulse-slow delay-1000"></div>
    <div className="absolute top-2/3 left-1/2 w-28 h-28 bg-pink-500 rounded-full blur-3xl opacity-40 animate-pulse-slow delay-2000"></div>
  </div>
);

const MainLayout: React.FC = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/projects", label: "Projects" },
    { to: "/resume", label: "Resume" },
  ];

  // Pre-create motion values for 3D hover effect
  const navHoverValues = navLinks.map(() => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-20, 20], [5, -5]);
    const rotateY = useTransform(x, [-20, 20], [-5, 5]);
    return { x, y, rotateX, rotateY };
  });

  return (
    <div className="relative flex flex-col min-h-screen bg-[#0a0a0f] text-gray-100 overflow-hidden">
      {/* Background */}
      <FuturisticBackground />

      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-extrabold tracking-wide text-white">
            DevGod <span className="text-indigo-400">VGS</span>
          </h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 font-medium">
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.to}
                style={{
                  rotateX: navHoverValues[idx].rotateX,
                  rotateY: navHoverValues[idx].rotateY,
                }}
                onMouseMove={(e) => {
                  const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                  navHoverValues[idx].x.set(e.clientX - rect.left - rect.width / 2);
                  navHoverValues[idx].y.set(e.clientY - rect.top - rect.height / 2);
                }}
                onMouseLeave={() => {
                  navHoverValues[idx].x.set(0);
                  navHoverValues[idx].y.set(0);
                }}
                className="cursor-pointer"
              >
                <Link
                  to={link.to}
                  className={`px-4 py-2 rounded-md transition-colors ${location.pathname === link.to
                      ? "text-indigo-400 font-semibold"
                      : "text-gray-300 hover:text-indigo-400"
                    }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Nav */}
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
      <main className="flex-grow w-full relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-md text-gray-300 text-center p-4 relative z-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Vishwa Gaurav Shukla. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
