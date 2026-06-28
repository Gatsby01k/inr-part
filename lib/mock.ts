import {
  Activity,
  BadgeCheck,
  CircleSlash,
  ClipboardCheck,
  FileCheck2,
  FileSignature,
  Gauge,
  Handshake,
  Layers3,
  ListChecks,
  type LucideIcon,
  ScrollText,
  ShieldCheck,
  Timer,
  TrendingUp,
  Wallet,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navLinks = [
  { label: "How it works", href: "#how" },
  { label: "Portal", href: "#portal" },
  { label: "Score", href: "#score" },
  { label: "Requirements", href: "#requirements" },
  { label: "Apply", href: "#apply" },
];

/* ------------------------------------------------------------------ */
/* Hero — dashboard preview                                            */
/* ------------------------------------------------------------------ */

export const heroBullets = [
  "Review-based partner access",
  "Workflow, proof and reconciliation tracking",
  "Score-based operating profile",
];

export type HeroStat = {
  label: string;
  value: string;
  tone?: "brand" | "electric" | "amber" | "neutral";
};

export const heroStats: HeroStat[] = [
  { label: "Partner Status", value: "Verified", tone: "brand" },
  { label: "Partner Tier", value: "Verified", tone: "neutral" },
  { label: "Partner Score", value: "86/100", tone: "brand" },
  { label: "Operating Limit", value: "₹5,00,000/day", tone: "neutral" },
  { label: "Available Capacity", value: "₹3,20,000", tone: "electric" },
  { label: "Reserve Status", value: "Agreement-based", tone: "amber" },
  { label: "Active Workflows", value: "3", tone: "neutral" },
  { label: "Proof Verified", value: "94%", tone: "brand" },
  { label: "Reconciliation Match", value: "98.4%", tone: "electric" },
  { label: "Mode", value: "Private Beta", tone: "neutral" },
];

/* ------------------------------------------------------------------ */
/* What approved partners get                                         */
/* ------------------------------------------------------------------ */

export const benefits: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Clear operating limits",
    copy: "See your daily operating limit and available capacity at a glance — no guessing how much you can settle.",
    icon: Gauge,
  },
  {
    title: "Workflow tracking",
    copy: "Every settlement workflow with its amount, status and required proof, tracked in one structured view.",
    icon: Layers3,
  },
  {
    title: "Proof and reconciliation history",
    copy: "Keep a clean record of submitted proof and matched, pending and exception reconciliation states.",
    icon: FileCheck2,
  },
  {
    title: "Partner score and tier growth",
    copy: "Reliable operating builds your partner score and unlocks stronger operating profiles over time.",
    icon: TrendingUp,
  },
];

/* ------------------------------------------------------------------ */
/* How partner access works — 4 steps                                 */
/* ------------------------------------------------------------------ */

export const steps: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "Apply for review",
    copy: "Submit your partner profile — operating entity, region, settlement experience and contact details.",
    icon: ClipboardCheck,
  },
  {
    title: "Partner profile is reviewed",
    copy: "Your profile, operating history, communication reliability and workflow fit are reviewed by the team.",
    icon: ShieldCheck,
  },
  {
    title: "Operating profile and agreement are assigned",
    copy: "Approved partners receive an operating profile, limits, reserve terms and a partner agreement.",
    icon: FileSignature,
  },
  {
    title: "Portal access is activated",
    copy: "Once the agreement is in place, private portal access is activated and your workflows go live.",
    icon: BadgeCheck,
  },
];

/* ------------------------------------------------------------------ */
/* Operating reserve section                                          */
/* ------------------------------------------------------------------ */

