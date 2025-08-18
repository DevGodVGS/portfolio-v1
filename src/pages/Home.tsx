import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <section className="flex flex-col items-center justify-center text-center min-h-[80vh] px-6">
            {/* Hero Section */}
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-gray-900 dark:text-white">
                Hi, I’m{" "}
                <span className="text-indigo-600 dark:text-indigo-400">Vishwa Gaurav Shukla</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mb-8">
                A passionate <span className="font-semibold">Full-Stack Developer</span>{" "}
                crafting modern web apps with{" "}
                <span className="text-indigo-500">React</span>,{" "}
                <span className="text-indigo-500">TypeScript</span>, and{" "}
                <span className="text-indigo-500">Tailwind CSS</span>.
            </p>

            {/* Call to Action */}
            <div className="flex gap-4">
                <Link
                    to="/projects"
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition"
                >
                    View My Work
                </Link>
                <Link
                    to="/contact"
                    className="px-6 py-3 border border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
                >
                    Contact Me
                </Link>
            </div>

            {/* Optional Tech Stack Icons */}
            <div className="flex gap-6 mt-12 text-4xl text-gray-500 dark:text-gray-400">
                <i className="devicon-react-original colored"></i>
                <i className="devicon-typescript-plain colored"></i>
                <i className="devicon-tailwindcss-plain colored"></i>
                <i className="devicon-nodejs-plain colored"></i>
            </div>
        </section>
    );
};

export default Home;
