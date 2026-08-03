import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getMessage() {
      const response = await fetch("http://localhost:5000/api");
      const data = await response.json();
      setMessage(data.message);
    }

    getMessage();
  }, []);

  return (
    <div>
      <h1>BharatAssist AI</h1>
      <h2>{message}</h2>
    </div>
  );
}

export default App;