export const reserveCards: { title: string; copy: string; icon: LucideIcon }[] = [
  {
    title: "No public deposit collection",
    copy: "This website never collects deposits, payments or transfers. Nothing is charged here.",
    icon: CircleSlash,
  },
  {
    title: "No personal account details requested",
    copy: "We do not ask for bank, UPI, card or personal account details anywhere on this site.",
    icon: ShieldCheck,
  },
  {
    title: "Review first, agreement second",
    copy: "Partners are reviewed before anything is assigned. Terms are agreed in writing, not online.",
    icon: Handshake,
  },
  {
    title: "Operating profile before activation",
    copy: "Limits and any reserve requirement are set inside your operating profile prior to activation.",
    icon: ScrollText,
  },
];

/* ------------------------------------------------------------------ */
/* Portal preview                                                      */
/* ------------------------------------------------------------------ */

export const portalTabs = [
  "Overview",
  "Workflows",
  "Proof",
  "Reconciliation",
  "Score",
  "Profile",
] as const;

export type OverviewMetric = { label: string; value: string; tone?: "brand" | "electric" | "amber" };

export const overviewMetrics: OverviewMetric[] = [
  { label: "Partner Tier", value: "Verified", tone: "brand" },
  { label: "Partner Score", value: "86/100", tone: "brand" },
  { label: "Operating Limit", value: "₹5,00,000/day" },
  { label: "Available Capacity", value: "₹3,20,000", tone: "electric" },
  { label: "Active Workflows", value: "3" },
  { label: "Proof Verified", value: "94%", tone: "brand" },
  { label: "Reconciliation Match", value: "98.4%", tone: "electric" },
  { label: "Reserve Status", value: "Agreement-based", tone: "amber" },
];

export type Workflow = {
  id: string;
  amount: string;
  status: string;
  statusTone: "amber" | "electric" | "brand";
  proof: string;
  reconciliation: string;
  reconTone: "amber" | "electric" | "brand";
};

export const workflows: Workflow[] = [
  {
    id: "INR-2841",
    amount: "₹75,000",
    status: "Awaiting proof",
    statusTone: "amber",
    proof: "Required",
    reconciliation: "Pending",
    reconTone: "amber",
  },
  {
    id: "INR-2842",
    amount: "₹42,500",
    status: "Completed",
    statusTone: "brand",
    proof: "Verified",
    reconciliation: "Matched",
    reconTone: "brand",
  },
  {
    id: "INR-2843",
    amount: "₹1,20,000",
    status: "Active",
    statusTone: "electric",
    proof: "In progress",
    reconciliation: "Open",
    reconTone: "electric",
  },
];

export const proofRows = [
  { label: "Proof verified", value: "94%", note: "Quality across recent workflows", icon: FileCheck2 },
  { label: "Verified today", value: "2", note: "INR-2842 and one prior", icon: BadgeCheck },
  { label: "Proof required", value: "1", note: "INR-2841 awaiting upload", icon: Timer },
];

export const reconRows = [
  { label: "Reconciliation match", value: "98.4%", note: "Matched against settlement records", icon: Activity },
  { label: "Pending", value: "1", note: "INR-2841 reconciliation open", icon: Timer },
  { label: "Exceptions", value: "0", note: "No unresolved exceptions", icon: ShieldCheck },
];

export const scoreSummary = [
  { label: "Partner Score", value: "86 / 100", icon: Gauge },
  { label: "Current Tier", value: "Verified", icon: BadgeCheck },
  { label: "Next Tier", value: "Pro · 68%", icon: TrendingUp },
];

export const profileRows = [
  { label: "Operating entity", value: "Professional trading entity" },
  { label: "Operating region", value: "North & West India" },
  { label: "Review status", value: "Approved" },
  { label: "Reserve status", value: "Agreement-based" },
  { label: "Communication", value: "Reliable · same-day" },
  { label: "Mode", value: "Private Beta" },
];

/* ------------------------------------------------------------------ */
/* Partner score                                                       */
/* ------------------------------------------------------------------ */

export const scoreFactors = [
  "Proof quality",
  "Response speed",
  "Workflow completion",
  "Reconciliation match rate",
  "Exception ratio",
  "Operating availability",
  "Review history",
  "Partner consistency",
];

