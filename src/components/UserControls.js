import styled from "styled-components";
import UserIcon from "./UserIcon";

const Root = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 12;
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const UserRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;

  &:hover {
    color: lightgreen;

    svg {
      color: lightgreen;
    }
  }
`;

const Trigger = styled.div`
  cursor: pointer;
  &:hover {
    color: lightgreen;

    svg {
      color: lightgreen;
    }
  }
`;

const UserControls = ({ handleUserIconClick, user, setUser }) => {
  return (
    <Root>
      <Row>
        {!user ? (
          <UserRow onClick={handleUserIconClick}>
            <Trigger>Login</Trigger>
            <UserIcon />
          </UserRow>
        ) : (
          <Trigger onClick={handleUserIconClick}>{user.username}</Trigger>
        )}
      </Row>
    </Root>
  );
};

export default UserControls;
