import styled from "styled-components";
import { useState } from "react";
import Input from "./Input";
import { useEffect } from "react";

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

const RegisterForm = ({ setActiveForm }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [readyForSubmit, setReadyForSubmit] = useState(false);

  const validateUsername = (value) =>
    value.length >= 4 && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);

  const validateEmail = (value) =>
    value.length && /^[^@]+@[^@]+\.[^@]+$/.test(value);

  const validatePassword = (value) => value.length >= 8;

  const validateConfirmPassword = (value) =>
    validatePassword(value) && password === confirmPassword;

  useEffect(() => {
    if (
      validateUsername(username) &&
      validateEmail(email) &&
      validatePassword(password) &&
      validateConfirmPassword(confirmPassword)
    ) {
      setReadyForSubmit(true);
    }
  }, [username, email, password, confirmPassword]);

  return (
    <Root onClick={(e) => e.stopPropagation()}>
      <Form autoComplete="off">
        <input type={"hidden"} value={"prayer"} />
        <FormGroup>
          <Input
            type="text"
            label={"Username"}
            validation={validateUsername}
            value={username}
            setValue={setUsername}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="email"
            label={"Email"}
            validation={validateEmail}
            value={email}
            setValue={setEmail}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            label={"Password"}
            validation={validatePassword}
            value={password}
            setValue={setPassword}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            label={"Confirm Password"}
            validation={validateConfirmPassword}
            value={confirmPassword}
            setValue={setConfirmPassword}
          />
        </FormGroup>
        <Button disabled={readyForSubmit ? "" : "true"}>Register</Button>
        <TextLink onClick={() => setActiveForm("login")}>
          Or Click to Login
        </TextLink>
      </Form>
    </Root>
  );
};

export default RegisterForm;
