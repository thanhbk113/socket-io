import "./app.css";

import React, { useState } from "react";

import Card from "./components/card/Card";
import Navbar from "./components/navbar/Navbar";
import { io } from "socket.io-client";
import { posts } from "./data";
import { useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:5000"));
    console.log(socket);
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user);
  }, [socket, user]);

  return (
    <div className="container">
      {user ? (
        <>
          <Navbar socket={socket} />
          {posts.map((post) => (
            <Card key={post.id} post={post} socket={socket} user={user} />
          ))}
          <span className="username">{user}</span>
        </>
      ) : (
        <div className="login">
          <input
            type="text"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={() => setUser(username)}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
