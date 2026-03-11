import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file || !email) {
      setMessage("⚠️ Please select a file and enter an email.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    try {
      const res = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        setMessage(`❌ Error: ${text}`);
        return;
      }

      const data = await res.json();
      if (data.error) setMessage("❌ Backend error: " + data.error);
      else setMessage("✅ " + data.summary);

    } catch (err) {
      setMessage("⚠️ Fetch failed: " + err.message);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f7f7f7",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{
        maxWidth: "600px",
        width: "100%",
        padding: "30px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#333", marginBottom: "20px" }}>Sales Insight Automator</h1>

        <input 
          type="file" 
          onChange={(e) => setFile(e.target.files[0])} 
          style={{ margin: "10px 0", width: "100%" }}
        />
        <br />

        <input
          type="email"
          placeholder="Recipient Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{ 
            margin: "10px 0", 
            padding: "10px", 
            width: "100%", 
            borderRadius: "5px", 
            border: "1px solid #ccc"
          }}
        />
        <br />

        <button 
          onClick={handleUpload} 
          style={{ 
            marginTop: "10px", 
            padding: "12px 25px", 
            backgroundColor: "#4CAF50", 
            color: "#fff", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          Upload & Generate
        </button>

        <pre style={{
          marginTop: "20px",
          textAlign: "left",
          whiteSpace: "pre-wrap",
          backgroundColor: "#f1f1f1",
          padding: "15px",
          borderRadius: "5px",
          maxHeight: "300px",
          overflowY: "auto",
          color: message.startsWith("❌") ? "red" : message.startsWith("⚠️") ? "#b36b00" : "green"
        }}>
          {message}
        </pre>
      </div>
    </div>
  );
}

export default App;