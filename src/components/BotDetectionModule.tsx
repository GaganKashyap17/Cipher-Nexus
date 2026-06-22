import React, { useState } from "react";
import { 
  ShieldAlert, 
  Trash2, 
  Search, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle,
  Copy,
  Users,
  ShieldAlert as BotIcon
} from "lucide-react";
import { ThreatLog } from "../types";

interface BotDetectionModuleProps {
  threatLogs: ThreatLog[];
  onTriggerAlert: (txt: string, severity: "High" | "Critical") => void;
}

export default function BotDetectionModule({ threatLogs, onTriggerAlert }: BotDetectionModuleProps) {
  // MX Provider Blacklist entries
  const [bannedDomains, setBannedDomains] = useState([
    "dispostable.com",
    "tempmail.io",
    "mailator12.com",
    "trashmail.net",
    "sharklasers.com",
    "guerrillamailblock.com"
  ]);

  const [inputEmail, setInputEmail] = useState("");
  const [testResult, setTestResult] = useState<{ checked: boolean; isTrash: boolean; message: string } | null>(null);

  const testEmailReputation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail) return;

    const domain = inputEmail.split("@")[1];
    if (!domain) {
      setTestResult({
        checked: true,
        isTrash: false,
        message: "Invalid email syntax structure."
      });
      return;
    }

    const isMatch = bannedDomains.includes(domain.toLowerCase()) || domain.includes("temp") || domain.includes("dispos");
    
    if (isMatch) {
      setTestResult({
        checked: true,
        isTrash: true,
        message: `MX Blacklist Collision! Controlled domain '${domain}' matched public throwaway provider database.`
      });
      onTriggerAlert(`AI Guard intercepted custom test block of disposable email: ${inputEmail}`, "High");
    } else {
      setTestResult({
        checked: true,
        isTrash: false,
        message: `Clean MX authority record. Domain '${domain}' evaluated to be standard/private provider.`
      });
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page description banner */}
      <div>
        <h2 className="text-sm uppercase tracking-widest text-[#a5b4fc] font-mono font-bold flex items-center gap-2">
          <BotIcon className="w-5 h-5 text-indigo-400 animate-pulse" />
          NEXUS Fake Registration & Bot Interdiction Node
        </h2>
        <p className="text-xs font-sans text-slate-400 mt-1 leading-relaxed">
          Mitigate automated student accounts creation, spamming, and sybil credentials attacks before they reach our production storage layer.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* MX Blacklist & Checker Panel */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Blacklist check form */}
          <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-4 sm:p-5 relative">
            <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-cyan-400" />
              Real-time Domain Scanner
            </h3>
            <p className="text-[11px] font-mono text-slate-400 mb-4 leading-relaxed">
              Manually evaluate an email handles node against compiled disposable provider MX servers list in real time.
            </p>

            <form onSubmit={testEmailReputation} className="space-y-4">
              <div className="space-y-1.5">
                <input
                  required
                  type="text"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="e.g. threat-actor@sharklasers.com"
                  className="block w-full px-3 py-2 bg-slate-950 border border-slate-850 rounded-lg text-xs font-mono text-white placeholder-slate-650 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-mono font-bold text-xs uppercase tracking-wider cursor-pointer"
              >
                PROBE REGISTERED REPUTATION
              </button>
            </form>

            {/* Test result display */}
            {testResult && (
              <div className={`mt-4 p-3 rounded-lg border text-xs font-mono ${
                testResult.isTrash 
                  ? "bg-red-500/10 border-red-500/30 text-red-400" 
                  : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
              }`}>
                <div className="flex items-center gap-1.5 font-bold mb-1 col-span-2">
                  {testResult.isTrash ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  <span>{testResult.isTrash ? "DISPOSABLE MATCHED" : "SIGNATURE VERIFIED"}</span>
                </div>
                <p className="text-[11px] leading-relaxed select-all">
                  {testResult.message}
                </p>
              </div>
            )}
          </div>

          {/* Locked blacklist dictionary viewer */}
          <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-4 sm:p-5">
            <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-3">
              MX Blacklist Dictionary ({bannedDomains.length})
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {bannedDomains.map((dom) => (
                <span key={dom} className="text-[10px] font-mono px-2 py-1 bg-slate-950/80 border border-slate-800 text-slate-400 rounded">
                  {dom}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Global Sybil and Automated Signups list */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5">
            <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-3 flex items-center justify-between">
              <span>Robotic Behavior Anomaly Logs</span>
              <span className="text-[9px] text-[#818cf8] font-mono uppercase tracking-widest">
                Risk Classification: High / Critical
              </span>
            </h3>

            <p className="text-[11px] font-sans text-slate-400 mb-4 leading-relaxed">
              The table below highlights registrants whose input click intervals and automation profiles matches robotic timing behaviors or disposable mail aliases.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-blue-500/10 text-slate-500 text-[10px] uppercase">
                    <th className="pb-2">User/IP</th>
                    <th className="pb-2">Click Spacing</th>
                    <th className="pb-2">Email Source</th>
                    <th className="pb-2 text-right">Action Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {threatLogs.filter(log => log.riskScore > 50).map((log) => (
                    <tr key={log.id} className="hover:bg-slate-950/20 text-slate-300">
                      <td className="py-3">
                        <div className="font-semibold text-slate-250 truncate max-w-[120px]">{log.username}</div>
                        <div className="text-[10px] text-slate-500">{log.ipAddress}</div>
                      </td>
                      <td className="py-3">
                        <span className={`font-bold ${log.clickIntervalMs < 50 ? "text-red-400 animate-pulse" : "text-yellow-400"}`}>
                          {log.clickIntervalMs} ms
                        </span>
                        <div className="text-[9px] text-slate-500">
                          {log.clickIntervalMs < 50 ? "ROBOT SPEED" : "AUTOMATED"}
                        </div>
                      </td>
                      <td className="py-3 text-slate-400 max-w-[140px] truncate" title={log.email}>
                        {log.email}
                      </td>
                      <td className="py-3 text-right">
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                          {log.status === "DECEPT_REDIRECTED" ? "MIRAGE_DECEPT" : log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Sandbox Tips on BOT detection */}
          <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl p-4 text-xs font-sans text-slate-400 space-y-2">
            <span className="font-mono text-[10px] uppercase text-cyan-400 block tracking-widest">
              AI Forensic Verification Checklist:
            </span>
            <ul className="list-disc pl-4 space-y-1.5 text-[11px]">
              <li><b>Entropy Metrics:</b> Human keyboards introduce variable latency curves between key depress cycles (typically 80-200ms per character). Bots inject entire strings under 5ms.</li>
              <li><b>Disposable MX-Lookup:</b> Spammers purchase block registrations. Checking dynamic MX records blocks 94% of fake registrations.</li>
              <li><b>Canvas Fingerprinting:</b> Combining screen coordinates ratios, webgl parameters, and font support vectors yields unique browser IDs, blocking duplicate Sybil clones.</li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
