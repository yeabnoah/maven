import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3000");
function App() {
  const [mess, setMess] = useState<string>();
  const [chat, setChat] = useState<string[]>([]);

  useEffect(() => {
    socket.on("msg", (message) => {
      console.log(message);
    });

    socket.on("message", (message) => {
      setChat([...chat, message]);
    });
  }, [chat, mess, setChat, setMess]);

  const handleSubmit = () => {
    socket.emit("cli", mess);
    console.log(mess);
  };

  return (
    <>
      <div>
        <input
          onChange={(e) => {
            setMess(e.target.value);
          }}
        />
        <button onClick={handleSubmit}>send</button>
      </div>
      <div>
        {chat.map((each, index) => {
          <h1 key={index}>{each}</h1>;
        })}
      </div>
    </>
  );
}

export default App;
