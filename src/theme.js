export const C = {
  ink: "#0F2E28",
  emerald: "#0B6E4F",
  emeraldSoft: "#E7F2EC",
  teal: "#0E7C86",
  paper: "#FBFAF6",
  card: "#FFFFFF",
  line: "#ECE9E1",
  coral: "#F0623A",
  coralSoft: "#FDEBE4",
  amber: "#E4A11B",
  amberSoft: "#FCF3DF",
  slate: "#5A6B66",
  slateSoft: "#8A9B95",
  green: "#0B6E4F",
  red: "#D64A2C",
  mint: "#B7E3C4",
};

export const money = (n) => "\u20B9" + n.toLocaleString("en-IN");

export const th = { textAlign: "left", padding: "11px 18px", fontSize: 11, fontWeight: 600, color: C.slateSoft, whiteSpace: "nowrap" };
export const td = { padding: "13px 18px", verticalAlign: "middle" };
export const linkBtn = { background: "none", border: "none", color: C.emerald, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 3 };
export const reviewBtn = { background: C.emeraldSoft, color: C.emerald, border: "none", padding: "6px 14px", borderRadius: 8, fontWeight: 600, fontSize: 12.5, cursor: "pointer" };
export const primaryBtn = { background: C.emerald, color: "#fff", border: "none", padding: "10px 16px", borderRadius: 11, fontWeight: 600, fontSize: 13.5, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 };
export const ghostBtn = { background: "#fff", color: C.ink, border: `1px solid ${C.line}`, padding: "9px 15px", borderRadius: 11, fontWeight: 600, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 };
export const select = { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 13, background: "#fff", outline: "none", boxSizing: "border-box" };
export const input = { width: "100%", padding: "10px 12px", borderRadius: 10, border: `1px solid ${C.line}`, fontSize: 13, outline: "none", boxSizing: "border-box" };
