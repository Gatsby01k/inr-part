import {
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  ClipboardCheck,
  FileCheck2,
  Gauge,
  History,
  Layers3,
  LockKeyhole,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export const navLinks = [
  { label: "Network", href: "#network" },
  { label: "How it works", href: "#how" },
  { label: "Portal", href: "#portal" },
  { label: "Score", href: "#score" },
  { label: "Apply", href: "#apply" },
  { label: "FAQ", href: "#faq" },
];

export const heroStats = [
  { label: "Partner Status", value: "Verified" },
  { label: "Partner Score", value: "86/100" },
  { label: "Operating Limit", value: "₹5,00,000/day" },
  { label: "Available Capacity", value: "₹3,20,000" },
  { label: "Active Workflows", value: "3" },
  { label: "Proof Status", value: "94% verified" },
  { label: "Reconciliation", value: "98.4% matched" },
  { label: "Mode", value: "Private Beta" },
];

export const networkCards = [
  { title: "Private access", copy: "Closed portal access for approved partners only.", icon: LockKeyhole },
  { title: "Partner review", copy: "Review-based access before any portal activation.", icon: ShieldCheck },
  { title: "Operating profile", copy: "Maintain region, role, capacity and workflow preferences.", icon: BriefcaseBusiness },
  { title: "Workflow tracking", copy: "Track active, pending and completed partner workflows.", icon: Layers3 },
  { title: "Proof history", copy: "Organize submitted proof, notes and timeline records.", icon: History },
  { title: "Reconciliation status", copy: "View matched, pending and exception states clearly.", icon: FileCheck2 },
  { title: "Partner score", copy: "Reliability, proof quality and consistency in one score.", icon: Gauge },
  { title: "Tiered access", copy: "Access level grows with reviewed performance history.", icon: BarChart3 },
];

export const steps = [
  { title: "Apply", copy: "Submit partner profile, operating region, experience and contact details." },
  { title: "Review", copy: "Profile, operating history, communication reliability and workflow fit are reviewed." },
  { title: "Access", copy: "Approved partners receive private portal access." },
  { title: "Track workflows", copy: "Monitor workflow status, proof requirements and reconciliation progress." },
  { title: "Build history", copy: "Maintain proof records, reference notes and workflow timelines." },
  { title: "Grow score", copy: "Reliable partners improve score and operating reputation over time." },
];

export const tiers = [
  { name: "Starter Partner", badge: "Reviewed", features: ["Newly reviewed partners", "Basic workflow visibility", "Manual review", "Initial operating profile"] },
  { name: "Verified Partner", badge: "Active", featured: true, features: ["Active partners", "Higher operating access", "Score history", "Faster coordination"] },
  { name: "Pro Partner", badge: "Priority", features: ["High-reliability operators", "Priority workflow visibility", "Advanced reporting", "Lower operational friction"] },
  { name: "Prime Partner", badge: "Established", features: ["Established partners", "Custom operating profile", "Dedicated coordination", "Extended reporting"] },
];

export const overviewMetrics = [
  ["Partner Tier", "Verified"],
  ["Partner Score", "86/100"],
  ["Today’s Workflows", "3"],
  ["Operating Limit", "₹5,00,000"],
  ["Available Capacity", "₹3,20,000"],
  ["Proof Quality", "94%"],
  ["Reconciliation Match", "98.4%"],
  ["Review Status", "Approved"],
];

export const workflows = [
  { id: "INR-2841", amount: "₹75,000", status: "Awaiting proof", proof: "Required", reconciliation: "Pending" },
  { id: "INR-2842", amount: "₹42,500", status: "Completed", proof: "Verified", reconciliation: "Matched" },
  { id: "INR-2843", amount: "₹1,20,000", status: "Active", proof: "In progress", reconciliation: "Open" },
];

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

export const beforeItems = ["scattered messages", "unclear status", "manual proof chasing", "weak history", "no partner score", "no workflow visibility"];
export const afterItems = ["portal access", "structured workflows", "clear status", "proof tracking", "reconciliation history", "partner score", "operating profile", "private network access"];

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

export const faq = [
  { q: "What is INR P2P Partner Portal?", a: "It is a private partner operations portal for approved INR P2P settlement operators to manage profile, workflows, proof history, reconciliation visibility and partner score." },
  { q: "Who can apply?", a: "Business partners, OTC desks, professional trading entities, liquidity businesses, payment partners and settlement operators with relevant INR settlement experience can apply for review." },
  { q: "Is this open to everyone?", a: "No. Access is review-based and available only to approved partners." },
  { q: "What is Partner Score?", a: "Partner Score reflects reliability across proof quality, response speed, completion history, reconciliation match rate, availability and exception ratio." },
  { q: "How are operating limits assigned?", a: "Limits are based on partner review, operating profile, reliability history, proof quality, reconciliation history and partner score." },
  { q: "What does the portal track?", a: "The portal tracks operating profile, workflow status, proof history, reconciliation status, review state and partner score using sample frontend data in this demo." },
  { q: "What happens after I apply?", a: "Your partner profile is reviewed. Approved partners may receive private portal access after review and agreement." },
  { q: "Can partners increase access over time?", a: "Yes. Reliable partners can improve score and operating reputation over time, which may support higher reviewed access." },
  { q: "Is this a public marketplace?", a: "No. It is designed as a closed-access partner operations portal, not a public marketplace." },
];

export const portalTabs = ["Overview", "Workflows", "Proof Tracking", "Reconciliation", "Partner Score", "Profile"] as const;

export const footerColumns = [
  { title: "Product", links: ["Partner Portal", "Workflow Tracking", "Proof History", "Reconciliation", "Partner Score"] },
  { title: "Network", links: ["Apply for Review", "Partner Login", "Private Beta", "Partner Requirements"] },
  { title: "Company", links: ["INR P2P Partner Portal", "Contact", "Terms", "Privacy"] },
];

export const productHighlights = [
  { label: "Private network", icon: Network },
  { label: "Review required", icon: ClipboardCheck },
  { label: "Approved partners", icon: BadgeCheck },
  { label: "Sample data", icon: Sparkles },
];
