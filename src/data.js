import { C } from "./theme.js";

export const SERVICES = ["Kitchen Cleaning", "Bathroom Cleaning", "Sweeping & Mopping",
  "Utensils", "Laundry", "Dusting & Wiping", "Fridge Cleaning"];
export const CITIES = ["Gurgaon", "Delhi", "Noida", "Bangalore", "Mumbai"];

export const CORRELATIONS = [
  { text: "Pros with a late-arrival rate above 10% are 1.7\u00D7 more likely to receive a rating below 4.", strength: "Strong" },
  { text: "In Kitchen Cleaning, checklist completion below 88% is strongly associated with 'missed surface' complaints.", strength: "Strong" },
  { text: "Repeat-booking probability rises sharply for Pros who finish within the expected window with zero quality complaints.", strength: "Moderate" },
  { text: "Back-to-back bookings under 25 min apart raise the late-arrival rate on the second booking by 2.3\u00D7.", strength: "Moderate" },
];

export const PROS = [
  {
    id: "PRO-00421", name: "Priya Sharma", initials: "PS", city: "Delhi",
    micro: "South Delhi", tenure: "1 yr 8 mo", manager: "Rakesh Singh",
    bookings: 482, score: 72, delta: -11, status: "critical",
    keyIssue: "Incomplete kitchen tasks", recentComplaints: 3, service: "Kitchen Cleaning",
    dims: { reliability: 88, execution: 64, experience: 76, repeat: 68 },
    dimsPrev: { reliability: 86, execution: 82, experience: 82, repeat: 76 },
    peer: { reliability: 89, execution: 84, experience: 82, repeat: 71 },
    metrics: { rating: 4.31, complaint: 6.2, repeat: 24, onTime: 96, checklist: 84, checklistPrev: 96, duration: -8, kitchenComplaints: 6 },
    peerMetrics: { rating: 4.62, complaint: 2.4, repeat: 27, onTime: 93, checklist: 94, duration: 0 },
    trend: [{ m: "Mar", s: 83 }, { m: "Apr", s: 82 }, { m: "May", s: 84 }, { m: "Jun", s: 83 }, { m: "Jul", s: 80 }, { m: "Aug", s: 72 }],
    strengths: ["On-time arrival 96%", "Customer communication 91", "Reliability holding steady"],
    watch: ["Kitchen task completion", "Post-service checklist adherence"],
    warning: true,
  },
  {
    id: "PRO-00588", name: "Sunita Devi", initials: "SD", city: "Gurgaon",
    micro: "Sector 57", tenure: "10 mo", manager: "Meena Kumari",
    bookings: 296, score: 76, delta: -6, status: "warning",
    keyIssue: "Late arrivals", recentComplaints: 2, service: "Bathroom Cleaning",
    dims: { reliability: 71, execution: 84, experience: 79, repeat: 74 },
    dimsPrev: { reliability: 82, execution: 85, experience: 81, repeat: 75 },
    peer: { reliability: 88, execution: 83, experience: 82, repeat: 71 },
    metrics: { rating: 4.44, complaint: 3.8, repeat: 26, onTime: 84, checklist: 92, checklistPrev: 93, duration: 2, kitchenComplaints: 1 },
    peerMetrics: { rating: 4.58, complaint: 2.1, repeat: 27, onTime: 93, checklist: 94, duration: 0 },
    trend: [{ m: "Mar", s: 80 }, { m: "Apr", s: 81 }, { m: "May", s: 82 }, { m: "Jun", s: 80 }, { m: "Jul", s: 78 }, { m: "Aug", s: 76 }],
    strengths: ["Service execution 84", "Strong checklist adherence"],
    watch: ["Punctuality on morning slots", "Travel buffer between bookings"],
    warning: true,
  },
  {
    id: "PRO-00655", name: "Meena Kumari", initials: "MK", city: "Noida",
    micro: "Sector 62", tenure: "1 yr 2 mo", manager: "Rakesh Singh",
    bookings: 388, score: 78, delta: 1, status: "warning",
    keyIssue: "Inconsistent service", recentComplaints: 2, service: "Sweeping & Mopping",
    dims: { reliability: 86, execution: 74, experience: 80, repeat: 77 },
    dimsPrev: { reliability: 85, execution: 76, experience: 79, repeat: 76 },
    peer: { reliability: 88, execution: 83, experience: 82, repeat: 71 },
    metrics: { rating: 4.49, complaint: 3.1, repeat: 28, onTime: 91, checklist: 90, checklistPrev: 91, duration: -3, kitchenComplaints: 0 },
    peerMetrics: { rating: 4.55, complaint: 2.4, repeat: 27, onTime: 93, checklist: 94, duration: 0 },
    trend: [{ m: "Mar", s: 76 }, { m: "Apr", s: 77 }, { m: "May", s: 78 }, { m: "Jun", s: 77 }, { m: "Jul", s: 77 }, { m: "Aug", s: 78 }],
    strengths: ["Reliability 86", "Steady repeat bookings"],
    watch: ["Consistency across service types"],
  },
  {
    id: "PRO-00702", name: "Anjali Yadav", initials: "AY", city: "Gurgaon",
    micro: "Sector 45", tenure: "7 mo", manager: "Meena Kumari",
    bookings: 214, score: 80, delta: 2, status: "improving",
    keyIssue: "Customer feedback drop", recentComplaints: 1, service: "Kitchen Cleaning",
    dims: { reliability: 87, execution: 79, experience: 75, repeat: 80 },
    dimsPrev: { reliability: 86, execution: 77, experience: 78, repeat: 79 },
    peer: { reliability: 88, execution: 83, experience: 82, repeat: 71 },
    metrics: { rating: 4.52, complaint: 2.9, repeat: 30, onTime: 92, checklist: 89, checklistPrev: 88, duration: -2, kitchenComplaints: 2 },
    peerMetrics: { rating: 4.58, complaint: 2.4, repeat: 27, onTime: 93, checklist: 94, duration: 0 },
    trend: [{ m: "Mar", s: 79 }, { m: "Apr", s: 78 }, { m: "May", s: 77 }, { m: "Jun", s: 78 }, { m: "Jul", s: 79 }, { m: "Aug", s: 80 }],
    strengths: ["Reliability 87", "Repeat rate above peer median"],
    watch: ["Customer experience ratings"],
  },
  {
    id: "PRO-00817", name: "Savitri Devi", initials: "SV", city: "Delhi",
    micro: "East Delhi", tenure: "2 yr 1 mo", manager: "Rakesh Singh",
    bookings: 611, score: 91, delta: 3, status: "improving",
    keyIssue: "None \u2014 top performer", recentComplaints: 0, service: "Bathroom Cleaning",
    dims: { reliability: 95, execution: 92, experience: 90, repeat: 88 },
    dimsPrev: { reliability: 93, execution: 90, experience: 89, repeat: 85 },
    peer: { reliability: 88, execution: 83, experience: 82, repeat: 71 },
    metrics: { rating: 4.81, complaint: 0.9, repeat: 41, onTime: 98, checklist: 98, checklistPrev: 97, duration: 1, kitchenComplaints: 0 },
    peerMetrics: { rating: 4.58, complaint: 2.4, repeat: 27, onTime: 93, checklist: 94, duration: 0 },
    trend: [{ m: "Mar", s: 87 }, { m: "Apr", s: 88 }, { m: "May", s: 88 }, { m: "Jun", s: 89 }, { m: "Jul", s: 90 }, { m: "Aug", s: 91 }],
    strengths: ["Punctuality 98%", "Complaint rate near zero", "Repeat rate 41%"],
    watch: ["Strong shadowing / mentor candidate"],
  },
  {
    id: "PRO-00934", name: "Ramesh Kumar", initials: "RK", city: "Noida",
    micro: "Sector 62", tenure: "5 mo", manager: "Rakesh Singh",
    bookings: 148, score: 74, delta: -4, status: "warning",
    keyIssue: "Late arrivals", recentComplaints: 2, service: "Sweeping & Mopping",
    dims: { reliability: 70, execution: 82, experience: 78, repeat: 72 },
    dimsPrev: { reliability: 78, execution: 82, experience: 79, repeat: 73 },
    peer: { reliability: 88, execution: 83, experience: 82, repeat: 71 },
    metrics: { rating: 4.40, complaint: 3.6, repeat: 23, onTime: 83, checklist: 91, checklistPrev: 92, duration: 1, kitchenComplaints: 0 },
    peerMetrics: { rating: 4.55, complaint: 2.4, repeat: 27, onTime: 93, checklist: 94, duration: 0 },
    trend: [{ m: "Mar", s: 79 }, { m: "Apr", s: 79 }, { m: "May", s: 78 }, { m: "Jun", s: 77 }, { m: "Jul", s: 76 }, { m: "Aug", s: 74 }],
    strengths: ["Service execution 82", "Checklist adherence solid"],
    watch: ["Morning-slot punctuality", "In active punctuality monitoring"],
    warning: true,
  },
];

