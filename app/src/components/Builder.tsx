import { useMemo, useState } from "react";
import type { Resume, TemplateId } from "../lib/resume";

type Step = "basics" | "summary" | "experience" | "education" | "skills" | "review";

export function Builder({
  resume,
  setResume,
  onReset,
}: {
  resume: Resume;
  setResume: (r: Resume) => void;
  onReset: () => void;
}) {
  const steps: Step[] = ["basics", "summary", "experience", "education", "skills", "review"];
  const [step, setStep] = useState<Step>("basics");

  const stepIndex = steps.indexOf(step);

  const canGoNext = useMemo(() => {
    switch (step) {
      case "basics":
        return resume.name.trim().length > 0;
      case "summary":
        return resume.summary.trim().length > 0;
      case "experience":
        return resume.experience.length > 0 && resume.experience[0].company.trim().length > 0;
      case "education":
        return true;
      case "skills":
        return true;
      case "review":
        return true;
      default:
        return false;
    }
  }, [step, resume]);

  function next() {
    if (!canGoNext) return;
    setStep(steps[Math.min(stepIndex + 1, steps.length - 1)]);
  }
  function back() {
    setStep(steps[Math.max(stepIndex - 1, 0)]);
  }

  return (
    <div style={card}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 14, opacity: 0.7 }}>
            Step {stepIndex + 1} of {steps.length}
          </div>
          <h2 style={{ margin: "6px 0 0" }}>{titleFor(step)}</h2>
        </div>
        <button onClick={onReset} style={btnSecondary}>Reset</button>
      </div>

      <ProgressBar value={(stepIndex + 1) / steps.length} />

      <div style={{ marginTop: 14 }}>
        {step === "basics" && <StepBasics resume={resume} setResume={setResume} />}
        {step === "summary" && <StepSummary resume={resume} setResume={setResume} />}
        {step === "experience" && <StepExperience resume={resume} setResume={setResume} />}
        {step === "education" && <StepEducation resume={resume} setResume={setResume} />}
        {step === "skills" && <StepSkills resume={resume} setResume={setResume} />}
        {step === "review" && <StepReview resume={resume} setResume={setResume} />}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16, gap: 10 }}>
        <button onClick={back} disabled={stepIndex === 0} style={btnSecondary}>Back</button>

        {step === "review" ? (
          <button
            onClick={() => window.print()}
            disabled={resume.name.trim().length === 0}
            style={btnPrimary}
            title={resume.name.trim().length === 0 ? "Add your name first" : "Download PDF"}
          >
            Download PDF
          </button>
        ) : (
          <button onClick={next} disabled={!canGoNext} style={btnPrimary}>Next</button>
        )}
      </div>

      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
        Tip: In the Review step, click <b>Download PDF</b> and choose “Save as PDF”.
      </div>
    </div>
  );
}

/* ---------------- Steps ---------------- */

function StepBasics({ resume, setResume }: { resume: Resume; setResume: (r: Resume) => void }) {
  return (
    <div style={grid2}>
      <Field label="What is your full name?" required>
        <input style={input} value={resume.name} onChange={(e) => setResume({ ...resume, name: e.target.value })} placeholder="John Doe" />
      </Field>

      <Field label="What city/state are you in? (example: Peoria, IL)">
        <input style={input} value={resume.location} onChange={(e) => setResume({ ...resume, location: e.target.value })} placeholder="Peoria, IL" />
      </Field>

      <Field label="What is your phone number?">
        <input style={input} value={resume.phone} onChange={(e) => setResume({ ...resume, phone: e.target.value })} placeholder="(309) 555-1234" />
      </Field>

      <Field label="What is your email address?">
        <input style={input} value={resume.email} onChange={(e) => setResume({ ...resume, email: e.target.value })} placeholder="you@email.com" />
      </Field>

      <Field label="What is your headline? (optional)" full>
        <input
          style={input}
          value={resume.headline}
          onChange={(e) => setResume({ ...resume, headline: e.target.value })}
          placeholder="Warehouse Associate | Forklift | Inventory"
        />
      </Field>
    </div>
  );
}

