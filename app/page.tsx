"use client";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bell,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
  Clock3,
  Download,
  Filter,
  GraduationCap,
  Grid2X2,
  HelpCircle,
  Home,
  MapPin,
  Menu,
  MoreHorizontal,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  UsersRound,
  X,
  Zap,
} from "lucide-react";

type Pro = {
  id: string;
  name: string;
  initials: string;
  city: string;
  market: string;
  service: string;
  score: number;
  delta: number;
  status: "Critical" | "Watch" | "Healthy" | "Improving";
  rating: number;
  complaints: number;
  repeat: number;
  onTime: number;
  color: string;
};
const pros: Pro[] = [
  {
    id: "PR-1048",
    name: "Priya Sharma",
    initials: "PS",
    city: "Gurgaon",
    market: "Sector 57",
    service: "Kitchen Cleaning",
    score: 72,
    delta: -11,
    status: "Critical",
    rating: 4.1,
    complaints: 6.8,
    repeat: 19,
    onTime: 88,
    color: "#d95d43",
  },
  {
    id: "PR-0872",
    name: "Sunita Devi",
    initials: "SD",
    city: "Gurgaon",
    market: "Sector 52",
    service: "Bathroom Cleaning",
    score: 79,
    delta: -5,
    status: "Watch",
    rating: 4.3,
    complaints: 4.9,
    repeat: 24,
    onTime: 91,
    color: "#dc9d17",
  },
  {
    id: "PR-1142",
    name: "Meena Kumari",
    initials: "MK",
    city: "Noida",
    market: "Sector 137",
    service: "Hourly Bookings",
    score: 91,
    delta: 7,
    status: "Improving",
    rating: 4.8,
    complaints: 1.1,
    repeat: 41,
    onTime: 98,
    color: "#148568",
  },
  {
    id: "PR-0931",
    name: "Anjali Yadav",
    initials: "AY",
    city: "Gurgaon",
    market: "Sector 43",
    service: "Kitchen Cleaning",
    score: 88,
    delta: 2,
    status: "Healthy",
    rating: 4.7,
    complaints: 1.9,
    repeat: 36,
    onTime: 96,
    color: "#217861",
  },
  {
    id: "PR-1260",
    name: "Rani Kumari",
    initials: "RK",
    city: "Delhi",
    market: "Vasant Kunj",
    service: "Hourly Bookings",
    score: 67,
    delta: -14,
    status: "Critical",
    rating: 3.9,
    complaints: 8.2,
    repeat: 14,
    onTime: 82,
    color: "#cb5139",
  },
  {
    id: "PR-1033",
    name: "Kavita Singh",
    initials: "KS",
    city: "Gurgaon",
    market: "Sector 56",
    service: "Bathroom Cleaning",
    score: 84,
    delta: 4,
    status: "Improving",
    rating: 4.6,
    complaints: 2.4,
    repeat: 31,
    onTime: 95,
    color: "#168468",
  },
];
const QUALITYOS_API =
  "https://rfluvwzoucypuutwrqub.supabase.co/functions/v1/qualityos-api";
const SUPABASE_ANON =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmbHV2d3pvdWN5cHV1dHdycXViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDg4MjgsImV4cCI6MjEwMDIyNDgyOH0.Gt9JW7ZJIFT-U4E_YwcJ95Mr6gSfIGuXcg7qk8w84cY";
const apiHeaders = {
  apikey: SUPABASE_ANON,
  Authorization: `Bearer ${SUPABASE_ANON}`,
};
const trend = [
  { w: "12 Aug", quality: 78, target: 80 },
  { w: "19 Aug", quality: 81, target: 81 },
  { w: "26 Aug", quality: 80, target: 81 },
  { w: "2 Sep", quality: 84, target: 82 },
  { w: "9 Sep", quality: 86, target: 82 },
];
const nav = [
  ["Command Centre", Grid2X2],
  ["Professionals", UsersRound],
  ["Root Cause", BrainCircuit],
  ["Interventions", Target],
  ["Training", GraduationCap],
  ["Outcomes", TrendingUp],
] as const;
function Status({
  s,
}: {
  s: Pro["status"] | "Effective" | "Promising" | "Inconclusive";
}) {
  let c =
    s === "Critical"
      ? "red"
      : s === "Watch" || s === "Inconclusive"
        ? "amber"
        : "green";
  return (
    <span className={`status ${c}`}>
      <i />
      {s}
    </span>
  );
}
function Delta({ n }: { n: number }) {
  return (
    <span className={`delta ${n >= 0 ? "up" : "down"}`}>
      {n >= 0 ? <ArrowUp /> : <ArrowDown />}
      {Math.abs(n)} pts
    </span>
  );
}
function Metric({
  label,
  value,
  change,
  good,
  sub,
}: {
  label: string;
  value: string;
  change: string;
  good: boolean;
  sub: string;
}) {
  return (
    <div className="metric">
      <div className="metric-label">
        {label}
        <HelpCircle />
      </div>
      <div>
        <strong>{value}</strong>
        <span className={good ? "good" : "bad"}>
          {good ? <ArrowUp /> : <ArrowDown />}
          {change}
        </span>
      </div>
      <p>{sub}</p>
    </div>
  );
}
function Head({
  eyebrow,
  title,
  copy,
  action,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="page-head">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
      {action}
    </section>
  );
}
function ProCell({ p }: { p: Pro }) {
  return (
    <div className="pro-cell">
      <span style={{ background: p.color }}>{p.initials}</span>
      <div>
        <b>{p.name}</b>
        <small>
          {p.id} · {p.market}
        </small>
      </div>
    </div>
  );
}