export const FLAGGED_BOOKINGS = [
  { id: "#12491", date: "8 Aug", service: "Kitchen Cleaning", rating: 2, issue: "Incomplete task", note: "Hob and chimney left greasy, checklist marked complete." },
  { id: "#12504", date: "5 Aug", service: "Kitchen Cleaning", rating: 3, issue: "Incomplete task", note: "Stove area not wiped; customer redid it." },
  { id: "#12537", date: "1 Aug", service: "Kitchen Cleaning", rating: 2, issue: "Incomplete task", note: "Cabinet fronts skipped, arrived on time." },
  { id: "#12581", date: "28 Jul", service: "Bathroom Cleaning", rating: 4, issue: "Minor", note: "Good overall, small water spots left." },
];

export const COMPLAINT_MIX = [
  { label: "Missed / incomplete task", pct: 34, color: C.coral, prev: 29 },
  { label: "Late arrival", pct: 21, color: C.amber, prev: 22 },
  { label: "Poor communication", pct: 14, color: C.teal, prev: 15 },
  { label: "Perceived low effort", pct: 11, color: C.slate, prev: 12 },
  { label: "Service duration", pct: 8, color: C.slateSoft, prev: 9 },
  { label: "Other", pct: 12, color: "#C7CFCB", prev: 13 },
];

