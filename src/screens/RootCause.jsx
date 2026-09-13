import React from "react";
import { C, th, td, ghostBtn, primaryBtn } from "../theme.js";
import { PROS, FLAGGED_BOOKINGS } from "../data.js";
import { Card, SectionTitle, PageHead, Avatar, Chip, Stars } from "../components/UI.jsx";
import { ShieldCheck, ArrowRight, GraduationCap } from "lucide-react";

export default function RootCause({ go }) {
  const p = PROS[0];
  return (
    <div>
      <PageHead title="Root cause analysis" sub="Don't blame the most visible issue. Trace the outcome back to the real driver." />
      <Card style={{ marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <Avatar p={p} size={44} />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: C.ink }}>{p.name}</div>
            <div style={{ fontSize: 12.5, color: C.slate }}>Trigger: rating 2/5 — "Kitchen wasn't properly cleaned and she arrived late."</div>
          </div>
        </div>
        <button onClick={() => go("professionals", p.id)} style={ghostBtn}>View profile</button>
      </Card>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
        <Card>
          <SectionTitle>Reported issues, classified</SectionTitle>
          {[
            { issue: "Incomplete task execution", cat: "Service quality", w: "Primary suspect", tone: "critical" },
            { issue: "Late arrival", cat: "Punctuality", w: "Secondary", tone: "slate" },
          ].map((x) => (
            <div key={x.issue} style={{ padding: "13px 14px", background: C.paper, borderRadius: 12, marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{x.issue}</span><Chip tone={x.tone}>{x.w}</Chip>
              </div>
              <div style={{ fontSize: 12, color: C.slateSoft, marginTop: 3 }}>{x.cat}</div>
            </div>
          ))}
          <div style={{ fontSize: 12, color: C.slate, marginTop: 4, lineHeight: 1.5 }}>
            The visible complaint mentions lateness, but the evidence points elsewhere. The engine checks arrival logs, duration, checklist and history before concluding.
          </div>
        </Card>

        <Card style={{ background: `linear-gradient(135deg, ${C.emeraldSoft}, #fff)`, border: `1px solid ${C.emerald}22` }}>
          <SectionTitle right={<Chip tone="strong">78% confidence</Chip>}>Primary root cause</SectionTitle>
          <div style={{ fontSize: 22, fontWeight: 700, color: C.emerald, marginBottom: 4 }}>Service execution</div>
          <div style={{ fontSize: 13, color: C.slate, marginBottom: 14 }}>Kitchen task completion, not punctuality.</div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Supporting evidence</div>
          {[
            "4 similar complaints in the last 30 bookings", "3 of them during Kitchen Cleaning services",
            "Checklist adherence at 84% vs peer 94%", "Completion time 8% below peer median", "No pattern of punctuality complaints",
          ].map((e, i) => (
            <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13, color: C.ink, marginBottom: 6 }}>
              <ShieldCheck size={15} color={C.emerald} style={{ marginTop: 1, flexShrink: 0 }} /> {e}
            </div>
          ))}
        </Card>
      </div>

      <Card style={{ marginBottom: 16 }}>
        <SectionTitle>Behaviour → issue → outcome</SectionTitle>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto 1fr", gap: 12, alignItems: "center" }}>
          {[
            { t: "Kitchen tasks left incomplete", s: "Behaviour", bg: C.paper },
            { t: "Missed hob & chimney cleaning", s: "Issue", bg: C.amberSoft },
            { t: "Lower ratings & more complaints", s: "Outcome", bg: C.coralSoft },
          ].map((n, i) => (
            <React.Fragment key={i}>
              <div style={{ background: n.bg, borderRadius: 12, padding: "16px 14px", textAlign: "center" }}>
                <div style={{ fontSize: 11, color: C.slateSoft, fontWeight: 600, marginBottom: 4 }}>{n.s}</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{n.t}</div>
              </div>
              {i < 2 && <ArrowRight size={20} color={C.slateSoft} />}
            </React.Fragment>
          ))}
        </div>
      </Card>

      <Card style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
        <div style={{ padding: "15px 18px", borderBottom: `1px solid ${C.line}` }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.ink }}>Evidence — flagged bookings</h3>
          <div style={{ fontSize: 12, color: C.slateSoft, marginTop: 2 }}>Every score traces back to real bookings and customer feedback.</div>
        </div>
        <div className="scroll-x">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 680 }}>
            <thead><tr style={{ background: C.paper }}>{["Booking", "Date", "Service", "Rating", "Issue", "Customer note"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
            <tbody>
              {FLAGGED_BOOKINGS.map((b) => (
                <tr key={b.id} style={{ borderTop: `1px solid ${C.line}` }}>
                  <td style={{ ...td, fontWeight: 600, color: C.ink, fontSize: 13 }}>{b.id}</td>
                  <td style={{ ...td, fontSize: 13, color: C.slate }}>{b.date}</td>
                  <td style={{ ...td, fontSize: 13, color: C.slate }}>{b.service}</td>
                  <td style={td}><Stars n={b.rating} /></td>
                  <td style={td}><Chip tone={b.issue === "Incomplete task" ? "critical" : "slate"}>{b.issue}</Chip></td>
                  <td style={{ ...td, fontSize: 12.5, color: C.slate, maxWidth: 240 }}>{b.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", background: C.ink, color: "#fff" }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,.12)", display: "grid", placeItems: "center" }}><GraduationCap size={22} color="#B7E3C4" /></div>
          <div>
            <div style={{ fontSize: 11.5, opacity: 0.7, fontWeight: 600 }}>Recommended action</div>
            <div style={{ fontSize: 16, fontWeight: 700 }}>Kitchen Cleaning Practical Refresher</div>
            <div style={{ fontSize: 12.5, opacity: 0.75 }}>Hands-on training to reinforce kitchen standards and checklist completion.</div>
          </div>
        </div>
        <button onClick={() => go("interventions", "assign")} style={{ ...primaryBtn, background: "#B7E3C4", color: C.ink }}>Assign intervention <ArrowRight size={15} /></button>
      </Card>
    </div>
  );
}
