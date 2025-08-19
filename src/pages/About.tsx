import React from "react";
import { motion } from "framer-motion";
import ProfilePic1 from "../assets/ProfilePic1.png";
import { useInView } from "react-intersection-observer";

// Skills
const skills = [
  "React",
  "TypeScript",
  "TailwindCSS",
  "Redux",
  "Node.js",
  "Vite",
  "Framer Motion",
];

const About: React.FC = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <main className="relative min-h-screen w-full p-6 flex items-center justify-center">
      {/* Neon Grid Background */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[linear-gradient(90deg,rgba(0,255,255,0.2)_1px,transparent_1px),linear-gradient(rgba(0,255,255,0.2)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        className="flex flex-col md:flex-row items-center gap-10 bg-white/10 dark:bg-gray-900/60 rounded-2xl p-8 shadow-xl border border-cyan-500/30 backdrop-blur-lg relative overflow-hidden max-w-6xl w-full mx-6"
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        {/* Neon Glow Particles */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-0 right-0 w-52 h-52 bg-purple-600/20 blur-3xl rounded-full animate-pulse" />
        <NeonParticle count={20} />

        {/* Profile Image with Scan & Glow */}
        <motion.div
          className="relative w-44 h-44 md:w-56 md:h-56 rounded-full border-4 border-cyan-400 shadow-[0_0_25px_rgba(0,255,255,0.6)] overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={ProfilePic1}
            alt="Vishwa Gaurav Shukla"
            className="w-full h-full object-cover"
          />
          {/* Scanning Line */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70"
            animate={{ y: ["0%", "100%"] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </motion.div>

        {/* Bio & Skills */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 text-center md:text-left"
        >
          {/* Name */}
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-gradient-x">
            Hi, I’m Vishwa Gaurav Shukla
          </h1>

          {/* Typing tagline */}
          <motion.p
            className="text-cyan-300 font-mono mb-6"
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ repeat: Infinity, duration: 6 }}
          >
            Frontend Developer | Full Stack Enthusiast | Innovator
          </motion.p>

          <p className="text-gray-300 mb-6 text-lg leading-relaxed max-w-lg">
            I craft <span className="text-cyan-400 font-semibold">interactive</span>
            and <span className="text-purple-400 font-semibold">scalable</span>
            applications blending clean code with futuristic design. Always curious, always building.
          </p>

          {/* Divider */}
          <div className="h-[2px] w-28 bg-gradient-to-r from-cyan-400 to-purple-500 mb-4 rounded-full mx-auto md:mx-0" />

          {/* Skills */}
          <h2 className="text-xl font-semibold mb-3 text-cyan-300">Core Skills</h2>
          <div ref={ref} className="flex flex-wrap gap-3 justify-center md:justify-start">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-4 py-2 bg-gray-800/40 border border-cyan-500/40 text-cyan-300 rounded-lg text-sm font-medium shadow-md hover:shadow-[0_0_15px_#06b6d4] transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.15 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
};

// Neon Particle Overlay Component
const NeonParticle: React.FC<{ count: number }> = ({ count }) => {
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

export default About;