export const NLP_THEMES = [
  { phrase: "\u201Cnot cleaned properly\u201D", count: 84, delta: 31, service: "Kitchen Cleaning" },
  { phrase: "\u201Cleft early / unfinished\u201D", count: 52, delta: 24, service: "Kitchen Cleaning" },
  { phrase: "\u201Ccame late\u201D", count: 47, delta: -6, service: "Bathroom Cleaning" },
  { phrase: "\u201Cdidn\u2019t do the hob\u201D", count: 38, delta: 44, service: "Kitchen Cleaning" },
  { phrase: "\u201Cvery polite / thorough\u201D", count: 121, delta: 12, service: "All" },
];

export const INTERVENTIONS = {
  assigned: [
    { pro: "Kitchen practical refresher", who: "Priya Sharma", pri: "High", due: "Due 18 Aug" },
    { pro: "Arrival planning coaching", who: "Sunita Devi", pri: "Medium", due: "Due 20 Aug" },
    { pro: "Customer communication", who: "Meena Kumari", pri: "Medium", due: "Due 22 Aug" },
  ],
  progress: [
    { pro: "Kitchen practical refresher", who: "Anjali Yadav", pri: "Medium", due: "Started 10 Aug" },
    { pro: "Service execution coaching", who: "Ritika Singh", pri: "Medium", due: "Started 9 Aug" },
  ],
  monitoring: [
    { pro: "Punctuality improvement", who: "Ramesh Kumar", pri: "Medium", due: "Day 8 of 20" },
  ],
  ready: [
    { pro: "Customer experience booster", who: "Savitri Devi", pri: "Low", due: "Ready for review" },
    { pro: "Kitchen standards reassessment", who: "Neha Verma", pri: "Medium", due: "Ready for review" },
  ],
};

export const INT_LIBRARY = [
  { lvl: "L1", name: "Nudge", desc: "Reminder prompts for minor, first-time issues." },
  { lvl: "L2", name: "Micro-learning", desc: "5\u201315 min module targeting one skill gap." },
  { lvl: "L3", name: "Coaching", desc: "One-on-one conversation with manager or trainer." },
  { lvl: "L4", name: "Practical assessment", desc: "Pro performs the task while a trainer observes." },
  { lvl: "L5", name: "Shadowing", desc: "Pro accompanies a high-performing peer." },
  { lvl: "L6", name: "Temporary monitoring", desc: "Extra quality checks over next N bookings." },
  { lvl: "L7", name: "Escalation", desc: "For repeated or high-severity issues." },
];