function StepSummary({ resume, setResume }: { resume: Resume; setResume: (r: Resume) => void }) {
  const [years, setYears] = useState("");
  const [strengths, setStrengths] = useState("");
  const [traits, setTraits] = useState("");
  const [focus, setFocus] = useState("");

  function buildSummary() {
    const yrs = String(years || "").trim();
    const yrText = yrs ? `${yrs} year${yrs === "1" ? "" : "s"}` : "";

    const parts: string[] = [];

    // General + universal opening
    parts.push(
      `${yrText ? yrText + " " : ""}Reliable professional with a strong focus on results, teamwork, and customer satisfaction.`
    );

    // Transferable strengths
    if (strengths.trim()) parts.push(`Strengths include ${strengths.trim()}.`);

    // Work style / character
    if (traits.trim()) parts.push(`Known for being ${traits.trim()}.`);

    // What they bring to any role
    if (focus.trim()) parts.push(`Focused on ${focus.trim()}.`);

    setResume({ ...resume, summary: parts.join(" ") });
  }

  return (
    <div>
      <div style={subnote}>
        This creates a <b>general resume summary</b> that works for almost any job. You can edit it after.
      </div>

      <Field label="How many years of work experience do you have? (optional)">
        <input
          style={input}
          value={years}
          onChange={(e) => setYears(e.target.value)}
          placeholder="Example: 3"
        />
      </Field>

      <Field label="What are your strengths? (example: communication, reliability, problem-solving)" required>
        <input
          style={input}
          value={strengths}
          onChange={(e) => setStrengths(e.target.value)}
          placeholder="Comma-separated is fine"
        />
      </Field>

      <Field label="How would people describe you? (example: dependable, fast learner, punctual)" required>
        <input
          style={input}
          value={traits}
          onChange={(e) => setTraits(e.target.value)}
          placeholder="Comma-separated is fine"
        />
      </Field>

      <Field label="What do you want to be known for at work? (example: accuracy, safety, helping customers)" required>
        <input
          style={input}
          value={focus}
          onChange={(e) => setFocus(e.target.value)}
          placeholder="Short phrase"
        />
      </Field>

      <button onClick={buildSummary} style={btnPrimary}>
        Create my summary
      </button>

      <Field label="Your Summary (edit if you want)" full>
        <textarea
          style={textarea}
          rows={5}
          value={resume.summary}
          onChange={(e) => setResume({ ...resume, summary: e.target.value })}
          placeholder="Your summary will appear here."
        />
      </Field>
            <div style={{ ...subnote, marginTop: 12 }}>
        <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={resume.additional_info_enabled}
            onChange={(e) =>
              setResume({ ...resume, additional_info_enabled: e.target.checked })
            }
          />
          <b>Include an “Additional Information” statement</b> (optional)
        </label>

        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.8 }}>
          Keep it general: reliability, accountability, growth, commitment to work. Do not list charges or dates.
        </div>

        {resume.additional_info_enabled ? (
          <div style={{ marginTop: 10 }}>
            <textarea
              style={textarea}
              rows={4}
              value={resume.additional_info}
              onChange={(e) =>
                setResume({ ...resume, additional_info: e.target.value })
              }
              placeholder="Example: Reliable and motivated worker committed to accountability, growth, and long-term employment."
            />
          </div>
        ) : null}
      </div>

    </div>
  );
}

