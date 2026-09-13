import React, { useState } from "react";
import { C, th, td } from "../theme.js";
import { HEATMAP, CITIES, SERVICE_INTEL } from "../data.js";
import { Card, SectionTitle, PageHead, Chip, Delta } from "../components/UI.jsx";
import { MapPin, X, AlertTriangle, ArrowRight } from "lucide-react";

const toneColor = { green: C.emerald, amber: C.amber, red: C.coral };
const toneBg = { green: C.emeraldSoft, amber: C.amberSoft, red: C.coralSoft };

export default function Heatmap({ go }) {
  const [city, setCity] = useState("Gurgaon");
  const [sel, setSel] = useState(null);
  const cells = HEATMAP[city] || [];

  const cityHealth = Math.round(cells.reduce((a, c) => a + c.health, 0) / cells.length);

  return (
    <div>
      <PageHead title="Quality map" sub="Spot problem micro-markets at a glance, without digging through reports." />

      <div className="scroll-x" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 8 }}>
          {CITIES.map((ct) => {
            const active = ct === city;
            return (
              <button key={ct} onClick={() => { setCity(ct); setSel(null); }} style={{
                padding: "8px 16px", borderRadius: 999, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
                border: active ? `1.5px solid ${C.emerald}` : `1px solid ${C.line}`,
                background: active ? C.emerald : "#fff", color: active ? "#fff" : C.slate,
              }}>{ct}</button>
            );
          })}
        </div>
      </div>

      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: sel ? "1.5fr 1fr" : "1fr", gap: 14, marginBottom: 18 }}>
        <Card>
          <SectionTitle right={<span style={{ fontSize: 12.5, color: C.slate }}>{city} health <b style={{ color: C.ink }}>{cityHealth}</b></span>}>Micro-market heatmap</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 }}>
            {cells.map((c) => {
              const active = sel?.m === c.m;
              return (
                <button key={c.m} onClick={() => setSel(active ? null : c)} style={{
                  textAlign: "left", cursor: "pointer", borderRadius: 14, padding: 14,
                  background: toneBg[c.tone], border: active ? `2px solid ${toneColor[c.tone]}` : `1px solid ${toneColor[c.tone]}22`,
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ width: 10, height: 10, borderRadius: 99, background: toneColor[c.tone] }} />
                    <span style={{ fontSize: 22, fontWeight: 700, color: toneColor[c.tone] }}>{c.health}</span>
                  </div>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>{c.m}</div>
                  <div style={{ fontSize: 11.5, color: C.slate, marginTop: 2 }}>{c.pros} Pros · {c.complaints} complaints</div>
                </button>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 12, color: C.slate }}>
            {[["Healthy", C.emerald], ["Watch", C.amber], ["Critical", C.coral]].map(([l, col]) => (
              <span key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 9, height: 9, borderRadius: 99, background: col }} />{l}</span>
            ))}
          </div>
        </Card>

        {sel && (
          <Card style={{ borderTop: `3px solid ${toneColor[sel.tone]}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <MapPin size={16} color={toneColor[sel.tone]} />
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: C.ink }}>{sel.m}</h3>
                </div>
                <div style={{ fontSize: 12.5, color: C.slate, marginTop: 2 }}>{city}</div>
              </div>
              <button onClick={() => setSel(null)} aria-label="Close" style={{ background: "none", border: "none", cursor: "pointer" }}><X size={16} color={C.slateSoft} /></button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "16px 0" }}>
              {[["Health score", sel.health], ["Affected Pros", sel.pros], ["Bookings", sel.bookings], ["Complaints", sel.complaints]].map(([k, v]) => (
                <div key={k} style={{ background: C.paper, borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 11.5, color: C.slateSoft }}>{k}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>{v}</div>
                </div>
              ))}
            </div>

            {sel.primary ? (
              <>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: C.ink, marginBottom: 8 }}>Diagnosis</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 14 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: C.ink }}><Chip tone="critical">Primary</Chip> {sel.primary}</div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: C.ink }}><Chip tone="warning">Secondary</Chip> {sel.secondary}</div>
                </div>
                <div style={{ background: C.coralSoft, borderRadius: 10, padding: "10px 12px", fontSize: 12.5, color: C.ink, marginBottom: 14 }}>
                  Estimated repeat-booking loss: <b>{sel.repeatLoss}%</b> if unaddressed this month.
                </div>
                <button onClick={() => go("interventions", "assign")} style={{ width: "100%", background: C.emerald, color: "#fff", border: "none", padding: "10px", borderRadius: 11, fontWeight: 600, fontSize: 13.5, cursor: "pointer", display: "flex", justifyContent: "center", alignItems: "center", gap: 6 }}>
                  Deploy cluster intervention <ArrowRight size={15} />
                </button>
              </>
            ) : (
              <div style={{ fontSize: 13, color: C.slate, background: C.emeraldSoft, borderRadius: 10, padding: "12px 14px", lineHeight: 1.5 }}>
                This micro-market is performing at or above target. No action needed, keep an eye on trends.
              </div>
            )}
          </Card>
        )}
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "15px 18px", borderBottom: `1px solid ${C.line}` }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: C.ink }}>Service intelligence</h3>
          <div style={{ fontSize: 12, color: C.slateSoft, marginTop: 2 }}>Sometimes the problem is the service, not the Pro. Fix the process, not 500 people.</div>
        </div>
        <div className="scroll-x">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 620 }}>
            <thead><tr style={{ background: C.paper }}>{["Service", "Avg rating", "Complaint rate", "MoM trend", "Signal"].map((h) => <th key={h} style={th}>{h}</th>)}</tr></thead>
            <tbody>
              {SERVICE_INTEL.map((s) => (
                <tr key={s.service} style={{ borderTop: `1px solid ${C.line}`, background: s.flag ? C.coralSoft + "66" : "transparent" }}>
                  <td style={{ ...td, fontWeight: 600, color: C.ink, fontSize: 13.5, display: "flex", alignItems: "center", gap: 7 }}>
                    {s.flag && <AlertTriangle size={14} color={C.coral} />}{s.service}
                  </td>
                  <td style={{ ...td, fontSize: 13, color: C.slate }}>{s.rating}</td>
                  <td style={{ ...td, fontSize: 13, color: s.complaint > 4 ? C.red : C.slate, fontWeight: s.complaint > 4 ? 700 : 400 }}>{s.complaint}%</td>
                  <td style={td}><Delta v={s.trend} invert suffix="%" /></td>
                  <td style={td}>{s.flag ? <Chip tone="critical">Systemic — review checklist</Chip> : <Chip tone={s.tone === "amber" ? "warning" : "low"}>{s.tone === "amber" ? "Watch" : "Healthy"}</Chip>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: "13px 18px", borderTop: `1px solid ${C.line}`, fontSize: 12.5, color: C.slate, background: C.paper, lineHeight: 1.5 }}>
          Kitchen Cleaning complaints are up 27% across every city at once. That pattern points to the checklist scope, not individual Pros, so the fix is a process change rather than mass retraining.
        </div>
      </Card>
    </div>
  );
}