export const OUTCOME = {
  pro: "Priya Sharma", intervention: "Kitchen Cleaning Practical Refresher",
  window: 20,
  before: { complaint: 6.2, checklist: 84, repeat: 24, score: 72, rating: 4.31 },
  after: { complaint: 2.4, checklist: 95, repeat: 25, score: 86, rating: 4.66 },
  peer: { complaint: 2.4, checklist: 94, repeat: 27, score: 84, rating: 4.58 },
  bars: [
    { k: "Complaint rate", before: 6.2, after: 2.4, unit: "%", good: "down" },
    { k: "Checklist completion", before: 84, after: 95, unit: "%", good: "up" },
    { k: "Repeat rate", before: 24, after: 25, unit: "%", good: "up" },
    { k: "Quality score", before: 72, after: 86, unit: "", good: "up" },
  ],
};

export const HEATMAP = {
  Gurgaon: [
    { m: "Sector 42", health: 88, tone: "green", pros: 22, bookings: 640, complaints: 9 },
    { m: "Sector 43", health: 86, tone: "green", pros: 18, bookings: 512, complaints: 8 },
    { m: "Sector 45", health: 79, tone: "amber", pros: 20, bookings: 588, complaints: 17 },
    { m: "Sector 52", health: 68, tone: "red", pros: 16, bookings: 470, complaints: 26 },
    { m: "Sector 57", health: 61, tone: "red", pros: 14, bookings: 283, complaints: 31, primary: "Incomplete task completion", secondary: "Late arrival", repeatLoss: 9 },
  ],
  Delhi: [
    { m: "South Delhi", health: 74, tone: "amber", pros: 28, bookings: 910, complaints: 34 },
    { m: "East Delhi", health: 90, tone: "green", pros: 24, bookings: 780, complaints: 11 },
    { m: "West Delhi", health: 83, tone: "green", pros: 19, bookings: 560, complaints: 14 },
    { m: "North Delhi", health: 77, tone: "amber", pros: 21, bookings: 604, complaints: 20 },
  ],
  Noida: [
    { m: "Sector 18", health: 85, tone: "green", pros: 17, bookings: 498, complaints: 10 },
    { m: "Sector 62", health: 72, tone: "amber", pros: 20, bookings: 556, complaints: 22, primary: "Inconsistent service", secondary: "Late arrival", repeatLoss: 6 },
    { m: "Sector 137", health: 80, tone: "green", pros: 15, bookings: 402, complaints: 12 },
  ],
  Bangalore: [
    { m: "Koramangala", health: 87, tone: "green", pros: 26, bookings: 820, complaints: 12 },
    { m: "Whitefield", health: 81, tone: "green", pros: 23, bookings: 700, complaints: 16 },
    { m: "Indiranagar", health: 76, tone: "amber", pros: 18, bookings: 540, complaints: 19 },
  ],
  Mumbai: [
    { m: "Andheri", health: 82, tone: "green", pros: 25, bookings: 760, complaints: 15 },
    { m: "Bandra", health: 78, tone: "amber", pros: 20, bookings: 590, complaints: 18 },
    { m: "Powai", health: 84, tone: "green", pros: 16, bookings: 470, complaints: 9 },
  ],
};