function Command({
  open,
  rows = pros,
}: {
  open: (p: Pro) => void;
  rows?: Pro[];
}) {
  return (
    <>
      <Head
        eyebrow="QUALITY COMMAND CENTRE"
        title="Good morning, Kartikeya."
        copy="Here’s what needs attention across Pronto today."
        action={
          <div className="actions">
            <button className="outline">
              <CalendarDays />
              Last 30 days
              <ChevronDown />
            </button>
            <button className="primary">
              <Download />
              Export report
            </button>
          </div>
        }
      />
      <section className="health">
        <div className="health-score">
          <div className="ring">
            <span>82</span>
            <small>/100</small>
          </div>
          <div>
            <p className="light-label">
              <i />
              QUALITY HEALTH
            </p>
            <h2>
              Quality is healthy, with
              <br />
              two areas to watch.
            </h2>
            <p>
              Up <b>3 points</b> from the previous 30 days
            </p>
          </div>
        </div>
        <div className="drivers">
          <p className="ai">
            <Sparkles />
            WHAT CHANGED
          </p>
          <p>
            <b>Customer Experience rose 4 points</b>, led by fewer punctuality
            complaints in Gurgaon.
          </p>
          <p>
            <b className="warn">Service Execution fell 2 points</b>, driven by
            incomplete kitchen tasks in Sector 52 and 57.
          </p>
          <button className="link white">
            View full score breakdown
            <ArrowRight />
          </button>
        </div>
      </section>
      <section className="metrics">
        <Metric
          label="AVERAGE RATING"
          value="4.62"
          change="0.08"
          good
          sub="vs. 4.54 previous period"
        />
        <Metric
          label="COMPLAINT RATE"
          value="2.4%"
          change="0.3%"
          good={false}
          sub="418 of 17,420 bookings"
        />
        <Metric
          label="REPEAT BOOKING"
          value="31.8%"
          change="2.1%"
          good
          sub="5,540 repeat bookings"
        />
        <Metric
          label="ON-TIME ARRIVAL"
          value="94.1%"
          change="1.4%"
          good
          sub="Target: 95%"
        />
      </section>
      <section className="dash-grid">
        <div className="panel">
          <PanelHead
            eye="QUALITY TREND"
            title="Quality-adjusted booking rate"
          />
          <div className="chart">
            <svg
              className="trend-svg"
              viewBox="0 0 640 210"
              preserveAspectRatio="none"
              role="img"
              aria-label="Quality score increased from 78 to 86"
            >
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop stopColor="#006b57" stopOpacity=".25" />
                  <stop offset="1" stopColor="#006b57" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="gridlines">
                <line x1="35" y1="25" x2="625" y2="25" />
                <line x1="35" y1="75" x2="625" y2="75" />
                <line x1="35" y1="125" x2="625" y2="125" />
                <line x1="35" y1="175" x2="625" y2="175" />
              </g>
              <path
                className="area-fill"
                d="M35 150 C105 145 145 120 180 115 S285 125 325 118 S430 73 470 68 S565 46 625 43 L625 180 L35 180Z"
              />
              <path
                className="target-line"
                d="M35 125 C180 120 325 115 470 105 S575 95 625 92"
              />
              <path
                className="quality-line"
                d="M35 150 C105 145 145 120 180 115 S285 125 325 118 S430 73 470 68 S565 46 625 43"
              />
              <g className="dots">
                <circle cx="35" cy="150" r="4" />
                <circle cx="180" cy="115" r="4" />
                <circle cx="325" cy="118" r="4" />
                <circle cx="470" cy="68" r="4" />
                <circle cx="625" cy="43" r="4" />
              </g>
              <g className="axis-labels">
                <text x="35" y="204">
                  12 Aug
                </text>
                <text x="180" y="204">
                  19 Aug
                </text>
                <text x="325" y="204">
                  26 Aug
                </text>
                <text x="470" y="204">
                  2 Sep
                </text>
                <text x="625" y="204" textAnchor="end">
                  9 Sep
                </text>
              </g>
            </svg>
          </div>
          <div className="legend">
            <span>
              <i />
              Pronto quality
            </span>
            <span>
              <i className="dash" />
              Target benchmark
            </span>
            <b>+8 pts in 30 days</b>
          </div>
        </div>
        <div className="panel">
          <PanelHead
            eye="TODAY’S QUEUE"
            title="17 actions need review"
            link="View all"
          />
          {[
            [
              "red",
              AlertTriangle,
              "5 high priority",
              "Repeated complaints or sharp decline",
            ],
            [
              "amber",
              Clock3,
              "12 medium priority",
              "Training overdue or early warning",
            ],
            [
              "green",
              TrendingUp,
              "18 Pros improving",
              "Positive change after coaching",
            ],
          ].map(([c, I, t, s]) => (
            <div className={`queue ${c}`} key={t as string}>
              <span>
                <I />
              </span>
              <div>
                <b>{t as string}</b>
                <p>{s as string}</p>
              </div>
              <ChevronRight />
            </div>
          ))}
        </div>
      </section>
      <section className="panel table-panel">
        <PanelHead
          eye="PROFESSIONALS NEEDING ATTENTION"
          title="Prioritised by expected customer impact"
          extra={
            <button className="outline small">
              <Filter />
              All cities
              <ChevronDown />
            </button>
          }
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PROFESSIONAL</th>
                <th>STATUS</th>
                <th>QUALITY SCORE</th>
                <th>PRIMARY DRIVER</th>
                <th>RECOMMENDED ACTION</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.slice(0, 4).map((p, i) => (
                <tr key={p.id} onClick={() => open(p)}>
                  <td>
                    <ProCell p={p} />
                  </td>
                  <td>
                    <Status s={p.status} />
                  </td>
                  <td>
                    <b className="score">{p.score}</b>
                    <Delta n={p.delta} />
                  </td>
                  <td>
                    <b>{i < 2 ? "Incomplete task execution" : "Punctuality"}</b>
                    <small>
                      {i < 2
                        ? "4 complaints / 30 bookings"
                        : "Late arrivals rising"}
                    </small>
                  </td>
                  <td>
                    <button className="link">
                      {i < 2
                        ? "Assign practical refresher"
                        : "Monitor next 10 bookings"}
                      <ArrowRight />
                    </button>
                  </td>
                  <td>
                    <MoreHorizontal />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="insight">
        <Sparkles />
        <div>
          <b>Quality intelligence</b>
          <p>
            61% of incremental complaints are concentrated in{" "}
            <strong>Kitchen Cleaning</strong> across Sector 52 and 57. This
            appears to be a <strong>cohort-level issue</strong>, not an
            individual Pro problem.
          </p>
        </div>
        <button className="link">
          Open root cause analysis
          <ArrowRight />
        </button>
      </section>
    </>
  );
}
function PanelHead({
  eye,
  title,
  link,
  extra,
}: {
  eye: string;
  title: string;
  link?: string;
  extra?: React.ReactNode;
}) {
  return (
    <div className="panel-head">
      <div>
        <p className="eyebrow">{eye}</p>
        <h3>{title}</h3>
      </div>
      {extra ||
        (link && (
          <button className="link">
            {link}
            <ArrowRight />
          </button>
        ))}
    </div>
  );
}
function Professionals({
  open,
  professionals = pros,
}: {
  open: (p: Pro) => void;
  professionals?: Pro[];
}) {
  const [q, setQ] = useState("");
  const rows = useMemo(
    () =>
      professionals.filter((p) =>
        (p.name + p.id + p.city + p.service)
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [q, professionals],
  );
  return (
    <>
      <Head
        eyebrow="PROFESSIONAL INTELLIGENCE"
        title="Professionals"
        copy="Benchmark every Pro fairly, spot deterioration early, and act with evidence."
        action={
          <button className="primary">
            <Download />
            Export data
          </button>
        }
      />
      <div className="summary">
        {[
          ["2,486", "Active Pros", ""],
          ["47", "Require intervention", "redtext"],
          ["123", "On watch", "ambertext"],
          ["218", "Improving", "greentext"],
        ].map((x) => (
          <div key={x[1]}>
            <b className={x[2]}>{x[0]}</b>
            <span>{x[1]}</span>
          </div>
        ))}
      </div>
      <section className="panel">
        <div className="toolbar">
          <label className="search">
            <Search />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, Pro ID, city or service"
            />
          </label>
          <div>
            <button className="outline small">
              <MapPin />
              All cities
              <ChevronDown />
            </button>
            <button className="outline small">
              <Filter />
              Status
              <ChevronDown />
            </button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>PROFESSIONAL</th>
                <th>PRIMARY SERVICE</th>
                <th>STATUS</th>
                <th>QUALITY</th>
                <th>RATING</th>
                <th>COMPLAINTS</th>
                <th>ON-TIME</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} onClick={() => open(p)}>
                  <td>
                    <ProCell p={p} />
                  </td>
                  <td>
                    <b>{p.service}</b>
                    <small>{p.city}</small>
                  </td>
                  <td>
                    <Status s={p.status} />
                  </td>
                  <td>
                    <b className="score">{p.score}</b>
                    <Delta n={p.delta} />
                  </td>
                  <td>{p.rating}/5</td>
                  <td>{p.complaints}%</td>
                  <td>{p.onTime}%</td>
                  <td>
                    <ChevronRight />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
function Profile({
  p,
  back,
  assign,
}: {
  p: Pro;
  back: () => void;
  assign: () => void;
}) {
  return (
    <>
      <button className="back" onClick={back}>
        ← All professionals
      </button>
      <section className="profile-head">
        <div className="profile-person">
          <span style={{ background: p.color }}>{p.initials}</span>
          <div>
            <div>
              <h1>{p.name}</h1>
              <Status s={p.status} />
            </div>
            <p>
              {p.id} · {p.market}, {p.city} · 7 months tenure
            </p>
          </div>
        </div>
        <div className="actions">
          <button className="outline">View booking history</button>
          <button className="primary" onClick={assign}>
            <Zap />
            Assign intervention
          </button>
        </div>
      </section>
      <section className="profile-grid">
        <div className="panel scorecard">
          <p className="eyebrow">OVERALL QUALITY SCORE</p>
          <div className="bigscore">
            <b>{p.score}</b>
            <span>/100</span>
          </div>
          <Delta n={p.delta} />
          <p className="benchmark">
            Peer cohort median: <b>84</b>
          </p>
          {[
            ["Reliability", p.onTime],
            ["Service execution", 74],
            ["Customer experience", 81],
            ["Repeat behaviour", 68],
          ].map(([l, v]) => (
            <div className="bar" key={l as string}>
              <label>
                <span>{l}</span>
                <b>{v}</b>
              </label>
              <i>
                <em style={{ width: `${v}%` }} />
              </i>
            </div>
          ))}
        </div>
        <div className="panel explain">
          <p className="ai">
            <Sparkles />
            WHY THIS SCORE CHANGED
          </p>
          <h2>
            {p.name.split(" ")[0]}’s score fell because service execution
            weakened.
          </h2>
          {[
            [
              "badbox",
              ArrowDown,
              "3 service-quality complaints in the last 20 bookings",
              "2 mention incomplete kitchen tasks; peer benchmark is 0.8.",
            ],
            [
              "amberbox",
              ArrowDown,
              "Checklist completion fell from 96% to 84%",
              "Largest gaps are stove, sink and upper-surface checks.",
            ],
            [
              "greenbox",
              Check,
              "Punctuality remains above the peer benchmark",
              "Arrival performance is unlikely to be the primary cause.",
            ],
          ].map(([c, I, t, s]) => (
            <div className="evidence" key={t as string}>
              <span className={c as string}>
                <I />
              </span>
              <div>
                <b>{t as string}</b>
                <p>{s as string}</p>
              </div>
            </div>
          ))}
          <button className="link">
            Inspect all supporting evidence
            <ArrowRight />
          </button>
        </div>
      </section>
      <section className="detail-grid">
        <div className="panel">
          <PanelHead
            eye="BEHAVIOUR → OUTCOME"
            title="Primary issue identified"
            extra={<span className="confidence">78% confidence</span>}
          />
          <div className="path">
            {[
              ["BEHAVIOUR", "Incomplete checklist", "84% vs 94% peers"],
              ["ISSUE", "Missed kitchen tasks", "4 similar complaints"],
              ["OUTCOME", "Low repeat intent", "19% vs 28% peers"],
            ].map((x, i) => (
              <span key={x[0]}>
                <div>
                  <small>{x[0]}</small>
                  <b>{x[1]}</b>
                  <em>{x[2]}</em>
                </div>
                {i < 2 && <ArrowRight />}
              </span>
            ))}
          </div>
          <div className="note">
            <Sparkles />
            <p>
              <b>Likely root cause:</b> Kitchen task execution, specifically
              final checklist adherence. Evidence is concentrated in one service
              and consistent across four recent bookings.
            </p>
          </div>
        </div>
        <div className="panel recommendation">
          <p className="eyebrow">RECOMMENDED NEXT ACTION</p>
          <span className="rec">
            <BookOpen />
          </span>
          <h3>
            Kitchen Cleaning
            <br />
            Practical Refresher
          </h3>
          <p>20-minute module + observed assessment</p>
          <dl>
            <div>
              <dt>Priority</dt>
              <dd>High</dd>
            </div>
            <div>
              <dt>Monitor</dt>
              <dd>Next 20 bookings</dd>
            </div>
            <div>
              <dt>Expected result</dt>
              <dd>↓ complaints by 40%</dd>
            </div>
          </dl>
          <button className="primary wide" onClick={assign}>
            Assign intervention
            <ArrowRight />
          </button>
        </div>
      </section>
    </>
  );
}
function RootCause() {
  return (
    <>
      <Head
        eyebrow="ROOT CAUSE ENGINE"
        title="Don’t stop at what happened."
        copy="Translate feedback and booking evidence into operationally useful causes."
        action={
          <button className="primary">
            <Sparkles />
            Analyse new complaint
          </button>
        }
      />
      <section className="issue">
        <span>
          <AlertTriangle />
        </span>
        <div>
          <p className="eyebrow">EMERGING PATTERN</p>
          <h2>Kitchen Cleaning complaints are up 27%</h2>
          <p>
            61% of the increase is concentrated in two Gurgaon micro-markets.
          </p>
        </div>
        <button className="link">
          Investigate pattern
          <ArrowRight />
        </button>
      </section>
      <section className="rca-grid">
        <div className="panel">
          <PanelHead
            eye="COMPLAINT #CP-4921"
            title="Customer feedback"
            extra={<Status s="Critical" />}
          />
          <blockquote>
            “The kitchen wasn’t properly cleaned. The stove and upper shelves
            were left unfinished, though she arrived on time.”
          </blockquote>
          <div className="meta">
            {[
              ["PROFESSIONAL", "Priya Sharma"],
              ["SERVICE", "Kitchen Cleaning"],
              ["BOOKING", "#BK-30491"],
              ["DATE", "08 Sep, 2:30 PM"],
            ].map((x) => (
              <div key={x[0]}>
                <span>{x[0]}</span>
                <b>{x[1]}</b>
              </div>
            ))}
          </div>
          <button className="outline wide">
            View complete booking evidence
          </button>
        </div>
        <div className="panel">
          <p className="ai">
            <Sparkles />
            EXPLAINABLE DIAGNOSIS
          </p>
          <h3>Primary root cause</h3>
          <div className="diagnosis">
            <div>
              <b>Service execution</b>
              <p>Incomplete task completion</p>
            </div>
            <strong>
              78%<small>confidence</small>
            </strong>
          </div>
          <p className="eyebrow">SUPPORTING EVIDENCE</p>
          {[
            "4 similar complaints in last 30 bookings",
            "3 occurred during Kitchen Cleaning",
            "Completion time was 18% below peer median",
            "Checklist adherence was 82%",
          ].map((x, i) => (
            <div className="checkline" key={x}>
              <CircleCheck />
              {x}
              <b>{i === 2 ? "Moderate" : "Strong"}</b>
            </div>
          ))}
          <div className="note">
            <ShieldCheck />
            <p>
              <b>Punctuality ruled out as primary cause.</b>
              <br />
              Arrival was on time and no punctuality pattern exists.
            </p>
          </div>
        </div>
      </section>
      <section className="panel taxonomy">
        <PanelHead
          eye="COMPLAINT INTELLIGENCE"
          title="What customers are actually telling us"
        />
        {[
          ["Missed / incomplete task", 32, "#d76042"],
          ["Late arrival", 21, "#dda51b"],
          ["Poor communication", 14, "#738f86"],
          ["Perceived low effort", 11, "#8f8374"],
          ["Service duration", 8, "#a69d90"],
          ["Other", 14, "#c8c0b4"],
        ].map((x) => (
          <div className="taxrow" key={x[0]}>
            <b>{x[0]}</b>
            <i>
              <em style={{ width: `${x[1]}%`, background: x[2] }} />
            </i>
            <strong>{x[1]}%</strong>
          </div>
        ))}
      </section>
    </>
  );
}
function Interventions({ create }: { create: () => void }) {
  return (
    <>
      <Head
        eyebrow="INTERVENTION ENGINE"
        title="Turn insight into action."
        copy="Assign targeted coaching, track progress, and measure what changed."
        action={
          <button className="primary" onClick={create}>
            <Zap />
            Create intervention
          </button>
        }
      />
      <section className="metrics">
        <Metric
          label="ACTIVE INTERVENTIONS"
          value="64"
          change="12"
          good
          sub="assigned this week"
        />
        <Metric
          label="COMPLETION RATE"
          value="86%"
          change="4%"
          good
          sub="within deadline"
        />
        <Metric
          label="IMPROVEMENT RATE"
          value="68%"
          change="7%"
          good
          sub="materially improved"
        />
        <Metric
          label="OVERDUE"
          value="9"
          change="3"
          good={false}
          sub="need manager action"
        />
      </section>
      <section className="panel kanban-panel">
        <PanelHead eye="INTERVENTION PIPELINE" title="Active workflows" />
        <div className="kanban">
          {[
            ["ASSIGNED", 12],
            ["IN PROGRESS", 18],
            ["MONITORING", 25],
            ["OUTCOME READY", 9],
          ].map((x, c) => (
            <div className="kan-col" key={x[0]}>
              <header>
                <b>{x[0]}</b>
                <span>{x[1]}</span>
              </header>
              {["Kitchen practical refresher", "Arrival planning coaching"].map(
                (t, i) => (
                  <article key={t}>
                    <div>
                      <i className={i ? "amberdot" : "reddot"} />
                      <small>{i ? "MEDIUM" : "HIGH"}</small>
                      <MoreHorizontal />
                    </div>
                    <h3>
                      {c === 2
                        ? "Monitor next 20 bookings"
                        : c === 3
                          ? "Kitchen refresher impact"
                          : t}
                    </h3>
                    <p>
                      {i
                        ? "Sunita Devi · Sector 52"
                        : "Priya Sharma · Sector 57"}
                    </p>
                    <footer>
                      <span>
                        <Clock3 />
                        {i ? "Due 14 Sep" : "Due tomorrow"}
                      </span>
                      <b>{i ? "10 min" : "20 min"}</b>
                    </footer>
                  </article>
                ),
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
function Training() {
  let modules = [
    [
      "Kitchen Cleaning Fundamentals",
      "Task completion",
      "15 min",
      "23% complaint reduction",
    ],
    [
      "Customer Communication",
      "Customer interaction",
      "12 min",
      "9% complaint reduction",
    ],
    ["Arrival Planning", "Reliability", "10 min", "18% fewer late arrivals"],
    [
      "Bathroom Quality Checklist",
      "Service execution",
      "18 min",
      "16% complaint reduction",
    ],
  ];
  return (
    <>
      <Head
        eyebrow="TRAINING MANAGEMENT"
        title="Training library"
        copy="Connect every skill gap to a measurable operational outcome."
        action={
          <button className="primary">
            <BookOpen />
            Add training module
          </button>
        }
      />
      <section className="training">
        {modules.map((m, i) => (
          <article key={m[0]}>
            <div className="module">
              <span>0{i + 1}</span>
              <GraduationCap />
            </div>
            <div className="module-body">
              <small>{m[1]}</small>
              <h3>{m[0]}</h3>
              <p>
                <Clock3 />
                {m[2]} · Video + checklist
              </p>
              <div className="impact">
                <TrendingUp />
                <span>
                  <b>{m[3]}</b>
                  <em>measured business impact</em>
                </span>
              </div>
              <button className="outline wide">
                View module
                <ArrowRight />
              </button>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
function Outcomes() {
  let rows = [
    ["Kitchen Cleaning Refresher", "214", "93%", "−23%", "+6.2%", "Effective"],
    ["Arrival Planning Coaching", "146", "88%", "−18%", "+3.1%", "Effective"],
    ["Customer Communication", "97", "81%", "−9%", "+1.4%", "Promising"],
    ["Service Duration Nudge", "132", "76%", "−2%", "+0.3%", "Inconclusive"],
  ];
  return (
    <>
      <Head
        eyebrow="OUTCOME MEASUREMENT"
        title="Did the intervention work?"
        copy="Connect completed training to real changes in behaviour and customer outcomes."
        action={
          <button className="primary">
            <Download />
            Export impact report
          </button>
        }
      />
      <section className="outcome">
        <div>
          <p className="eyebrow">LAST 90 DAYS</p>
          <h2>68% of flagged Pros materially improved after intervention.</h2>
          <p>
            Based on 386 completed interventions and at least 20 monitored
            bookings per Pro.
          </p>
        </div>
        <strong>
          68<small>%</small>
          <span>+7 pts vs prior period</span>
        </strong>
      </section>
      <section className="panel table-panel">
        <PanelHead
          eye="INTERVENTION EFFECTIVENESS"
          title="What is changing behaviour"
        />
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>INTERVENTION</th>
                <th>PROS</th>
                <th>COMPLETION</th>
                <th>COMPLAINT CHANGE</th>
                <th>REPEAT CHANGE</th>
                <th>RESULT</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>
                  {r.slice(0, 5).map((x, i) => (
                    <td key={x}>{i === 0 ? <b>{x}</b> : x}</td>
                  ))}
                  <td>
                    <Status s={r[5] as "Effective"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
function Modal({ p, close }: { p: Pro; close: () => void }) {
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  async function assignIntervention() {
    setSaving(true);
    setError("");
    try {
      const response = await fetch(QUALITYOS_API, {
        method: "POST",
        headers: { ...apiHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          proId: p.id,
          issue: "Incomplete kitchen task execution",
          recommendation: "Kitchen Cleaning Practical Refresher",
          moduleSlug: "kitchen-checklist-reset",
          priority: "high",
          monitorBookings: 20,
          expectedOutcome: "Reduce task-completion complaints by at least 40%",
        }),
      });
      if (!response.ok) throw new Error("Could not save the intervention.");
      setDone(true);
    } catch {
      setError("Could not save right now. Please retry.");
    } finally {
      setSaving(false);
    }
  }
  return (
    <div className="modal-bg">
      <div className={`modal ${done ? "success" : ""}`}>
        <button className="x" onClick={close}>
          <X />
        </button>
        {done ? (
          <>
            <span className="successmark">
              <Check />
            </span>
            <h2>Intervention assigned</h2>
            <p>
              {p.name} has been assigned the Kitchen Cleaning Practical
              Refresher. Her manager has been notified.
            </p>
            <button className="primary wide" onClick={close}>
              Return to profile
            </button>
          </>
        ) : (
          <>
            <p className="eyebrow">ASSIGN INTERVENTION</p>
            <h2>
              Coach the behaviour,
              <br />
              then measure the outcome.
            </h2>
            <ProCell p={p} />
            <label>
              Recommended intervention
              <select>
                <option>Kitchen Cleaning Practical Refresher</option>
                <option>One-on-one coaching</option>
              </select>
            </label>
            <div className="fields">
              <label>
                Priority
                <select>
                  <option>High</option>
                  <option>Medium</option>
                </select>
              </label>
              <label>
                Due date
                <input type="date" defaultValue="2026-09-14" />
              </label>
            </div>
            <label>
              Outcome to monitor
              <select>
                <option>Task-completion complaint rate</option>
                <option>Repeat booking rate</option>
              </select>
            </label>
            <div className="note">
              <Target />
              <p>
                <b>Success threshold</b>
                <br />
                ≥40% reduction across the next 20 bookings.
              </p>
            </div>
            {error && <p role="alert">{error}</p>}
            <button
              className="primary wide"
              disabled={saving}
              onClick={assignIntervention}
            >
              {saving ? "Saving…" : "Assign & notify manager"}
              <Send />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default function Home() {
  const [active, setActive] = useState("Command Centre"),
    [selected, setSelected] = useState<Pro | null>(null),
    [modal, setModal] = useState(false),
    [mobile, setMobile] = useState(false),
    [professionals, setProfessionals] = useState<Pro[]>(pros);
  useEffect(() => {
    const controller = new AbortController();
    fetch(QUALITYOS_API, { headers: apiHeaders, signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("QualityOS API unavailable");
        return response.json();
      })
      .then((payload) => {
        const live = (payload.professionals || []).map(
          (p: Record<string, string | number>) => ({
            id: String(p.pro_id),
            name: String(p.name),
            initials: String(p.initials),
            city: String(p.city),
            market: String(p.micro_market),
            service: String(p.primary_service),
            score: Number(p.quality_score),
            delta: Number(p.score_delta),
            status: p.status as Pro["status"],
            rating: Number(p.rating),
            complaints: Number(p.complaint_rate),
            repeat: Number(p.repeat_rate),
            onTime: Number(p.on_time_rate),
            color: String(p.avatar_color),
          }),
        );
        if (live.length) setProfessionals(live);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);
  let open = (p: Pro) => {
    setSelected(p);
    setActive("Professionals");
    scrollTo(0, 0);
  };
  let content =
    active === "Professionals" ? (
      selected ? (
        <Profile
          p={selected}
          back={() => setSelected(null)}
          assign={() => setModal(true)}
        />
      ) : (
        <Professionals open={open} professionals={professionals} />
      )
    ) : active === "Root Cause" ? (
      <RootCause />
    ) : active === "Interventions" ? (
      <Interventions create={() => setModal(true)} />
    ) : active === "Training" ? (
      <Training />
    ) : active === "Outcomes" ? (
      <Outcomes />
    ) : (
      <Command open={open} rows={professionals} />
    );
  return (
    <div>
      <aside className={`sidebar ${mobile ? "open" : ""}`}>
        <div className="brand">
          <div className="mark">
            <span />
            <i />
            <b />
          </div>
          <div>
            <strong>PRONTO</strong>
            <small>QUALITY OS</small>
          </div>
          <button className="close" onClick={() => setMobile(false)}>
            <X />
          </button>
        </div>
        <nav>
          {nav.map(([n, I]) => (
            <button
              className={active === n ? "active" : ""}
              onClick={() => {
                setActive(n);
                setSelected(null);
                setMobile(false);
              }}
              key={n}
            >
              <I />
              {n}
              {n === "Interventions" && <span>17</span>}
            </button>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="principle">
            <Sparkles />
            <p>
              <b>Quality principle</b>
              <br />
              Fix systems, not just people.
            </p>
          </div>
          <button>
            <Settings />
            Settings
          </button>
          <button>
            <HelpCircle />
            Help centre
          </button>
          <div className="user">
            <span>KG</span>
            <div>
              <b>Kartikeya Gupta</b>
              <small>Central Operations</small>
            </div>
            <ChevronDown />
          </div>
        </div>
      </aside>
      {mobile && <div className="overlay" onClick={() => setMobile(false)} />}
      <main>
        <header className="top">
          <button className="menu" onClick={() => setMobile(true)}>
            <Menu />
          </button>
          <div className="crumb">
            <Home />
            <ChevronRight />
            <b>{active}</b>
            {selected && (
              <>
                <ChevronRight />
                <span>{selected.name}</span>
              </>
            )}
          </div>
          <div className="top-right">
            <label>
              <Search />
              <input placeholder="Search Pro, booking or issue…" />
              <kbd>⌘ K</kbd>
            </label>
            <button className="bell">
              <Bell />
              <i>3</i>
            </button>
            <span>
              <MapPin />
              All India
              <ChevronDown />
            </span>
          </div>
        </header>
        <div className="content">{content}</div>
      </main>
      {modal && (
        <Modal
          p={selected || professionals[0] || pros[0]}
          close={() => setModal(false)}
        />
      )}
    </div>
  );
}
