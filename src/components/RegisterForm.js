import styled from "styled-components";
import { useState } from "react";
import Input from "./Input";
import { useEffect } from "react";
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

  @media (max-width: 750px) {
    width: calc(100% - 2rem);
    padding: 2.5rem 1rem 2.5rem;
  }
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

  @media (max-width: 750px) {
    padding: 0.25rem 0.5rem;
    font-size: 10px;
  }
`;

const TextLink = styled.span`
  font-size: 12px;
  text-align: center;
  color: #fff;
  margin: 0;
  cursor: pointer;
  transition: color 0.3s ease;
  max-width: 210px;
  margin: 0 auto;

  &:hover {
    color: lightgreen;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  font-style: italic;
`;

const Heading = styled.h2`
  margin-bottom: 50px;
  text-align: center;
  font-size: 18px;

  @media (max-width: 750px) {
    padding: 1.5rem 0 2.5rem;
    margin: 0;
    font-size: 15px;
  }
`;

const RegisterForm = ({ setActiveForm, setSuccessMessage }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [readyForSubmit, setReadyForSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await userService.create({
        username: username.trim(),
        email,
        password,
      });
      setSuccessMessage("Registration successful, you can now login.");
      setActiveForm("login");
    } catch (e) {
      console.log(e);

      setErrorMessage(e.response.data.error);
      setReadyForSubmit(false);

      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  };

  return (
    <Root onClick={(e) => e.stopPropagation()}>
      <Heading>Sign Up</Heading>
      <Form autoComplete="off">
        <input type={"hidden"} value={"prayer"} />
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
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
        <Button onClick={handleSubmit} disabled={readyForSubmit ? "" : true}>
          Register
        </Button>
        <TextLink onClick={() => setActiveForm("login")}>
          Or Click to Login
        </TextLink>
      </Form>
    </Root>
  );
};

export default RegisterForm;
