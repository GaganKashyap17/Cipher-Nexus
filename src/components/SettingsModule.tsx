import { useState } from "react";
import { 
  Settings, 
  Cpu, 
  UserSquare, 
  BellRing, 
  Shuffle, 
  VolumeX, 
  Save, 
  ToggleLeft,
  CheckCircle
} from "lucide-react";
import { SecurityPolicy } from "../types";

interface SettingsModuleProps {
  policy: SecurityPolicy;
  onUpdatePolicy: (updated: Partial<SecurityPolicy>) => void;
  onTriggerAlert: (txt: string, severity: "High" | "Critical") => void;
}

export default function SettingsModule({ policy, onUpdatePolicy, onTriggerAlert }: SettingsModuleProps) {
  const [sensitivity, setSensitivity] = useState(policy.aiSensitivity);
  const [otpThreshold, setOtpThreshold] = useState(policy.otpTriggerThreshold);
  const [rateLimit, setRateLimit] = useState(policy.rateLimitThreshold);
  
  const [showToaster, setShowToaster] = useState(false);

  const saveConfigurationSettings = () => {
    onUpdatePolicy({
      aiSensitivity: sensitivity,
      otpTriggerThreshold: otpThreshold,
      rateLimitThreshold: rateLimit
    });
    
    setShowToaster(true);
    onTriggerAlert(`Updated cybersecurity policy matrix. AI Sensitivity set to ${sensitivity}%.`, "High");

    setTimeout(() => {
      setShowToaster(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Settings Title */}
      <div>
        <h2 className="text-sm uppercase tracking-widest text-[#a5b4fc] font-mono font-bold flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          NEXUS System Core & Security Policies
        </h2>
        <p className="text-xs font-sans text-slate-400 mt-1 leading-relaxed">
          Balance detection levels, configure autopilot honeypot triggers, manage notification dispatch pipelines, and adjust defensive rates.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Policy variables toggles and sliders */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 space-y-6">
          
          <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold pb-2 border-b border-blue-500/10">
            Defensive Parameter Tuning
          </h3>

          {/* AI Threat Sensitivity analyzer control slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-200 font-bold flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                AI THREAT SCANNER SENSITIVITY
              </span>
              <span className="text-cyan-400 font-bold">{sensitivity}%</span>
            </div>
            <p className="text-[11px] font-sans text-slate-450 leading-normal">
              Determines how strict behavioral click streams audits should be. High levels increase multi-factor challenges triggers on suspicious timing.
            </p>
            <input 
              type="range" 
              min="10" 
              max="95" 
              value={sensitivity}
              onChange={(e) => setSensitivity(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg outline-none"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-500">
              <span>MOCK COGNITIVE</span>
              <span>STANDARD SEVERITY</span>
              <span>MILITARY REASONING</span>
            </div>
          </div>

          {/* Adaptive MFA solver threshold */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-200 font-bold flex items-center gap-1.5">
                Adaptive OTP Trigger Threshold
              </span>
              <span className="text-yellow-400 font-bold">{otpThreshold}% Risk Score</span>
            </div>
            <p className="text-[11px] font-sans text-slate-450 leading-normal">
              Any registrant scoring above this limit triggers OTP / email verification block instead of straight logins.
            </p>
            <input 
              type="range" 
              min="20" 
              max="80" 
              value={otpThreshold}
              onChange={(e) => setOtpThreshold(Number(e.target.value))}
              className="w-full accent-yellow-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg"
            />
          </div>

          {/* Rate limits */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-200 font-bold">Max Requests Level Limit</span>
              <span className="text-indigo-400 font-bold">{rateLimit} Req/Sec</span>
            </div>
            <p className="text-[11px] font-sans text-slate-450 leading-normal font-medium">
              Maximum allowable registration requests rate for a single IPv4 source before trigger bans.
            </p>
            <input 
              type="range" 
              min="5" 
              max="100" 
              value={rateLimit}
              onChange={(e) => setRateLimit(Number(e.target.value))}
              className="w-full accent-indigo-400 cursor-pointer h-1.5 bg-slate-950 rounded-lg"
            />
          </div>

          {/* Policy Toggle list */}
          <div className="space-y-3 pt-3 border-t border-blue-500/10">
            <h4 className="text-xs uppercase font-mono text-white tracking-wider">
              Automatic Intervention Controls
            </h4>

            {/* MIRAGE Autopilot Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-900 text-xs text-slate-350">
              <div className="space-y-0.5">
                <span className="font-semibold block text-slate-200">MIRAGE Autopilot Container</span>
                <span className="text-[11px] text-slate-500">Route suspected bots instantly to fake DB environment</span>
              </div>
              <input
                type="checkbox"
                checked={policy.mirageAutopilot}
                onChange={(e) => onUpdatePolicy({ mirageAutopilot: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 outline-none accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* Block Disposable Emails Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-900 text-xs text-slate-350">
              <div className="space-y-0.5">
                <span className="font-semibold block text-slate-200">MX Reputation Shield</span>
                <span className="text-[11px] text-slate-500">Instantly decline registration if matched throwaway domains</span>
              </div>
              <input
                type="checkbox"
                checked={policy.blockDisposableEmails}
                onChange={(e) => onUpdatePolicy({ blockDisposableEmails: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 outline-none accent-cyan-400 cursor-pointer"
              />
            </div>

            {/* SQL Injection Protection Switch */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/80 border border-slate-900 text-xs text-slate-350">
              <div className="space-y-0.5">
                <span className="font-semibold block text-slate-200">Strict SQL Grammar Sanitization</span>
                <span className="text-[11px] text-slate-500">Evaluate input syntax for escape strings or injection vectors</span>
              </div>
              <input
                type="checkbox"
                checked={policy.sqlInjectionProtection}
                onChange={(e) => onUpdatePolicy({ sqlInjectionProtection: e.target.checked })}
                className="w-4 h-4 rounded text-blue-600 outline-none accent-cyan-400 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-between items-center">
            {showToaster && (
              <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1.5 animate-pulse">
                <CheckCircle className="w-4.5 h-4.5" />
                POLICIES RE-INDEXED SUCCESSFULLY
              </span>
            )}
            <div className="flex-1 text-right">
              <button
                onClick={saveConfigurationSettings}
                className="py-2.5 px-6 bg-gradient-to-r from-blue-600 to-[#818cf8] hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-mono font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
              >
                COMMIT TACTICAL SETTINGS
              </button>
            </div>
          </div>

        </div>

        {/* Informational SOC Guidelines rail (Module 9 constraints) */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 space-y-4">
            <h3 className="text-xs uppercase font-mono tracking-widest text-[#a5b4fc] font-bold flex items-center gap-1.5">
              <BellRing className="w-4 h-4" />
              SOC Notification Hub
            </h3>
            <p className="text-[11px] font-sans text-slate-400 leading-relaxed">
              Define target routes for security analyst alerts and notifications pipelines. Matches alerts with emergency flags.
            </p>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-900 text-[11px]">
                <span className="text-slate-400">Push Notifications to browser</span>
                <span className="text-white font-bold uppercase">Active</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-900 text-[11px]">
                <span className="text-slate-400">Audio Alarm alert trigger</span>
                <span className="text-slate-500 uppercase">Suspended</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-slate-950 border border-slate-900 text-[11px]">
                <span className="text-slate-400">Analyst Digest Report (Weekly)</span>
                <span className="text-cyan-400 font-bold uppercase">To Inbox</span>
              </div>
            </div>

            <p className="text-[10px] font-sans text-slate-500">
              Alerts generate real-time toast toasters on cyber monitoring modules.
            </p>
          </div>

          {/* Operational parameters instructions */}
          <div className="bg-slate-900/40 border border-blue-500/10 rounded-2xl p-4 text-[11px] font-sans text-slate-400 space-y-2 leading-relaxed">
            <span className="font-mono text-[10px] text-yellow-400 block uppercase tracking-wide">
              ADMIN NOTICE ON POLICY STABILITY:
            </span>
            <p>
              Adjusting the <b>AI THREAT SCANNER SENSITIVITY</b> scales risk ratings of logins, registration, and OTP completion. Max limits prevent unauthorized crawlers, protecting ECLEARNIX system resources perfectly.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
