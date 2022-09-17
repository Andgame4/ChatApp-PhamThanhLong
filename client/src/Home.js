import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleSubmitGroup = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chat");
  };
  const handleSubmitChat = (e) => {
    e.preventDefault();
    localStorage.setItem("userName", userName);
    socket.emit("newUser", { userName, socketID: socket.id });
    navigate("/chatSingle");
  };
  return (
    <form className="home__container">
      <h2 className="home__header">Wellcome to APP CHAT</h2>
      <label htmlFor="username">UserName</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <div className="home__buttons">
        <button className="home__cta" onClick={handleSubmitGroup}>
          SIGN IN CHAT GROUP
        </button>
        <button className="home__cta" onClick={handleSubmitChat}>
          SIGN IN CHAT
        </button>
      </div>
    </form>
  );
};

export default Home;
