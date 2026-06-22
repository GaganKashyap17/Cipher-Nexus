import { useState, useEffect } from "react";
import CyberBackground from "./components/CyberBackground";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AuthScreen from "./components/AuthScreen";
import OverviewModule from "./components/OverviewModule";
import UserProfileModule from "./components/UserProfileModule";
import BotDetectionModule from "./components/BotDetectionModule";
import MirageModule from "./components/MirageModule";
import TimelineModule from "./components/TimelineModule";
import ReportsModule from "./components/ReportsModule";
import SettingsModule from "./components/SettingsModule";

import { ThreatLog, SecurityMetric, SecurityPolicy } from "./types";
import { INITIAL_THREAT_LOGS } from "./mockData";
import { 
  Bell, 
  Terminal, 
  Skull, 
  Database,
  Lock,
  Radio, 
  AlertOctagon, 
  X,
  Plus,
  ShieldAlert,
  Info
} from "lucide-react";

export default function App() {
  // Session Authorization state
  const [operatorSession, setOperatorSession] = useState<string | null>(null);

  // Active view tab state
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Global lockdown state
  const [emergencyLockdown, setEmergencyLockdown] = useState<boolean>(false);

  // Live Alerts notification stack (Module 7 constraints)
  const [alertsStack, setAlertsStack] = useState<Array<{ id: string; text: string; severity: "Low" | "Medium" | "High" | "Critical"; time: string }>>([
    { id: "A-01", text: "Database query integrity scan completed.", severity: "Low", time: "06:05:12" },
    { id: "A-02", text: "Suspicious click interval rate threshold surpassed.", severity: "High", time: "05:58:12" },
    { id: "A-03", text: "Disposable email registration blocked (LOG-5510).", severity: "High", time: "05:40:15" },
    { id: "A-04", text: "MIRAGE entrapment routing engaged for hacker_crawler.", severity: "Critical", time: "05:32:02" }
  ]);

  // Current active live toast notifications (disappear after 4 seconds)
  const [activeToasts, setActiveToasts] = useState<Array<{ id: string; text: string; severity: "High" | "Critical" }>>([]);

  // Mock global logs data list state
  const [threatLogs, setThreatLogs] = useState<ThreatLog[]>(INITIAL_THREAT_LOGS);
  const [selectedThreat, setSelectedThreat] = useState<ThreatLog | null>(INITIAL_THREAT_LOGS[0]);

  // Settings policy options (Module 9 constraints)
  const [policy, setPolicy] = useState<SecurityPolicy>({
    aiSensitivity: 85,
    otpTriggerThreshold: 60,
    mirageAutopilot: true,
    blockDisposableEmails: true,
    sqlInjectionProtection: true,
    rateLimitThreshold: 25
  });

  // Calculate dynamic dashboard security metrics
  const activeNodesCount = 12;
  const neutralizedCount = threatLogs.filter(log => log.status === "BLOCKED" || log.status === "RESOLVED").length + 22;
  const redirectedCount = threatLogs.filter(log => log.status === "DECEPT_REDIRECTED").length + 15;
  
  // Risk index calculations (increases on critical events or sensitivity limits)
  const [riskIndex, setRiskIndex] = useState(38);

  // Calculate global scores
  useEffect(() => {
    let scoreBase = 15;
    if (emergencyLockdown) scoreBase += 50;
    
    // Factor in thread count
    const highThreatsCount = threatLogs.filter(t => t.riskScore > 70).length;
    scoreBase += highThreatsCount * 12;
    
    setRiskIndex(Math.min(99, Math.max(8, scoreBase)));
  }, [emergencyLockdown, threatLogs]);

  // Trigger cyber toast alarm alerts
  const triggerAlertNotification = (text: string, severity: "High" | "Critical" = "High") => {
    const newId = `T-${Date.now()}`;
    const newAlertObj = {
      id: newId,
      text,
      severity,
      time: new Date().toLocaleTimeString().slice(0, 8)
    };

    setAlertsStack(prev => [newAlertObj, ...prev]);
    setActiveToasts(prev => [newAlertObj, ...prev]);

    // Dissolve toaster automatically
    setTimeout(() => {
      setActiveToasts(prev => prev.filter(t => t.id !== newId));
    }, 4500);
  };

  // Trigger automated containment route to MIRAGE honeypot for simulation
  const handleHoneypotCapture = (hackerName: string, exploitUsed: string) => {
    // Generate simulated bad log
    const forensicLog: ThreatLog = {
      id: `LOG-${Math.floor(Math.random() * 9000) + 1000}`,
      timestamp: new Date().toISOString(),
      ipAddress: "192.168.99.122",
      username: hackerName || "clandestine_guest",
      email: "hacker_scam@trashmail.net",
      country: "Quarantined Space",
      deviceFingerprint: "fp_emulated_hacker_terminal",
      threatType: "SQL_INJECTION",
      severity: "Critical",
      status: "DECEPT_REDIRECTED",
      riskScore: 99,
      clickIntervalMs: 4,
      sessionTrust: 0,
      browserHeaders: "PostmanRuntime/7.32.0 - Simulated attack client",
      reconstructionHistory: [
        { step: "Z-01: Exploit Launched", time: "Now", description: `Attacker executed exploit scenario: "${exploitUsed}"`, severity: "Critical" },
        { step: "Z-02: Mirage Sandbox Route", time: "Now", description: "Seamless sandboxing translation completed. Host relocated.", severity: "Critical" }
      ]
    };

    setThreatLogs(prev => [forensicLog, ...prev]);
    setSelectedThreat(forensicLog);
    
    // Log into admin and force view to MIRAGE Control!
    setOperatorSession("scenariomanager@eclearnix.edu");
    setActiveTab("mirage");
    triggerAlertNotification(`Quarantine Established. Relocating malicious agent '${hackerName}' into deception sandbox.`, "Critical");
  };

  const handleOperatorReset = () => {
    setOperatorSession(null);
    setActiveTab("overview");
    setEmergencyLockdown(false);
  };

  return (
    <div className="min-h-screen text-slate-100 font-sans flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Cyber Ambient Matrix Grids */}
      <CyberBackground />

      {/* Dynamic Floating Toast Alerts Stream */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full pointer-events-none">
        {activeToasts.map((toast) => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto p-4 rounded-xl shadow-2xl border transition-all animate-bounce flex items-start gap-3 bg-slate-950/95 ${
              toast.severity === "Critical" 
                ? "border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)] text-red-400" 
                : "border-yellow-500/40 shadow-[0_0_15px_rgba(234,179,8,0.25)] text-yellow-400"
            }`}
          >
            <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5 animate-pulse" />
            <div className="flex-1 text-xs">
              <span className="font-bold block uppercase tracking-wider font-mono">
                🚨 {toast.severity} INTERCEPT 🚨
              </span>
              <p className="text-slate-300 font-medium leading-relaxed mt-1">
                {toast.text}
              </p>
            </div>
            <button 
              onClick={() => setActiveToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="p-0.5 hover:bg-slate-900 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Emergency Lockdown active siren view overlays */}
      {emergencyLockdown && (
        <div className="bg-red-500/10 border-b border-red-500/20 py-2 text-center text-xs font-mono text-red-400 animate-pulse flex items-center justify-center gap-1.5 z-20">
          <Lock className="w-4 h-4 animate-bounce" />
          <span><b>EMERGENCY WARPING SYSTEM ENFORCED:</b> HIGH LEVEL SECURITY ACCESS SHIELDS ARE UP. ALL REGISTRATIONS QUARANTINED automatically.</span>
        </div>
      )}

      {/* Main Top Header Navigation */}
      <Header 
        emergencyLockdown={emergencyLockdown} 
        onLockdownToggle={() => {
          const lFlag = !emergencyLockdown;
          setEmergencyLockdown(lFlag);
          triggerAlertNotification(
            lFlag ? "SOC-Emergency Lockdown activated. Authentication pipelines locked." : "Security policies restored. Authentication filters back online.", 
            lFlag ? "Critical" : "High"
          );
        }}
        globalRisk={riskIndex}
      />

      {/* Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 flex flex-col md:flex-row gap-6 relative">
        
        {!operatorSession ? (
          
          /* MODULE 1: Landing secure login page */
          <div className="w-full">
            <AuthScreen 
              onAuthSuccess={(email) => {
                setOperatorSession(email);
                triggerAlertNotification(`Success standard secure login verified for operator: ${email}`, "High");
              }}
              triggerHoneypot={handleHoneypotCapture}
              triggerAlert={triggerAlertNotification}
            />
          </div>

        ) : (

          /* Full Dashboard Client Panel suite with double grids */
          <div className="w-full flex flex-col md:flex-row gap-6">
            
            {/* Left Nav menu drawers */}
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              onLogout={handleOperatorReset} 
              userEmail={operatorSession}
            />

            {/* Dashboard Workspace */}
            <div className="flex-1 bg-slate-950/30 backdrop-blur-md border border-blue-500/5 rounded-2xl p-4 sm:p-6 min-h-[500px]">
              
              {/* Dynamic Tabs conditional switcher mapping to Modules lists */}
              
              {activeTab === "overview" && (
                <OverviewModule 
                  metrics={{
                    activeNodes: activeNodesCount,
                    threatsNeutralized: neutralizedCount,
                    mirageRedirects: redirectedCount,
                    globalRiskScore: riskIndex
                  }}
                  threatLogs={threatLogs}
                  onSelectThreat={setSelectedThreat}
                  onNavigateToTab={setActiveTab}
                />
              )}

              {activeTab === "live" && (
                <div className="space-y-6">
                  {/* Title */}
                  <div className="flex items-center justify-between pb-3 border-b border-blue-500/10">
                    <div>
                      <h2 className="text-sm uppercase tracking-widest text-[#22d3ee] font-mono font-bold flex items-center gap-1.5">
                        <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                        Live Security Alarms Panel
                      </h2>
                      <p className="text-xs text-slate-400">
                        Operational monitoring for unauthorized logins, spam detections, and SQL injections campaigns.
                      </p>
                    </div>

                    <button
                      id="live-manual-alert-btn"
                      onClick={() => {
                        triggerAlertNotification("Manual satellite intelligence scan requested. Re-mapping network sockets...", "High");
                        // Generate random simulated event
                        const names = ["crawler_bot_14", "sql_injector_guest", "anonymous_vpn_node", "untrusted_edu"];
                        const types: Array<"SQL_INJECTION" | "BOT_REGISTRATION" | "DISPOSABLE_EMAIL" | "NORMAL"> = ["SQL_INJECTION", "BOT_REGISTRATION", "DISPOSABLE_EMAIL", "NORMAL"];
                        const selectedType = types[Math.floor(Math.random() * types.length)];
                        
                        const fakeEvent: ThreatLog = {
                          id: `LOG-${Math.floor(Math.random() * 9000) + 1000}`,
                          timestamp: new Date().toISOString(),
                          ipAddress: `185.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}.11`,
                          username: names[Math.floor(Math.random() * names.length)],
                          email: "test_telemetry@dispostable.com",
                          country: "Germany",
                          deviceFingerprint: "fp_safari_mac_p1a2",
                          threatType: selectedType,
                          severity: selectedType === "SQL_INJECTION" ? "Critical" : "High",
                          status: selectedType === "SQL_INJECTION" ? "DECEPT_REDIRECTED" : "OTP_CHALLENGED",
                          riskScore: selectedType === "SQL_INJECTION" ? 95 : 75,
                          clickIntervalMs: Math.floor(Math.random() * 200),
                          sessionTrust: 14,
                          browserHeaders: "Mozilla/5.0 - Automatic test scanner pipeline simulation",
                          reconstructionHistory: [
                            { step: "S-01", time: "Now", description: "Spawned simulation signal event.", severity: "Low" }
                          ]
                        };

                        setThreatLogs(prev => [fakeEvent, ...prev]);
                        setSelectedThreat(fakeEvent);
                      }}
                      className="text-[10px] font-mono px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-400/25 rounded-md flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      TRIGGER MOCK INCIDENT
                    </button>
                  </div>

                  {/* Alarm system list HUD (Module 7 constraints) */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    <div className="lg:col-span-8 space-y-4">
                      <h3 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold mb-2">
                        Active Alarms Timeline ({alertsStack.length})
                      </h3>

                      <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
                        {alertsStack.map((item) => {
                          const isCrit = item.severity === "Critical";
                          return (
                            <div 
                              key={item.id} 
                              className={`p-3.5 rounded-xl border flex gap-3 text-xs font-mono bg-slate-950/60 ${
                                isCrit 
                                  ? "border-red-500/25 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.1)] animate-pulse" 
                                  : "border-slate-800 text-slate-350"
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg shrink-0 h-8 w-8 flex items-center justify-center ${
                                isCrit ? "bg-red-500/10 text-red-400" : "bg-slate-900 text-slate-400"
                              }`}>
                                <ShieldAlert className="w-4 h-4" />
                              </div>
                              <div className="flex-1 space-y-1">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-bold uppercase text-[#a5b4fc]">{item.id} Event</span>
                                  <span className="text-slate-500">{item.time}</span>
                                </div>
                                <p className="text-[11px] leading-relaxed text-slate-300 font-sans font-medium">
                                  {item.text}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Operational advice */}
                    <div className="lg:col-span-4 bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 space-y-4 h-fit">
                      <h4 className="text-xs uppercase font-mono tracking-widest font-bold text-white flex items-center gap-1">
                        <Info className="w-4 h-4 text-purple-400 animate-pulse" />
                        Administrator SOC Guide
                      </h4>
                      <p className="text-xs font-sans text-slate-400 leading-relaxed">
                        Under a <b>MITIGATION CAMPAIGN</b>, you can bypass automation registrations by clicking the and generating automated click simulations using the trigger button on top. This populates dummy forensic indicators, helping students test correct diagnostic classification rules.
                      </p>
                    </div>

                  </div>

                </div>
              )}

              {activeTab === "profiling" && (
                <UserProfileModule 
                  threatLogs={threatLogs}
                  selectedThreat={selectedThreat}
                  onSelectThreat={setSelectedThreat}
                />
              )}

              {activeTab === "logs" && (
                <BotDetectionModule 
                  threatLogs={threatLogs}
                  onTriggerAlert={triggerAlertNotification}
                />
              )}

              {activeTab === "mirage" && (
                <MirageModule 
                  customHackerName={selectedThreat?.username}
                  customExploitUsed={selectedThreat?.reconstructionHistory[2]?.description || "SQL injection POST payload check"}
                  onTriggerAlert={triggerAlertNotification}
                />
              )}

              {activeTab === "shield" && (
                <TimelineModule 
                  threatLogs={threatLogs}
                  selectedThreat={selectedThreat}
                  onSelectThreat={setSelectedThreat}
                />
              )}

              {activeTab === "analytics" && (
                <ReportsModule onTriggerAlert={triggerAlertNotification} />
              )}

              {activeTab === "settings" && (
                <SettingsModule 
                  policy={policy}
                  onUpdatePolicy={(updated) => setPolicy(prev => ({ ...prev, ...updated }))}
                  onTriggerAlert={triggerAlertNotification}
                />
              )}

            </div>

          </div>

        )}

      </main>

      {/* Cyber footer info center (no tech larping, very professional) */}
      <footer className="w-full bg-slate-950 border-t border-blue-500/10 px-4 py-4 text-center text-[10px] font-mono text-slate-500 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© 2026 ECLEARNIX EDUCATIONAL PLATFORM. SYSTEM ENCRYPTION KEY STABLE.</span>
        <span>SECURITY NODE CONDUIT: SYNCED</span>
      </footer>

    </div>
  );
}
