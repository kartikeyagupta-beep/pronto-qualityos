import React, { useState } from "react";
import { C } from "./theme.js";
import { NAV, PROS, ALERTS } from "./data.js";
import CommandCentre from "./screens/Command.jsx";
import { ProfessionalsList, ProfessionalProfile } from "./screens/Professionals.jsx";
import Heatmap from "./screens/Heatmap.jsx";
import Alerts from "./screens/Alerts.jsx";
import EarlyWarning from "./screens/EarlyWarning.jsx";
import RootCause from "./screens/RootCause.jsx";
import Interventions from "./screens/Interventions.jsx";
import { Training, Outcomes } from "./screens/TrainingOutcomes.jsx";
import {
  LayoutDashboard, Users, Map, Bell, Radar, GitBranch, Target, GraduationCap,
  TrendingUp, ShieldCheck,
} from "lucide-react";

const ICONS = {
  command: LayoutDashboard, professionals: Users, heatmap: Map, alerts: Bell,
  earlywarning: Radar, rootcause: GitBranch, interventions: Target,
  training: GraduationCap, outcomes: TrendingUp,
};

export default function App() {
  const [screen, setScreen] = useState("command");
  const [activePro, setActivePro] = useState(null);
  const [assignFlag, setAssignFlag] = useState(false);

  const criticalAlerts = ALERTS.filter((a) => a.sev === "critical").length;

  const go = (s, arg) => {
    if (s === "professionals" && arg) { setActivePro(arg); setScreen("professionals"); }
    else if (s === "professionals") { setActivePro(null); setScreen("professionals"); }
    else if (s === "interventions" && arg === "assign") { setAssignFlag(true); setScreen("interventions"); }
    else { setAssignFlag(false); setScreen(s); }
    if (typeof window !== "undefined") window.scrollTo?.(0, 0);
  };

  const pro = activePro ? PROS.find((p) => p.id === activePro) : null;

  return (
    <div className="app-shell" style={{ display: "flex", minHeight: "100vh", background: C.paper, color: C.ink }}>
      <aside className="app-sidebar" style={{ width: 218, background: C.ink, color: "#fff", padding: "22px 14px", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh", flexShrink: 0 }}>
        <div className="brand-block" style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 8px 22px" }}>
          <div style={{ width: 30, height: 30, borderRadius: 9, background: "#B7E3C4", display: "grid", placeItems: "center", flexShrink: 0 }}><ShieldCheck size={17} color={C.ink} /></div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, lineHeight: 1 }}>Pronto</div>
            <div style={{ fontSize: 9.5, fontWeight: 600, color: "#B7E3C4", letterSpacing: 1.5 }}>QUALITY OS</div>
          </div>
        </div>

        <nav className="nav-wrap" style={{ display: "grid", gap: 3, flex: 1 }}>
          {NAV.map((n) => {
            const Icon = ICONS[n.id];
            const active = screen === n.id;
            return (
              <button key={n.id} onClick={() => go(n.id)} title={n.label} style={{
                display: "flex", alignItems: "center", gap: 11, padding: "10px 11px", borderRadius: 10,
                border: "none", cursor: "pointer", fontSize: 13.5, fontWeight: active ? 600 : 500, textAlign: "left",
                background: active ? "rgba(183,227,196,.16)" : "transparent",
                color: active ? "#EAF7EE" : "rgba(255,255,255,.62)", position: "relative",
              }}>
                <Icon size={17} color={active ? "#B7E3C4" : "rgba(255,255,255,.55)"} />
                <span className="nav-label">{n.label}</span>
                {n.id === "alerts" && criticalAlerts > 0 && (
                  <span style={{ marginLeft: "auto", background: C.coral, color: "#fff", fontSize: 10, fontWeight: 700, borderRadius: 99, minWidth: 17, height: 17, display: "grid", placeItems: "center", padding: "0 4px" }}>{criticalAlerts}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="user-block" style={{ borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", gap: 10, alignItems: "center", padding: "14px 8px 0" }}>
          <div style={{ width: 32, height: 32, borderRadius: 99, background: "#B7E3C4", color: C.ink, fontWeight: 700, fontSize: 13, display: "grid", placeItems: "center" }}>K</div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 600 }}>Kartikeya</div>
            <div style={{ fontSize: 10.5, color: "rgba(255,255,255,.5)" }}>Operations Lead</div>
          </div>
        </div>
      </aside>

      <main className="app-main" style={{ flex: 1, padding: "28px 32px", maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {screen === "command" && <CommandCentre go={go} />}
        {screen === "professionals" && (pro ? <ProfessionalProfile pro={pro} go={go} /> : <ProfessionalsList go={go} />)}
        {screen === "heatmap" && <Heatmap go={go} />}
        {screen === "alerts" && <Alerts go={go} />}
        {screen === "earlywarning" && <EarlyWarning go={go} />}
        {screen === "rootcause" && <RootCause go={go} />}
        {screen === "interventions" && <Interventions go={go} openAssign={assignFlag} />}
        {screen === "training" && <Training go={go} />}
        {screen === "outcomes" && <Outcomes />}
      </main>
    </div>
  );
}
