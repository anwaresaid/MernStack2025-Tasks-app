import React from "react";
import { Button, Input, Space, Typography, message } from "antd";
import { useNavigate } from "react-router";
import { HttpClient } from "../helpers";
function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const [error, setError] = React.useState(null);
  const onRegister = () => {
    HttpClient.post("/api/register", { username, password })
      .then((res) => {
        if (res.data) {
          success();
          setTimeout(() => {
            navigate("/auth/sign-in");
          }, 3000);
          console.log(res.data);
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const onUserChange = (e) => {
    setUsername(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const backToLogin = () => {
    navigate("/auth/sign-in");
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Registration was successful, please login",
    });
  };
  return (
    <Space direction="vertical">
      <Typography.Title level={5}>User Name</Typography.Title>
      {contextHolder}

      <Input
        size="large"
        placeholder="input name"
        value={username}
        onChange={onUserChange}
      />
      <Typography.Title level={5} className="mt-6">
        Password
      </Typography.Title>
      <Input.Password
        size="large"
        placeholder="input password"
        value={password}
        onChange={onPasswordChange}
      />
      {error && <Typography.Text type="danger">{error}</Typography.Text>}
      <div className="flex flex-row w-full justify-between mt-6">
        <Button className="float-right" onClick={() => backToLogin()}>
          Back to login
        </Button>
        <Button className="float-right" onClick={() => onRegister()}>
          Register
        </Button>
      </div>
    </Space>
  );
}

export default SignUp;
