import React, { useState, useContext } from "react";
import { Button, Input, Space, Typography } from "antd";
import { useNavigate } from "react-router";
import { HttpClient } from "../helpers";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { login } = useContext(AuthContext);

  const onLogin = () => {
    HttpClient.post("/api/login", { username, password }).then((res) => {
      if (res.data) {
        console.log(res.data);
        login(res.data.token);
        localStorage.setItem("__AUTH_KEY__", JSON.stringify(res.data.token));
        navigate("/landing");
      }
    });
    // navigate("/landing");
  };
  const onSignup = () => {
    navigate("/auth/sign-up");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  return (
    <Space direction="vertical">
      <Typography.Title level={5}>User Name</Typography.Title>
      <Input
        size="large"
        placeholder="input name"
        value={username}
        onChange={handleUsernameChange}
      />
      <Typography.Title level={5} className="mt-6">
        Password
      </Typography.Title>

      <Input.Password
        size="large"
        placeholder="input password"
        value={password}
        onChange={handlePasswordChange}
      />
      <div className="flex flex-row w-full justify-between">
        <a className="opacity-75 text-sm" onClick={onSignup}>
          no account ? please click here to signup
        </a>
        <Button className="float-right" onClick={onLogin}>
          Login
        </Button>
      </div>
    </Space>
  );
}

export default Login;