/* ------------------------------------------------------------------ */
/* Partner tiers                                                       */
/* ------------------------------------------------------------------ */

export const tiers: { name: string; tagline: string; featured?: boolean; features: string[] }[] = [
  {
    name: "Starter",
    tagline: "Newly reviewed",
    features: ["Recently approved partner", "Initial operating profile", "Core workflow visibility", "Manual review checkpoints"],
  },
  {
    name: "Verified",
    tagline: "Stable active partner",
    featured: true,
    features: ["Consistent active operating", "Higher operating limits", "Full score history", "Faster coordination"],
  },
  {
    name: "Pro",
    tagline: "High reliability",
    features: ["Proven reliability record", "Priority workflow handling", "Advanced reporting", "Lower operational friction"],
  },
  {
    name: "Prime",
    tagline: "Established operator",
    features: ["Established settlement partner", "Custom operating profile", "Dedicated coordination", "Extended reporting"],
  },
];

/* ------------------------------------------------------------------ */
/* Before / After                                                      */
/* ------------------------------------------------------------------ */

export const beforeItems = [
  "Scattered messages",
  "Unclear status",
  "Manual proof chasing",
  "Weak history",
  "No partner score",
  "No workflow visibility",
];

export const afterItems = [
  "Private portal access",
  "Structured workflows",
  "Clear status",
  "Proof tracking",
  "Reconciliation history",
  "Partner score",
  "Operating profile",
  "Private network access",
];

/* ------------------------------------------------------------------ */
/* Requirements                                                        */
/* ------------------------------------------------------------------ */

export const requirements = [
  "Business or professional operating entity",
  "INR settlement experience",
  "Clear operating region",
  "Reliable communication",
  "Proof submission discipline",
  "Agreement before activation",
  "Review-based approval",
  "Portal access after approval",
  "Ability to follow structured workflow rules",
  "No anonymous participation",
];

/* ------------------------------------------------------------------ */
/* Application form options                                            */
/* ------------------------------------------------------------------ */

export const companyTypes = [
  "OTC desk",
  "Professional trading entity",
  "Liquidity / settlement partner",
  "Payment partner",
  "Settlement operator",
  "Other",
];

export const volumeRanges = ["Below ₹10L", "₹10L – ₹50L", "₹50L – ₹2Cr", "₹2Cr+"];

export const portalGoals = [
  "Workflow tracking",
  "Proof history",
  "Reconciliation visibility",
  "Partner score",
  "Operating profile",
  "Private network access",
];

// "What happens after you apply" — onboarding timeline.
export const onboardingSteps = [
  "Profile submitted",
  "Review in progress",
  "Operating fit assessment",
  "Agreement and reserve terms if applicable",
  "Portal access for approved partners",
];

