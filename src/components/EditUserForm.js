import styled from "styled-components";
import { useState } from "react";
import Input from "./Input";
import { useEffect } from "react";
import userService from "../services/user";
import XMarkIcon from "./XMarkIcon";

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
    padding: 0.5rem 1rem 2.5rem;
    height: calc(100vh -150px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Remove = styled(XMarkIcon)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  color: #fff;
  transition: all 0.3s ease;
  z-index: 100;
  height: 32px;
  width: 32px;
  &:hover {
    opacity: 1;
  }

  @media (max-width: 500px) {
    // width: 15px;
    // height: 15px;
  }
`;

const Form = styled.form`
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
`;

const FormGroup = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-flow: row wrap;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 8px;
  border: 1px solid lightgreen;
  padding: 12px;
  max-width: calc(50% - 2rem);
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

const LogoutButton = styled(Button)`
  background: red;
  color: #fff;
  border: 1px solid #fff;

  &:hover:not(&:disabled) {
    color: red;
    background: transparent;
    border: 1px solid red;
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

const EditUserForm = ({
  user,
  setShowUserModal,
  setSuccessMessage,
  setUser,
}) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState(user.name);
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      userService.setToken(user.token);

      const updatedUser = await userService.update({
        username,
        password,
        email,
        name,
      });

      updatedUser.token = user.token;

      setUser(updatedUser);

      window.localStorage.setItem(
        "loggedCofiUser",
        JSON.stringify(updatedUser)
      );

      setSuccessMessage(`Update succesful, please login to confirm!`);
      // handleLogout();
    } catch (e) {
      setErrorMessage(e.response.data.error);
    }

    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <Root onClick={(e) => e.stopPropagation()}>
      <div
        onClick={() => {
          setShowUserModal(false);
        }}
      >
        <Remove></Remove>
      </div>
      <Heading>Edit User</Heading>

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
          <Input type="text" label={"Name"} value={name} setValue={setName} />
        </FormGroup>

        <FormGroup>
          <Input
            type="email"
            label={"Email"}
            value={email}
            setValue={setEmail}
          />
        </FormGroup>

        <FormGroup>
          <Input
            type="password"
            label={"New Password"}
            value={password}
            setValue={setPassword}
          />
        </FormGroup>

        <ButtonWrapper>
          <Button onClick={handleSubmit}>Update</Button>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </ButtonWrapper>
      </Form>
    </Root>
  );
};

export default EditUserForm;
