import styled from "styled-components";
import { TypeAnimation } from "react-type-animation";

const Root = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  z-index: 10;
  color: #fff;
`;

const Controls = ({ ready }) => {
  return (
    <Root>
      {ready ? (
        <TypeAnimation
          sequence={[
            // Same String at the start will only be typed once, initially
            "Press any key to start",
            1000,
            "Press any key to commence coding",
            1000,
            "Press any key to get this party started",
            1000,
            "Press any key to get in the zone",
            1000,
          ]}
          speed={25}
          style={{ fontWeight: "bold" }}
          repeat={Infinity}
        />
      ) : null}
    </Root>
  );
};

export default Controls;
