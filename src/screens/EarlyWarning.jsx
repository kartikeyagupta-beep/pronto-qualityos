import React from "react";
import { C } from "../theme.js";
import { EARLY_WARNING } from "../data.js";
import { Card, SectionTitle, PageHead, Avatar, Chip } from "../components/UI.jsx";
import {
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip,
} from "recharts";
import { TrendingDown, ArrowRight, Radar, ShieldAlert } from "lucide-react";

export default function EarlyWarning({ go }) {
  return (
    <div>
      <PageHead title="Early warning system" sub="Don't wait for a Pro to become 'bad'. Catch the slide while it's still reversible." />

      {/* intro band */}
      <Card style={{ marginBottom: 18, background: `linear-gradient(120deg, ${C.ink}, ${C.teal})`, color: "#fff", display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, background: "rgba(255,255,255,.14)", display: "grid", placeItems: "center", flexShrink: 0 }}><Radar size={24} color="#B7E3C4" /></div>
        <div style={{ flex: 1, minWidth: 240 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>3 professionals are showing early deterioration</div>
          <div style={{ fontSize: 13, opacity: 0.8, marginTop: 2 }}>Predicted quality scores for their next 10 bookings are trending below cohort. Acting now costs one coaching session; acting later costs customers.</div>
        </div>
      </Card>

      <div style={{ display: "grid", gap: 14 }}>
        {EARLY_WARNING.map((w) => {
          const data = w.trajectory.map((s, i) => ({ x: `T-${w.trajectory.length - i}`, s }))
            .concat([{ x: "Next", s: w.predicted, predicted: true }]);
          const riskCol = w.risk >= 75 ? C.coral : w.risk >= 55 ? C.amber : C.emerald;
          return (
            <Card key={w.id} style={{ borderLeft: `4px solid ${riskCol}` }}>
              <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1.2fr auto", gap: 18, alignItems: "center" }}>
                {/* identity + risk */}
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <Avatar p={w} size={44} />
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: C.ink }}>{w.name}</div>
                    <div style={{ fontSize: 12, color: C.slate }}>{w.city}</div>
                    <div style={{ marginTop: 5, display: "flex", alignItems: "center", gap: 6 }}>
                      <ShieldAlert size={13} color={riskCol} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: riskCol }}>Risk {w.risk}/100</span>
                    </div>
                  </div>
                </div>

                {/* driver + causes */}
                <div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13, fontWeight: 600, color: C.ink, marginBottom: 6 }}>
                    <TrendingDown size={14} color={riskCol} /> {w.driver}
                  </div>
                  {w.causes.map((c, i) => (
                    <div key={i} style={{ fontSize: 12, color: C.slate, marginBottom: 3, paddingLeft: 20, position: "relative" }}>
                      <span style={{ position: "absolute", left: 8, top: 7, width: 4, height: 4, borderRadius: 99, background: C.slateSoft }} />{c}
                    </div>
                  ))}
                </div>

                {/* trajectory */}
                <div>
                  <div style={{ fontSize: 11, color: C.slateSoft, marginBottom: 2 }}>Score trajectory → prediction</div>
                  <ResponsiveContainer width="100%" height={70}>
                    <LineChart data={data} margin={{ top: 6, right: 6, left: -30, bottom: 0 }}>
                      <XAxis dataKey="x" tick={{ fontSize: 9, fill: C.slateSoft }} axisLine={false} tickLine={false} interval={0} />
                      <YAxis domain={[60, 90]} hide />
                      <Tooltip contentStyle={{ borderRadius: 8, border: `1px solid ${C.line}`, fontSize: 11 }} />
                      <ReferenceLine y={75} stroke={C.slateSoft} strokeDasharray="3 3" />
                      <Line type="monotone" dataKey="s" stroke={riskCol} strokeWidth={2.5} dot={{ r: 2 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  <div style={{ fontSize: 11, color: C.slate, textAlign: "center" }}>Predicted next: <b style={{ color: riskCol }}>{w.predicted}</b></div>
                </div>

                {/* action */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <button onClick={() => go("professionals", w.id)} style={{ background: "#fff", border: `1px solid ${C.line}`, color: C.ink, padding: "8px 12px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>View profile</button>
                  <button onClick={() => go("interventions", "assign")} style={{ background: C.emerald, border: "none", color: "#fff", padding: "8px 12px", borderRadius: 10, fontSize: 12.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 5, justifyContent: "center", whiteSpace: "nowrap" }}>Intervene <ArrowRight size={13} /></button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card style={{ marginTop: 16, background: C.paper }}>
        <SectionTitle>How the risk score works</SectionTitle>
        <div className="grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
          {[
            ["Trajectory", "Direction and speed of the score decline over recent weeks."],
            ["Volatility", "Swing in ratings and complaints booking to booking."],
            ["Context shifts", "New service, new micro-market, shift change, or workload spike."],
            ["Peer gap", "How far the Pro sits below their true cohort right now."],
          ].map(([k, v]) => (
            <div key={k}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 12, color: C.slate, lineHeight: 1.5 }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
