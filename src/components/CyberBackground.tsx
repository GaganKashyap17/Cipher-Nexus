import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function CyberBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number }>>([]);

  useEffect(() => {
    // Generate static random positioning for cyber ambient points
    const pts = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 10
    }));
    setParticles(pts);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-slate-950 pointer-events-none -z-50 select-none">
      {/* Laser grid effect */}
      <div 
        className="absolute inset-0 opacity-[0.03] sm:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px"
        }}
      />

      {/* Cyber ambient radial glowing orbs */}
      <div className="absolute top-[10%] left-[20%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-blue-600/10 blur-[100px] sm:blur-[150px] animate-pulse" />
      <div className="absolute bottom-[10%] right-[15%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-purple-600/10 blur-[80px] sm:blur-[130px] animate-pulse [animation-duration:8s]" />
      <div className="absolute top-[50%] left-[60%] w-[150px] sm:w-[250px] h-[150px] sm:h-[250px] rounded-full bg-cyan-500/5 blur-[50px] sm:blur-[100px] animate-pulse [animation-duration:5s]" />

      {/* Futuristic scanning horizontal line */}
      <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent top-0 animate-[scan_6s_linear_infinite]" />

      {/* Floating data particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-cyan-400/30"
          initial={{ top: `${p.y}%`, left: `${p.x}%` }}
          animate={{
            y: ["0px", "-40px", "0px"],
            opacity: [0.1, 0.6, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: "0 0 8px rgb(34, 211, 238)",
          }}
        />
      ))}

      {/* Dynamic Keyframes for the scanning line */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
