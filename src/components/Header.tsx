import { useEffect, useState } from "react";
import { Shield, Lock, AlertTriangle, Radio } from "lucide-react";

interface HeaderProps {
  systemActive?: boolean;
  emergencyLockdown: boolean;
  onLockdownToggle: () => void;
  globalRisk: number;
}

export default function Header({ systemActive = true, emergencyLockdown, onLockdownToggle, globalRisk }: HeaderProps) {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toISOString().replace("T", "  ").substring(0, 20) + " UTC");
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-slate-900/60 backdrop-blur-md border-b border-blue-500/10 px-4 py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-slate-300">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-400/30">
          <Shield className="w-5 h-5 text-cyan-400 animate-pulse" />
          <div className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-sm -z-10" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-sans font-bold text-white tracking-widest text-sm sm:text-base">
              NEXUS
            </h1>
            <span className="text-[10px] uppercase tracking-widest font-mono px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-400 border border-cyan-400/30">
              AI Core
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-400 tracking-wider">
            ECLEARNIX CYBER MONITORING STATION
          </p>
        </div>
      </div>

      {/* Realtime Telemetry Grid */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
        {/* Dynamic Threat indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${emergencyLockdown ? "bg-red-400" : "bg-cyan-400"}`}></span>
            <span className={`relative inline-flex rounded-full h-2 w-2 ${emergencyLockdown ? "bg-red-500" : "bg-cyan-500"}`}></span>
          </span>
          <span className="text-[11px] text-slate-400 tracking-widest">DECISION AUTOPILOT:</span>
          <span className={`font-semibold ${emergencyLockdown ? "text-red-400" : "text-cyan-400"}`}>
            {emergencyLockdown ? "OVERRIDE LOCKDOWN" : "INTELLIGENCE ONLINE"}
          </span>
        </div>

        {/* Live system score */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-950/40 px-2 py-1 rounded border border-blue-500/10">
          <Radio className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span className="text-[11px] text-slate-400">SYS RISK INDEX:</span>
          <span className={`font-semibold ${globalRisk > 60 ? "text-red-400 animate-pulse" : globalRisk > 30 ? "text-yellow-400" : "text-emerald-400"}`}>
            {globalRisk}%
          </span>
        </div>

        {/* Global Clock */}
        <div className="text-slate-400 tracking-wider font-mono text-[11px] bg-slate-950/20 px-2.5 py-1 rounded">
          {currentTime}
        </div>

        {/* Emergency Kill-Switch Toggle */}
        <button
          id="mitigation-emergency-btn"
          onClick={onLockdownToggle}
          className={`flex items-center gap-1.5 px-3 py-1 bg-red-950/30 border text-red-400 rounded transition-all cursor-pointer ${
            emergencyLockdown 
              ? "bg-red-500 text-white animate-pulse border-red-500 font-bold" 
              : "border-red-500/40 hover:bg-red-500/20 hover:border-red-500"
          }`}
        >
          {emergencyLockdown ? (
            <>
              <Lock className="w-3.5 h-3.5 animate-bounce" />
              <span>TERMINATE SECURE LOCKDOWN</span>
            </>
          ) : (
            <>
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>EMERGENCY LOCKDOWN</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
