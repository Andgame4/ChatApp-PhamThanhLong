import React, { useEffect, useState, useRef } from "react";
import ChatFooter from "./ChatFooter";
const ChatSingle = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      console.log("messageResponse:", data);
      setMessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    socket.on("newUserResponse", (data) => setUsers(data));
  }, [socket, users]);

  const handleUserName = (userName) => {
    setUserName(userName);
  };

  return (
    <div className="chat">
      <div className="chat__sidebar">
        <div>
          <h4 className="chat__header">ACTIVE USERS</h4>
          <div className="chat__users">
            {users.map((user) => (
              <p
                key={user.socketID}
                onClick={() => handleUserName(user.userName)}
              >
                {user.userName}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className="chat__main">
        <header className="chat__mainHeader">
          <p>{userName}</p>
        </header>
        <div className="message__container">
          {messages.map((message) =>
            message.name === localStorage.getItem("userName") ? (
              <div className="message__chats" key={message.id}>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </div>
            ) : (
              <div className="message__chats" key={message.id}>
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{message.text}</p>
                </div>
              </div>
            )
          )}

          <div className="message__status">
            <p>{typingStatus}</p>
          </div>
          <div ref={lastMessageRef} />
        </div>
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatSingle;
