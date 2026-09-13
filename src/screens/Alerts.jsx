import React, { useState } from "react";
import { C } from "../theme.js";
import { ALERTS, COMPLAINT_MIX, NLP_THEMES } from "../data.js";
import { Card, SectionTitle, PageHead, Chip, Delta, EmptyState, Bar100 } from "../components/UI.jsx";
import {
  AlertTriangle, AlertCircle, Info, ArrowRight, Bell, CheckCircle2, MessageSquareText,
} from "lucide-react";

const sevMap = {
  critical: { icon: AlertCircle, col: C.coral, bg: C.coralSoft, label: "Critical" },
  warning: { icon: AlertTriangle, col: C.amber, bg: C.amberSoft, label: "Warning" },
  info: { icon: Info, col: C.teal, bg: "#E6F0F1", label: "Info" },
};
const scopeLabel = { cluster: "Cluster", professional: "Professional", service: "Service" };

export default function Alerts({ go }) {
  const [dismissed, setDismissed] = useState([]);
  const live = ALERTS.filter((a) => !dismissed.includes(a.id));
  const counts = {
    critical: live.filter((a) => a.sev === "critical").length,
    warning: live.filter((a) => a.sev === "warning").length,
    info: live.filter((a) => a.sev === "info").length,
  };

  return (
    <div>
      <PageHead title="Quality alerts" sub="Not everything needs a dashboard. Some things need to reach a manager now." />

      <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 18 }}>
        {[
          { k: "critical", label: "Critical", n: counts.critical },
          { k: "warning", label: "Warning", n: counts.warning },
          { k: "info", label: "Informational", n: counts.info },
        ].map((s) => {
          const m = sevMap[s.k];
          return (
            <Card key={s.k}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><div style={{ fontSize: 28, fontWeight: 700, color: m.col }}>{s.n}</div><div style={{ fontSize: 13, color: C.slate }}>{s.label}</div></div>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: m.bg, display: "grid", placeItems: "center" }}><m.icon size={19} color={m.col} /></div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 14 }}>
        {/* Alert feed */}
        <div>
          <SectionTitle>Live alert feed</SectionTitle>
          {live.length === 0 ? (
            <Card><EmptyState icon={CheckCircle2} title="You're all clear" body="No open alerts right now. New quality signals will show up here as they're detected." /></Card>
          ) : (
            <div style={{ display: "grid", gap: 12 }}>
              {live.map((a) => {
                const m = sevMap[a.sev];
                return (
                  <Card key={a.id} style={{ borderLeft: `4px solid ${m.col}`, padding: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                      <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                        <m.icon size={17} color={m.col} />
                        <span style={{ fontSize: 14.5, fontWeight: 700, color: C.ink }}>{a.title}</span>
                      </div>
                      <span style={{ fontSize: 11, color: C.slateSoft, whiteSpace: "nowrap" }}>{a.time}</span>
                    </div>
                    <p style={{ margin: "0 0 12px 26px", fontSize: 13, color: C.slate, lineHeight: 1.55 }}>{a.body}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: 26, flexWrap: "wrap", gap: 8 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <Chip tone={a.sev === "info" ? "info" : a.sev}>{scopeLabel[a.scope]}</Chip>
                        <span style={{ fontSize: 11.5, color: C.slateSoft }}>{a.meta}</span>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setDismissed([...dismissed, a.id])} style={{ background: "none", border: `1px solid ${C.line}`, color: C.slate, padding: "6px 12px", borderRadius: 9, fontSize: 12.5, fontWeight: 600, cursor: "pointer" }}>Dismiss</button>
                        <button onClick={() => a.pro ? go("professionals", a.pro) : go("interventions", "assign")} style={{ background: m.col, border: "none", color: "#fff", padding: "6px 12px", borderRadius: 9, fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5 }}>
                          {a.action} <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Complaint intelligence */}
        <div style={{ display: "grid", gap: 14, alignContent: "start" }}>
          <Card>
            <SectionTitle right={<span style={{ fontSize: 11.5, color: C.slateSoft }}>This week</span>}>Complaint mix</SectionTitle>
            {COMPLAINT_MIX.map((c) => (
              <div key={c.label} style={{ marginBottom: 11 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12.5 }}>
                  <span style={{ color: C.ink }}>{c.label}</span>
                  <span style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <span style={{ fontWeight: 700, color: C.ink }}>{c.pct}%</span>
                    <Delta v={c.pct - c.prev} invert suffix="pp" />
                  </span>
                </div>
                <div style={{ height: 7, background: "#F0EEE7", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ width: `${c.pct * 2.6}%`, height: "100%", background: c.color, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </Card>

          <Card>
            <SectionTitle right={<Chip tone="info"><MessageSquareText size={12} /> NLP</Chip>}>Rising phrases in feedback</SectionTitle>
            <p style={{ fontSize: 12, color: C.slate, margin: "0 0 12px", lineHeight: 1.5 }}>Not just sentiment. The engine tracks the actual words customers use, so language turns into action.</p>
            {NLP_THEMES.map((t) => (
              <div key={t.phrase} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderTop: `1px solid ${C.line}` }}>
                <div>
                  <div style={{ fontSize: 13, color: C.ink, fontWeight: 500 }}>{t.phrase}</div>
                  <div style={{ fontSize: 11, color: C.slateSoft }}>{t.count} mentions · {t.service}</div>
                </div>
                <Delta v={t.delta} invert suffix="%" />
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
