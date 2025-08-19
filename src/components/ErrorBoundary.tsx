// src/components/ErrorBoundary.tsx
import React, { Component } from "react";
import { motion } from "framer-motion";

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-center px-6 overflow-hidden">
                    {/* Neon Trails */}
                    <NeonTrails count={25} />

                    <motion.h1
                        className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 mb-6"
                        animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        VGS
                    </motion.h1>

                    <p className="text-red-400 text-lg mb-4">
                        Something went wrong. Please try again.
                    </p>

                    <button
                        onClick={this.handleRetry}
                        className="px-6 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                    >
                        Retry
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

// Neon Trails Component
const NeonTrails: React.FC<{ count: number }> = ({ count }) => {
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
