import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaFileDownload } from "react-icons/fa";

type FormData = { name: string; email: string; message: string };

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await emailjs.send(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        { user_name: formData.name, user_email: formData.email, message: formData.message },
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

  const socialLinks = [
    { icon: <FaGithub />, link: "https://github.com/DevGodVGS" },
    { icon: <FaLinkedin />, link: "https://linkedin.com/in/your-profile" },
    { icon: <FaTwitter />, link: "https://twitter.com/your-profile" },
    { icon: <FaEnvelope />, link: "mailto:you@example.com" },
  ];

  return (
    <main className="relative p-6 flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black overflow-hidden">
      {/* Floating Neon Envelope */}
      <button
        onClick={scrollToForm}
        className="fixed bottom-8 right-8 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl z-50 animate-bounce hover:scale-125 transition-transform"
        aria-label="Scroll to contact form"
      >
        <FaEnvelope size={26} />
      </button>

      {/* Contact Card */}
      <div
        ref={formRef}
        className="max-w-lg w-full bg-gray-900 rounded-3xl shadow-xl p-8 mt-12 relative z-10 animate-fade-in"
      >
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
                className="w-full border border-indigo-600/40 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
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
              className="w-full border border-indigo-600/40 rounded-xl p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold text-white transition ${loading ? "bg-gray-600 cursor-not-allowed" : "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg hover:scale-105 transition-transform"}`}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Status */}
        {status && (
          <div className={`mt-4 text-center font-medium text-lg ${status.startsWith("✅") ? "text-green-400" : "text-red-500"}`}>
            {status}
          </div>
        )}

        {/* Social Icons */}
        <div className="mt-8 flex justify-center gap-6 relative">
          {socialLinks.map((social, idx) => (
            <a
              key={idx}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white text-2xl transition-transform hover:scale-125 hover:text-indigo-400"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Canvas Neon Trails */}
      <NeonTrailsCanvas count={25} />

      <style>{`
        @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .animate-gradient-x { background-size: 200% 200%; animation: gradientShift 5s ease infinite; }

        @keyframes fadeIn { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
        .animate-fade-in { animation: fadeIn 0.8s ease forwards; }

        @keyframes bounce { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
        .animate-bounce { animation: bounce 2s infinite; }
      `}</style>
    </main>
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

export default Contact;
