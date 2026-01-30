export default function Footer() {
  return (
    <footer className="no-print" style={wrap}>
      <div style={inner}>
        <div style={{ fontSize: 12, opacity: 0.75 }}>
          Powered by <b>JobAppID</b>
        </div>
      </div>
    </footer>
  );
}

const wrap: React.CSSProperties = {
  borderTop: "1px solid #eaeaea",
  background: "white",
  marginTop: 16,
};

const inner: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: "10px 16px",
};
