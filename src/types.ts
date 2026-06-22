export interface ThreatLog {
  id: string;
  timestamp: string;
  ipAddress: string;
  username: string;
  email: string;
  country: string;
  deviceFingerprint: string;
  threatType: "BOT_REGISTRATION" | "DISPOSABLE_EMAIL" | "CREDENTIAL_STUFFING" | "DOS_ATTACK" | "SQL_INJECTION" | "ANOMALOUS_CLICKSTREAM" | "NORMAL";
  severity: "Low" | "Medium" | "High" | "Critical";
  status: "DECEPT_REDIRECTED" | "BLOCKED" | "OTP_CHALLENGED" | "MONITORED" | "RESOLVED";
  riskScore: number;
  clickIntervalMs: number;
  sessionTrust: number;
  browserHeaders: string;
  reconstructionHistory: Array<{
    step: string;
    time: string;
    description: string;
    severity: "Low" | "Medium" | "High" | "Critical";
  }>;
}

export interface SecurityMetric {
  activeNodes: number;
  threatsNeutralized: number;
  mirageRedirects: number;
  globalRiskScore: number;
}

export interface SecurityPolicy {
  aiSensitivity: number; // 0-100
  otpTriggerThreshold: number; // 0-100
  mirageAutopilot: boolean;
  blockDisposableEmails: boolean;
  sqlInjectionProtection: boolean;
  rateLimitThreshold: number; // req/sec per IP
}
