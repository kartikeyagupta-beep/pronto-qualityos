import React, { useState } from "react";
import { C, th, td, linkBtn, primaryBtn } from "../theme.js";
import { PROS, CORRELATIONS } from "../data.js";
import {
  Card, ScoreRing, Delta, SectionTitle, Bar100, PageHead, Avatar, ScorePill,
  StatusChip, Chip, EmptyState,
} from "../components/UI.jsx";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  Search, X, ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle, AlertCircle,
  GitBranch, Sparkles, ArrowRight, Activity, Users,
} from "lucide-react";

export function ProfessionalsList({ go }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const rows = PROS.filter((p) =>
    (filter === "all" || p.status === filter) &&
    (p.name.toLowerCase().includes(q.toLowerCase()) || p.city.toLowerCase().includes(q.toLowerCase()))
  ).sort((a, b) => a.score - b.score);

  const counts = {
    critical: PROS.filter((p) => p.status === "critical").length,
    warning: PROS.filter((p) => p.status === "warning").length,
    improving: PROS.filter((p) => p.status === "improving").length,
  };

  return (
    <div>
      <PageHead title="Professional performance" sub="Every Pro benchmarked against their true peer cohort, not the whole org." />
      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 16 }}>
        {[
          { k: "critical", label: "Critical", n: counts.critical, sub: "Immediate action", col: C.coral, bg: C.coralSoft },
          { k: "warning", label: "Watch", n: counts.warning, sub: "Trending down", col: C.amber, bg: C.amberSoft },
          { k: "improving", label: "Improving", n: counts.improving, sub: "Recently coached", col: C.emerald, bg: C.emeraldSoft },
        ].map((s) => (
          <Card key={s.k} onClick={() => setFilter(filter === s.k ? "all" : s.k)}
            style={{ border: filter === s.k ? `2px solid ${s.col}` : `1px solid ${C.line}`, background: filter === s.k ? s.bg : C.card }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontSize: 30, fontWeight: 700, color: s.col }}>{s.n}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{s.label}</div>
                <div style={{ fontSize: 11.5, color: C.slateSoft }}>{s.sub}</div></div>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: s.bg, display: "grid", placeItems: "center" }}><Activity size={18} color={s.col} /></div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: 14, display: "flex", gap: 10, alignItems: "center", borderBottom: `1px solid ${C.line}`, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 320 }}>
            <Search size={15} color={C.slateSoft} style={{ position: "absolute", left: 11, top: 10 }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search professional or city"
              aria-label="Search professionals"
              style={{ width: "100%", padding: "9px 12px 9px 33px", borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>
          {filter !== "all" && <button onClick={() => setFilter("all")} style={{ ...linkBtn, fontSize: 12 }}>Clear filter <X size={13} /></button>}
        </div>
        {rows.length === 0 ? (
          <EmptyState icon={Users} title="No professionals match" body="Try a different search term or clear the filter to see the full roster." />
        ) : (
          <div className="scroll-x">
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
              <thead><tr style={{ background: C.paper }}>{["Professional", "City", "Score", "vs peer", "Key issue", "Bookings", ""].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
              <tbody>
                {rows.map((p) => {
                  const peerAvg = Math.round((p.peer.reliability + p.peer.execution + p.peer.experience + p.peer.repeat) / 4);
                  const gap = p.score - peerAvg;
                  return (
                    <tr key={p.id} className="hoverable" style={{ borderTop: `1px solid ${C.line}`, cursor: "pointer" }} onClick={() => go("professionals", p.id)}>
                      <td style={td}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <Avatar p={p} size={32} />
                          <div><div style={{ fontWeight: 600, color: C.ink, fontSize: 13.5 }}>{p.name}</div>
                            <div style={{ fontSize: 11, color: C.slateSoft }}>{p.id} · {p.tenure}</div></div>
                        </div>
                      </td>
                      <td style={{ ...td, fontSize: 13, color: C.slate }}>{p.city}<div style={{ fontSize: 11, color: C.slateSoft }}>{p.micro}</div></td>
                      <td style={td}><ScorePill v={p.score} /></td>
                      <td style={td}><Delta v={gap} /></td>
                      <td style={{ ...td, fontSize: 13, color: C.slate }}>{p.keyIssue}</td>
                      <td style={{ ...td, fontSize: 13, color: C.slate }}>{p.bookings}</td>
                      <td style={{ ...td, textAlign: "right" }}><ChevronRight size={16} color={C.slateSoft} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <Card style={{ marginTop: 16 }}>
        <SectionTitle right={<Chip tone="low"><Sparkles size={12} /> Auto-discovered</Chip>}>Behaviour → outcome patterns</SectionTitle>
        <div style={{ display: "grid", gap: 10 }}>
          {CORRELATIONS.map((c, i) => (
            <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", background: C.paper, borderRadius: 12 }}>
              <GitBranch size={17} color={C.teal} style={{ marginTop: 1, flexShrink: 0 }} />
              <div style={{ fontSize: 13.5, color: C.ink, lineHeight: 1.5, flex: 1 }}>{c.text}</div>
              <Chip tone={c.strength.toLowerCase()}>{c.strength}</Chip>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export function ProfessionalProfile({ pro, go }) {
  const p = pro;
  if (!p) return <EmptyState icon={Users} title="Professional not found" body="This profile is no longer available. Head back to the roster." />;
  const dimRows = [
    { k: "Reliability (on-time arrival)", now: p.dims.reliability, prev: p.dimsPrev.reliability },
    { k: "Service execution (task completion)", now: p.dims.execution, prev: p.dimsPrev.execution },
    { k: "Customer experience (ratings)", now: p.dims.experience, prev: p.dimsPrev.experience },
    { k: "Repeat behaviour (re-bookings)", now: p.dims.repeat, prev: p.dimsPrev.repeat },
  ];
  return (
    <div>
      <button onClick={() => go("professionals")} style={{ ...linkBtn, marginBottom: 12 }}><ChevronLeft size={15} /> Back to professionals</button>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18, gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Avatar p={p} size={56} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 700, color: C.ink }}>{p.name}</h1>
              <StatusChip status={p.status} />
            </div>
            <div style={{ fontSize: 13, color: C.slate, marginTop: 3 }}>{p.id} · {p.city}, {p.micro} · Manager {p.manager}</div>
          </div>
        </div>
        {p.status !== "improving" && <button onClick={() => go("rootcause")} style={primaryBtn}>Diagnose root cause <ArrowRight size={15} /></button>}
      </div>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 14, marginBottom: 16 }}>
        <Card>
          <div style={{ display: "flex", gap: 18, alignItems: "center", marginBottom: 16 }}>
            <ScoreRing value={p.score} size={100} />
            <div>
              <div style={{ fontSize: 12.5, color: C.slate, fontWeight: 600 }}>Quality score</div>
              <div style={{ marginTop: 4 }}><Delta v={p.delta} /> <span style={{ fontSize: 12, color: C.slateSoft }}>vs last month</span></div>
              <div style={{ fontSize: 12, color: C.slate, marginTop: 8, lineHeight: 1.5 }}>Benchmarked against {p.tenure.includes("yr") ? "similar-tenure" : "new"} Pros in {p.city} on {p.service}.</div>
            </div>
          </div>
          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["Total bookings", p.bookings], ["Avg rating", p.metrics.rating], ["Repeat rate", p.metrics.repeat + "%"], ["On-time", p.metrics.onTime + "%"]].map(([k, v]) => (
              <div key={k}><div style={{ fontSize: 11.5, color: C.slateSoft }}>{k}</div><div style={{ fontSize: 17, fontWeight: 700, color: C.ink }}>{v}</div></div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionTitle right={<span style={{ fontSize: 11.5, color: C.slateSoft }}>vs last month</span>}>Score breakdown</SectionTitle>
          {dimRows.map((d) => (
            <div key={d.k} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: C.ink }}>{d.k}</span>
                <span style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{d.now}</span><Delta v={d.now - d.prev} /></span>
              </div>
              <Bar100 value={d.now} />
            </div>
          ))}
        </Card>
      </div>

      <Card style={{ background: p.status === "critical" ? C.coralSoft : C.card, border: p.status === "critical" ? `1px solid ${C.coral}33` : `1px solid ${C.line}`, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.ink, display: "flex", gap: 8, alignItems: "center" }}>
            <AlertCircle size={17} color={p.status === "critical" ? C.coral : C.slate} /> Why this score changed</h3>
          <Chip tone="slate">Last 30 days</Chip>
        </div>
        <p style={{ margin: "0 0 14px", fontSize: 13.5, color: C.ink, lineHeight: 1.6 }}>
          {p.status === "critical"
            ? `Incomplete kitchen tasks are the main driver of the score drop. Checklist completion fell from ${p.metrics.checklistPrev}% to ${p.metrics.checklist}%, with repeated reports of missed hob and chimney cleaning. Punctuality remains healthy.`
            : p.status === "improving"
              ? "Steady gains across execution and repeat behaviour. This Pro is a strong shadowing candidate for peers who need kitchen-standard coaching."
              : "Punctuality on morning slots is the main soft spot. Travel buffer between back-to-back bookings is the likely cause rather than the work itself."}
        </p>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
          {[
            ["Checklist completion", `${p.metrics.checklistPrev}% → ${p.metrics.checklist}%`, (p.metrics.checklist - p.metrics.checklistPrev) + "pp"],
            ["Kitchen complaints", `${p.metrics.kitchenComplaints}`, p.status === "critical" ? "+5" : "—"],
            ["On-time arrival", `${p.metrics.onTime}%`, "stable"],
          ].map(([k, v, d]) => (
            <div key={k} style={{ background: "#fff", borderRadius: 12, padding: 14, border: `1px solid ${C.line}` }}>
              <div style={{ fontSize: 11.5, color: C.slateSoft, marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>{v}</div>
              <div style={{ fontSize: 11.5, color: C.slate, marginTop: 2 }}>{d}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14 }}>
        <Card>
          <SectionTitle>Quality timeline</SectionTitle>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={p.trend} margin={{ top: 6, right: 10, left: -22, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: C.slateSoft }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 95]} tick={{ fontSize: 11, fill: C.slateSoft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 12 }} />
              <Line type="monotone" dataKey="s" stroke={p.status === "critical" ? C.coral : C.emerald} strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card>
          <SectionTitle>Strengths & watch areas</SectionTitle>
          <div style={{ marginBottom: 12 }}>
            {p.strengths.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: C.ink, marginBottom: 7 }}><CheckCircle2 size={15} color={C.emerald} /> {s}</div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${C.line}`, paddingTop: 12 }}>
            {p.watch.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: C.ink, marginBottom: 7 }}><AlertTriangle size={15} color={C.amber} /> {s}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
