// src/LoginPage.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
`;

const LoginForm = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const Logo = styled.div`
  font-size: 40px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: linear-gradient(to right, #6a11cb, #2575fc);
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
`;

const LoginPage = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  //handle login
  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "https://billing-application-mern.onrender.com/api/v1/admin/login",
        { email, password }
      );
      if (data.success) {
        alert(data.message);
        navigate("/admin-dashboard");
        sessionStorage.setItem("admin", data);
      } else {
        alert("Only admin can login");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Container>
      <LoginForm>
        {/* <Logo>A</Logo> */}
        <Title>Welcome Admin</Title>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          value={email}
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          value={password}
        />
        <Button onClick={handleLogin}>LOGIN</Button>
      </LoginForm>
    </Container>
  );
};

export default LoginPage;
