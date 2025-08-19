import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiTypescript, SiRedux, SiTailwindcss } from "react-icons/si";

// Neon trailing particles
type Particle = { x: number; y: number; dx: number; dy: number; hue: number; trail: { x: number; y: number }[] };

const NeonTrails: React.FC<{ count: number }> = ({ count }) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    useEffect(() => {
        let animationFrame: number;
        const animate = () => {
            setParticles((prev) =>
                prev.map((p) => {
                    let newX = p.x + p.dx;
                    let newY = p.y + p.dy;
                    if (newX < 0 || newX > window.innerWidth) p.dx *= -1;
                    if (newY < 0 || newY > window.innerHeight) p.dy *= -1;
                    return { ...p, x: newX, y: newY };
                })
            );
            animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);


    useEffect(() => {
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

// Futuristic background
const FuturisticBackground: React.FC = () => (
    <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 w-[200%] h-[200%] bg-gradient-to-r from-cyan-500/30 via-purple-500/20 to-pink-500/30 animate-spin-slow" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-cyan-500 rounded-full blur-3xl opacity-50 animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-50 animate-pulse-slow delay-1000" />
        <div className="absolute top-2/3 left-1/2 w-28 h-28 bg-pink-500 rounded-full blur-3xl opacity-40 animate-pulse-slow delay-2000" />
    </div>
);

// Futuristic Progress Bar
const FuturisticProgressBar: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    const [scrollProgress, setScrollProgress] = useState(0);
    useEffect(() => scrollYProgress.onChange((latest) => setScrollProgress(latest * 100)), [scrollYProgress]);
    const barHeight = useTransform(scrollYProgress, [0, 1], [4, 8]);

    return (
        <motion.div className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-shimmer" style={{ width }} />
    );
};

// Resume Data
const resumeData = {
    name: "Vishwa Gaurav Shukla",
    title: "Frontend Developer",
    contact: { phone: "+91 8887924395", email: "vgsofficial0707@gmail.com", linkedin: "https://www.linkedin.com/in/vgs-profile" },
    summary: "Front-End Developer with expertise in modern tech stack, focused on building scalable, high-performance applications. Experienced in AI integration, SSO across microservices, and modernizing legacy systems.",
    education: [{ degree: "Bachelor of Technology", institution: "Ajay Kumar Garg Engineering College, Ghaziabad", period: "Aug 2019 - Jun 2023" }],
    experience: [{ role: "Associate Software Developer", company: "98th Percentile Pvt. Ltd.", period: "Mar 2024 - Present", details: ["Backend Development (Laravel + MySQL) for efficient data handling.", "Enhanced UX with jQuery/JS features and performance improvements."] }],
    skills: ["JavaScript", "TypeScript", "ReactJS", "Redux Toolkit", "Bootstrap", "Socket.io", "Node.js", "Laravel", "MySQL", "MongoDB", "JWT", "SSO", "Git", "Agile", "LLM Integration (AI)"],
};

const Resume: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalContentRef = useRef<HTMLDivElement | null>(null);

    const skills = [
        { icon: <FaReact size={40} />, color: "text-blue-500" },
        { icon: <FaNodeJs size={40} />, color: "text-green-600" },
        { icon: <SiTypescript size={40} />, color: "text-blue-600" },
        { icon: <SiTailwindcss size={40} />, color: "text-sky-500" },
        { icon: <SiRedux size={40} />, color: "text-purple-600" },
    ];

    const randomPositions = [
        { top: "10%", left: "15%" }, { top: "20%", right: "12%" }, { bottom: "18%", left: "25%" },
        { bottom: "25%", right: "20%" }, { top: "50%", left: "5%" },
    ];

    return (
        <section className="relative flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden px-6">
            <FuturisticBackground />
            <NeonTrails count={25} />

            {/* Button */}
            <motion.button
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-semibold shadow-2xl hover:scale-105 transition relative z-10"
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.08, rotate: 5, boxShadow: "0 0 20px #8B5CF6, 0 0 40px #EC4899" }}
            >
                View Resume
            </motion.button>

            {/* Floating Skill Icons */}
            {skills.map((skill, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${skill.color}`}
                    style={randomPositions[i]}
                    animate={{ y: [0, -15, 0], rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className={`absolute ${skill.color} float-skill`} style={randomPositions[i]}>
                        <div className="p-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/20 shadow-lg">
                            {skill.icon}
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Resume Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div className="bg-[#12121a] text-white max-w-5xl w-full rounded-2xl shadow-2xl relative overflow-hidden"
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}>
                            <FuturisticProgressBar />
                            <div ref={modalContentRef} className="p-8 overflow-y-auto max-h-screen">
                                <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 animate-gradient-x">{resumeData.name}</h2>
                                    <button onClick={() => setIsModalOpen(false)} className="text-red-400 hover:text-red-500">✕</button>
                                </div>
                                <h3 className="text-lg text-cyan-400">{resumeData.title}</h3>
                                <p className="text-gray-400">{resumeData.contact.phone} | {resumeData.contact.email}</p>
                                <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">LinkedIn</a>
                                <p className="mt-4 text-gray-300">{resumeData.summary}</p>

                                <h4 className="mt-6 text-xl font-semibold text-cyan-300">Skills</h4>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {resumeData.skills.map((s, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm shadow-md">{s}</span>
                                    ))}
                                </div>

                                <h4 className="mt-6 text-xl font-semibold text-cyan-300">Experience</h4>
                                {resumeData.experience.map((exp, i) => (
                                    <div key={i} className="mt-3">
                                        <p className="font-semibold">{exp.role} - {exp.company}</p>
                                        <p className="text-sm text-gray-400">{exp.period}</p>
                                        <ul className="list-disc ml-6 text-gray-300">
                                            {exp.details.map((d, idx) => <li key={idx}>{d}</li>)}
                                        </ul>
                                    </div>
                                ))}

                                <h4 className="mt-6 text-xl font-semibold text-cyan-300">Education</h4>
                                {resumeData.education.map((edu, i) => (
                                    <div key={i} className="mt-3">
                                        <p className="font-semibold">{edu.degree}</p>
                                        <p className="text-sm text-gray-400">{edu.institution} ({edu.period})</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                @keyframes gradientShift { 0% { background-position:0% 50%; } 50% { background-position:100% 50%; } 100% { background-position:0% 50%; } }
                .animate-gradient-x { background-size: 200% 200%; animation: gradientShift 5s ease infinite; }
            `}</style>
        </section>
    );
};

export default Resume;
