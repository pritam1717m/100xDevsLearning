import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const [input,  setInput] = useState("");

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");
    newSocket.onopen = () => {
      console.log("Connection established");
      newSocket.send("Hello Server!");
    };
    newSocket.onmessage = (message) => {
      console.log("Message received:", message.data);
      setLatestMessage(message.data);
    };
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  if (!socket) {
    return <>Connecting to socket server...</>;
  }

  return (
    <>
      <input type="text" onChange={(e) => setInput(e.currentTarget.value)}/>
      <button onClick={() => {
        socket.send(input)
      }}>Send</button>
      {latestMessage}
    </>
  );
}

export default App;
