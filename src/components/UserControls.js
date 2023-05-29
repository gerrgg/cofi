import styled from "styled-components";
import useSound from "use-sound";
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

const UserControls = ({ handleUserIconClick, user }) => {
  return (
    <Root>
      <Row>
        <div onClick={handleUserIconClick}>
          <UserIcon />
        </div>
      </Row>
    </Root>
  );
};

export default UserControls;
