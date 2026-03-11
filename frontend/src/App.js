import { useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("email", email);

    const res = await fetch("http://127.0.0.1:8000/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMessage(data.summary);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Sales Insight Automator</h1>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <input
        type="email"
        placeholder="Recipient Email"
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
      <button onClick={handleUpload} style={{ marginLeft: "10px" }}>
        Upload & Generate
      </button>
      <pre style={{ marginTop: "20px" }}>{message}</pre>
    </div>
  );
}

export default App;