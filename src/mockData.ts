import { ThreatLog } from "./types";

export const INITIAL_THREAT_LOGS: ThreatLog[] = [
  {
    id: "LOG-8812",
    timestamp: "2026-05-23T05:58:12Z",
    ipAddress: "193.161.4.11",
    username: "anonymous_crawler",
    email: "crawler_alert@tempmail.io",
    country: "Russia",
    deviceFingerprint: "fp_chrome99_linux_v1a",
    threatType: "SQL_INJECTION",
    severity: "Critical",
    status: "DECEPT_REDIRECTED",
    riskScore: 98,
    clickIntervalMs: 8,
    sessionTrust: 2,
    browserHeaders: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/122.0.0.0 Safari/537.36",
    reconstructionHistory: [
      { step: "A-01: Connection Established", time: "05:58:10", description: "Headless browser requesting ECLEARNIX registration page.", severity: "Low" },
      { step: "A-02: Form Field Manipulation", time: "05:58:11", description: "Bypassed client-side length validations on 'Username' input.", severity: "Medium" },
      { step: "A-03: Exploit Injection", time: "05:58:12", description: "Injected SQL Payload into registration POST request: `' UNION SELECT username, password_hash FROM users --`", severity: "Critical" },
      { step: "A-04: Autopilot Defense Engage", time: "05:58:12", description: "NEXUS Core detected SQL grammar syntax. Triggered MIRAGE trap.", severity: "Critical" },
      { step: "A-05: Sandbox Relocation", time: "05:58:12", description: "Session seamlessly migrated into simulated SQL database honeypot.", severity: "High" }
    ]
  },
  {
    id: "LOG-7723",
    timestamp: "2026-05-23T05:51:40Z",
    ipAddress: "45.138.16.82",
    username: "studious_jane_bot",
    email: "studious_jane_bot@mailator12.com",
    country: "Ukraine",
    deviceFingerprint: "fp_firefox_macos_a9fb",
    threatType: "BOT_REGISTRATION",
    severity: "High",
    status: "OTP_CHALLENGED",
    riskScore: 82,
    clickIntervalMs: 14,
    sessionTrust: 18,
    browserHeaders: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15) Gecko/20100101 Firefox/112.0",
    reconstructionHistory: [
      { step: "B-01: Auto-Fill Detection", time: "05:51:38", description: "Form fields populated under 3 milliseconds.", severity: "Low" },
      { step: "B-02: Email Reputation Verification", time: "05:51:39", description: "Domain 'mailator12.com' matched disposable MX-record blacklist.", severity: "High" },
      { step: "B-03: Rapid Submission Check", time: "05:51:40", description: "Completed multi-page enrollment pattern in 0.12 seconds.", severity: "Medium" },
      { step: "B-04: Adaptive Verification", time: "05:51:40", description: "MFA challenge issued to dynamic device endpoint.", severity: "High" }
    ]
  },
  {
    id: "LOG-5510",
    timestamp: "2026-05-23T05:40:15Z",
    ipAddress: "201.24.195.101",
    username: "alchemist_ecb",
    email: "alchemist667@gmail.com",
    country: "Brazil",
    deviceFingerprint: "fp_safari_iphone_8xc2",
    threatType: "DISPOSABLE_EMAIL",
    severity: "Medium",
    status: "BLOCKED",
    riskScore: 65,
    clickIntervalMs: 1450,
    sessionTrust: 45,
    browserHeaders: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
    reconstructionHistory: [
      { step: "C-01: Registration Started", time: "05:39:50", description: "Manual browser session initiated registration form.", severity: "Low" },
      { step: "C-02: Username Collision", time: "05:39:58", description: "Checked 3 colliding administrative handles prior to choosing 'alchemist_ecb'.", severity: "Medium" },
      { step: "C-03: Trash Mail Selected", time: "05:40:12", description: "Entered transient dynamic inbox provider list alias.", severity: "High" },
      { step: "C-04: Access Terminated", time: "05:40:15", description: "Blocked based on policy 'Block Disposable Emails'.", severity: "Medium" }
    ]
  },
  {
    id: "LOG-4491",
    timestamp: "2026-05-23T05:32:02Z",
    ipAddress: "103.88.22.45",
    username: "spam_jedi",
    email: "spam_jedi_academy@outlook.com",
    country: "India",
    deviceFingerprint: "fp_chrome120_windows_p99",
    threatType: "CREDENTIAL_STUFFING",
    severity: "High",
    status: "DECEPT_REDIRECTED",
    riskScore: 89,
    clickIntervalMs: 40,
    sessionTrust: 12,
    browserHeaders: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    reconstructionHistory: [
      { step: "D-01: Gateway Hit", time: "05:31:58", description: "Post requests targeting '/api/auth/login' at high velocity.", severity: "Low" },
      { step: "D-02: Brute Force Keying", time: "05:32:00", description: "Swapping through 14 decrypted password databases in queue.", severity: "High" },
      { step: "D-03: MIRAGE Deception Triggered", time: "05:32:02", description: "Injected artificial success token which redirects password brute-forcer into sandbox system database.", severity: "High" }
    ]
  },
  {
    id: "LOG-1022",
    timestamp: "2026-05-23T05:21:09Z",
    ipAddress: "185.12.82.90",
    username: "ec_scholar_99",
    email: "scholar99@eclearnix.edu",
    country: "Germany",
    deviceFingerprint: "fp_safari_mac_p1a2",
    threatType: "NORMAL",
    severity: "Low",
    status: "MONITORED",
    riskScore: 8,
    clickIntervalMs: 3890,
    sessionTrust: 99,
    browserHeaders: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    reconstructionHistory: [
      { step: "E-01: Verified EDU Referral", time: "05:20:55", description: "Academic affiliate referral verified.", severity: "Low" },
      { step: "E-02: Fingerprint Safe", time: "05:21:00", description: "Standard secure browser headers, high entropy trackpad click distributions.", severity: "Low" },
      { step: "E-03: Enrollment Completed", time: "05:21:09", description: "Smooth normal user flow, threat score calculated as clear.", severity: "Low" }
    ]
  },
  {
    id: "LOG-2090",
    timestamp: "2026-05-23T05:15:30Z",
    ipAddress: "220.245.89.1",
    username: "spammy_professor",
    email: "spammy@mailinator.com",
    country: "Australia",
    deviceFingerprint: "fp_chrome99_win_ffb",
    threatType: "DISPOSABLE_EMAIL",
    severity: "Medium",
    status: "OTP_CHALLENGED",
    riskScore: 71,
    clickIntervalMs: 250,
    sessionTrust: 30,
    browserHeaders: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36",
    reconstructionHistory: [
      { step: "F-01: Forum Entry", time: "05:15:20", description: "Navigated to open forum portal.", severity: "Low" },
      { step: "F-02: Temp Mail Spotted", time: "05:15:25", description: "Registration email matches mailinator.com transient pattern.", severity: "Medium" },
      { step: "F-03: Bot Behavioral Score", time: "05:15:30", description: "Fast keystroke speeds, 250ms spacing. High likelihood of automated bot spammer registration.", severity: "High" }
    ]
  }
];

export const WORLD_ATTACKS_MOCK = [
  { name: "Node A: Frankfurt", coords: [120, 220], risk: 42, activeAlerts: 4, type: "Malicious SQL" },
  { name: "Node B: St. Petersburg", coords: [190, 160], risk: 95, activeAlerts: 14, type: "Brute Force" },
  { name: "Node C: Shanghai", coords: [320, 260], risk: 78, activeAlerts: 9, type: "Disposable Spam" },
  { name: "Node D: Mumbai", coords: [280, 310], risk: 34, activeAlerts: 1, type: "BOT Signature" },
  { name: "Node E: São Paulo", coords: [600, 480], risk: 62, activeAlerts: 5, type: "Form Spam" },
  { name: "Node F: Portland (Nexus Hub)", coords: [780, 220], risk: 4, activeAlerts: 0, type: "Operational" },
  { name: "Node G: Lagos", coords: [480, 390], risk: 51, activeAlerts: 3, type: "Credential Stuffing" }
];
