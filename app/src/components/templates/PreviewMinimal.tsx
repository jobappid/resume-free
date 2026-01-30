import type { Resume } from "../../lib/resume";

export function PreviewMinimal({ r }: { r: Resume }) {
  return (
    <div className="page" style={{ background: "white", borderRadius: 8, fontSize: 13 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 14 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>{r.name}</div>
          {r.headline ? <div style={{ marginTop: 2, fontWeight: 600 }}>{r.headline}</div> : null}
        </div>
        <div style={{ textAlign: "right", fontSize: 12, lineHeight: 1.35 }}>
          <div>{r.location}</div>
          <div>{r.phone}</div>
          <div>{r.email}</div>
        </div>
      </div>

      <Rule />
      <Row title="Summary"><div>{r.summary}</div></Row>
      <Row title="Skills"><div>{r.skills.join(", ")}</div></Row>

      <Row title="Experience">
        {r.experience.map((e, idx) => (
          <div key={idx} style={{ marginTop: idx ? 10 : 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
              <div style={{ fontWeight: 700 }}>{e.title} — {e.company}</div>
              <div style={{ fontSize: 12 }}>{joinDash([e.start, e.end])}</div>
            </div>
            {e.location ? <div style={{ fontSize: 12, opacity: 0.9 }}>{e.location}</div> : null}
            <ul style={{ margin: "6px 0 0", paddingLeft: 18 }}>
              {e.bullets.filter(Boolean).map((b, i) => <li key={i} style={{ marginTop: 4 }}>{b}</li>)}
            </ul>
          </div>
        ))}
      </Row>

      <Row title="Education">
        {r.education.map((ed, idx) => (
          <div key={idx} style={{ marginTop: idx ? 8 : 0 }}>
            <div style={{ fontWeight: 700 }}>{ed.school}</div>
            <div style={{ fontSize: 12 }}>{ed.degree}{ed.year ? ` · ${ed.year}` : ""}</div>
          </div>
        ))}
      {r.additional_info_enabled && r.additional_info.trim() ? (
        <Row title="Additional Information">
          <div>{r.additional_info}</div>
        </Row>
      ) : null}

      </Row>
    </div>
  );
}

function Rule() { return <div style={{ marginTop: 10, borderTop: "1px solid #000" }} />; }
function Row({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ fontWeight: 800, textTransform: "uppercase", fontSize: 11, letterSpacing: 0.8 }}>{title}</div>
      <div style={{ marginTop: 6 }}>{children}</div>
    </div>
  );
}
function joinDash(parts: string[]) { return parts.map(s => String(s||"").trim()).filter(Boolean).join(" – "); }
