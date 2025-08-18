import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProfilePic1 from "../assets/ProfilePic1.png";

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
    <main className="p-6 max-w-4xl mx-auto">
      <motion.div
        className="flex flex-col md:flex-row items-center gap-8 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700 transition-transform"
        whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(99,102,241,0.2)" }}
      >
        {/* Profile Image */}
        <motion.img
          src={ProfilePic1}
          alt="Vishwa Gaurav Shukla"
          className="w-48 h-48 rounded-full object-cover border-4 border-indigo-500"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        />

        {/* Bio & Skills */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold mb-4">
            Hi, I’m Vishwa Gaurav Shukla
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            I am a passionate frontend and full-stack developer who loves building modern, interactive, and scalable web applications. I enjoy experimenting with new technologies and bringing creative ideas to life.
          </p>

          {/* Skills */}
          <h2 className="text-xl font-semibold mb-2">Skills:</h2>
          <div ref={ref} className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg text-sm cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
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

export default About;
