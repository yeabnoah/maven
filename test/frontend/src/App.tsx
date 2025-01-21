import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000");

function App() {
  const [mess, setMess] = useState<string>("");
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on("msg", (message) => {
      console.log(message);
    });

    socket.on("message", (message) => {
      const ms = JSON.parse(message);
      setChat((prevChat) => [...prevChat, ...ms]);
    });

    return () => {
      socket.off("msg");
      socket.off("message");
    };
  }, []);

  const handleSubmit = () => {
    if (mess.trim()) {
      socket.emit("cli", mess);
      setMess("");
    }
  };

  return (
    <>
      <div>
        <input
          value={mess}
          onChange={(e) => setMess(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
      <div id="chat" style={{ maxHeight: "300px", overflowY: "auto" }}>
        {chat.map((each, index) => (
          <div key={index}>{each}</div>
        ))}
      </div>
    </>
  );
}

export default App;
