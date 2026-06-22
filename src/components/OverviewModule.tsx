import { useState } from "react";
import { 
  ShieldCheck, 
  ShieldAlert, 
  Users, 
  MapPin, 
  Globe, 
  Activity, 
  TrendingUp, 
  Eye, 
  Lock,
  Skull,
  Server
} from "lucide-react";
import { ThreatLog, SecurityMetric } from "../types";
import { WORLD_ATTACKS_MOCK } from "../mockData";

interface OverviewModuleProps {
  metrics: SecurityMetric;
  threatLogs: ThreatLog[];
  onSelectThreat: (threat: ThreatLog) => void;
  onNavigateToTab: (tabId: string) => void;
}

export default function OverviewModule({ metrics, threatLogs, onSelectThreat, onNavigateToTab }: OverviewModuleProps) {
  const [selectedNode, setSelectedNode] = useState<typeof WORLD_ATTACKS_MOCK[0] | null>(WORLD_ATTACKS_MOCK[1]);

  return (
    <div className="space-y-6">
      
      {/* 4 Core Security Metric HUD Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Active Network Nodes */}
        <div className="bg-slate-900/60 border border-blue-500/10 hover:border-cyan-400/30 transition-all rounded-xl p-4 flex items-center justify-between group relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase">Active Nodes</span>
            <p className="text-2xl font-bold font-sans text-white tracking-tight group-hover:text-cyan-300 transition-colors">
              {metrics.activeNodes} <span className="text-xs text-cyan-400">/ 14</span>
            </p>
            <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              ALL SYSTEMS OPTIMAL
            </p>
          </div>
          <div className="p-3 bg-blue-500/5 group-hover:bg-cyan-500/10 transition-colors rounded-lg">
            <Globe className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all -z-10" />
        </div>

        {/* Threats Neutralized */}
        <div className="bg-slate-900/60 border border-blue-500/10 hover:border-purple-500/30 transition-all rounded-xl p-4 flex items-center justify-between group relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase">Threats Neutralized</span>
            <p className="text-2xl font-bold font-sans text-white tracking-tight group-hover:text-purple-300 transition-colors">
              {metrics.threatsNeutralized}
            </p>
            <p className="text-[10px] font-mono text-[#a5b4fc]">
              +14 SINCE LAST HOUR
            </p>
          </div>
          <div className="p-3 bg-purple-500/5 group-hover:bg-purple-500/10 transition-colors rounded-lg">
            <ShieldCheck className="w-5 h-5 text-indigo-400 animate-pulse" />
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#818cf8]/5 rounded-full blur-2xl group-hover:bg-[#818cf8]/10 transition-all -z-10" />
        </div>

        {/* MIRAGE Redirects */}
        <div className="bg-slate-900/60 border border-blue-500/10 hover:border-red-500/30 transition-all rounded-xl p-4 flex items-center justify-between group relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase">Deactivated Bots (MIRAGE)</span>
            <p className="text-2xl font-bold font-sans text-white tracking-tight group-hover:text-red-350 transition-colors">
              {metrics.mirageRedirects}
            </p>
            <p className="text-[10px] font-mono text-red-400 flex items-center gap-1">
              <Skull className="w-3 h-3 text-red-400 animate-bounce" />
              100% CONTAINMENT SECURE
            </p>
          </div>
          <div className="p-3 bg-red-400/5 group-hover:bg-red-400/10 transition-colors rounded-lg">
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-2xl group-hover:bg-red-500/10 transition-all -z-10" />
        </div>

        {/* Global Risk Index Rating */}
        <div className="bg-slate-900/60 border border-blue-500/10 hover:border-emerald-500/30 transition-all rounded-xl p-4 flex items-center justify-between group relative overflow-hidden">
          <div className="space-y-1 z-10">
            <span className="text-[10px] tracking-widest font-mono text-slate-400 uppercase">Global Risk Score</span>
            <p className={`text-2xl font-bold font-sans tracking-tight group-hover:scale-105 transition-transform ${
              metrics.globalRiskScore > 65 ? "text-red-400" : metrics.globalRiskScore > 35 ? "text-yellow-400" : "text-emerald-400"
            }`}>
              {metrics.globalRiskScore}%
            </p>
            <div className="h-1 bg-slate-950 rounded-full w-24 overflow-hidden mt-1.5">
              <div 
                className={`h-full transition-all duration-300 ${
                  metrics.globalRiskScore > 65 ? "bg-red-500" : metrics.globalRiskScore > 35 ? "bg-yellow-500" : "bg-emerald-500"
                }`}
                style={{ width: `${metrics.globalRiskScore}%` }}
              />
            </div>
          </div>
          <div className="p-3 bg-slate-950/40 rounded-lg">
            <Activity className="w-5 h-5 text-emerald-400 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Map visual and Active Incident Center side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visualized SVG Cyber Defense Global Map */}
        <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl p-4 lg:col-span-2 flex flex-col justify-between relative overflow-hidden min-h-[360px]">
          
          <div className="flex items-center justify-between mb-4 z-10">
            <div>
              <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-white">
                Global Threat-Defense Node Map
              </h3>
              <p className="text-[11px] font-mono text-slate-400">
                Interactive active nodes telemetry monitors
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-red-400">
                <span className="h-2 w-2 rounded-full bg-red-400 animate-ping" />
                HIGH RISK NODE
              </span>
              <span className="flex items-center gap-1 text-cyan-400">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                NEXUS HOST
              </span>
            </div>
          </div>

          {/* SVG Map simulation container with custom coordinates path */}
          <div className="relative flex-1 bg-slate-950/80 border border-blue-500/5 rounded-xl flex items-center justify-center p-2 overflow-hidden h-[240px]">
            {/* Ambient cyber lines on map */}
            <svg className="absolute inset-0 w-full h-full text-blue-500/10 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Fake global routes connecting to Portland Oregon NEXUS HUB */}
              <line x1="120" y1="220" x2="780" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
              <line x1="190" y1="160" x2="780" y2="220" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,6" />
              <line x1="320" y1="260" x2="780" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
              <line x1="280" y1="310" x2="780" y2="220" stroke="currentColor" strokeWidth="1" />
              <line x1="600" y1="480" x2="780" y2="220" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
              <line x1="480" y1="390" x2="780" y2="220" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Map point markers */}
            <div className="absolute inset-0">
              {WORLD_ATTACKS_MOCK.map((m) => {
                const isSelected = selectedNode?.name === m.name;
                const isCritical = m.risk > 70;
                return (
                  <button
                    key={m.name}
                    onClick={() => setSelectedNode(m)}
                    className="absolute cursor-pointer group select-none transition-all focus:outline-none"
                    style={{
                      left: `${m.coords[0] / 9}%`,
                      top: `${m.coords[1] / 6.5}%`
                    }}
                  >
                    <div className="relative">
                      {/* Interactive ping indicator */}
                      <span className="flex h-3 w-3">
                        <span className={`animate-lock absolute inline-flex h-full w-full rounded-full opacity-75 ${
                          isCritical ? "bg-red-500 animate-ping" : m.risk < 10 ? "bg-cyan-400" : "bg-yellow-400 animate-pulse"
                        }`} />
                        <span className={`relative inline-flex rounded-full h-3 w-3 ${
                          isCritical ? "bg-red-500" : m.risk < 10 ? "bg-cyan-400 border border-white" : "bg-yellow-500"
                        }`} />
                      </span>
                      {/* Name badge */}
                      <span className={`absolute left-4 top-1/2 -translate-y-1/2 bg-slate-950/95 border px-2 py-0.5 rounded text-[9px] font-mono text-slate-300 whitespace-nowrap opacity-75 group-hover:opacity-100 transition-opacity ${
                        isSelected ? "border-cyan-400 scale-105" : "border-slate-800"
                      }`}>
                        {m.name.split(": ")[1]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Simulated instructions label bottom left of vector map */}
            <span className="absolute bottom-2 left-2 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
              Live Coordinate Mesh Ref: G7-X920
            </span>
          </div>

          {/* Node detail display panel */}
          <div className="mt-3 bg-slate-950/60 p-3 rounded-lg border border-blue-500/10 z-10">
            {selectedNode ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span className="text-white font-semibold">{selectedNode.name}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">Main Threat Type: <b className="text-[#a5b4fc]">{selectedNode.type}</b></span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Active Alert Sockets: <b className="text-red-400">{selectedNode.activeAlerts}</b></span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedNode.risk > 75 
                      ? "bg-red-500/20 text-red-400 border border-red-500/30" 
                      : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  }`}>
                    {selectedNode.risk}% THREAT RATING
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-[11px] font-mono text-slate-500 text-center uppercase">
                Select a blinking coordinates point on the vector monitor above to probe
              </p>
            )}
          </div>

        </div>

        {/* Live Attack Monitoring HUD Stream */}
        <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl p-4 flex flex-col justify-between h-full min-h-[360px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs uppercase font-mono tracking-widest font-bold text-white">
                Core Defense Stream
              </h3>
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 font-mono tracking-widest animate-pulse">
                REAL-TIME SEC
              </span>
            </div>
            <p className="text-[11px] font-mono text-slate-400 mb-4 leading-relaxed">
              Real-time audit records evaluated by NEXUS threat scanner. Click any item for forensic timelines.
            </p>

            {/* List limit */}
            <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
              {threatLogs.slice(0, 5).map((log) => {
                const isCritical = log.status === "DECEPT_REDIRECTED" || log.severity === "Critical";
                return (
                  <button
                    key={log.id}
                    onClick={() => {
                      onSelectThreat(log);
                      // Switch to timeline or logs view
                      onNavigateToTab("logs");
                    }}
                    className="w-full text-left p-2.5 rounded-lg bg-slate-950/60 border border-blue-500/5 hover:border-cyan-400/30 hover:bg-slate-950/90 transition-all cursor-pointer flex flex-col gap-1 text-[11px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold font-mono text-slate-300">{log.id}</span>
                      <span className={`text-[10px] font-mono font-bold ${
                        log.severity === "Critical" ? "text-red-400" : log.severity === "High" ? "text-yellow-400" : "text-cyan-400"
                      }`}>
                        {log.severity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-1 text-slate-400 font-mono">
                      <span className="truncate">{log.username} ({log.country})</span>
                      <span className="text-slate-500 shrink-0 text-[10px]">{log.timestamp.slice(11, 19)}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono mt-0.5">
                      <span className="text-cyan-400 font-bold truncate">● {log.threatType}</span>
                      <span className={`px-1.5 rounded text-[9px] shrink-0 font-bold ${
                        log.status === "DECEPT_REDIRECTED" 
                          ? "bg-purple-950/50 text-purple-400 border border-purple-500/20" 
                          : "bg-slate-900 text-slate-400"
                      }`}>
                        {log.status === "DECEPT_REDIRECTED" ? "MIRAGE_DECEPT" : log.status}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => onNavigateToTab("logs")}
            className="w-full mt-4 py-2 bg-blue-500/5 hover:bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 rounded-lg text-center font-mono font-bold text-[11px] cursor-pointer"
          >
            LAUNCH ADVANCED FORENSIC VIEWER
          </button>
        </div>

      </div>

      {/* Educational info grid bottom panel */}
      <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-4">
        <h3 className="text-xs uppercase font-mono tracking-widest text-[#818cf8] font-bold mb-2">
          EDUCATIONAL ARCHITECTURE BLUEPRINT
        </h3>
        <p className="text-xs font-sans text-slate-400 leading-relaxed">
          NEXUS stands for <b>Neural Access Security System</b>, custom developed for students and administrators at <b>ECLEARNIX</b> to explore defensive cybersecurity. 
          By combining modular detection (Disposable Emails, Automation profiling, and SQL grammar anomalies), administrators learn to prevent exploitation while leveraging the <b>MIRAGE Deception Honeypot</b>. Instead of boring error page blocks, suspicious entities are seamlessly routed to simulated databases where their activities can be analyzed safely in real-time.
        </p>
      </div>

    </div>
  );
}
