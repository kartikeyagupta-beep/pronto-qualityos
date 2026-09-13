import React, { useState } from "react";
import { C, primaryBtn, ghostBtn, select, input } from "../theme.js";
import { PROS, INTERVENTIONS } from "../data.js";
import { Card, PageHead, Chip, Field } from "../components/UI.jsx";
import {
  Target, CheckCircle2, Calendar, TrendingUp, ChevronRight, X, Sparkles, ArrowRight,
} from "lucide-react";

export default function Interventions({ go, openAssign }) {
  const [assignOpen, setAssignOpen] = useState(!!openAssign);
  const cols = [
    { key: "assigned", title: "Assigned", tone: C.slate },
    { key: "progress", title: "In progress", tone: C.teal },
    { key: "monitoring", title: "Monitoring", tone: C.amber },
    { key: "ready", title: "Outcome ready", tone: C.emerald },
  ];
  const stats = [
    { n: 24, label: "Active interventions", icon: Target },
    { n: "67%", label: "On track", icon: CheckCircle2 },
    { n: 12, label: "Due this week", icon: Calendar },
    { n: "-28%", label: "Avg issue reduction", icon: TrendingUp },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <PageHead title="Turn insight into action" sub="Targeted interventions, tracked from assignment to measured outcome." />
        <button onClick={() => setAssignOpen(true)} style={primaryBtn}>+ New intervention</button>
      </div>

      <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 18 }}>
        {stats.map((s) => (
          <Card key={s.label}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontSize: 26, fontWeight: 700, color: C.ink }}>{s.n}</div><div style={{ fontSize: 12, color: C.slate }}>{s.label}</div></div>
              <s.icon size={20} color={C.slateSoft} />
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: 16, padding: "14px 18px" }}>
        <div className="scroll-x">
          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, color: C.slate, minWidth: 560 }}>
            {["Assigned", "Started", "Completed", "Assessed", "Monitored", "Outcome measured"].map((s, i, a) => (
              <React.Fragment key={s}>
                <span style={{ fontWeight: 600, color: C.ink, whiteSpace: "nowrap" }}>{s}</span>
                {i < a.length - 1 && <ChevronRight size={14} color={C.slateSoft} />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Card>

      <div className="kanban" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
        {cols.map((c) => (
          <div key={c.key}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{c.title}</span>
              <span style={{ fontSize: 11.5, color: C.slateSoft }}>{INTERVENTIONS[c.key].length}</span>
            </div>
            <div style={{ display: "grid", gap: 10 }}>
              {INTERVENTIONS[c.key].map((it, i) => (
                <Card key={i} style={{ padding: 13, borderTop: `3px solid ${c.tone}` }} onClick={c.key === "ready" ? () => go("outcomes") : undefined}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink, marginBottom: 3 }}>{it.pro}</div>
                  <div style={{ fontSize: 12, color: C.slate, marginBottom: 8 }}>{it.who}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Chip tone={it.pri.toLowerCase()}>{it.pri}</Chip>
                    <span style={{ fontSize: 11, color: C.slateSoft }}>{it.due}</span>
                  </div>
                  {c.key === "ready" && <div style={{ marginTop: 8, fontSize: 11.5, color: C.emerald, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>View outcome <ArrowRight size={12} /></div>}
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {assignOpen && <AssignModal onClose={() => setAssignOpen(false)} go={go} />}
    </div>
  );
}

function AssignModal({ onClose, go }) {
  const [pro, setPro] = useState("PRO-00421");
  const [intv, setIntv] = useState("Kitchen Cleaning Practical Refresher");
  const [pri, setPri] = useState("High");
  const [done, setDone] = useState(false);
  const selected = PROS.find((p) => p.id === pro);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,46,40,.35)", display: "grid", placeItems: "center", zIndex: 50, padding: 20 }} onClick={onClose} role="dialog" aria-modal="true">
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, width: "100%", maxWidth: 460, padding: 24, boxShadow: "0 24px 60px rgba(15,46,40,.25)" }}>
        {!done ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: C.ink }}>Assign intervention</h3>
              <button onClick={onClose} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer" }}><X size={18} color={C.slate} /></button>
            </div>
            <Field label="Professional">
              <select value={pro} onChange={(e) => setPro(e.target.value)} style={select}>
                {PROS.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.id}</option>)}
              </select>
            </Field>
            <Field label="Intervention">
              <select value={intv} onChange={(e) => setIntv(e.target.value)} style={select}>
                {["Kitchen Cleaning Practical Refresher", "Arrival Planning Coaching", "Customer Communication Module", "Shadowing with top performer", "Temporary quality monitoring"].map((o) => <option key={o}>{o}</option>)}
              </select>
            </Field>
            <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 4 }}>
              <Field label="Priority">
                <div style={{ display: "flex", gap: 6 }}>
                  {["High", "Medium", "Low"].map((x) => (
                    <button key={x} onClick={() => setPri(x)} style={{
                      flex: 1, padding: "8px 4px", borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: "pointer",
                      border: pri === x ? `1.5px solid ${C.emerald}` : `1px solid ${C.line}`,
                      background: pri === x ? C.emeraldSoft : "#fff", color: pri === x ? C.emerald : C.slate }}>{x}</button>
                  ))}
                </div>
              </Field>
              <Field label="Due date"><input type="text" defaultValue="18 Aug 2025" style={input} /></Field>
              <Field label="Success threshold"><input type="text" defaultValue="≥40% fewer" style={input} /></Field>
            </div>
            <div style={{ background: C.emeraldSoft, borderRadius: 12, padding: "11px 13px", fontSize: 12.5, color: C.ink, lineHeight: 1.5, margin: "8px 0 18px", display: "flex", gap: 8 }}>
              <Sparkles size={15} color={C.emerald} style={{ flexShrink: 0, marginTop: 1 }} />
              {selected?.manager} will be notified, and {selected?.name.split(" ")[0]} is added to the intervention with clear goals and outcome tracking over the next 20 bookings.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{ ...ghostBtn, flex: 1, justifyContent: "center" }}>Cancel</button>
              <button onClick={() => setDone(true)} style={{ ...primaryBtn, flex: 2, justifyContent: "center" }}>Assign & notify manager</button>
            </div>
          </>
        ) : (
          <div style={{ textAlign: "center", padding: "18px 6px" }}>
            <div style={{ width: 56, height: 56, borderRadius: 99, background: C.emeraldSoft, display: "grid", placeItems: "center", margin: "0 auto 14px" }}><CheckCircle2 size={30} color={C.emerald} /></div>
            <h3 style={{ margin: "0 0 6px", fontSize: 18, fontWeight: 700, color: C.ink }}>Intervention assigned</h3>
            <p style={{ margin: "0 0 20px", fontSize: 13.5, color: C.slate, lineHeight: 1.5 }}>{selected?.name} is now on the {intv}. Outcomes will be measured over the next 20 bookings and appear in Outcomes.</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={onClose} style={{ ...ghostBtn, flex: 1, justifyContent: "center" }}>Close</button>
              <button onClick={() => { onClose(); go("outcomes"); }} style={{ ...primaryBtn, flex: 1, justifyContent: "center" }}>Track outcome</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
