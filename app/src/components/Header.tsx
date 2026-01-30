export default function Header() {
  return (
    <header style={wrap} className="no-print">
      <div style={inner}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
  src="/JobAppID-Logo.png"
  alt="JobAppID"
  style={{
    height: 150,          // ← bigger logo
    width: "auto",
    display: "block",
    maxWidth: "100%",
  }}
/>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, lineHeight: 1.1 }}>
              Free Resume Builder
            </div>
            <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>
              Simple step-by-step questions • Download as PDF
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12, opacity: 0.75 }}>
          Powered by <b>JobAppID</b>
        </div>
      </div>
    </header>
  );
}

const wrap: React.CSSProperties = {
  borderBottom: "1px solid #eaeaea",
  background: "white",
};

const inner: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "10px 10px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 16,
  flexWrap: "wrap",
};
