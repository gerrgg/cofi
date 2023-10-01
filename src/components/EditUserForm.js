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

  // useEffect(() => {
  //   if (user) {
  //     setUsername(user.username);
  //     setEmail(user.email);
  //     setName(user.name ? user.name : "");
  //   }
  // }, [user]);

  return (
    <Root onClick={(e) => e.stopPropagation()}>
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

        <Button onClick={handleSubmit}>Update</Button>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </Form>
    </Root>
  );
};

export default EditUserForm;
