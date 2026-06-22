import { useState } from "react";
import { 
  Terminal, 
  Clock, 
  HelpCircle, 
  ShieldAlert, 
  RefreshCw, 
  FileText, 
  TrendingUp, 
  Sparkles,
  ClipboardCheck,
  CheckCircle,
  AlertOctagon
} from "lucide-react";
import { ThreatLog } from "../types";

interface TimelineModuleProps {
  threatLogs: ThreatLog[];
  selectedThreat: ThreatLog | null;
  onSelectThreat: (threat: ThreatLog) => void;
}

export default function TimelineModule({ threatLogs, selectedThreat, onSelectThreat }: TimelineModuleProps) {
  const currentThreat = selectedThreat || threatLogs[0];
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiReport, setAiReport] = useState<any | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  // Trigger Gemini AI threat report generation!
  const generateAiReport = async () => {
    setIsAiLoading(true);
    setAiReport(null);
    setAiError(null);

    try {
      const response = await fetch("/api/gemini/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "CYBERSEC_FORENSIC_TRACING_REPORT",
          logData: currentThreat,
          promptExtra: "Return highly detailed architectural diagnostics and specific remediation policies. Make it sound extremely professional, military grade, and helpful for cyber secure operations center."
        })
      });

      if (!response.ok) {
        throw new Error("Threat intelligence service responded with a network error.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setAiReport(data);

    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Failed to contact decentralized AI intelligence protocols.");
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title info bar */}
      <div>
        <h2 className="text-sm uppercase tracking-widest text-[#a5b4fc] font-mono font-bold flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-400 animate-pulse" />
          NEXUS Incident Reconstruction Tracker
        </h2>
        <p className="text-xs font-sans text-slate-400 mt-1 leading-relaxed">
          Chronological analysis, incident chains mapping, replay telemetry visualization, and instant AI-generated forensic diagnostic assessments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left selector and Threat reconstruction */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-500/10 pb-4">
            <div>
              <span className="text-[9px] tracking-widest font-mono text-slate-500 uppercase">ACTIVE CONVOLUTION</span>
              <h3 className="text-sm font-mono font-bold text-white mt-0.5">
                Threat Thread: <span className="text-cyan-400 font-bold">{currentThreat.id}</span>
              </h3>
            </div>

            {/* Quick Threat selector */}
            <select
              value={currentThreat.id}
              onChange={(e) => {
                const target = threatLogs.find(t => t.id === e.target.value);
                if (target) onSelectThreat(target);
              }}
              className="bg-slate-950 text-slate-300 font-mono text-xs border border-blue-500/15 py-1 px-2.5 rounded-lg focus:outline-none"
            >
              {threatLogs.map(t => (
                <option key={t.id} value={t.id}>
                  {t.id} - {t.username.slice(0, 15)}...
                </option>
              ))}
            </select>
          </div>

          {/* Chronological Action Chains vector timeline list */}
          <div className="relative pl-6 space-y-5">
            {/* Thread line visual */}
            <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-slate-800" />

            {currentThreat.reconstructionHistory.map((step, idx) => {
              const isCrit = step.severity === "Critical" || step.severity === "High";
              return (
                <div key={idx} className="relative group text-xs font-mono">
                  {/* Glowing dot */}
                  <span className={`absolute -left-[24px] top-1 h-3.5 w-3.5 rounded-full border border-slate-950 flex items-center justify-center transition-transform group-hover:scale-125 ${
                    isCrit 
                      ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" 
                      : step.severity === "Medium"
                        ? "bg-yellow-400 shadow-[0_0_6px_rgba(234,179,8,0.2)]"
                        : "bg-cyan-500"
                  }`} />

                  <div className="bg-slate-950/80 hover:bg-slate-950 p-3 rounded-lg border border-slate-900 group-hover:border-slate-800 transition-colors space-y-1">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="font-bold text-slate-200 uppercase tracking-widest text-[#a5b4fc]">{step.step}</span>
                      <span className="text-slate-500">{step.time}</span>
                    </div>
                    <p className="text-slate-400 leading-normal text-[11px] font-sans">
                      {step.description}
                    </p>
                    <div className="text-right">
                      <span className={`text-[9px] font-bold ${
                        isCrit ? "text-red-400" : "text-slate-500"
                      }`}>
                        Severity: {step.severity}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-slate-950/60 border border-slate-900 rounded-lg text-slate-400 text-[11px] font-mono leading-relaxed">
            <b>Session Replay Metric:</b> Attacker keystroke delay evaluated continuously at <b>{currentThreat.clickIntervalMs}ms</b> rate with total risk score mapping to <b>{currentThreat.riskScore}%</b>. Correct containment rules triggered successfully.
          </div>

        </div>

        {/* Dynamic AI-Generated Threat Analysis Report Node */}
        <div className="lg:col-span-5 bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 flex flex-col justify-between min-h-[460px]">
          
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-blue-500/10 pb-3 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-white font-bold tracking-widest">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                NEXUS AI CYBER DEFENSE REPORT
              </div>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
              Generate a decentralized intelligence report on this incident. Our neural analyzer evaluates fingerprint vectors and provides military-grade response policies.
            </p>

            {/* AI Report Trigger CTA */}
            {!aiReport && !isAiLoading && (
              <div className="p-4 bg-slate-950/80 border border-blue-500/15 rounded-xl text-center space-y-3">
                <FileText className="w-10 h-10 text-cyan-400/40 mx-auto animate-pulse" />
                <span className="block text-xs uppercase font-mono text-slate-300 font-bold tracking-widest">
                  AI DECISION MATRIX IDLE
                </span>
                <button
                  onClick={generateAiReport}
                  className="w-full py-2 px-3 bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-lg text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_12px_rgba(34,211,238,0.25)] cursor-pointer"
                >
                  DECODE AI CYBER FORENSICS
                </button>
              </div>
            )}

            {/* Loading placeholder */}
            {isAiLoading && (
              <div className="p-8 text-center space-y-3 font-mono text-slate-400 text-xs">
                <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin mx-auto" />
                <p className="animate-pulse">COGNITIVE COMPILING PROCESS ENGAGED...</p>
                <p className="text-[10px] text-slate-500 font-sans italic">Consulting Gemini-3.5-Flash models proxy database</p>
              </div>
            )}

            {/* AI Error state */}
            {aiError && (
              <div className="p-4 bg-red-950/20 border border-red-500/25 rounded-md text-slate-300 text-xs font-mono space-y-2">
                <AlertOctagon className="w-6 h-6 text-red-500" />
                <p className="font-bold uppercase text-red-400">Offline Error:</p>
                <p className="text-[11px] leading-relaxed text-slate-400 font-sans">{aiError}</p>
                <button
                  onClick={generateAiReport}
                  className="px-2.5 py-1 bg-red-500/10 border border-red-500/30 hover:bg-red-500/20 text-red-400 rounded transition-all text-[11px] cursor-pointer"
                >
                  RE-COUPLE NETWORKS
                </button>
              </div>
            )}

            {/* Render formatted Real AI Report results */}
            {aiReport && (
              <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1 text-xs font-mono leading-relaxed select-text text-slate-300">
                <div className="flex justify-between items-center text-[10px] bg-slate-950 px-2 py-1 rounded">
                  <span className="text-slate-500">ANALYZED AT:</span>
                  <span>{new Date(aiReport.analyzedAt || Date.now()).toLocaleTimeString()}</span>
                </div>

                <div>
                  <p className="text-[9px] text-slate-500 uppercase font-bold">THREAT TYPE CLASSIFICATION:</p>
                  <p className="text-[#a5b4fc] font-bold text-sm">✦ {aiReport.threatType}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-900 text-xs">
                    <p className="text-[9px] text-slate-500 uppercase">AI RISK SCORE</p>
                    <p className={`font-bold text-base ${aiReport.riskScore > 75 ? "text-red-400" : "text-cyan-400"}`}>{aiReport.riskScore}%</p>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-900 text-xs">
                    <p className="text-[9px] text-slate-500 uppercase">SEVERITY RATING</p>
                    <p className="font-bold text-base text-yellow-400">{aiReport.severity}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-[9px] text-slate-500 uppercase font-bold">EXPERT ANALYST EVALUATION:</p>
                  <p className="text-slate-300 font-sans text-[11px] leading-relaxed bg-slate-950/40 p-2.5 rounded border border-slate-900 text-slate-400">
                    {aiReport.assessment}
                  </p>
                </div>

                {aiReport.forensicIndicators && aiReport.forensicIndicators.length > 0 && (
                  <div>
                    <p className="text-[9px] text-slate-500 uppercase font-bold">KEY METRICS DETECTED:</p>
                    <ul className="list-disc pl-4 text-cyan-300 text-[10px] space-y-1 font-mono">
                      {aiReport.forensicIndicators.map((f: string, i: number) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {aiReport.mitigationSteps && aiReport.mitigationSteps.length > 0 && (
                  <div className="bg-[#818cf8]/5 p-2 rounded border border-[#818cf8]/20 mt-2">
                    <p className="text-[9px] text-[#818cf8] uppercase font-bold mb-1">CORRECTIVE STEPS ENGAGED:</p>
                    <ul className="list-decimal pl-4 text-slate-300 text-[10px] space-y-1">
                      {aiReport.mitigationSteps.map((m: string, i: number) => (
                        <li key={i}>{m}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="border-t border-slate-800 pt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Honeypot Score: {aiReport.honeypotScore}%</span>
                  <span>Route: {aiReport.deceptionRoute}</span>
                </div>

              </div>
            )}

          </div>

          {/* Optional Action and status tracker */}
          {aiReport && (
            <button
              onClick={() => {
                setAiReport(null);
                generateAiReport();
              }}
              className="mt-4 py-1.5 w-full bg-slate-950 hover:bg-slate-900 border border-blue-500/10 text-cyan-400 hover:text-white text-[10px] font-mono rounded-md cursor-pointer transition-colors"
            >
              RUN SECONDARY SATELLITE COGNIZANCE SCAN
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
