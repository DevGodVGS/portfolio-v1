import React, { useState, useEffect, useRef, useMemo } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

type FormData = {
  name: string;
  email: string;
  message: string;
};

type Particle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  hue: number;
  trail: { x: number; y: number }[];
};

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        {
          user_name: formData.name,
          user_email: formData.email,
          message: formData.message,
        },
        "YOUR_PUBLIC_KEY"
      );
      setStatus("✅ Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("❌ Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth" });

  const socialLinks = useMemo(
    () => [
      { icon: <FaGithub />, link: "https://github.com/DevGodVGS" },
      { icon: <FaLinkedin />, link: "https://linkedin.com/in/your-profile" },
      { icon: <FaTwitter />, link: "https://twitter.com/your-profile" },
      { icon: <FaEnvelope />, link: "mailto:you@example.com" },
    ],
    []
  );

  return (
    <main className="relative p-6 flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden">
      {/* Floating Neon Envelope */}
      <motion.button
        onClick={scrollToForm}
        className="fixed bottom-8 right-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl z-50"
        whileHover={{ scale: 1.3, rotate: 20, boxShadow: "0 0 25px #8B5CF6, 0 0 50px #EC4899" }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        aria-label="Scroll to contact form"
      >
        <FaEnvelope size={26} className="drop-shadow-lg" />
      </motion.button>

      {/* Contact Card */}
      <motion.div
        ref={formRef}
        className="max-w-lg w-full bg-gray-900 rounded-3xl shadow-xl p-8 mt-12 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Heading */}
        <h1 className="relative text-4xl font-extrabold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 animate-gradient-x">
          Contact Me
          <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 blur-xl opacity-30 animate-gradient-x"></span>
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {(["name", "email"] as (keyof FormData)[]).map((field) => (
            <div key={field}>
              <label className="block text-sm font-semibold mb-1 text-indigo-300 capitalize">
                {field === "name" ? "Your Name" : "Your Email"}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                placeholder={field === "email" ? "you@example.com" : "John Doe"}
                className="w-full border border-indigo-600/40 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.7)] transition"
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold mb-1 text-indigo-300">Message</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message..."
              className="w-full border border-indigo-600/40 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:shadow-[0_0_15px_rgba(99,102,241,0.7)] transition resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition relative overflow-hidden ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg"
              }`}
            whileHover={
              loading
                ? {}
                : { scale: 1.05, boxShadow: "0 0 20px #8B5CF6, 0 0 40px #EC4899, 0 0 60px #F472B6" }
            }
          >
            {loading ? "Sending..." : "Send Message"}
            {!loading && (
              <span
                className="absolute inset-0 rounded-xl bg-white opacity-10 animate-pulse pointer-events-none"
                style={{ mixBlendMode: "screen" }}
              />
            )}
          </motion.button>
        </form>

        {/* Status */}
        {status && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1] }}
            transition={{ duration: 1, repeat: 3 }}
            className={`mt-4 text-center font-medium text-lg ${status.startsWith("✅") ? "text-green-400 drop-shadow-md" : "text-red-500 drop-shadow-md"
              }`}
          >
            {status}
          </motion.div>
        )}

        {/* Social Icons */}
        <div className="mt-8 flex justify-center gap-6 relative">
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl drop-shadow-lg"
              animate={{
                scale: [1, 1.3, 1],
                textShadow: [
                  "0 0 0px #8B5CF6, 0 0 0px #EC4899",
                  "0 0 15px #8B5CF6, 0 0 30px #EC4899",
                  "0 0 0px #8B5CF6, 0 0 0px #EC4899",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
              whileHover={{ scale: 1.4, rotate: 360 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Particle Trails */}
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

// Neon Trailing Particles
const NeonTrails: React.FC<{ count: number }> = ({ count }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

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

export default Contact;