// "What this form never asks for" — compliance / trust block.
export const neverAsks = [
  "Bank account details",
  "Personal account details",
  "UPI details",
  "Card details",
  "Deposit amount",
  "Payment information",
];

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export const faq = [
  {
    q: "What is INR P2P Partner Portal?",
    a: "It is a private partner portal for approved INR P2P settlement operators. Inside it, partners manage their operating profile, track workflows, maintain proof history, view reconciliation status and build their partner score.",
  },
  {
    q: "Who can apply?",
    a: "Approved P2P settlement operators, OTC desks, professional trading entities, liquidity and settlement partners, and experienced INR operators with a business or professional operating entity.",
  },
  {
    q: "Is this open to everyone?",
    a: "No. Access is review-based. Only reviewed and approved partners receive portal access — there is no open or anonymous participation.",
  },
  {
    q: "What is Partner Score?",
    a: "Partner Score reflects operating reliability across proof quality, response speed, workflow completion, reconciliation match rate, exception ratio, availability, review history and consistency. A stronger score supports better operating profiles over time.",
  },
  {
    q: "How are operating limits assigned?",
    a: "Limits are assigned after partner review, based on your operating profile, reliability history, proof quality, reconciliation history and partner score — not requested or unlocked on this website.",
  },
  {
    q: "What is an operating reserve?",
    a: "An operating reserve, also called a security reserve, is a requirement that may be assigned to an approved partner as part of the partner agreement. It is set inside the operating profile after review — never collected on this public website.",
  },
  {
    q: "Does this website collect deposits?",
    a: "No. Reserve requirements, if applicable, are assigned only after partner review and agreement. The public website does not collect deposits or payment details.",
  },
  {
    q: "What does the portal track?",
    a: "Operating profile, workflow status, proof history, reconciliation status, review state and partner score — shown here with sample frontend data in this demo.",
  },
  {
    q: "What happens after I apply?",
    a: "Your partner profile is submitted for review. Approved partners are assigned an operating profile and agreement, and portal access is activated afterward.",
  },
  {
    q: "Can partners increase access over time?",
    a: "Yes. Reliable operating improves your partner score and reputation, which can support higher reviewed access and stronger operating profiles.",
  },
  {
    q: "Is this a public marketplace?",
    a: "No. This is a closed partner portal for reviewed business partners and professional operators — not a public marketplace.",
  },
];

/* ------------------------------------------------------------------ */
/* Footer + login                                                      */
/* ------------------------------------------------------------------ */

export const footerColumns = [
  { title: "Portal", links: ["Overview", "Workflow Tracking", "Proof History", "Reconciliation", "Partner Score"] },
  { title: "Access", links: ["Apply for Review", "Partner Login", "Requirements", "Private Beta"] },
  { title: "About", links: ["INR P2P Partner Portal", "How it works", "Operating Reserve", "FAQ"] },
];

export const trustChips: { label: string; icon: LucideIcon }[] = [
  { label: "Review required", icon: ClipboardCheck },
  { label: "Approved partners only", icon: BadgeCheck },
  { label: "Agreement-based reserve", icon: Wallet },
  { label: "Sample data", icon: ListChecks },
];

/* ------------------------------------------------------------------ */
/* Live trust panel — deterministic, session-persisted mock engine     */
/* (frontend-only: no backend, no API, no database)                    */
/* ------------------------------------------------------------------ */

export type LiveStatus = "Assigned" | "Processing" | "Awaiting Proof" | "Verified" | "Matched" | "Completed";

export type LiveActivityRow = {
  id: string;
  amount: number; // INR
  status: LiveStatus;
  elapsed: number; // seconds since the workflow appeared in the feed
};

export type LiveMetrics = {
  partnersOnline: number;
  volumeCr: number;
  avgCompletionSec: number;
  successRate: number;
};

export type PersistedLiveState = {
  day: string; // UTC YYYY-MM-DD this state belongs to
  lastUpdatedAt: number; // epoch ms
  nextId: number;
  metrics: LiveMetrics;
  rows: LiveActivityRow[];
};

// Realistic progression; rows finish at Completed and then rotate out.
export const liveStatusOrder: LiveStatus[] = [
  "Assigned",
  "Processing",
  "Awaiting Proof",
  "Verified",
  "Matched",
  "Completed",
];

// Deterministic seed rows for the very first paint (stable across SSR + hydration).
export const liveSeedRows: LiveActivityRow[] = [
  { id: "PPT-89521", amount: 245000, status: "Assigned", elapsed: 134 },
  { id: "PPT-89234", amount: 175000, status: "Processing", elapsed: 407 },
  { id: "PPT-89102", amount: 290000, status: "Awaiting Proof", elapsed: 221 },
  { id: "PPT-88911", amount: 320000, status: "Verified", elapsed: 558 },
  { id: "PPT-88765", amount: 480000, status: "Matched", elapsed: 663 },
];

