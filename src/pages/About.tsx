import React, { useEffect, useRef, useState } from "react";
import ProfilePic1 from "../assets/ProfilePic1.png";
import { useInView } from "react-intersection-observer";

// Core skills
const skills = ["React", "TypeScript", "TailwindCSS", "Redux", "Node.js", "Vite", "Framer Motion"];

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main className="relative min-h-screen w-full p-6 flex items-center justify-center">
      {/* Neon Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Neon particles canvas */}
      <NeonParticleCanvas count={25} />

      <div className="flex flex-col md:flex-row items-center gap-10 bg-white/10 dark:bg-gray-900/60 rounded-2xl p-8 shadow-xl border border-cyan-500/30 backdrop-blur-lg relative overflow-hidden max-w-6xl w-full mx-6 hover:scale-105 hover:rotate-1 transition-transform duration-300">
        {/* Glow Blobs */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-52 h-52 bg-purple-600/20 blur-3xl rounded-full animate-pulse-slow delay-1000" />

        {/* Profile Image with scan line */}
        <div className="relative w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.6)] overflow-hidden">
          <img src={ProfilePic1} alt="Vishwa Gaurav Shukla" className="w-full h-full object-cover" />
          {/* Scan line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-scanline" />
        </div>

        {/* Bio & Skills */}
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
            Hi, I’m Vishwa Gaurav Shukla
          </h1>

          <p className="text-cyan-300 font-mono mb-6 animate-fade-in-out">Frontend Developer | Full Stack Enthusiast | Innovator</p>

          <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-lg">
            I craft <span className="text-cyan-400 font-semibold">interactive</span> and{" "}
            <span className="text-purple-400 font-semibold">scalable</span> applications blending clean code with futuristic design.
          </p>

          <div className="h-[2px] w-28 bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 rounded-full mx-auto md:mx-0" />

          <h2 className="text-xl font-semibold mb-3 text-cyan-300">Core Skills</h2>
          <div ref={ref} className="flex flex-wrap gap-3 justify-center md:justify-start">
            {skills.map((skill, index) => (
              <span
                key={skill}
                className={`px-4 py-2 bg-gray-800/40 border border-cyan-500/40 text-cyan-300 rounded-lg text-sm font-medium shadow-md cursor-pointer transform transition-transform duration-300 ${inView ? `animate-skill-delay-${index}` : ""
                  }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        @keyframes gradientShift {
          0% { background-position:0% 50%; }
          50% { background-position:100% 50%; }
          100% { background-position:0% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradientShift 5s ease infinite; }

        @keyframes scanline { 0% { top:0%; } 100% { top:100%; } }
        .animate-scanline { animation: scanline 2s linear infinite; }

        @keyframes fadeInOut { 0%, 20%, 80%, 100% { opacity:0; } 40%, 60% { opacity:1; } }
        .animate-fade-in-out { animation: fadeInOut 6s infinite; }

        @keyframes skillFade { 0% { opacity:0; transform: translateY(20px); } 100% { opacity:1; transform: translateY(0); } }
        ${skills.map((_, i) => `.animate-skill-delay-${i} { animation: skillFade 0.5s forwards; animation-delay: ${i * 0.1}s; }`).join("\n")}

        @keyframes pulseSlow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        .animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
      `}</style>
    </main>
  );
};

// Canvas-based Neon Particles
const NeonParticleCanvas: React.FC<{ count: number }> = ({ count }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<{ x: number; y: number; dx: number; dy: number; hue: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // initialize particles
    particlesRef.current = Array.from({ length: count }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 1.5,
      dy: (Math.random() - 0.5) * 1.5,
      hue: Math.random() * 360,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
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

export default About;
