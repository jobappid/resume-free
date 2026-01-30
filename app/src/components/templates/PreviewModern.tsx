import type { Resume } from "../../lib/resume";

export function PreviewModern({ r }: { r: Resume }) {
  return (
    <div className="page" style={{ background: "white", borderRadius: 8 }}>
      <div style={{ borderBottom: "2px solid #000", paddingBottom: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "baseline" }}>
          <div>
            <h1 style={{ margin: 0 }}>{r.name}</h1>
            {r.headline ? <div style={{ marginTop: 4, fontWeight: 600 }}>{r.headline}</div> : null}
          </div>
          <div style={{ textAlign: "right", fontSize: 12, lineHeight: 1.4 }}>
            <div>{r.location}</div>
            <div>{r.phone}</div>
            <div>{r.email}</div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1.35fr 0.65fr", gap: 16 }}>
        <div>
          <H3>Summary</H3>
          <p style={{ marginTop: 6 }}>{r.summary}</p>

          <H3>Experience</H3>
          {r.experience.map((e, idx) => (
            <div key={idx} style={{ marginTop: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                <strong>{e.title} — {e.company}</strong>
                <span style={{ fontSize: 12 }}>{joinDash([e.start, e.end])}</span>
              </div>
              {e.location ? <div style={{ fontSize: 12, opacity: 0.9 }}>{e.location}</div> : null}
              <ul style={{ marginTop: 6 }}>
                {e.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}

          <H3>Education</H3>
          {r.education.map((ed, idx) => (
            <div key={idx} style={{ marginTop: 6 }}>
              <strong>{ed.school}</strong>
              <div style={{ fontSize: 12 }}>{ed.degree}{ed.year ? ` · ${ed.year}` : ""}</div>
            </div>
          ))}
          {r.additional_info_enabled && r.additional_info.trim() ? (
            <>
              <H3>Additional Information</H3>
              <p style={{ marginTop: 6 }}>{r.additional_info}</p>
            </>
          ) : null}

        </div>

        <div>
          <H3>Skills</H3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {r.skills.map((s) => (
              <span key={s} style={{ border: "1px solid #000", borderRadius: 999, padding: "4px 8px", fontSize: 12 }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <div style={{ marginTop: 14, fontWeight: 800, letterSpacing: 0.2 }}>{children}</div>;
}
function joinDash(parts: string[]) { return parts.map(s => String(s||"").trim()).filter(Boolean).join(" – "); }
