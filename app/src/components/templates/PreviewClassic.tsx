import type { Resume } from "../../lib/resume";

export function PreviewClassic({ r }: { r: Resume }) {
  return (
    <div className="page" style={{ background: "white", borderRadius: 8 }}>
      <h1 style={{ margin: 0 }}>{r.name}</h1>
      {r.headline ? <div style={{ marginTop: 4, fontWeight: 600 }}>{r.headline}</div> : null}
      <div style={{ marginTop: 6 }}>{joinDot([r.location, r.phone, r.email])}</div>

      <Section title="Summary">
        <p style={{ margin: "6px 0 0" }}>{r.summary}</p>
      </Section>

      <Section title="Skills">
        <p style={{ margin: "6px 0 0" }}>{r.skills.join(" · ")}</p>
      </Section>

      <Section title="Experience">
        {r.experience.map((e, idx) => (
          <div key={idx} style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <strong>{e.title} — {e.company}</strong>
              <span>{joinDash([e.start, e.end])}</span>
            </div>
            {e.location ? <div>{e.location}</div> : null}
            <ul style={{ marginTop: 6 }}>
              {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      <Section title="Education">
        {r.education.map((ed, idx) => (
          <div key={idx} style={{ marginTop: 6 }}>
            <strong>{ed.school}</strong> — {ed.degree}{ed.year ? ` (${ed.year})` : ""}
          </div>
        ))}
      </Section>
      {r.additional_info_enabled && r.additional_info.trim() ? (
        <Section title="Additional Information">
          <p style={{ margin: "6px 0 0" }}>{r.additional_info}</p>
        </Section>
      ) : null}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 14 }}>
      <h2 style={{ margin: 0 }}>{title}</h2>
      {children}
    </div>
  );
}
function joinDot(parts: string[]) { return parts.map(s => String(s||"").trim()).filter(Boolean).join(" · "); }
function joinDash(parts: string[]) { return parts.map(s => String(s||"").trim()).filter(Boolean).join(" – "); }
