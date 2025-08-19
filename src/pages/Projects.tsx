import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  language: string;
  topics?: string[];
  default_branch: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 15 } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
};

// ------------------ Card Component ------------------
const ProjectCard: React.FC<{ repo: Repo; liveLink?: string; username: string }> = ({ repo, liveLink, username }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const getRepoScreenshot = (repo: Repo) =>
    `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/screenshot.png`;

  return (
    <motion.div
      className="bg-gray-900 rounded-2xl overflow-hidden border border-indigo-700 shadow-xl cursor-pointer relative"
      variants={cardVariants}
      style={{ rotateX, rotateY }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left - rect.width / 2);
        y.set(e.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.img
        src={getRepoScreenshot(repo)}
        alt={repo.name}
        onError={(e) =>
        ((e.target as HTMLImageElement).src =
          "https://via.placeholder.com/400x250?text=No+Screenshot")
        }
        className="w-full h-48 object-cover border-b border-indigo-700"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <div className="p-4">
        <motion.h2
          className="text-xl font-semibold mb-2 text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {repo.name}
        </motion.h2>

        <motion.p
          className="text-gray-300 mb-3"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {repo.description || "No description available."}
        </motion.p>

        <div className="relative flex flex-wrap gap-2 mb-4">
          {repo.language && (
            <motion.span
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2, textShadow: "0 0 8px #8B5CF6" }}
              className="text-sm bg-gray-800 text-white px-2 py-1 rounded-lg"
            >
              {repo.language}
            </motion.span>
          )}
          {repo.topics?.map((topic, idx) => (
            <motion.span
              key={idx}
              variants={badgeVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.2, rotate: [0, 10, -10, 0], textShadow: "0 0 8px #EC4899" }}
              className="text-sm bg-gray-800 text-white px-2 py-1 rounded-lg"
            >
              {topic}
            </motion.span>
          ))}
        </div>

        <div className="flex justify-between">
          <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            GitHub
          </a>
          {liveLink && (
            <a href={liveLink} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// ------------------ Main Projects Component ------------------
const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [liveLinks, setLiveLinks] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const username = "DevGodVGS";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        if (!res.ok) throw new Error(`GitHub API responded with status ${res.status}`);
        const data: Repo[] = await res.json();

        const reposWithTopics = await Promise.all(
          data.map(async (repo: any) => {
            try {
              const topicsRes = await fetch(`https://api.github.com/repos/${username}/${repo.name}/topics`, {
                headers: { Accept: "application/vnd.github.mercy-preview+json" },
              });
              const topicsData = await topicsRes.json();
              return { ...repo, topics: topicsData.names || [] };
            } catch {
              return { ...repo, topics: [] };
            }
          })
        );
        setRepos(reposWithTopics);

        const liveLinksMap: { [key: string]: string } = {};
        await Promise.all(
          reposWithTopics.map(async (repo) => {
            const url = `https://${username}.github.io/${repo.name}/`;
            try {
              const resp = await fetch(url, { method: "HEAD" });
              if (resp.ok) liveLinksMap[repo.name] = url;
            } catch { }
          })
        );
        setLiveLinks(liveLinksMap);
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading || error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
        <motion.h1
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500"
          animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          VGS
        </motion.h1>
        {error && <p className="mt-6 text-red-400 text-lg text-center">{error}</p>}
      </div>
    );
  }

  return (
    <main className="relative p-6 flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden">
      <h1 className="relative text-4xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 animate-gradient-x">
        My Projects
        <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 blur-xl opacity-30 animate-gradient-x"></span>
      </h1>

      <motion.div
        className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {repos.map((repo) => (
          <ProjectCard
            key={repo.id}
            repo={repo}
            liveLink={liveLinks[repo.name]}
            username={username}
          />
        ))}
      </motion.div>

      <NeonTrailsCanvas count={25} />

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradientShift 5s ease infinite; }
      `}</style>
    </main>
  );
};

// ------------------ Canvas Neon Trails ------------------
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

export default Projects;
