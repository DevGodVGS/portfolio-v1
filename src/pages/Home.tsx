import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaFileDownload, FaEnvelope } from "react-icons/fa";

const Home: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center min-h-[90vh] px-6">
            {/* Hero Section */}
            <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white"
            >
                Hi, I’m{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Vishwa Gaurav Shukla
                </span>
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mb-6"
            >
                A <span className="font-semibold">Frontend Developer</span> specializing in{" "}
                <span className="text-indigo-500">React</span>,{" "}
                <span className="text-indigo-500">TypeScript</span>,{" "}
                <span className="text-indigo-500">Tailwind CSS</span>, and{" "}
                <span className="text-indigo-500">Redux Toolkit</span>.
                Focused on building scalable, high-performance apps with seamless{" "}
                <span className="text-indigo-500">UX</span> and modern{" "}
                <span className="text-indigo-500">AI-powered integrations</span>.
            </motion.p>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="italic text-gray-500 dark:text-gray-400 mb-10"
            >
                🚀 Turning ideas into interactive digital experiences
            </motion.p>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="flex gap-4 mb-12 flex-wrap justify-center"
            >
                <Link
                    to="/projects"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition"
                >
                    View My Work
                </Link>
                <Link
                    to="/contact"
                    className="px-6 py-3 border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                >
                    Contact Me
                </Link>
                <a
                    href="/Resume.pdf"
                    download="Vishwa_Gaurav_Shukla_Resume.pdf"
                    className="px-6 py-3 flex items-center gap-2 border border-gray-400 text-gray-700 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                    <FaFileDownload /> Resume
                </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="flex gap-6 text-2xl text-gray-600 dark:text-gray-300"
            >
                <a
                    href="https://www.linkedin.com/in/vgs-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-indigo-600"
                >
                    <FaLinkedin />
                </a>
                <a
                    href="https://github.com/DevGodVGS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 dark:hover:text-white"
                >
                    <FaGithub />
                </a>
                <a
                    href="mailto:vgsofficial0707@gmail.com"
                    className="hover:text-red-500"
                >
                    <FaEnvelope />
                </a>
            </motion.div>

            {/* Contact Info */}
            <div className="mt-10 text-gray-700 dark:text-gray-300 text-sm">
                <p>+91 8887924395 | vgsofficial0707@gmail.com</p>
            </div>
        </section>
    );
};

export default Home;
