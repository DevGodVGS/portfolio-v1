import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative p-6 flex flex-col items-center">
      {/* Floating Envelope with subtle idle bounce */}
      <motion.button
        onClick={scrollToForm}
        className="fixed bottom-8 right-8 bg-indigo-600 dark:bg-indigo-500 text-white p-4 rounded-full shadow-lg z-50"
        whileHover={{ scale: 1.2, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -8, 0] }} // bounce up and down
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
        aria-label="Scroll to contact form"
      >
        <FaEnvelope size={24} />
      </motion.button>

      <motion.div
        ref={formRef}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full bg-white dark:bg-gray-900 shadow-xl rounded-2xl p-8 mt-6"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
          Contact Me
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-gray-200">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-gray-200">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-black dark:text-gray-200">
              Message
            </label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Write your message..."
              className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-black dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-black dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-500"
              }`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {status && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`mt-4 text-center font-medium ${status.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
          >
            {status}
          </motion.p>
        )}

        <div className="mt-8 flex justify-center gap-6">
          {[
            { icon: <FaGithub />, link: "https://github.com/DevGodVGS" },
            { icon: <FaLinkedin />, link: "https://linkedin.com/in/your-profile" },
            { icon: <FaTwitter />, link: "https://twitter.com/your-profile" },
            { icon: <FaEnvelope />, link: "mailto:you@example.com" },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-800 dark:text-gray-200 text-2xl transition-colors hover:text-indigo-500"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </main>
  );
};

export default Contact;
