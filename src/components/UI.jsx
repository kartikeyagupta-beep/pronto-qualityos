import React from "react";
import { C } from "../theme.js";
import { ArrowUpRight, ArrowDownRight, Star, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

export function Chip({ tone = "slate", children }) {
  const map = {
    high: { bg: C.coralSoft, fg: C.red }, medium: { bg: C.amberSoft, fg: "#9A6A00" },
    low: { bg: C.emeraldSoft, fg: C.emerald }, critical: { bg: C.coralSoft, fg: C.red },
    warning: { bg: C.amberSoft, fg: "#9A6A00" }, improving: { bg: C.emeraldSoft, fg: C.emerald },
    slate: { bg: "#F0EEE7", fg: C.slate }, strong: { bg: C.emeraldSoft, fg: C.emerald },
    moderate: { bg: C.amberSoft, fg: "#9A6A00" }, info: { bg: "#E6F0F1", fg: C.teal },
  };
  const s = map[String(tone).toLowerCase()] || map.slate;
  return (
    <span style={{ background: s.bg, color: s.fg, fontSize: 11, fontWeight: 600, padding: "3px 9px",
      borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>{children}</span>
  );
}

export function ScoreRing({ value, size = 96, stroke = 9, tone }) {
  const r = (size - stroke) / 2, circ = 2 * Math.PI * r;
  const col = tone || (value >= 85 ? C.emerald : value >= 75 ? C.amber : C.coral);
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.line} strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={col} strokeWidth={stroke}
          strokeDasharray={`${(value / 100) * circ} ${circ}`} strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ transition: "stroke-dasharray .8s ease" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", textAlign: "center" }}>
        <div><div style={{ fontSize: size * 0.30, fontWeight: 700, color: C.ink, lineHeight: 1 }}>{value}</div>
          <div style={{ fontSize: 10, color: C.slateSoft, fontWeight: 600 }}>/100</div></div>
      </div>
    </div>
  );
}

export function Delta({ v, invert = false, suffix = "" }) {
  const up = v > 0, good = invert ? !up : up;
  const col = v === 0 ? C.slateSoft : good ? C.green : C.red;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span style={{ color: col, fontWeight: 700, fontSize: 12, display: "inline-flex", alignItems: "center", gap: 2 }}>
      {v !== 0 && <Icon size={13} />}{up ? "+" : ""}{v}{suffix}
    </span>
  );
}

export function Card({ children, style, onClick, className }) {
  return (
    <div className={className} onClick={onClick} style={{ background: C.card, border: `1px solid ${C.line}`,
      borderRadius: 16, padding: 18, ...(onClick ? { cursor: "pointer" } : {}), ...style }}>{children}</div>
  );
}

export function SectionTitle({ children, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 8 }}>
      <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.ink }}>{children}</h3>{right}
    </div>
  );
}

export function Bar100({ value, tone, showTrack = true }) {
  const col = tone || (value >= 85 ? C.emerald : value >= 70 ? C.amber : C.coral);
  return (
    <div style={{ height: 8, background: showTrack ? "#F0EEE7" : "transparent", borderRadius: 99, overflow: "hidden", flex: 1 }}>
      <div style={{ width: `${value}%`, height: "100%", background: col, borderRadius: 99, transition: "width .7s ease" }} />
    </div>
  );
}

export function PageHead({ title, sub }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <h1 style={{ margin: 0, fontSize: 25, fontWeight: 700, color: C.ink, letterSpacing: -0.3 }}>{title}</h1>
      <p style={{ margin: "4px 0 0", fontSize: 13.5, color: C.slate }}>{sub}</p>
    </div>
  );
}

export function Avatar({ p, size = 34 }) {
  const col = p.status === "critical" ? C.coral : p.status === "warning" ? C.amber : C.emerald;
  return (
    <div style={{ width: size, height: size, borderRadius: 10, background: col + "22", color: col, fontWeight: 700,
      fontSize: size * 0.34, display: "grid", placeItems: "center", flexShrink: 0 }}>{p.initials}</div>
  );
}

export function ScorePill({ v }) {
  const col = v >= 85 ? C.emerald : v >= 75 ? C.amber : C.coral;
  return <span style={{ background: col + "1A", color: col, fontWeight: 700, fontSize: 13.5, padding: "4px 10px", borderRadius: 9 }}>{v}</span>;
}

export function StatusChip({ status }) {
  const map = { critical: ["Critical", "critical", AlertTriangle], warning: ["Watch", "warning", Clock], improving: ["Improving", "improving", ArrowUpRight] };
  const [label, tone, Icon] = map[status];
  return <Chip tone={tone}><Icon size={12} /> {label}</Chip>;
}

export function Stars({ n }) {
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => {
        const active = i <= Math.round(n);
        const col = n <= 2 ? C.coral : n <= 3.5 ? C.amber : C.emerald;
        return <Star key={i} size={13} fill={active ? col : "none"} color={active ? col : C.line} />;
      })}
    </span>
  );
}

export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{ fontSize: 11.5, fontWeight: 600, color: C.slate, display: "block", marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

export function EmptyState({ icon: Icon, title, body }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px", color: C.slate }}>
      {Icon && <Icon size={30} color={C.slateSoft} style={{ marginBottom: 10 }} />}
      <div style={{ fontSize: 15, fontWeight: 600, color: C.ink, marginBottom: 4 }}>{title}</div>
      <div style={{ fontSize: 13, maxWidth: 320, margin: "0 auto" }}>{body}</div>
    </div>
  );
}
