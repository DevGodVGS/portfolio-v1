import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub, FaFileDownload, FaEnvelope } from "react-icons/fa";

const Home: React.FC = () => {
    return (
        <section className="relative flex flex-col items-center justify-center text-center min-h-[90vh] px-6 overflow-hidden bg-gradient-to-br from-gray-900 via-indigo-900 to-black">

            {/* Hero Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 animate-gradient-x leading-tight relative">
                    Hi, I’m{" "}
                    <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
                        Vishwa Gaurav Shukla
                    </span>
                    <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 blur-xl opacity-30 animate-gradient-x"></span>
                </h1>

                <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 animate-fade-in-out">
                    A <span className="font-semibold text-indigo-400">Frontend Developer</span> specializing in{" "}
                    <span className="text-indigo-400 font-medium">React</span>,{" "}
                    <span className="text-indigo-400 font-medium">TypeScript</span>,{" "}
                    <span className="text-indigo-400 font-medium">Tailwind CSS</span>, and{" "}
                    <span className="text-indigo-400 font-medium">Redux Toolkit</span>.
                    Focused on building scalable, high-performance apps with seamless{" "}
                    <span className="text-indigo-400 font-medium">UX</span> and modern{" "}
                    <span className="text-indigo-400 font-medium">AI-powered integrations</span>.
                </p>

                <p className="italic text-gray-500 mb-12 animate-fade-in-out">Turning ideas into interactive digital experiences</p>

                {/* Call to Action Buttons */}
                <div className="flex gap-4 mb-12 flex-wrap justify-center">
                    <Link
                        to="/projects"
                        className="min-w-[160px] h-12 px-6 flex items-center justify-center gap-2 font-semibold rounded-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white shadow-lg hover:scale-105 transition-transform"
                    >
                        View My Work
                    </Link>
                    <Link
                        to="/contact"
                        className="min-w-[160px] h-12 px-6 flex items-center justify-center gap-2 font-semibold rounded-lg border border-indigo-400 text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 shadow-md transition"
                    >
                        Contact Me
                    </Link>
                    <a
                        href="/Resume.pdf"
                        download="Vishwa_Gaurav_Shukla_Resume.pdf"
                        className="min-w-[160px] h-12 px-6 flex items-center justify-center gap-2 font-semibold rounded-lg border border-gray-400 text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-md transition"
                    >
                        <FaFileDownload /> Resume
                    </a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-6 justify-center text-3xl text-gray-300 mb-8">
                    <a href="https://www.linkedin.com/in/vgs-profile" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 hover:scale-125 hover:text-indigo-400 transition-all">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/DevGodVGS" target="_blank" rel="noopener noreferrer" className="hover:-translate-y-1 hover:scale-125 hover:text-indigo-400 transition-all">
                        <FaGithub />
                    </a>
                    <a href="mailto:vgsofficial0707@gmail.com" className="hover:-translate-y-1 hover:scale-125 hover:text-indigo-400 transition-all">
                        <FaEnvelope />
                    </a>
                </div>

                {/* Contact Info */}
                <div className="mt-4 text-gray-400 text-sm animate-fade-in-out">
                    <p>+91 8887924395 | vgsofficial0707@gmail.com</p>
                </div>
            </div>

            {/* Canvas Neon Trails */}
            <NeonTrailsCanvas count={25} />

            {/* Styles */}
            <style>{`
        @keyframes gradientShift { 0% {background-position:0% 50%} 50% {background-position:100% 50%} 100% {background-position:0% 50%} }
        .animate-gradient-x { background-size: 200% 200%; animation: gradientShift 5s ease infinite; }

        @keyframes fadeInOut { 0%,20%,80%,100% {opacity:0;} 40%,60% {opacity:1;} }
        .animate-fade-in-out { animation: fadeInOut 6s infinite; }
      `}</style>
        </section>
    );
};

// Canvas-based Neon Trails
const NeonTrailsCanvas: React.FC<{ count: number }> = ({ count }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particlesRef = useRef<{ x: number; y: number; dx: number; dy: number; hue: number }[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener("resize", resize);
        resize();

        particlesRef.current = Array.from({ length: count }).map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: (Math.random() - 0.5) * 1.5,
            dy: (Math.random() - 0.5) * 1.5,
            hue: Math.random() * 360,
        }));

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach(p => {
                p.x += p.dx; p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
                ctx.fillStyle = `hsl(${p.hue},100%,70%)`;
                ctx.shadowColor = `hsl(${p.hue},100%,70%)`;
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animate);
        };
        animate();

        return () => window.removeEventListener("resize", resize);
    }, [count]);

    return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
};

export default Home;