function StepExperience({ resume, setResume }: { resume: Resume; setResume: (r: Resume) => void }) {
  const exps = resume.experience;

  function updateExp(i: number, patch: Partial<(typeof exps)[number]>) {
    const next = exps.map((e, idx) => (idx === i ? { ...e, ...patch } : e));
    setResume({ ...resume, experience: next });
  }

  function updateBullet(i: number, bi: number, value: string) {
    const e = exps[i];
    const bullets = e.bullets.map((b, idx) => (idx === bi ? value : b));
    updateExp(i, { bullets });
  }

  function addExp() {
    setResume({ ...resume, experience: [...exps, { company: "", title: "", start: "", end: "", bullets: [""] }] });
  }

  function removeExp(i: number) {
    const next = exps.filter((_, idx) => idx !== i);
    setResume({
      ...resume,
      experience: next.length ? next : [{ company: "", title: "", start: "", end: "", bullets: [""] }],
    });
  }

  function addBullet(i: number) {
    const e = exps[i];
    updateExp(i, { bullets: [...e.bullets, ""] });
  }

  function removeBullet(i: number, bi: number) {
    const e = exps[i];
    const nextBullets = e.bullets.filter((_, idx) => idx !== bi);
    updateExp(i, { bullets: nextBullets.length ? nextBullets : [""] });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={subnote}>
        For each job, add 3–6 bullet points. Keep them short. If you have numbers (speed, accuracy, savings), include them.
      </div>

      {exps.map((e, i) => (
        <div key={i} style={subcard}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
            <h3 style={{ margin: 0 }}>Job #{i + 1}</h3>
            <button onClick={() => removeExp(i)} style={btnDanger}>Remove</button>
          </div>

          <div style={grid2}>
            <Field label="Company name" required>
              <input style={input} value={e.company} onChange={(ev) => updateExp(i, { company: ev.target.value })} placeholder="Company Name" />
            </Field>

            <Field label="Job title" required>
              <input style={input} value={e.title} onChange={(ev) => updateExp(i, { title: ev.target.value })} placeholder="Job Title" />
            </Field>

            <Field label="Start date (example: Jan 2024)">
              <input style={input} value={e.start} onChange={(ev) => updateExp(i, { start: ev.target.value })} placeholder="Jan 2024" />
            </Field>

            <Field label="End date (example: Present)">
              <input style={input} value={e.end} onChange={(ev) => updateExp(i, { end: ev.target.value })} placeholder="Present" />
            </Field>

            <Field label="Work location (optional)" full>
              <input style={input} value={e.location ?? ""} onChange={(ev) => updateExp(i, { location: ev.target.value })} placeholder="Peoria, IL" />
            </Field>
          </div>

          <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>
            Answer these (short is fine):
            <ul style={{ marginTop: 6 }}>
              <li>What did you do daily?</li>
              <li>What tools/machines/software did you use?</li>
              <li>Did you improve something or hit a goal? (speed, accuracy, safety, sales, etc.)</li>
            </ul>
          </div>

          <div style={{ marginTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Bullet Points</strong>
              <button onClick={() => addBullet(i)} style={btnSecondary}>+ Add bullet</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
              {e.bullets.map((b, bi) => (
                <div key={bi} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <textarea
                    style={{ ...textarea, margin: 0 }}
                    rows={2}
                    value={b}
                    onChange={(ev) => updateBullet(i, bi, ev.target.value)}
                    placeholder="Example: Picked 150+ orders/day with 99% accuracy using RF scanner."
                  />
                  <button onClick={() => removeBullet(i, bi)} style={btnDanger} title="Remove bullet">✕</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <button onClick={addExp} style={btnSecondary}>+ Add another job</button>
    </div>
  );
}

function StepEducation({ resume, setResume }: { resume: Resume; setResume: (r: Resume) => void }) {
  const ed = resume.education;

  function updateEd(i: number, patch: Partial<(typeof ed)[number]>) {
    setResume({ ...resume, education: ed.map((e, idx) => (idx === i ? { ...e, ...patch } : e)) });
  }

  function addEd() {
    setResume({ ...resume, education: [...ed, { school: "", degree: "", year: "" }] });
  }

  function removeEd(i: number) {
    const next = ed.filter((_, idx) => idx !== i);
    setResume({ ...resume, education: next.length ? next : [{ school: "", degree: "", year: "" }] });
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={subnote}>
        Add your most recent education first. If you don’t have one, you can leave it blank.
      </div>

      {ed.map((e, i) => (
        <div key={i} style={subcard}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
            <h3 style={{ margin: 0 }}>Education #{i + 1}</h3>
            <button onClick={() => removeEd(i)} style={btnDanger}>Remove</button>
          </div>

          <div style={grid2}>
            <Field label="School name">
              <input style={input} value={e.school} onChange={(ev) => updateEd(i, { school: ev.target.value })} placeholder="School Name" />
            </Field>
            <Field label="Degree / Program">
              <input style={input} value={e.degree} onChange={(ev) => updateEd(i, { degree: ev.target.value })} placeholder="Degree / Program" />
            </Field>
            <Field label="Year (optional)" full>
              <input style={input} value={e.year ?? ""} onChange={(ev) => updateEd(i, { year: ev.target.value })} placeholder="2023" />
            </Field>
          </div>
        </div>
      ))}

      <button onClick={addEd} style={btnSecondary}>+ Add another education</button>
    </div>
  );
}

function StepSkills({ resume, setResume }: { resume: Resume; setResume: (r: Resume) => void }) {
  const [draft, setDraft] = useState("");

  function addSkill(s: string) {
    const skill = s.trim();
    if (!skill) return;
    if (resume.skills.map((x) => x.toLowerCase()).includes(skill.toLowerCase())) return;
    setResume({ ...resume, skills: [...resume.skills, skill] });
  }

  function removeSkill(skill: string) {
    setResume({ ...resume, skills: resume.skills.filter((s) => s !== skill) });
  }

  function onAdd() {
    draft.split(",").map((x) => x.trim()).filter(Boolean).forEach(addSkill);
    setDraft("");
  }

  return (
    <div>
      <div style={subnote}>
        Add skills that match the job you want. You can add multiple skills at once using commas.
      </div>

      <Field label="Enter skills (comma-separated)">
        <div style={{ display: "flex", gap: 8 }}>
          <input style={input} value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Forklift, Inventory, Customer Service" />
          <button onClick={onAdd} style={btnSecondary}>Add</button>
        </div>
      </Field>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
        {resume.skills.map((s) => (
          <span key={s} style={chip}>
            {s}
            <button onClick={() => removeSkill(s)} style={chipX} aria-label={`remove ${s}`}>✕</button>
          </span>
        ))}
      </div>
    </div>
  );
}

function StepReview({ resume, setResume }: { resume: Resume; setResume: (r: Resume) => void }) {
  const templates: { id: TemplateId; name: string; desc: string }[] = [
    { id: "classic", name: "Classic", desc: "ATS-safe, standard layout" },
    { id: "modern", name: "Modern", desc: "Header + skill chips" },
    { id: "minimal", name: "Minimal", desc: "Tight, clean typography" },
  ];

  return (
    <div style={{ lineHeight: 1.5 }}>
      <div style={subcard}>
        <div style={{ marginBottom: 8 }}><b>Choose a template</b></div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setResume({ ...resume, template: t.id })}
              style={{
                ...btnSecondary,
                border: resume.template === t.id ? "2px solid #111" : "1px solid #ddd",
                fontWeight: resume.template === t.id ? 700 : 400,
              }}
              title={t.desc}
            >
              {t.name}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 6 }}>
          Selected: <b>{templates.find((x) => x.id === resume.template)?.name}</b>
        </div>
      </div>

      <div style={subcard}>
        <div><b>Name:</b> {resume.name || "—"}</div>
        <div><b>Location:</b> {resume.location || "—"}</div>
        <div><b>Phone:</b> {resume.phone || "—"}</div>
        <div><b>Email:</b> {resume.email || "—"}</div>
      </div>

      <div style={subcard}>
        <div style={{ marginBottom: 6 }}><b>Summary</b></div>
        <div>{resume.summary || "—"}</div>
      </div>

      <div style={subcard}>
        <div style={{ marginBottom: 6 }}><b>Skills</b></div>
        <div>{resume.skills.length ? resume.skills.join(" · ") : "—"}</div>
      </div>

      <div style={subcard}>
        <div style={{ marginBottom: 6 }}><b>Experience</b></div>
        {resume.experience.map((e, i) => (
          <div key={i} style={{ marginTop: i ? 10 : 0 }}>
            <div><b>{e.title || "Job Title"} — {e.company || "Company"}</b></div>
            <div style={{ opacity: 0.8 }}>{(e.start || "Start")} – {(e.end || "End")}</div>
            <ul style={{ marginTop: 6 }}>
              {e.bullets.filter(Boolean).length ? e.bullets.filter(Boolean).map((b, bi) => <li key={bi}>{b}</li>) : <li>—</li>}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, opacity: 0.7 }}>
        If the preview looks good on the right, click <b>Download PDF</b>.
      </div>
    </div>
  );
}

/* ---------------- UI Helpers ---------------- */

function titleFor(step: Step) {
  switch (step) {
    case "basics": return "Basics";
    case "summary": return "Summary (simple questions)";
    case "experience": return "Work Experience";
    case "education": return "Education";
    case "skills": return "Skills";
    case "review": return "Review & Download";
  }
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ height: 8, background: "#e8e8e8", borderRadius: 999 }}>
        <div style={{ height: 8, width: `${Math.round(value * 100)}%`, background: "#111", borderRadius: 999 }} />
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  required,
  full,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, gridColumn: full ? "1 / -1" : undefined }}>
      <div style={{ fontSize: 13, opacity: 0.85 }}>
        {label} {required ? <span style={{ color: "crimson" }}>*</span> : null}
      </div>
      {children}
    </div>
  );
}

/* ---------------- Styles ---------------- */

const card: React.CSSProperties = {
  border: "1px solid #e6e6e6",
  borderRadius: 12,
  padding: 16,
  background: "white",
};

const subcard: React.CSSProperties = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 12,
  background: "#fafafa",
};

const subnote: React.CSSProperties = {
  border: "1px dashed #ddd",
  borderRadius: 12,
  padding: 12,
  background: "#fff",
  marginBottom: 12,
  fontSize: 13,
  opacity: 0.9,
};

const grid2: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const input: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
};

const textarea: React.CSSProperties = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
  resize: "vertical",
};

const btnPrimary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #111",
  background: "#111",
  color: "white",
  cursor: "pointer",
};

const btnSecondary: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "white",
  cursor: "pointer",
};

const btnDanger: React.CSSProperties = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #f2c6c6",
  background: "#fff5f5",
  cursor: "pointer",
};

const chip: React.CSSProperties = {
  display: "inline-flex",
  gap: 8,
  alignItems: "center",
  padding: "8px 10px",
  borderRadius: 999,
  border: "1px solid #ddd",
  background: "white",
  fontSize: 13,
};

const chipX: React.CSSProperties = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: 12,
  opacity: 0.7,
};
