import io from "socket.io-client";
import React, { useEffect, useState } from "react";

const socket = io.connect("http://localhost:8080");

function Chat({recipientId}) {
  // const [recipientId, setRecipientId] = useState("");
  const [message, setMessage] = useState("");
  const [messageHistory, setMessageHistory] = useState([]);

  let data = localStorage.getItem("userInfo");
  let userInfo = JSON.parse(data);

  const handleSend = () => {
    if (recipientId !== "" && message !== "") {
      // If recipient ID and message are provided, initiate private chat or send message
      socket.emit("privateMessage", {
        senderId: userInfo.user.id,
        recipientId,
        message,
      });
    }
  };

  useEffect(() => {
    let data = localStorage.getItem("userInfo");
    let userInfo = JSON.parse(data);

    // Handle incoming private messages
    socket.on("privateMessage", (data) => {
      setMessageHistory((prevHistory) => [...prevHistory, data]);
    });

    // Fetch private chat history when joining or initiating a private chat
    socket.emit("privateMessageHistory", { userId: userInfo.user.id });

    socket.on("privateMessageHistory", (history) => {
      setMessageHistory(history);
    });
  }, []);

  console.log(recipientId);

  return (
    <div className="Chat">

      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={handleSend}> Send</button>
      <h1>Private Chat History:</h1>
      <div>
        {messageHistory.map((msg, index) => (
          <p key={index}>{msg.message}</p>
        ))}
      </div>
    </div>
  );
}

export default Chat;
