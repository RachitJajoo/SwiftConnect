import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";
import Logout from "./Logout";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const adduser= async() =>{
        setUserName(
        await JSON.parse(
            localStorage.getItem("chat-app-user")
        ).username
        );
    }
    adduser();
  }, []);
  return (
    <Container>
        <div className="chat-header"><Logout /></div>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
.chat-header {
  display: flex;
  margin-left :auto;
  padding-right : 4rem;
}
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;