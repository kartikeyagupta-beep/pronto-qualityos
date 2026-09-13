import React from "react";
import { C, th, td, primaryBtn, money } from "../theme.js";
import { INT_LIBRARY, OUTCOME } from "../data.js";
import { Card, SectionTitle, PageHead, Chip, Bar100 } from "../components/UI.jsx";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { ArrowRight, Award } from "lucide-react";

export function Training({ go }) {
  const plan = [
    { pri: "Priority 1", title: "Kitchen task completion", mod: "Kitchen Cleaning Refresher", dur: "20 min", due: "Due Friday", tone: "high" },
    { pri: "Priority 2", title: "Punctuality", mod: "Arrival Planning Coaching", dur: "10 min", due: "Next week", tone: "medium" },
    { pri: "Maintain", title: "Customer communication", mod: "Strength — keep it up", dur: "Score 91", due: "", tone: "low" },
  ];
  const modules = [
    { name: "Kitchen Cleaning Fundamentals", skill: "Task completion", dur: "15 min", fmt: "Video + checklist", target: "Incomplete service" },
    { name: "Shift Planning & Time Management", skill: "Punctuality", dur: "12 min", fmt: "Video + planner", target: "Repeated late arrival" },
    { name: "Customer Communication", skill: "Interaction", dur: "10 min", fmt: "Scenarios", target: "Communication complaint" },
    { name: "Bathroom Standards Deep-Clean", skill: "Task completion", dur: "18 min", fmt: "Video + practical", target: "Poor cleaning" },
  ];
  return (
    <div>
      <PageHead title="Training & coaching" sub="Every issue maps to a skill gap, and every skill gap maps to a specific module." />
      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>How recommendations are made</SectionTitle>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            ["Incomplete kitchen task", "Task completion", "Kitchen Cleaning Fundamentals"],
            ["Repeated late arrival", "Time management", "Shift Planning & Time Management"],
            ["Communication complaint", "Customer interaction", "Customer Communication"],
          ].map(([issue, skill, mod]) => (
            <div key={issue} className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 10, alignItems: "center" }}>
              <div style={{ background: C.coralSoft, borderRadius: 10, padding: "9px 12px", fontSize: 12.5, color: C.ink, fontWeight: 500 }}>{issue}</div>
              <ArrowRight size={15} color={C.slateSoft} />
              <div style={{ background: C.amberSoft, borderRadius: 10, padding: "9px 12px", fontSize: 12.5, color: C.ink, fontWeight: 500 }}>{skill}</div>
              <ArrowRight size={15} color={C.slateSoft} />
              <div style={{ background: C.emeraldSoft, borderRadius: 10, padding: "9px 12px", fontSize: 12.5, color: C.emerald, fontWeight: 600 }}>{mod}</div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 14 }}>
        <Card>
          <SectionTitle right={<Chip tone="slate">Priya Sharma</Chip>}>Development plan</SectionTitle>
          {plan.map((x) => (
            <div key={x.pri} style={{ borderLeft: `3px solid ${x.tone === "high" ? C.coral : x.tone === "medium" ? C.amber : C.emerald}`, paddingLeft: 12, marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: C.slateSoft }}>{x.pri}</span>
                {x.due && <span style={{ fontSize: 11, color: C.slate }}>{x.due}</span>}
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, margin: "2px 0" }}>{x.title}</div>
              <div style={{ fontSize: 12.5, color: C.slate }}>{x.mod} · {x.dur}</div>
            </div>
          ))}
          <button onClick={() => go("interventions", "assign")} style={{ ...primaryBtn, width: "100%", justifyContent: "center", marginTop: 4 }}>Assign this plan</button>
        </Card>

        <Card>
          <SectionTitle>Intervention library</SectionTitle>
          <div style={{ display: "grid", gap: 8 }}>
            {INT_LIBRARY.map((l) => (
              <div key={l.lvl} style={{ display: "flex", gap: 12, alignItems: "center", padding: "9px 11px", background: C.paper, borderRadius: 10 }}>
                <span style={{ width: 30, height: 30, borderRadius: 8, background: C.emeraldSoft, color: C.emerald, fontWeight: 700, fontSize: 12, display: "grid", placeItems: "center", flexShrink: 0 }}>{l.lvl}</span>
                <div><div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{l.name}</div><div style={{ fontSize: 11.5, color: C.slate }}>{l.desc}</div></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: 16, padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "15px 18px", borderBottom: `1px solid ${C.line}` }}><h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.ink }}>Content library</h3></div>
        <div className="scroll-x">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
            <thead><tr style={{ background: C.paper }}>{["Module", "Skill", "Duration", "Format", "Target issue"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.name} style={{ borderTop: `1px solid ${C.line}` }}>
                  <td style={{ ...td, fontWeight: 600, color: C.ink, fontSize: 13.5 }}>{m.name}</td>
                  <td style={{ ...td, fontSize: 13, color: C.slate }}>{m.skill}</td>
                  <td style={{ ...td, fontSize: 13, color: C.slate }}>{m.dur}</td>
                  <td style={{ ...td, fontSize: 13, color: C.slate }}>{m.fmt}</td>
                  <td style={td}><Chip tone="slate">{m.target}</Chip></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

export function Outcomes() {
  const o = OUTCOME;
  const chartData = o.bars.map((b) => ({ name: b.k, Before: b.before, After: b.after }));
  return (
    <div>
      <PageHead title="Outcome measurement" sub="The only question that matters: did the intervention actually work?" />
      <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${C.emeraldSoft}, #fff)`, border: `1px solid ${C.emerald}22`, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: C.emerald, display: "grid", placeItems: "center" }}><Award size={26} color="#fff" /></div>
          <div><div style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>Intervention effective</div>
            <div style={{ fontSize: 13, color: C.slate }}>{o.pro} · {o.intervention} · measured over {o.window} bookings</div></div>
        </div>
        <div style={{ textAlign: "right" }}><div style={{ fontSize: 30, fontWeight: 800, color: C.emerald }}>-61%</div><div style={{ fontSize: 12, color: C.slate }}>complaint rate reduction</div></div>
      </Card>

      <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 16 }}>
        {o.bars.map((b) => {
          const improved = b.good === "up" ? b.after > b.before : b.after < b.before;
          return (
            <Card key={b.k}>
              <div style={{ fontSize: 12.5, color: C.slate, fontWeight: 600, marginBottom: 10 }}>{b.k}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                <span style={{ fontSize: 15, color: C.slateSoft, textDecoration: "line-through" }}>{b.before}{b.unit}</span>
                <ArrowRight size={14} color={C.slateSoft} />
                <span style={{ fontSize: 24, fontWeight: 700, color: improved ? C.emerald : C.ink }}>{b.after}{b.unit}</span>
              </div>
              <div style={{ fontSize: 11.5, color: C.slateSoft, marginTop: 6 }}>Peer benchmark {b.k === "Complaint rate" ? o.peer.complaint + "%" : b.k === "Checklist completion" ? o.peer.checklist + "%" : b.k === "Repeat rate" ? o.peer.repeat + "%" : o.peer.score}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14 }}>
        <Card>
          <SectionTitle>Before vs after</SectionTitle>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 6, right: 10, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.line} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 10.5, fill: C.slateSoft }} axisLine={false} tickLine={false} interval={0} />
              <YAxis tick={{ fontSize: 11, fill: C.slateSoft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 12 }} />
              <Bar dataKey="Before" fill={C.slateSoft} radius={[5, 5, 0, 0]} />
              <Bar dataKey="After" fill={C.emerald} radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle right={<Chip tone="low">Validated</Chip>}>Treatment vs control</SectionTitle>
          <p style={{ fontSize: 12.5, color: C.slate, lineHeight: 1.5, margin: "0 0 14px" }}>To rule out seasonality, the same issue was found in 100 Pros. Half were coached now, half later.</p>
          {[{ g: "Treatment (coached)", v: "-61%", col: C.emerald, w: 61 }, { g: "Control (not yet)", v: "-9%", col: C.slateSoft, w: 9 }].map((x) => (
            <div key={x.g} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 13, color: C.ink }}>{x.g}</span><span style={{ fontSize: 13, fontWeight: 700, color: x.col }}>{x.v}</span></div>
              <Bar100 value={x.w} tone={x.col} />
            </div>
          ))}
          <div style={{ fontSize: 12, color: C.slate, background: C.emeraldSoft, borderRadius: 10, padding: "10px 12px", marginTop: 6, lineHeight: 1.5 }}>The gap between groups is the real effect of the training, not the season.</div>
        </Card>
      </div>

      <Card style={{ marginTop: 16 }}>
        <SectionTitle>Training ROI — Kitchen Cleaning Refresher</SectionTitle>
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
          {[["Pros trained", "214"], ["Complaint reduction", "23%"], ["Refund savings", money(184000)], ["Incremental repeat bookings", "1,120"], ["Return on cost", "6.4 : 1"]].map(([k, v], i) => (
            <div key={k}><div style={{ fontSize: 11.5, color: C.slateSoft, marginBottom: 4 }}>{k}</div><div style={{ fontSize: 20, fontWeight: 700, color: i === 4 ? C.emerald : C.ink }}>{v}</div></div>
          ))}
        </div>
      </Card>
    </div>
  );
}