// Larger pool so inserted workflows do not feel like a short repeating loop.
export const liveAmountPool: number[] = [
  85000, 95000, 110000, 125000, 140000, 150000, 165000, 175000, 185000, 205000, 215000, 235000, 245000, 265000,
  275000, 290000, 305000, 320000, 345000, 360000, 380000, 410000, 435000, 460000, 480000, 510000, 540000, 575000,
];

export const liveNextId = 89522;

export const LIVE_STORAGE_KEY = "inr-p2p-live-state-v2";

/* ---- pure math helpers (no Math.random, safe to call during render) ---- */

const r1 = (n: number) => Math.round(n * 10) / 10;
const r2 = (n: number) => Math.round(n * 100) / 100;
const clampN = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function formatINR(n: number): string {
  return "₹" + new Intl.NumberFormat("en-IN").format(Math.round(n));
}

export function formatCr(cr: number): string {
  return `₹${cr.toFixed(2)} Cr`;
}

export function formatClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds));
  const m = Math.floor(s / 60);
  const ss = s % 60;
  return `${String(m).padStart(2, "0")}m ${String(ss).padStart(2, "0")}s`;
}

// Deterministic PRNG (mulberry32) — stable output for a given numeric seed.
export function seededRandom(seed: number): () => number {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x ^= x + Math.imul(x ^ (x >>> 7), 61 | x);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

// UTC day key so server and client agree regardless of timezone (no hydration drift).
export function utcDay(now: number = Date.now()): string {
  return new Date(now).toISOString().slice(0, 10);
}

// Stable-for-the-day baseline metrics, derived from the date — not an obvious reset.
export function getDailyLiveBaseline(day: string): LiveMetrics {
  const rnd = seededRandom(hashString(day));
  return {
    partnersOnline: 132 + Math.floor(rnd() * 37), // 132–168
    volumeCr: r2(4.2 + rnd() * (7.8 - 4.2)), // 4.20–7.80 Cr
    avgCompletionSec: 470 + Math.floor(rnd() * 70), // ~07:50–09:00
    successRate: r1(97.8 + rnd() * (99.1 - 97.8)), // 97.8–99.1%
  };
}

/* ---- persistence (client-only; guarded for SSR) ---- */

export function loadLiveState(): PersistedLiveState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LIVE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedLiveState;
    if (!parsed || !parsed.metrics || !Array.isArray(parsed.rows)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveLiveState(state: PersistedLiveState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(LIVE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota / privacy-mode errors */
  }
}

// Build a fresh state for a given day from the deterministic baseline + seed rows.
export function buildInitialLiveState(day: string, now: number = Date.now()): PersistedLiveState {
  return {
    day,
    lastUpdatedAt: now,
    nextId: liveNextId,
    metrics: getDailyLiveBaseline(day),
    rows: liveSeedRows.map((r) => ({ ...r })),
  };
}

// Advance stored state by the elapsed wall-clock gap so values move forward after a refresh.
// Returns a fresh state for a new day (so the volume baseline rolls over believably).
export function advanceLiveState(state: PersistedLiveState, now: number = Date.now()): PersistedLiveState {
  const day = utcDay(now);
  if (state.day !== day) return buildInitialLiveState(day, now);

  const deltaSec = clampN((now - state.lastUpdatedAt) / 1000, 0, 1800); // cap at 30 min
  const base = getDailyLiveBaseline(day);

  // Volume only ever creeps up, gently, and stays near the day's believable band.
  const volumeCr = r2(clampN(state.metrics.volumeCr + (deltaSec / 60) * 0.014, base.volumeCr, base.volumeCr + 3.2));

  const rows = state.rows.map((row) =>
    row.status === "Completed" || row.status === "Matched"
      ? row
      : { ...row, elapsed: clampN(row.elapsed + Math.floor(deltaSec), 0, 5400) },
  );

  return { ...state, day, lastUpdatedAt: now, metrics: { ...state.metrics, volumeCr }, rows };
}
