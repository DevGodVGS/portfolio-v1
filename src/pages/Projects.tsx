import React, { useEffect, useState, useRef, useMemo } from "react";
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
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 15 } },
  hover: { scale: 1.05, rotateX: 2, rotateY: 2, boxShadow: "0 20px 40px rgba(139,92,246,0.3)", transition: { duration: 0.3 } },
};

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
};

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [liveLinks, setLiveLinks] = useState<{ [key: string]: string }>({});
  const username = "DevGodVGS";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
        const data: Repo[] = await res.json();

        const reposWithTopics = await Promise.all(
          data.map(async (repo: any) => {
            const topicsRes = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/topics`,
              { headers: { Accept: "application/vnd.github.mercy-preview+json" } }
            );
            const topicsData = await topicsRes.json();
            return { ...repo, topics: topicsData.names || [] };
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
      } catch (err) {
        console.error(err);
      }
    };

    fetchRepos();
  }, []);

  const getRepoScreenshot = (repo: Repo) =>
    `https://raw.githubusercontent.com/${username}/${repo.name}/${repo.default_branch}/screenshot.png`;

  const useCardHover3D = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [0, 200], [10, -10]);
    const rotateY = useTransform(x, [0, 200], [-10, 10]);
    return { x, y, rotateX, rotateY };
  };

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
        {repos.map((repo) => {
          const { x, y, rotateX, rotateY } = useCardHover3D();
          return (
            <motion.div
              key={repo.id}
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
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    GitHub
                  </a>
                  {liveLinks[repo.name] && (
                    <a
                      href={liveLinks[repo.name]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:underline"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Neon Trailing Particles */}
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
    </main>
  );
};

// Reuse the same NeonTrails component as Contact
const NeonTrails: React.FC<{ count: number }> = ({ count }) => {
  const [particles, setParticles] = useState<{ x: number; y: number; dx: number; dy: number; hue: number; trail: { x: number; y: number }[] }[]>([]);

  useEffect(() => {
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

export default Projects;
