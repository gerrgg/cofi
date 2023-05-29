import styled from "styled-components";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "./LoginForm";

import { useState } from "react";
const Root = styled.div`
  width: 100vw;
  height: 100vh;
  border: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  opacity: ${(props) => (props.showModal ? "1" : "0")};
  background: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  color: #fff;
  padding: 1rem;
  transition: opacity 0.3s ease;
  pointer-events: ${(props) => (props.showModal ? "all" : "none")};
  cursor: ${(props) => (props.showModal ? "pointer" : "auto")};
`;

const UserModal = ({ setShowUserModal, showUserModal, setUser, user }) => {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <Root
      onClick={() => {
        setShowUserModal(false);
      }}
      showModal={showUserModal}
    >
      {activeForm === "login" ? (
        <LoginForm
          setUser={setUser}
          setActiveForm={setActiveForm}
          setShowUserModal={setShowUserModal}
        />
      ) : (
        <RegisterForm setActiveForm={setActiveForm} />
      )}
    </Root>
  );
};

export default UserModal;
