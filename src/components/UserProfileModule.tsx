import { useState } from "react";
import { 
  UserCheck, 
  Clock, 
  Smartphone, 
  MousePointer, 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  AlertOctagon 
} from "lucide-react";
import { ThreatLog } from "../types";

interface UserProfileModuleProps {
  threatLogs: ThreatLog[];
  selectedThreat: ThreatLog | null;
  onSelectThreat: (threat: ThreatLog) => void;
}

export default function UserProfileModule({ threatLogs, selectedThreat, onSelectThreat }: UserProfileModuleProps) {
  const currentThreat = selectedThreat || threatLogs[0];
  const [keystrokeLogsCount, setKeystrokeLogsCount] = useState<number[]>(
    Array.from({ length: 8 }, () => Math.floor(Math.random() * 200) + 10)
  );

  return (
    <div className="space-y-6">
      
      {/* Title block */}
      <div>
        <h2 className="text-sm uppercase tracking-widest text-cyan-400 font-mono font-bold flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-cyan-400 animate-pulse" />
          User Behavioral Telemetry Center
        </h2>
        <p className="text-xs font-sans text-slate-400 mt-1 leading-relaxed">
          NEXUS continuously evaluates user input clickstreams, typing velocities, device configurations, and multi-page workflow pathways to generate dynamic trust indexes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* User Logs selector side-rail */}
        <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl p-4 flex flex-col justify-between h-full min-h-[460px]">
          <div>
            <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-white mb-3">
              Operational Users List
            </h3>
            <p className="text-[11px] font-mono text-slate-500 mb-4 uppercase">
              Select session thread to decode
            </p>

            <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
              {threatLogs.map((log) => {
                const isSelected = currentThreat?.id === log.id;
                return (
                  <button
                    key={log.id}
                    onClick={() => onSelectThreat(log)}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer text-xs font-mono flex flex-col gap-1.5 ${
                      isSelected
                        ? "bg-cyan-500/10 border-cyan-400/30 text-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.1)]"
                        : "bg-slate-950/60 border-blue-500/5 hover:border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex justify-between items-center bg-slate-950/40 px-1.5 py-0.5 rounded">
                      <span>{log.id}</span>
                      <span className={log.riskScore > 70 ? "text-red-400 font-bold" : log.riskScore > 35 ? "text-yellow-400" : "text-emerald-400"}>
                        {log.riskScore}% Risk
                      </span>
                    </div>
                    <div className="truncate text-[11px] font-bold text-slate-200">
                      Operator: {log.username}
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500">
                      <span>{log.country}</span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-900">
                        {log.threatType}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <span className="text-[9px] font-mono text-slate-500 text-center uppercase tracking-widest mt-4">
            Monitoring Socket Level: Realtime
          </span>
        </div>

        {/* Behavioral Metrics Workspace (2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main User Profile HUD Card */}
          <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-blue-500/10">
              <div>
                <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase">TELEMETRY DECODER ACTIVE</span>
                <h3 className="text-base font-bold text-white mt-1">
                  Session Ref: <span className="text-cyan-400 font-mono font-bold">{currentThreat.id}</span>
                </h3>
              </div>

              {/* Dynamic Session Trust Badge */}
              <div className="inline-flex flex-col text-right">
                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">SESSION TRUST RATING</span>
                <span className={`text-xl font-mono font-bold ${
                  currentThreat.sessionTrust > 75 ? "text-emerald-400" : currentThreat.sessionTrust > 35 ? "text-yellow-400" : "text-red-400"
                }`}>
                  {currentThreat.sessionTrust}%
                </span>
              </div>
            </div>

            {/* Micro details grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Device and headers indicator */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-blue-500/5 text-xs font-mono space-y-2">
                <div className="flex items-center gap-1.5 text-slate-400 border-b border-slate-900 pb-1">
                  <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DEVICE META DATA</span>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase">Device Fingerprint ID</p>
                  <p className="text-slate-300 truncate text-[10px]">{currentThreat.deviceFingerprint}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase">User-Agent Signature</p>
                  <p className="text-[10px] text-slate-400 truncate leading-normal" title={currentThreat.browserHeaders}>
                    {currentThreat.browserHeaders}
                  </p>
                </div>
              </div>

              {/* Click timing and keystroke velocities analysis */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-blue-500/5 text-xs font-mono space-y-2">
                <div className="flex items-center gap-1.5 text-slate-400 border-b border-slate-900 pb-1">
                  <Clock className="w-3.5 h-3.5 text-purple-400" />
                  <span>TEMPORAL CLICKSTREAM</span>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase">Key Stroke Interval avg</p>
                  <p className={`text-slate-300 text-[11px] font-bold ${
                    currentThreat.clickIntervalMs < 50 ? "text-red-400 animate-pulse" : "text-slate-200"
                  }`}>
                    {currentThreat.clickIntervalMs} ms
                  </p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase">Bot Pattern Classifier</p>
                  <p className="text-slate-400 text-[10px]">
                    {currentThreat.clickIntervalMs < 50 
                      ? "ROBOTIC HIGH VELOCITY" 
                      : currentThreat.clickIntervalMs < 500 
                        ? "AUTOMATION ALERT" 
                        : "HUMAN TYPING PACE"}
                  </p>
                </div>
              </div>

              {/* IP / Loc checks */}
              <div className="bg-slate-950/60 p-3 rounded-xl border border-blue-500/5 text-xs font-mono space-y-2 sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-1.5 text-slate-400 border-b border-slate-900 pb-1">
                  <MousePointer className="w-3.5 h-3.5 text-emerald-400" />
                  <span>AFFILIATE IP GEOGRAPHY</span>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase">IPv4 Destination</p>
                  <p className="text-slate-300 text-[10px]">{currentThreat.ipAddress}</p>
                </div>
                <div>
                  <p className="text-[9px] text-slate-500 uppercase">Associated Territory</p>
                  <p className="text-slate-300 text-[10px]">{currentThreat.country}</p>
                </div>
              </div>

            </div>

            {/* Visual interactive behavioral anomaly checklist */}
            <div className="mt-6 bg-slate-950/40 p-4 border border-blue-500/10 rounded-xl space-y-4">
              <h4 className="text-xs uppercase font-mono text-white tracking-wider flex items-center justify-between">
                <span>Core Behavioral Scanner</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                  currentThreat.riskScore > 70 ? "bg-red-400/10 text-red-400" : "bg-emerald-400/10 text-emerald-400"
                }`}>
                  Anomaly Confidence: {currentThreat.riskScore}%
                </span>
              </h4>

              <div className="space-y-2 text-[11px] font-mono">
                <div className="flex items-center justify-between p-2 rounded bg-slate-900">
                  <span className="text-slate-400">1. Fast Key-Down and Key-Up durations</span>
                  <span className={`font-semibold ${currentThreat.clickIntervalMs < 100 ? "text-red-400" : "text-emerald-400"}`}>
                    {currentThreat.clickIntervalMs < 100 ? "⚠ FLAGGED ROBOTIC CLICKS" : "✓ OK (HUMAN TIME)"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-900">
                  <span className="text-slate-400">2. Account Reputation & MX Blacklist</span>
                  <span className={`font-semibold ${currentThreat.email.includes("tempmail") || currentThreat.email.includes("mailator") ? "text-red-400" : "text-emerald-400"}`}>
                    {currentThreat.email.includes("tempmail") || currentThreat.email.includes("mailator") ? "⚠ TRASH REPUTATION" : "✓ CLEAN HOST DOMAIN"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-900">
                  <span className="text-slate-400">3. Non-interactive browser parameters (Headless check)</span>
                  <span className={`font-semibold ${currentThreat.browserHeaders.includes("Headless") ? "text-red-400" : "text-emerald-400"}`}>
                    {currentThreat.browserHeaders.includes("Headless") ? "⚠ HEADLESS BROWSER BLOCKED" : "✓ STANDARD USER AGENT"}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2 rounded bg-slate-900">
                  <span className="text-slate-400">4. Browser Cookie & Form Collisions</span>
                  <span className={`font-semibold ${currentThreat.riskScore > 50 ? "text-red-400" : "text-emerald-400"}`}>
                    {currentThreat.riskScore > 50 ? "⚠ DUPLICATE COOKIE DETECTED" : "✓ UNIQUE HARDWARE GUID"}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick action simulation */}
            <div className="mt-5 flex gap-2 justify-end">
              <span className="text-[10px] text-slate-500 font-mono italic self-center">
                Operator Signature verified: NEXUS-AUTO-SCAN
              </span>
            </div>

          </div>

          {/* Interactive clicking dynamic chart generator */}
          <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3 border-b border-blue-500/10 pb-2">
              <h4 className="text-xs font-mono uppercase text-white tracking-widest font-bold">
                Keystroke Latency Dispersion (milli-seconds)
              </h4>
              <span className="text-[10px] font-mono text-purple-400">
                ACTIVE GRAPH
              </span>
            </div>
            
            <div className="h-16 flex items-end gap-2 px-1">
              {keystrokeLogsCount.map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                  <div 
                    className={`w-full rounded-t transition-all ${
                      currentThreat.clickIntervalMs < 100 
                        ? "bg-red-500/80 group-hover:bg-red-400" 
                        : "bg-cyan-500/80 group-hover:bg-cyan-400"
                    }`}
                    style={{ height: `${Math.max(10, Math.min(60, val / 3.5))}px` }}
                  />
                  <span className="text-[9px] font-mono text-slate-500">{idx + 1}k</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] font-sans text-slate-500 mt-2 text-center">
              Normal user keystrokes form a Gaussian distribution curve between 120ms to 400ms. Automated bots exhibit low-entropy flat lines or rapid bursts under 30ms.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
