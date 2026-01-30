import { useState } from "react";
import "./styles/print.css";
import type { Resume } from "./lib/resume";
import { Builder } from "./components/Builder";
import { Preview } from "./components/Preview";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./styles/layout.css";

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

  // Optional: general accountability / re-entry statement (no details)
  additional_info_enabled: false,
  additional_info: "",
};

export default function App() {
  const [r, setR] = useState<Resume>(empty);

  return (
    <div style={{ minHeight: "100vh", background: "#f6f6f6" }}>
      <Header />

      <main style={main} className="layout">
        <div className="no-print mobile-form-second">
          <Builder resume={r} setResume={setR} onReset={() => setR(empty)} />
        </div>

        <div className="mobile-preview-first">
          <Preview r={r} />
        </div>
      </main>


      <Footer />
    </div>
  );
}

const main: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: 16,
  display: "grid",
  gridTemplateColumns: "1.1fr 0.9fr",
  gap: 16,
  alignItems: "start",
};
