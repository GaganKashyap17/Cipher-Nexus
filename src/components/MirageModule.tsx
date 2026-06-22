import React, { useState, useEffect } from "react";
import { 
  ShieldAlert, 
  Terminal, 
  AlertTriangle, 
  Database, 
  Eye, 
  HelpCircle, 
  Flame, 
  Cpu,
  RefreshCw
} from "lucide-react";

interface MirageModuleProps {
  customHackerName?: string;
  customExploitUsed?: string;
  onTriggerAlert: (txt: string, severity: "High" | "Critical") => void;
}

export default function MirageModule({ customHackerName = "crawler_alert", customExploitUsed = "Injected SQL Payload (' UNION SELECT ...)", onTriggerAlert }: MirageModuleProps) {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "MIRAGE_CONTAINMENT_KERNEL v4.2.1-SECURE INITIALIZED...",
    "VIRTUAL DIRECTORIES MOUNTED SUCCESSFULLY ON /dev/sys_sandbox",
    "DECEPTION REPLICAS: ACTIVE [PORT 3306, PORT 22, PORT 8080]",
    "AWAITING REDIRECT TRIGGER SIGNAL...",
    `[INFO]: ATTACKER NODE '${customHackerName}' SUCCESSFULLY CAPTURED AND SILENTLY CONTAINED.`,
    `[FORENSICS]: INTERCEPTED PAYLOAD: "${customExploitUsed}"`
  ]);

  const [inputCommand, setInputCommand] = useState("");
  const [isWiping, setIsWiping] = useState(false);
  const [fakeDatabaseRecords, setFakeDatabaseRecords] = useState([
    { id: 101, user: "admin", pass_hash: "$2b$12$K92YgUeh... (FAKE)", last_login: "2026-05-23" },
    { id: 102, user: "coordinator", pass_hash: "$2b$12$Pf7YxK8W... (FAKE)", last_login: "2026-05-23" },
    { id: 103, user: "staff_finances", pass_hash: "$2b$12$MzU71wQ... (FAKE)", last_login: "2026-05-22" }
  ]);

  const [exploitMonitorCount, setExploitMonitorCount] = useState(1);

  const executeHoneypotCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommand) return;

    const cmd = inputCommand.trim().toLowerCase();
    let reply = "";

    if (cmd === "help") {
      reply = `AVAILABLE DECEPTION SYSTEM COMMANDS:
- help : Output sandbox commands list.
- query : Probe the current environment dummy SQL databases.
- inject : Simulate launching secondary exploits to check containment.
- clear : Wipe local screen line arrays buffer.
- status : Return current CPU deception containment statuses.`;
    } else if (cmd === "query") {
      reply = `Exposing dummy mock database system targets. (Simulated Deception Response)
Records fetched: 3 files.
Targeting master_credentials_db ... success!`;
    } else if (cmd === "inject") {
      reply = `[EXPLOIT INTERCEPTED]: BLOCKING INJECTION AND SPOOFING FAKE SUCCESS METRIC.
NEXUS Autopilot fed the attacker dummy payload structure.`;
      setExploitMonitorCount(prev => prev + 1);
      onTriggerAlert("Secondary malicious injection attempted and successfully spoofed by MIRAGE honeypot.", "Critical");
    } else if (cmd === "clear") {
      setTerminalHistory([]);
      setInputCommand("");
      return;
    } else if (cmd === "status") {
      reply = `MIRAGE AUTOPILOT DIAGNOSTICS:
- Containment status : RUNNING SECURE
- Simulated Host CPU : 3.4%
- Sandboxed memory block : 1024MB VRAM spoofed to client.
- Attacker redirection : Active`;
    } else {
      reply = `NEXUS-MIRAGE_SHELL: command not recognized: "${inputCommand}". Type 'help' for possible avenues.`;
    }

    setTerminalHistory(prev => [...prev, `> ${inputCommand}`, reply]);
    setInputCommand("");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Warning visual conforming to Red Alert Deception Environment */}
      <div className="bg-red-950/25 border border-red-500/35 rounded-2xl p-4 sm:p-5 text-red-400 relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute inset-0 bg-red-600/[0.03] pointer-events-none" />
        <div className="absolute right-4 top-4 h-12 w-12 rounded-full border border-red-500/10 flex items-center justify-center bg-red-500/5 animate-pulse">
          <Flame className="w-6 h-6 text-red-500 animate-bounce" />
        </div>

        <div className="space-y-1 z-10 relative">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            <h2 className="text-xs font-mono uppercase tracking-widest font-bold text-red-500">
              MIRAGE Deception Honeypot Active
            </h2>
          </div>
          <h3 className="text-xl font-sans text-white font-bold tracking-tight">
            Node Containment Enabled
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl mt-1.5">
            To prevent bots, scrapers, and blackhat exploits from destroying raw application databases, 
            NEXUS automatically routes suspicious hosts to this virtual environment. 
            To the attacker, they appear to have entered database nodes admin terminals. To our SOC analysts, they are safely quarantined.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Containment Shell Terminal Emulator */}
        <div className="lg:col-span-7 bg-slate-950 border border-red-500/20 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-h-[420px] font-mono">
          
          <div>
            <div className="flex items-center justify-between border-b border-red-500/15 pb-3 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-red-500 animate-pulse" />
                <span className="text-slate-300 font-bold tracking-widest uppercase">
                  MIRAGE Attacker Shell Simulator
                </span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-red-500/15 text-red-500 border border-red-500/30 font-bold">
                SANDBOX ISOLATED
              </span>
            </div>

            {/* Scrollable Shell Logs */}
            <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1 text-[11px] text-green-400 font-mono">
              {terminalHistory.map((line, idx) => (
                <p key={idx} className="whitespace-pre-wrap leading-relaxed">
                  {line}
                </p>
              ))}
            </div>
          </div>

          {/* Form input and interactive prompt guide details */}
          <form onSubmit={executeHoneypotCommand} className="mt-4 pt-3 border-t border-red-500/15 flex gap-2">
            <span className="text-red-500 select-none self-center font-bold">#</span>
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="Type client exploit test payload ... (or try: help / query / inject)"
              className="flex-1 bg-slate-950 text-red-400 focus:text-green-300 border-none outline-none focus:outline-none focus:ring-0 text-xs font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded font-bold text-[10px] uppercase cursor-pointer"
            >
              RUN PAYLOAD
            </button>
          </form>

        </div>

        {/* Honeypot Fake Database monitoring rail */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Mock Database screens */}
          <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#818cf8]/10 text-xs font-mono">
              <span className="flex items-center gap-1.5 font-bold text-white uppercase tracking-wider">
                <Database className="w-3.5 h-3.5 text-purple-400" />
                MIRAGE Spoofed Database Records
              </span>
              <span className="text-[10px] text-slate-500">
                Schema: mock_users_db
              </span>
            </div>

            <p className="text-[11px] font-sans text-slate-400 mb-3 leading-relaxed">
              Attacker queries are directed to this dummy SQLite list. Any database edits or queries are harmlessly contained.
            </p>

            <div className="space-y-2 text-[10px] font-mono">
              {fakeDatabaseRecords.map((rec) => (
                <div key={rec.id} className="p-2 rounded bg-slate-950 border border-slate-900">
                  <div className="flex justify-between items-center text-[#c084fc] font-bold">
                    <span>UID: {rec.id}</span>
                    <span>Handle: {rec.user}</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-400 mt-1">
                    <span className="truncate">Hash: {rec.pass_hash}</span>
                    <span className="text-[9px] text-slate-500">{rec.last_login}</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Attacker Exploit telemetry tracker */}
          <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-4 sm:p-5 text-slate-400 space-y-3">
            <h3 className="text-xs uppercase font-mono text-white tracking-widest font-bold flex items-center justify-between">
              <span>EXPLOIT INTERMEDIARY METRICS</span>
              <span className="text-red-400 font-bold animate-pulse">LIVE EXPLOIT RATIO</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-center text-xs font-mono">
              <div className="bg-slate-950 p-2 rounded.xl border border-red-500/10">
                <p className="text-[9px] text-slate-500">ATTEMPTS BLOCKED</p>
                <p className="text-lg font-bold text-red-550 mt-1">{exploitMonitorCount}</p>
              </div>
              <div className="bg-slate-950 p-2 rounded.xl border border-blue-500/10">
                <p className="text-[9px] text-slate-500">DECEPTION RATIO</p>
                <p className="text-lg font-bold text-cyan-400 mt-1">100%</p>
              </div>
            </div>

            <p className="text-[11px] font-sans text-slate-400 text-center uppercase tracking-wider">
              AUTO-RESET TRIGGER IS: <b>OFF</b>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
