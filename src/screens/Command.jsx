import React from "react";
import { C } from "../theme.js";
import { th, td, linkBtn, reviewBtn } from "../theme.js";
import { PROS, DAILY_QUEUE } from "../data.js";
import { Card, ScoreRing, Delta, SectionTitle, Bar100, PageHead, Avatar, ScorePill, Chip } from "../components/UI.jsx";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import { AlertTriangle, ArrowRight, ChevronRight, Flame, Clock, ArrowUpRight } from "lucide-react";

export default function CommandCentre({ go }) {
  const kpis = [
    { label: "Average rating", v: "4.62", d: 0.08, invert: false, suffix: "" },
    { label: "Complaint rate", v: "2.4%", d: 0.6, invert: true, suffix: "pp" },
    { label: "Repeat booking", v: "31.8%", d: 1.3, invert: false, suffix: "pp" },
    { label: "On-time arrival", v: "94.1%", d: -0.4, invert: false, suffix: "pp" },
  ];
  const trend = [
    { w: "W1", s: 74 }, { w: "W2", s: 73 }, { w: "W3", s: 75 }, { w: "W4", s: 76 },
    { w: "W5", s: 74 }, { w: "W6", s: 77 }, { w: "W7", s: 78 }, { w: "W8", s: 79 },
    { w: "W9", s: 78 }, { w: "W10", s: 80 }, { w: "W11", s: 81 }, { w: "W12", s: 82 },
  ];
  const dims = [
    { k: "Reliability", v: 91 }, { k: "Service execution", v: 64, flag: true },
    { k: "Customer experience", v: 79 }, { k: "Professional behaviour", v: 87 },
    { k: "Repeat behaviour", v: 76 },
  ];

  return (
    <div>
      <PageHead title="Quality Command Centre" sub="Live performance across your supply, and where quality needs attention today." />

      <div className="health-banner" style={{
        background: `linear-gradient(120deg, ${C.ink} 0%, ${C.emerald} 100%)`, borderRadius: 20,
        padding: "26px 28px", color: "#fff", marginBottom: 18, display: "grid",
        gridTemplateColumns: "auto 1fr auto", gap: 28, alignItems: "center",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <ScoreRing value={82} size={104} tone="#B7E3C4" />
          <div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>Quality is healthy,</div>
            <div style={{ fontSize: 20, fontWeight: 700, opacity: 0.9 }}>with two areas to watch.</div>
            <div style={{ fontSize: 13, opacity: 0.72, marginTop: 6, maxWidth: 330 }}>
              Overall quality is stable. Keep momentum while addressing the highlighted areas.
            </div>
          </div>
        </div>
        <div className="divider" style={{ borderLeft: "1px solid rgba(255,255,255,.18)", paddingLeft: 26 }}>
          <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.75, marginBottom: 8 }}>What changed this week</div>
          {["Kitchen task completion down 12%", "Complaint rate up 0.6% (1.8% → 2.4%)"].map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6, fontSize: 13 }}>
              <span style={{ width: 6, height: 6, borderRadius: 99, background: "#F5B199", marginTop: 6 }} />
              <span style={{ opacity: 0.92 }}>{t}</span>
            </div>
          ))}
          <button onClick={() => go("rootcause")} style={{
            marginTop: 8, background: "rgba(255,255,255,.14)", color: "#fff", border: "1px solid rgba(255,255,255,.25)",
            padding: "7px 12px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer",
            display: "inline-flex", alignItems: "center", gap: 6,
          }}>See detailed analysis <ArrowRight size={14} /></button>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 34, fontWeight: 800 }}>-28%</div>
          <div style={{ fontSize: 12, opacity: 0.8, maxWidth: 120 }}>avg. issue reduction after coaching</div>
        </div>
      </div>

      <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        {kpis.map((k) => (
          <Card key={k.label}>
            <div style={{ fontSize: 12.5, color: C.slate, fontWeight: 600, marginBottom: 8 }}>{k.label}</div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.ink }}>{k.v}</div>
              <Delta v={k.d} invert={k.invert} suffix={k.suffix} />
            </div>
            <div style={{ fontSize: 11, color: C.slateSoft, marginTop: 4 }}>vs. last month</div>
          </Card>
        ))}
      </div>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 18 }}>
        <Card>
          <SectionTitle right={<Chip tone="slate">Last 12 weeks</Chip>}>Quality Health trend</SectionTitle>
          <ResponsiveContainer width="100%" height={210}>
            <LineChart data={trend} margin={{ top: 6, right: 8, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} />
              <XAxis dataKey="w" tick={{ fontSize: 11, fill: C.slateSoft }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 90]} tick={{ fontSize: 11, fill: C.slateSoft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 12 }} />
              <ReferenceLine y={75} stroke={C.slateSoft} strokeDasharray="4 4" label={{ value: "Target 75", fontSize: 10, fill: C.slateSoft, position: "insideTopRight" }} />
              <Line type="monotone" dataKey="s" stroke={C.emerald} strokeWidth={2.5} dot={{ r: 2.5, fill: C.emerald }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle>Health score breakdown</SectionTitle>
          {dims.map((d) => (
            <div key={d.k} style={{ marginBottom: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: 13, color: C.ink, fontWeight: 500, display: "flex", alignItems: "center", gap: 6 }}>
                  {d.k}{d.flag && <AlertTriangle size={13} color={C.coral} />}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: d.flag ? C.coral : C.ink }}>{d.v}</span>
              </div>
              <Bar100 value={d.v} />
            </div>
          ))}
          <div style={{ fontSize: 11.5, color: C.slate, background: C.coralSoft, borderRadius: 10, padding: "9px 11px", marginTop: 6, lineHeight: 1.5 }}>
            Service execution fell this month, driven by incomplete kitchen tasks across three micro-markets.
          </div>
        </Card>
      </div>

      <Card style={{ marginBottom: 18 }}>
        <SectionTitle right={<span style={{ fontSize: 12, color: C.slateSoft }}>Tue, 12 Aug · Kartikeya</span>}>Today's quality actions</SectionTitle>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {[
            { key: "high", label: "High priority", n: DAILY_QUEUE.high.length, col: C.coral, icon: Flame, items: DAILY_QUEUE.high },
            { key: "medium", label: "Medium", n: DAILY_QUEUE.medium.length, col: C.amber, icon: Clock, items: DAILY_QUEUE.medium },
            { key: "improving", label: "Improving", n: DAILY_QUEUE.improving.length, col: C.emerald, icon: ArrowUpRight, items: DAILY_QUEUE.improving },
          ].map((g) => (
            <div key={g.key} style={{ background: C.paper, borderRadius: 12, padding: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <g.icon size={16} color={g.col} />
                <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{g.label}</span>
                <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: g.col }}>{g.n}</span>
              </div>
              {g.items.map((it, i) => (
                <div key={i} onClick={it.pro ? () => go("professionals", it.pro) : undefined}
                  style={{ padding: "8px 0", borderTop: i > 0 ? `1px solid ${C.line}` : "none", cursor: it.pro ? "pointer" : "default" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: C.ink }}>{it.who}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11.5, color: C.slate }}>{it.what}</span>
                    <span style={{ fontSize: 11, color: g.col, fontWeight: 600, whiteSpace: "nowrap" }}>{it.act}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.line}` }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.ink }}>Professionals needing attention</h3>
          <button onClick={() => go("professionals")} style={linkBtn}>View all <ChevronRight size={14} /></button>
        </div>
        <div className="scroll-x">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
            <thead><tr style={{ background: C.paper }}>{["Professional", "Quality score", "Key issue", "Last 7 days", ""].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
            <tbody>
              {PROS.filter((p) => p.status !== "improving").slice(0, 4).map((p) => (
                <tr key={p.id} className="hoverable" style={{ borderTop: `1px solid ${C.line}` }}>
                  <td style={td}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar p={p} size={30} />
                      <div><div style={{ fontWeight: 600, color: C.ink, fontSize: 13.5 }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: C.slateSoft }}>{p.micro} · {p.service}</div></div>
                    </div>
                  </td>
                  <td style={td}><ScorePill v={p.score} /></td>
                  <td style={{ ...td, color: C.slate, fontSize: 13 }}>{p.keyIssue}</td>
                  <td style={{ ...td, fontSize: 13 }}><span style={{ color: p.recentComplaints > 2 ? C.red : C.slate }}>{p.recentComplaints} complaint{p.recentComplaints !== 1 ? "s" : ""}</span></td>
                  <td style={{ ...td, textAlign: "right" }}><button onClick={() => go("professionals", p.id)} style={reviewBtn}>Review</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
