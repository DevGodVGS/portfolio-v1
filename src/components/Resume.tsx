import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiRedux, SiTailwindcss } from "react-icons/si";

// -------------------- Neon Particles --------------------
type Particle = { x: number; y: number; dx: number; dy: number; hue: number };

const NeonTrails: React.FC<{ count: number }> = ({ count }) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const particlesRef = useRef<Particle[]>([]);

    useEffect(() => {
        const arr = Array.from({ length: count }).map(() => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5,
            hue: Math.random() * 360,
        }));
        setParticles(arr);
        particlesRef.current = arr;
    }, [count]);

    useEffect(() => {
        let animationFrame: number;

        const animate = () => {
            particlesRef.current = particlesRef.current.map((p) => {
                let newX = p.x + p.dx;
                let newY = p.y + p.dy;
                if (newX < 0 || newX > window.innerWidth) p.dx *= -1;
                if (newY < 0 || newY > window.innerHeight) p.dy *= -1;
                return { ...p, x: newX, y: newY };
            });
            setParticles([...particlesRef.current]);
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    return (
        <>
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full pointer-events-none will-change-transform"
                    style={{
                        left: p.x,
                        top: p.y,
                        width: 6,
                        height: 6,
                        background: `hsl(${p.hue},100%,70%)`,
                        filter: "blur(4px)",
                    }}
                />
            ))}
        </>
    );
};

// -------------------- Futuristic Background --------------------
const FuturisticBackground: React.FC = () => (
    <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-pink-500/30 animate-spin-slow" />
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-50 animate-pulse-slow delay-1000" />
        <div className="absolute top-2/3 left-1/2 w-28 h-28 bg-pink-500 rounded-full blur-3xl opacity-40 animate-pulse-slow delay-2000" />
    </div>
);

// -------------------- Scroll Progress Bar --------------------
const FuturisticProgressBar: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const height = useTransform(scrollYProgress, [0, 1], [4, 8]);

    return (
        <motion.div className="fixed top-0 left-0 w-full z-50" style={{ height }}>
            <motion.div
                className="h-full rounded-r-full overflow-hidden shadow-[0_0_15px_rgba(0,255,255,0.8)]"
                style={{ width }}
            >
                <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-shimmer" />
            </motion.div>
        </motion.div>
    );
};

// -------------------- Modal Component --------------------
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-[#12121a] w-full max-w-5xl rounded-2xl shadow-2xl relative overflow-hidden"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                >
                    <button
                        onClick={onClose}
                        className="text-red-400 hover:text-red-500 absolute top-4 right-4 z-10"
                    >
                        ✕
                    </button>
                    {children}
                </motion.div>
            </motion.div>
        )}
    </AnimatePresence>
);

// -------------------- Resume Component --------------------
const Resume: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const skills = [
        { icon: <FaReact size={40} />, color: "text-blue-500" },
        { icon: <FaNodeJs size={40} />, color: "text-green-600" },
        { icon: <SiTypescript size={40} />, color: "text-blue-600" },
        { icon: <SiTailwindcss size={40} />, color: "text-sky-500" },
        { icon: <SiRedux size={40} />, color: "text-purple-600" },
    ];

    const randomPositions = [
        { top: "10%", left: "15%" },
        { top: "20%", right: "12%" },
        { bottom: "18%", left: "25%" },
        { bottom: "25%", right: "20%" },
        { top: "50%", left: "5%" },
    ];

    return (
        <section className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden px-6">
            <FuturisticBackground />
            <NeonTrails count={25} />

            {/* View Resume Button */}
            <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold shadow-2xl hover:scale-105 transition relative z-10"
                onClick={() => setIsModalOpen(true)}
                whileHover={{
                    scale: 1.08,
                    rotate: 5,
                    boxShadow: "0 0 20px #8B5CF6, 0 0 40px #EC4899",
                }}
            >
                Unleash My Potential
            </motion.button>

            {/* Floating Skill Icons */}
            {skills.map((skill, i) => (
                <div
                    key={i}
                    className={`absolute ${skill.color} float-skill`}
                    style={randomPositions[i]}
                >
                    <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 shadow-lg hover:scale-110 transition-transform">
                        {skill.icon}
                    </div>
                </div>
            ))}

            {/* Resume Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-6 flex justify-center items-center h-[80vh]">
                    <iframe
                        src="/Vishwa_Gaurav_Shukla_Resume.pdf"
                        title="Resume"
                        width="100%"
                        height="100%"
                        className="shadow-lg rounded-xl"
                    />
                </div>
            </Modal>

            <FuturisticProgressBar />

            <style>{`
        @keyframes gradientShift {
          0% { background-position:0% 50%; }
          50% { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradientShift 5s ease infinite; }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(15deg); }
        }
        .float-skill { animation: float 6s ease-in-out infinite; will-change: transform; }
      `}</style>
        </section>
    );
};

export default Resume;
