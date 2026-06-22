import React, { useState, useEffect } from "react";
import { Shield, Sparkles, Key, AlertTriangle, Cpu, Terminal, RefreshCw, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AuthScreenProps {
  onAuthSuccess: (email: string) => void;
  triggerHoneypot: (hackerName: string, exploitUsed: string) => void;
  triggerAlert: (alertText: string, severity: "High" | "Critical") => void;
}

export default function AuthScreen({ onAuthSuccess, triggerHoneypot, triggerAlert }: AuthScreenProps) {
  // Input fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");

  // States
  const [selectedEmulator, setSelectedEmulator] = useState<"standard" | "bot" | "sql">("standard");
  const [isTypingRapidly, setIsTypingRapidly] = useState(false);
  const [authStage, setAuthStage] = useState<"credentials" | "otp" | "mirage_lock" | "success">("credentials");
  const [typedTimestamps, setTypedTimestamps] = useState<number[]>([]);
  const [sysStatus, setSysStatus] = useState("AWAITING OPERATOR INPUT...");
  const [checkingReputation, setCheckingReputation] = useState(false);
  const [riskAssessment, setRiskAssessment] = useState<{ score: number; status: string }>({ score: 4, status: "CLEAR" });

  // Calculate typing intervals to show Click Timing Analysis in real time!
  const handleKeyboardActivity = (val: string) => {
    const now = Date.now();
    const times = [...typedTimestamps, now];
    setTypedTimestamps(times);
    
    if (times.length > 2) {
      const lastIntervals = times.slice(-5).map((t, index, arr) => {
        if (index === 0) return 0;
        return t - arr[index - 1];
      }).filter(interval => interval > 0);
      
      const averageInterval = lastIntervals.reduce((a, b) => a + b, 0) / (lastIntervals.length || 1);
      
      // If average keystroke is exceptionally fast (< 25ms), flag as computerized
      if (averageInterval < 40 && selectedEmulator === "bot") {
        setIsTypingRapidly(true);
      } else {
        setIsTypingRapidly(false);
      }
    }
  };

  // Preset configuration button to test
  const applyEmulationPreset = (type: "standard" | "bot" | "sql") => {
    setSelectedEmulator(type);
    setTypedTimestamps([]);
    setIsTypingRapidly(false);
    
    if (type === "standard") {
      setEmail("gagankashyap650@gmail.com");
      setUsername("admin_gagan");
      setPassword("**********");
      setRiskAssessment({ score: 5, status: "SECURE" });
      setSysStatus("AWAITING CREDENTIAL SUBMISSION...");
    } else if (type === "bot") {
      setEmail("scrapper_bot@dispostable.com");
      setUsername("automated_crawler_6");
      setPassword("bruteforce123");
      setRiskAssessment({ score: 85, status: "DETECTION WARNING: SUSPICIOUS REPUTATION" });
      setSysStatus("WARNING: DISPOSABLE MX DOMAIN DETECTED");
    } else if (type === "sql") {
      setEmail("injector@exploits.net");
      setUsername("admin' UNION SELECT * FROM system_configs --");
      setPassword("bypass' OR '1'='1");
      setRiskAssessment({ score: 99, status: "CRITICAL THREAT: SECURITY BREACH IMMINENT" });
      setSysStatus("CRITICAL: SQL INJECTION VECTOR RECOGNIZED IN USERNAME FIELD");
    }
  };

  // Initialize once
  useEffect(() => {
    applyEmulationPreset("standard");
  }, []);

  const handleAuthenticationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckingReputation(true);
    setSysStatus("NEXUS CORE RUNNING COMPREHENSIVE BEHAVIORAL AUDITING...");

    // Simulate cyber monitoring latency
    setTimeout(() => {
      setCheckingReputation(false);
      
      if (selectedEmulator === "sql") {
        // SQL injection results in immediate redirection to MIRAGE Honeypot!
        triggerAlert("SQL payload detected in username validation block!", "Critical");
        setAuthStage("mirage_lock");
        setSysStatus("SANDBOX ROUTING SIGNAL ENGAGED. LAUNCHING MIRAGE DECEPTION WRAPPER...");
        
        // Relocate user automatically to Honeypot view after 2.5 seconds
        setTimeout(() => {
          triggerHoneypot(username, "SQL Injection String (' UNION SELECT ...)");
        }, 2200);

      } else if (selectedEmulator === "bot") {
        // Spammer gets Adaptive Multi-Factor challenge trigger!
        triggerAlert("Automatic disposable sign-up attempt. Challenge triggered.", "High");
        setAuthStage("otp");
        setSysStatus("ADAPTIVE VERIFICATION TRIGGERED: HIGH EXPLOIT POTENTIAL DETECTED.");
      } else {
        // Clear login
        setAuthStage("success");
        setSysStatus("CREDENTIALS ACCEPTED. SYNCING ANALYST OPERATIONAL PRIVILEGES.");
        setTimeout(() => {
          onAuthSuccess(email);
        }, 1500);
      }
    }, 1800);
  };

  const verifyOTPChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    // Bot is trapped even if they key correct OTP, or fails verification.
    setCheckingReputation(true);
    setSysStatus("VALIDATING ADAPTIVE OTP CHANNELS...");

    setTimeout(() => {
      setCheckingReputation(false);
      triggerAlert("Bot timing pattern detected in OTP solve flow. Trap Relocation executed.", "Critical");
      setAuthStage("mirage_lock");
      setSysStatus("BOT TELEMETRY RATIFIED. REDIRECTING ATTACKER NODE TO DECEPTION WRAPPER.");
      
      setTimeout(() => {
        triggerHoneypot(username, "Disposable Email + Automated Keying MFA Bypass Attempt");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 px-4 relative z-10">
      
      {/* Emulator selector HUD top bar */}
      <div className="w-full max-w-lg mb-8 bg-slate-900/80 border border-blue-500/20 backdrop-blur-md p-4 rounded-xl shadow-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
          <h3 className="text-xs uppercase font-mono tracking-widest text-[#a5f3fc]">
            Threat Scenario Simulation Panel
          </h3>
        </div>
        <p className="text-[11px] font-sans text-slate-400 mb-4 leading-relaxed">
          Select an interactive scenario prototype below to evaluate how NEXUS Core intercepts threats, 
          triggers conditional MFA, or relocates bots seamlessly into safe honeypots!
        </p>
        
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => applyEmulationPreset("standard")}
            className={`px-3 py-2 text-[11px] font-mono tracking-wider rounded border text-center transition-all cursor-pointer ${
              selectedEmulator === "standard"
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-400/40 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                : "bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700"
            }`}
          >
            ● Safe Analyst Login
          </button>
          <button
            onClick={() => applyEmulationPreset("bot")}
            className={`px-3 py-2 text-[11px] font-mono tracking-wider rounded border text-center transition-all cursor-pointer ${
              selectedEmulator === "bot"
                ? "bg-yellow-500/10 text-yellow-400 border-yellow-400/40 shadow-[0_0_8px_rgba(234,179,8,0.15)]"
                : "bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700"
            }`}
          >
            ● Spam Spammer Bot
          </button>
          <button
            onClick={() => applyEmulationPreset("sql")}
            className={`px-3 py-2 text-[11px] font-mono tracking-wider rounded border text-center transition-all cursor-pointer ${
              selectedEmulator === "sql"
                ? "bg-red-500/10 text-red-500 border-red-500/40 shadow-[0_0_8px_rgba(239,68,68,0.15)]"
                : "bg-slate-950/40 text-slate-400 border-slate-800 hover:border-slate-700"
            }`}
          >
            ● SQL Cyber Attack
          </button>
        </div>
      </div>

      {/* Main Glassmorphic Terminal Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={authStage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-blue-500/15 rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.15)] overflow-hidden"
        >
          {/* Scanline glow indicator */}
          <div className={`h-[3px] w-full ${
            selectedEmulator === "sql" 
              ? "bg-gradient-to-r from-red-600 via-red-500 to-red-600" 
              : selectedEmulator === "bot" 
                ? "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500" 
                : "bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600"
          }`} />

          <div className="p-6 sm:p-8 flex flex-col items-center">
            
            {/* Hologram Core */}
            <div className={`relative flex items-center justify-center w-16 h-16 rounded-full border mb-6 transition-colors ${
              selectedEmulator === "sql" 
                ? "bg-red-500/10 border-red-500/30" 
                : selectedEmulator === "bot" 
                  ? "bg-yellow-500/10 border-yellow-500/30 animate-pulse" 
                  : "bg-blue-500/10 border-cyan-400/40"
            }`}>
              {selectedEmulator === "sql" ? (
                <AlertTriangle className="w-8 h-8 text-red-400" />
              ) : selectedEmulator === "bot" ? (
                <Cpu className="w-8 h-8 text-yellow-400" />
              ) : (
                <Shield className="w-8 h-8 text-cyan-400 animate-pulse" />
              )}
              <div className={`absolute inset-0 rounded-full blur-md opacity-40 -z-10 ${
                selectedEmulator === "sql" ? "bg-red-500/40" : selectedEmulator === "bot" ? "bg-yellow-500/40" : "bg-cyan-500/40"
              }`} />
            </div>

            {/* Title / Brand info */}
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-white tracking-widest font-sans flex items-center justify-center gap-2">
                NEXUS NODE SHIELD
              </h2>
              <p className="text-[11px] font-mono text-slate-400 tracking-wider uppercase mt-1">
                ECLEARNIX SECURITY CHECKPOINT
              </p>
            </div>

            {/* Realtime Risk Level indicator in Login Page */}
            <div className="w-full bg-slate-950/60 p-2.5 rounded-lg border border-blue-500/10 mb-6 text-xs font-mono">
              <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1">
                <span>BEHAVIOR RISK ASSESSMENT</span>
                <span className={riskAssessment.score > 75 ? "text-red-400 font-bold" : riskAssessment.score > 40 ? "text-yellow-400" : "text-emerald-400"}>
                  {riskAssessment.score}% RISK
                </span>
              </div>
              <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ${
                    riskAssessment.score > 75 ? "bg-red-500" : riskAssessment.score > 40 ? "bg-yellow-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${riskAssessment.score}%` }}
                />
              </div>
              <p className={`text-[9px] uppercase tracking-wide truncate ${
                riskAssessment.score > 75 ? "text-red-400" : riskAssessment.score > 40 ? "text-yellow-400" : "text-emerald-400"
              }`}>
                STATUS: {riskAssessment.status}
              </p>
            </div>

            {authStage === "credentials" && (
              <form onSubmit={handleAuthenticationSubmit} className="w-full space-y-4">
                
                {/* Username Input with realtime click stream timings simulator */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                    Operator Handle
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Terminal className="h-3.5 w-3.5 text-slate-500" />
                    </span>
                    <input
                      required
                      type="text"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                        handleKeyboardActivity(e.target.value);
                      }}
                      className="block w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-blue-500/15 focus:border-cyan-400/60 rounded-lg text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
                      placeholder="e.g. gagan_analyst"
                    />
                  </div>
                </div>

                {/* Email input field checking domain */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                    Affiliated Email Node
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-3 py-2 bg-slate-950/80 border border-blue-500/15 focus:border-cyan-400/60 rounded-lg text-xs font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400/20"
                    placeholder="email@eclearnix.edu"
                  />
                  {selectedEmulator === "bot" && (
                    <span className="block text-[9px] text-yellow-400 font-mono">
                      ⚠ Disposable MX-record provider flagged
                    </span>
                  )}
                </div>

                {/* Password field */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-400 tracking-wider uppercase">
                    Authorization Phrase
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Key className="h-3.5 w-3.5 text-slate-500" />
                    </span>
                    <input
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-blue-500/15 focus:border-cyan-400/60 rounded-lg text-xs font-mono text-white placeholder-slate-600 focus:outline-none"
                      placeholder="••••••••••••••"
                    />
                  </div>
                </div>

                {/* Cyber Timing Indicator */}
                {isTypingRapidly && (
                  <div className="bg-red-500/10 border border-red-500/20 p-2 rounded text-[10px] font-mono text-red-400 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 animate-spin" />
                    <span>BOT THREAT: Keyboard timing matches simulated auto-clicker.</span>
                  </div>
                )}

                {/* Bypass Admin entry */}
                <div className="pt-2">
                  <button
                    id="auth-submit-btn"
                    type="submit"
                    disabled={checkingReputation}
                    className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-sans font-semibold text-xs tracking-wider uppercase transition-all duration-150 disabled:opacity-50"
                  >
                    {checkingReputation ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-white" />
                        <span>INTELLIGENCE RUNNING AUDITS...</span>
                      </>
                    ) : (
                      <>
                        <span>INITIALIZE AUTH PATHWAY</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

            {authStage === "otp" && (
              <form onSubmit={verifyOTPChallenge} className="w-full space-y-4">
                <div className="bg-yellow-500/10 border border-yellow-500/30 p-3 rounded-lg text-xs font-mono text-yellow-300 space-y-1.5 mb-3">
                  <span className="font-semibold block uppercase tracking-wide">Adaptive MFA Challenge Triggered</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    NEXUS Intelligence flagged high-speed click profiles and a disposable email alias. 
                    MFA code issued to dynamic channel. Key in the OTP simulation token to request clearing.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-slate-400 tracking-wider uppercase text-center">
                    Simulated Dynamic OTP Token
                  </label>
                  <input
                    required
                    maxLength={6}
                    type="text"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g,''))}
                    className="block w-full tracking-[1.5em] text-center px-3 py-3 bg-slate-950/90 border border-yellow-500/30 focus:border-yellow-400/75 rounded-lg text-base font-mono text-yellow-400 focus:outline-none"
                    placeholder="992834"
                  />
                  <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono mt-1">
                    <span>MOTHERSHIP POOL: OTP_CHALLENGED</span>
                    <span>ATTEMPTS: 1</span>
                  </div>
                </div>

                <button
                  id="auth-otp-verify-btn"
                  type="submit"
                  disabled={checkingReputation}
                  className="w-full cursor-pointer flex items-center justify-center gap-2 py-2.5 px-4 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg font-mono font-semibold text-xs tracking-wider uppercase transition-all"
                >
                  {checkingReputation ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>DECODE OTP CHALLENGE TOKEN</span>
                  )}
                </button>
              </form>
            )}

            {authStage === "mirage_lock" && (
              <div className="w-full text-center py-6 space-y-4">
                <div className="animate-spin duration-1000 inline-block w-8 h-8 border-2 border-t-red-500 border-red-500/20 rounded-full" />
                <div className="space-y-1">
                  <span className="text-red-500 block uppercase tracking-widest font-mono text-xs font-bold animate-pulse">
                    🚨 RED ALERT ACTIVATED 🚨
                  </span>
                  <p className="text-[11px] font-mono text-slate-400 max-w-sm mx-auto leading-relaxed">
                    CRITICAL EXPLOIT DETECTED of type SQL_INJECTION. Sandbox containment triggers automatically. 
                    Relocating node {username} to the MIRAGE Honeypot Server database environment...
                  </p>
                </div>
              </div>
            )}

            {authStage === "success" && (
              <div className="w-full text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <span className="text-emerald-400 block uppercase tracking-widest font-mono text-xs font-semibold">
                  ACCESS APPROVED
                </span>
                <p className="text-[10px] font-mono text-slate-400">
                  Synching operational parameters. Welcome key verified.
                </p>
              </div>
            )}

          </div>

          {/* Card footer details conforming to Hacker Defense command center aesthetic */}
          <div className="bg-slate-950/60 p-4 border-t border-blue-500/10 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              Protected by NEXUS AI
            </span>
            <span>SHIELD ACTIVE v2.5</span>
          </div>

        </motion.div>
      </AnimatePresence>
    </div>
  );
}
