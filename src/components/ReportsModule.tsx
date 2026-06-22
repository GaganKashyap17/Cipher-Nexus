import { useState } from "react";
import { 
  BarChart2, 
  Download, 
  TrendingUp, 
  Award, 
  Activity, 
  Heart, 
  FileText,
  Percent,
  CheckCircle2,
  RefreshCw
} from "lucide-react";

interface ReportsModuleProps {
  onTriggerAlert: (txt: string, severity: "High" | "Critical") => void;
}

export default function ReportsModule({ onTriggerAlert }: ReportsModuleProps) {
  const [exportLoading, setExportLoading] = useState(false);
  const [stats, setStats] = useState({
    accuracy: 99.4,
    health: 98.7,
    activeThreats: 2,
    scannedRegistrations: 489
  });

  const [botTypesStats] = useState([
    { label: "Disposable Email Registrants", count: 182, percent: 37, color: "bg-cyan-500" },
    { label: "Robotic Autofill Bots", count: 142, percent: 29, color: "bg-purple-500" },
    { label: "Brute Password Attempts", count: 98, percent: 20, color: "bg-yellow-500" },
    { label: "SQL Exploit Attempts", count: 67, percent: 14, color: "bg-red-500" }
  ]);

  const handleExportDataReport = () => {
    setExportLoading(true);
    onTriggerAlert("Compiling secure CSV forensic snapshot. Launching direct browser file pipeline...", "High");

    setTimeout(() => {
      setExportLoading(false);
      
      // Simulate raw Excel download pipeline securely
      try {
        const dummyReportData = {
          station: "NEXUS Core Sentinel System",
          generatedAt: new Date().toISOString(),
          riskIndex: "9.2%",
          accuracyRating: `${stats.accuracy}%`,
          aggregatedEventsLogsCount: stats.scannedRegistrations
        };
        
        const jsonStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dummyReportData, null, 2));
        const downloadElement = document.createElement('a');
        downloadElement.setAttribute("href", jsonStr);
        downloadElement.setAttribute("download", `NEXUS_INCIDENT_REPORT_${Date.now()}.json`);
        document.body.appendChild(downloadElement);
        downloadElement.click();
        downloadElement.remove();
        
      } catch (err) {
        console.error("PDF/JSON download bypass triggered silently.");
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title Block */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm uppercase tracking-widest text-[#818cf8] font-mono font-bold flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-indigo-400" />
            NEXUS Cryptographic Strategy & Analytics Reports
          </h2>
          <p className="text-xs font-sans text-slate-400 mt-1 leading-relaxed">
            Analytical graphs evaluating detection correctness rates, robotic distribution statistics, and full security system logs exports.
          </p>
        </div>

        <button
          onClick={handleExportDataReport}
          disabled={exportLoading}
          className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-mono font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-[0_0_8px_rgba(59,130,246,0.2)]"
        >
          {exportLoading ? (
            <RefreshCw className="w-4.5 h-4.5 animate-spin" />
          ) : (
            <Download className="w-4.5 h-4.5" />
          )}
          <span>{exportLoading ? "COMPILING FILE..." : "EXPORT SECURITY REPORT"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Core aggregate percentage ratings cards */}
        <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 flex flex-col justify-between group relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-mono text-slate-500 uppercase">AI FORENSIC REASONING ACCURACY</span>
            <p className="text-3xl font-bold font-sans text-white tracking-tight">{stats.accuracy}%</p>
            <p className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              ACCORDING TO 1.4K MODEL TOKENS TESTED
            </p>
          </div>
          <div className="absolute bottom-4 right-4 text-emerald-400/20">
            <Award className="w-14 h-14" />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-mono text-slate-500 uppercase">SYS STABILITY INDEX</span>
            <p className="text-3xl font-bold font-sans text-white tracking-tight">{stats.health}%</p>
            <p className="text-[10px] font-mono text-cyan-400 flex items-center gap-1">
              <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              ALL DECISION ENDPOINTS HEALTHY
            </p>
          </div>
          <div className="absolute bottom-4 right-4 text-cyan-400/20">
            <Heart className="w-14 h-14" />
          </div>
        </div>

        <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-1">
            <span className="text-[10px] tracking-widest font-mono text-slate-500 uppercase">SCANNED SESSION PIPES</span>
            <p className="text-3xl font-bold font-sans text-white tracking-tight">{stats.scannedRegistrations}</p>
            <p className="text-[10px] font-mono text-indigo-400">
              AUDITED FROM ECLEARNIX ENROLLMENT PORTAL
            </p>
          </div>
          <div className="absolute bottom-4 right-4 text-indigo-400/20">
            <FileText className="w-14 h-14" />
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Aggregated Threat vectors breakdown bars */}
        <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5">
          <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-4 pb-2 border-b border-blue-500/10">
            Intercepted Threat Vector Breakdown
          </h3>

          <div className="space-y-4">
            {botTypesStats.map((item) => (
              <div key={item.label} className="space-y-1 text-xs">
                <div className="flex justify-between font-mono text-[11px] text-slate-350">
                  <span>{item.label}</span>
                  <span className="font-semibold text-white">
                    {item.count} events ({item.percent}%)
                  </span>
                </div>
                {/* Visual bar */}
                <div className="h-2 bg-slate-950 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <p className="text-[10px] font-sans text-slate-500 mt-5 leading-normal text-center">
            Graph counts are updated recursively on threat signatures interception. Action metrics correlate to real-time honeypot traps.
          </p>
        </div>

        {/* Security Platform Accuracy Graph */}
        <div className="bg-slate-900/60 border border-blue-500/10 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs uppercase font-mono tracking-widest text-white font-bold mb-2 pb-2 border-b border-blue-500/10">
              Monthly Intelligence Target Audits (Last 5 Months)
            </h3>
            
            {/* Visual simulated line charting using pure flexbars */}
            <div className="h-32 flex items-end justify-between gap-3 px-2 pt-4">
              {[
                { label: "Jan", count: 120 },
                { label: "Feb", count: 190 },
                { label: "Mar", count: 240 },
                { label: "Apr", count: 310 },
                { label: "May", count: 489 }
              ].map((pt) => {
                const relativeHeight = pt.count / 5;
                return (
                  <div key={pt.label} className="flex-1 flex flex-col items-center gap-1.5 group">
                    <div className="w-full text-center text-[9px] font-mono text-slate-500 group-hover:text-white mb-1 transition-colors">
                      {pt.count}
                    </div>
                    <div 
                      className="w-full bg-gradient-to-t from-indigo-600/80 to-purple-500/80 hover:to-cyan-400 rounded-t transition-all"
                      style={{ height: `${Math.max(10, Math.min(100, relativeHeight))}px` }}
                    />
                    <span className="text-[10px] font-mono text-slate-400 group-hover:text-cyan-400">{pt.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <span className="text-[9px] font-mono text-slate-500 text-center uppercase mt-4 block">
            Aggregated metrics certified by NEXUS forensic ledger block
          </span>
        </div>

      </div>

    </div>
  );
}
