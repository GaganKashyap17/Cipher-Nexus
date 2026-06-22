import { 
  BarChart2, 
  Activity, 
  UserCheck, 
  Terminal, 
  ShieldAlert, 
  Cpu, 
  PieChart, 
  Settings,
  Menu,
  X,
  LogOut,
  Shield
} from "lucide-react";
import React, { useState } from "react";

export interface TabItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tabId: string) => void;
  onLogout: () => void;
  userEmail: string;
}

export default function Sidebar({ activeTab, setActiveTab, onLogout, userEmail }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const tabs: TabItem[] = [
    { id: "overview", label: "Overview Center", icon: BarChart2 },
    { id: "live", label: "Live Telemetry", icon: Activity, badge: "LIVE" },
    { id: "profiling", label: "User Profiling", icon: UserCheck },
    { id: "logs", label: "System Core Logs", icon: Terminal },
    { id: "mirage", label: "MIRAGE Honeypot", icon: ShieldAlert, badge: "TRAP" },
    { id: "shield", label: "Neural Shield", icon: Cpu },
    { id: "analytics", label: "Intelligence Reports", icon: PieChart },
    { id: "settings", label: "Security Policies", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Bar Toggle */}
      <div className="md:hidden flex items-center justify-between bg-slate-950 border-b border-blue-500/10 px-4 py-3 text-slate-300">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-cyan-400" />
          <span className="font-sans font-bold text-white text-sm tracking-widest">NEXUS CONSOLE</span>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 px-2 border border-slate-700 rounded bg-slate-900/60 text-slate-200"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar navigation drawer container */}
      <div className={`
        fixed md:relative inset-y-0 left-0 z-40 w-64 bg-slate-950/90 md:bg-slate-950/40 backdrop-blur-md 
        border-r border-blue-500/10 flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        {/* Navigation list */}
        <div className="px-3 py-6 flex-1 overflow-y-auto">
          {/* Section banner */}
          <div className="mb-6 px-3 flex flex-row items-center gap-2 hidden md:flex">
            <h2 className="text-[10px] font-mono tracking-widest text-[#818cf8] uppercase p-1 rounded bg-[#818cf8]/10 border border-[#818cf8]/20">
              TACTICAL DASHBOARD
            </h2>
          </div>

          <div className="space-y-1.5">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`sidebar-tab-${tab.id}`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-150 cursor-pointer text-left
                    ${isActive 
                      ? "bg-blue-500/10 text-cyan-400 border border-cyan-400/30 shadow-[0_0_12px_rgba(34,211,238,0.15)]" 
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-cyan-400" : "text-slate-400"}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${
                      tab.badge === "LIVE" 
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 animate-pulse" 
                        : "bg-red-500/20 text-red-400 border border-red-500/30"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* User context footer */}
        <div className="p-4 border-t border-blue-500/10 bg-slate-950/60">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="overflow-hidden">
              <p className="text-[11px] font-sans font-medium text-slate-300 truncate">
                {userEmail || "anonymous_operator"}
              </p>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                ADMIN PRIVILEGES
              </p>
            </div>
          </div>
          <button
            id="sidebar-logout-btn"
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 border border-red-500/20 hover:border-red-500/60 hover:bg-red-500/10 rounded-lg text-xs font-mono text-red-400 cursor-pointer transition-all"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>DISCONNECT SESSION</span>
          </button>
        </div>
      </div>
      
      {/* Background shadow overlay on mobile when open */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
        />
      )}
    </>
  );
}
