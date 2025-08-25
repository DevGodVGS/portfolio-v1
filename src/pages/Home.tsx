import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion"; // type-only import
import { FaLinkedin, FaGithub, FaFileDownload, FaEnvelope } from "react-icons/fa";


// Properly typed Variants
const container: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.42, 0, 0.58, 1], // cubic-bezier array for TS compatibility
        },
    },
};

const Home: React.FC = () => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
            {/* Hero Content */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative z-10 max-w-4xl mx-auto px-4"
            >
                <motion.h1
                    variants={fadeUp}
                    className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 animate-gradient-x leading-tight relative"
                >
                    Hi, I’m{" "}
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                        Vishwa Gaurav Shukla
                    </span>
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 blur-xl opacity-30 animate-gradient-x"></span>
                </motion.h1>

                <motion.p
                    variants={fadeUp}
                    className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6"
                >
                    A <span className="font-semibold text-indigo-400">Frontend Developer</span> specializing in{" "}
                    <span className="text-indigo-400 font-medium">React</span>,{" "}
                    <span className="text-indigo-400 font-medium">TypeScript</span>,{" "}
                    <span className="text-indigo-400 font-medium">Tailwind CSS</span>, and{" "}
                    <span className="text-indigo-400 font-medium">Redux Toolkit</span>.
                    Focused on building scalable, high-performance apps with seamless{" "}
                    <span className="text-indigo-400 font-medium">UX</span> and modern{" "}
                    <span className="text-indigo-400 font-medium">AI-powered integrations</span>.
                </motion.p>

                <motion.p variants={fadeUp} className="italic text-gray-500 mb-12">
                    Turning ideas into interactive digital experiences
                </motion.p>

                {/* Call to Action Buttons */}
                <motion.div variants={fadeUp} className="flex gap-4 mb-12 flex-wrap justify-center">
                    {[
                        {
                            to: "/projects",
                            label: "View My Work",
                            type: "link",
                            style: "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform",
                        },
                        {
                            to: "/contact",
                            label: "Contact Me",
                            type: "link",
                            style: "border border-indigo-400 text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 shadow-md transition",
                        },
                        {
                            href: "/Resume.pdf",
                            label: "Resume",
                            type: "a",
                            icon: <FaFileDownload />,
                            style: "border border-gray-400 text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md transition",
                        },
                    ].map((btn, idx) => (
                        <motion.div key={idx} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
                            {btn.type === "link" ? (
                                <Link
                                    to={btn.to!}
                                    className={`min-w-[160px] h-12 px-6 flex items-center justify-center gap-2 font-semibold rounded-lg ${btn.style}`}
                                >
                                    {btn.label}
                                </Link>
                            ) : (
                                <a
                                    href={btn.href}
                                    download="Vishwa_Gaurav_Shukla_Resume.pdf"
                                    className={`min-w-[160px] h-12 px-6 flex items-center justify-center gap-2 font-semibold rounded-lg ${btn.style}`}
                                >
                                    {btn.icon} {btn.label}
                                </a>
                            )}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Social Icons */}
                <motion.div variants={fadeUp} className="flex gap-6 justify-center text-3xl text-gray-300 mb-8">
                    {[
                        { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/vgs-profile" },
                        { icon: <FaGithub />, link: "https://github.com/DevGodVGS" },
                        { icon: <FaEnvelope />, link: "mailto:vgsofficial0707@gmail.com" },
                    ].map((social, idx) => (
                        <motion.a
                            key={idx}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.3, textShadow: "0 0 10px #8B5CF6, 0 0 20px #EC4899" }}
                            whileTap={{ scale: 0.9 }}
                            className="transition-colors"
                        >
                            {social.icon}
                        </motion.a>
                    ))}
                </motion.div>

                {/* Contact Info */}
                {/* <motion.div variants={fadeUp} className="mt-4 text-gray-400 text-sm">
                    <p>+91 8887924395 | vgsofficial0707@gmail.com</p>
                </motion.div> */}
            </motion.div>

            {/* Neon Particle Trails */}
            <NeonTrails count={25} />

            <style>
                {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-x { background-size: 200% 200%; animation: gradientShift 5s ease infinite; }
        `}
            </style>
        </section>
    );
};

// Neon Trails Component
const NeonTrails: React.FC<{ count: number }> = ({ count }) => {
    const [particles, setParticles] = React.useState<
        { x: number; y: number; dx: number; dy: number; hue: number; trail: { x: number; y: number }[] }[]
    >([]);

    React.useEffect(() => {
        const arr = Array.from({ length: count }).map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            dx: (Math.random() - 0.5) * 2,
            dy: (Math.random() - 0.5) * 2,
            hue: Math.random() * 360,
            trail: [],
        }));
        setParticles(arr);
    }, [count]);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) =>
                prev.map((p) => {
                    const newX = p.x + p.dx;
                    const newY = p.y + p.dy;
                    const newTrail = [...p.trail, { x: p.x, y: p.y }].slice(-5);
                    return {
                        ...p,
                        x: newX < 0 || newX > window.innerWidth ? p.x : newX,
                        y: newY < 0 || newY > window.innerHeight ? p.y : newY,
                        dx: newX < 0 || newX > window.innerWidth ? -p.dx : p.dx,
                        dy: newY < 0 || newY > window.innerHeight ? -p.dy : p.dy,
                        trail: newTrail,
                    };
                })
            );
        }, 16);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {particles.map((p, idx) => (
                <React.Fragment key={idx}>
                    {p.trail.map((t, tIdx) => (
                        <div
                            key={tIdx}
                            className="absolute rounded-full pointer-events-none"
                            style={{
                                left: t.x,
                                top: t.y,
                                width: 6 - tIdx,
                                height: 6 - tIdx,
                                background: `hsl(${p.hue}, 100%, ${70 - tIdx * 10}%)`,
                                opacity: 0.7 - tIdx * 0.1,
                                filter: "blur(4px)",
                            }}
                        />
                    ))}
                    <div
                        className="absolute rounded-full pointer-events-none"
                        style={{
                            left: p.x,
                            top: p.y,
                            width: 6,
                            height: 6,
                            background: `hsl(${p.hue}, 100%, 70%)`,
                            filter: "blur(4px)",
                        }}
                    />
                </React.Fragment>
            ))}
        </>
    );
};

export default Home;
