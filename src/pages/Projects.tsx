import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const, // ← type assertion fixes TS error
      stiffness: 120,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    rotateX: 2,
    rotateY: 2,
    boxShadow: "0 20px 40px rgba(99,102,241,0.3)",
    transition: { duration: 0.3 },
  },
};

// const cardVariants = {
//   hidden: { opacity: 0, y: 40, scale: 0.95 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { type: "spring", stiffness: 120, damping: 15 },
//   },
//   hover: {
//     scale: 1.05,
//     rotateX: 2,
//     rotateY: 2,
//     boxShadow: "0 20px 40px rgba(99,102,241,0.3)",
//     transition: { duration: 0.3 },
//   },
// };

const badgeVariants: Variants = {
  hidden: { opacity: 0, y: 5 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300 }
  },
  hover: { scale: 1.1, y: -2, transition: { type: "spring" as const, stiffness: 300 } },
};

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [liveLinks, setLiveLinks] = useState<{ [key: string]: string }>({});
  const username = "DevGodVGS";

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`
        );
        const data: Repo[] = await res.json();

        const reposWithTopics = await Promise.all(
          data.map(async (repo: any) => {
            const topicsRes = await fetch(
              `https://api.github.com/repos/${username}/${repo.name}/topics`,
              {
                headers: { Accept: "application/vnd.github.mercy-preview+json" },
              }
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

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        My Projects
      </h1>

      <motion.div
        className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {repos.map((repo) => (
          <motion.div
            key={repo.id}
            className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
            variants={cardVariants}
            whileHover="hover"
          >
            <motion.img
              src={getRepoScreenshot(repo)}
              alt={repo.name}
              onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "https://via.placeholder.com/400x250?text=No+Screenshot")
              }
              className="w-full h-48 object-cover"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            />

            <div className="p-4">
              <motion.h2
                className="text-xl font-semibold mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {repo.name}
              </motion.h2>
              <motion.p
                className="text-gray-600 dark:text-gray-300 mb-3"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {repo.description || "No description available."}
              </motion.p>

              <div className="flex flex-wrap gap-2 mb-4">
                {repo.language && (
                  <motion.span
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-lg"
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
                    whileHover="hover"
                    className="text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-lg"
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
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  GitHub
                </a>
                {liveLinks[repo.name] && (
                  <a
                    href={liveLinks[repo.name]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
};

export default Projects;