export const ALERTS = [
  {
    id: 1, sev: "critical", scope: "cluster", title: "Complaint spike in Gurgaon Sector 57",
    body: "7 professionals have seen a >20% rise in complaints over the last 14 days. 64% relate to incomplete service.",
    action: "Deploy Kitchen Cleaning refresher to the cluster", meta: "14 days \u00B7 283 bookings affected", time: "2h ago",
  },
  {
    id: 2, sev: "critical", scope: "professional", title: "Priya Sharma's score fell 11 points",
    body: "Main driver: incomplete-task complaints. 3 complaints in the last 15 bookings vs peer benchmark of 0.8.",
    action: "Assign practical assessment", meta: "Delhi \u00B7 South Delhi", time: "5h ago", pro: "PRO-00421",
  },
  {
    id: 3, sev: "warning", scope: "service", title: "Kitchen Cleaning complaints up 27% org-wide",
    body: "Rise is consistent across cities, which points to a process issue rather than individual Pros. Likely checklist scope gap.",
    action: "Review Kitchen Cleaning checklist scope", meta: "All cities \u00B7 30 days", time: "1d ago",
  },
  {
    id: 4, sev: "warning", scope: "professional", title: "Ramesh Kumar trending down",
    body: "Quality score dropped 79 \u2192 74 over 6 weeks. Punctuality on morning slots is the driver.",
    action: "Continue punctuality monitoring", meta: "Noida \u00B7 Sector 62", time: "1d ago", pro: "PRO-00934",
  },
  {
    id: 5, sev: "info", scope: "cluster", title: "South Delhi recovering",
    body: "Complaint rate down 4pp after last month's kitchen refresher rollout. Momentum is positive.",
    action: "Mark cluster resolved", meta: "Delhi \u00B7 30 days", time: "2d ago",
  },
];

export const EARLY_WARNING = [
  {
    id: "PRO-00421", name: "Priya Sharma", initials: "PS", city: "Delhi", risk: 84,
    trajectory: [83, 84, 83, 80, 72], predicted: 67,
    driver: "Incomplete kitchen tasks accelerating",
    causes: ["Training gap on kitchen standards", "New micro-market added in Jun"],
    status: "critical",
  },
  {
    id: "PRO-00934", name: "Ramesh Kumar", initials: "RK", city: "Noida", risk: 61,
    trajectory: [79, 78, 77, 76, 74], predicted: 71,
    driver: "Steady punctuality decline",
    causes: ["Back-to-back bookings, low travel buffer", "Shift change in Jul"],
    status: "warning",
  },
  {
    id: "PRO-00588", name: "Sunita Devi", initials: "SD", city: "Gurgaon", risk: 57,
    trajectory: [82, 80, 80, 78, 76], predicted: 73,
    driver: "Morning-slot lateness",
    causes: ["Increased workload", "Longer commute to Sector 57"],
    status: "warning",
  },
];

export const SERVICE_INTEL = [
  { service: "Bathroom Cleaning", rating: 4.62, complaint: 2.1, trend: 0.4, tone: "green" },
  { service: "Kitchen Cleaning", rating: 4.28, complaint: 5.4, trend: -27, tone: "red", flag: true },
  { service: "Sweeping & Mopping", rating: 4.55, complaint: 2.6, trend: -3, tone: "green" },
  { service: "Utensils", rating: 4.60, complaint: 2.0, trend: 1, tone: "green" },
  { service: "Laundry", rating: 4.51, complaint: 2.8, trend: -5, tone: "amber" },
  { service: "Fridge Cleaning", rating: 4.58, complaint: 2.3, trend: 2, tone: "green" },
];

export const DAILY_QUEUE = {
  high: [
    { who: "Priya Sharma", what: "Repeated service-quality complaints", act: "Assess", pro: "PRO-00421" },
    { who: "Sector 57 cluster", what: "Complaint spike, 7 Pros", act: "Deploy training" },
    { who: "Neha Verma", what: "High refund rate this week", act: "Review" },
  ],
  medium: [
    { who: "Sunita Devi", what: "Arrival coaching due", act: "Schedule" },
    { who: "Ramesh Kumar", what: "Punctuality monitoring, day 8", act: "Check-in", pro: "PRO-00934" },
    { who: "Meena Kumari", what: "Training overdue", act: "Nudge" },
  ],
  improving: [
    { who: "Anjali Yadav", what: "Recently coached, +2 pts", act: "Monitor" },
    { who: "Savitri Devi", what: "Consistent top performer", act: "Mentor role" },
  ],
};

export const NAV = [
  { id: "command", label: "Command Centre" },
  { id: "professionals", label: "Professionals" },
  { id: "heatmap", label: "Quality Map" },
  { id: "alerts", label: "Alerts" },
  { id: "earlywarning", label: "Early Warning" },
  { id: "rootcause", label: "Root Cause" },
  { id: "interventions", label: "Interventions" },
  { id: "training", label: "Training" },
  { id: "outcomes", label: "Outcomes" },
];
