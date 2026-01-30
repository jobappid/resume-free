import { useState } from "react";
import "./styles/print.css";
import type { Resume } from "./lib/resume";
import { Builder } from "./components/Builder";
import { Preview } from "./components/Preview";

const empty: Resume = {
  template: "classic",
  name: "",
  phone: "",
  email: "",
  location: "",
  headline: "",
  summary: "",
  skills: [],
  experience: [{ company: "", title: "", start: "", end: "", bullets: [""] }],
  education: [{ school: "", degree: "", year: "" }],
  additional_info_enabled: false,
  additional_info: "",
};

export default function App() {
  const [r, setR] = useState<Resume>(empty);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 16, padding: 16, alignItems: "start" }}>
      <div className="no-print">
        <Builder resume={r} setResume={setR} onReset={() => setR(empty)} />
      </div>
      <div>
        <Preview r={r} />
      </div>
    </div>
  );
}
