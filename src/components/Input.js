import styled from "styled-components";
import { useState } from "react";
import CheckMarkIcon from "../components/CheckMarkIcon";
import XMarkIcon from "../components/XMarkIcon";

const Root = styled.div`
  position: relative;
`;

const InputElement = styled.input`
  border: 0;
  apperance: none;
  width: 100%;
  background: unset;
  padding: 16.5px 14px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  transition: all 0.3s ease;
  color: #fff;
  font-size: 15px;
  border-color: ${(props) => (props.valid ? "lightgreen" : "")};

  &:hover {
    border: 1px solid rgba(255, 255, 255, 1);
  }

  &:focus {
    outline: 0;
    border: 1px solid rgba(255, 255, 255, 1);
  }

  &:focus + label {
    font-size: 8px;
    top: 0em;
    background: #000;
    padding: 0 0.5rem;
  }
`;

const Label = styled.label`
  position: absolute;
  top: ${(props) => (props.hasValue ? "0px" : "50%")};
  left: 12px;
  transform: translateY(-50%);
  font-size: ${(props) => (props.hasValue ? "8px" : "12px")};
  transition: all 0.3s ease;
  background: ${(props) => (props.hasValue ? "#000" : "unset")};
  padding: 0 0.5rem;
  pointer-events: none;
`;

const ValidationWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  display: ${(props) => (props.showValidiation ? "block" : "none")};
`;

const Input = ({ label, type, validation, value, setValue }) => {
  const [showValidiation, setShowValidation] = useState(false);
  const [valid, setValid] = useState(false);

  const handleValidate = () => {
    if (validation) {
      setShowValidation(true);
      setValid(validation(value));
    }
  };

  return (
    <Root>
      <InputElement
        value={value}
        onChange={({ target }) => setValue(target.value)}
        type={type}
        autoComplete="new-password"
        onBlur={handleValidate}
        valid={valid}
      />
      <Label hasValue={value && value.length > 0}>{label}</Label>
      <ValidationWrapper showValidiation={showValidiation}>
        {valid ? <CheckMarkIcon /> : <XMarkIcon />}
      </ValidationWrapper>
    </Root>
  );
};

export default Input;
