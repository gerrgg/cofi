import styled from "styled-components";
import { useState } from "react";
import Input from "./Input";
import { useEffect } from "react";
import loginService from "../services/login";
import userService from "../services/user";

const Root = styled.div`
  width: 600px;
  height: auto;
  padding: 3rem 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid lightgreen;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  z-index: 1;
  cursor: auto;
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 8px;
  border: 1px solid lightgreen;
  padding: 12px;
  max-width: 50%;
  width: 100%;
  cursor: pointer;
  margin: 0 auto;
  transition: all 0.3s ease;
  color: lightgreen;
  margin-top: 15px;

  &:disabled {
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: rgba(255, 255, 255, 0.5);
    cursor: not-allowed;
  }

  &:hover:not(&:disabled) {
    color: #fff;
    background: lightgreen;
  }
`;

const TextLink = styled.span`
  font-size: 12px;
  text-align: center;
  color: #fff;
  margin: 0;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: lightgreen;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  font-style: italic;
`;

const SuccessMessage = styled(ErrorMessage)`
  color: lightgreen;
  margin-bottom: 30px;
  display: block;
  text-align: center;
  font-style: normal;
  max-width: 60%;
  margin: 0 auto 30px;
`;

const LoginForm = ({
  setActiveForm,
  setUser,
  setShowUserModal,
  successMessage,
}) => {
  const [username, setUsername] = useState("supergreg");
  const [password, setPassword] = useState("gabe");
  const [readyForSubmit, setReadyForSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const validateUsername = (value) => value.length;
  const validatePassword = (value) => value.length;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    setShowUserModal(false);

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedCofiUser", JSON.stringify(user));
      setUser(user);
      userService.setToken(user.token);
      console.log(user.token);
    } catch (e) {
      setErrorMessage(e.response.data.error);
      setReadyForSubmit(false);

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  useEffect(() => {
    if (validateUsername(username) && validatePassword(password)) {
      setReadyForSubmit(true);
    }
  }, [username, password, setUsername, setPassword]);

  return (
    <Root onClick={(e) => e.stopPropagation()}>
      {successMessage ? (
        <SuccessMessage>{successMessage}</SuccessMessage>
      ) : null}
      <Form autoComplete="off">
        <input type={"hidden"} value={"prayer"} />
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        <FormGroup>
          <Input
            type="text"
            label={"Username"}
            value={username}
            setValue={setUsername}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            label={"Password"}
            value={password}
            setValue={setPassword}
          />
        </FormGroup>

        <Button onClick={handleSubmit} disabled={readyForSubmit ? "" : true}>
          Login
        </Button>
        <TextLink onClick={() => setActiveForm("register")}>
          Or Click to Sign Up
        </TextLink>
      </Form>
    </Root>
  );
};

export default LoginForm;
