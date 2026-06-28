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
/* Live trust panel — client-side simulated activity (mock only)       */
/* ------------------------------------------------------------------ */

export type LiveStatus = "Assigned" | "Processing" | "Awaiting Proof" | "Verified" | "Matched";

export type LiveActivityRow = {
  id: string;
  amount: number; // INR, formatted in the UI with the Indian numbering system
  status: LiveStatus;
  elapsed: number; // seconds since the workflow appeared in the feed
};

// Linear, believable progression order used by the simulator.
export const liveStatusOrder: LiveStatus[] = [
  "Assigned",
  "Processing",
  "Awaiting Proof",
  "Verified",
  "Matched",
];

// Seed rows shown on first paint (mix of progress states for a real-console feel).
export const liveSeedRows: LiveActivityRow[] = [
  { id: "PPT-89521", amount: 245000, status: "Assigned", elapsed: 134 },
  { id: "PPT-89234", amount: 175000, status: "Processing", elapsed: 407 },
  { id: "PPT-89102", amount: 290000, status: "Awaiting Proof", elapsed: 221 },
  { id: "PPT-88911", amount: 320000, status: "Verified", elapsed: 558 },
  { id: "PPT-88765", amount: 480000, status: "Matched", elapsed: 663 },
  { id: "PPT-88612", amount: 110000, status: "Matched", elapsed: 329 },
];

// Newly inserted workflows pull a plausible amount from this pool.
export const liveAmountPool: number[] = [
  95000, 110000, 130000, 150000, 175000, 185000, 215000, 245000, 275000, 290000, 305000, 320000, 360000,
  390000, 410000, 460000, 480000, 540000,
];

// Next sequential ticket number (newer workflows carry higher numbers).
export const liveNextId = 89522;

// Starting values for the four headline metrics.
export const liveSeedMetrics = {
  partnersOnline: 142,
  volumeCr: 4.62,
  avgCompletionSec: 488,
  successRate: 98.6,
};
