import styled from "styled-components";
import { useState } from "react";
import Input from "./Input";
import playlistService from "../services/playlist";

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

const Heading = styled.h2`
  margin-bottom: 50px;
  text-align: center;
  font-size: 18px;
`;

const NewPlayListForm = ({ user, setShowModal, setPlaylists, playlists }) => {
  const [value, setValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPlaylist = {
        name: value,
      };

      playlistService.setToken(user.token);

      const response = await playlistService.create(newPlaylist);
      setPlaylists(playlists.concat(response));

      setSuccessMessage(`Playlist Added`);
    } catch (e) {
      console.log(e);
      setErrorMessage("Something went wrong");
    }

    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <Root onClick={(e) => e.stopPropagation()}>
      <Heading>Add Playlist</Heading>

      <Form autoComplete="off">
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        {successMessage ? (
          <SuccessMessage>{successMessage}</SuccessMessage>
        ) : null}
        <FormGroup>
          <Input
            type="text"
            label={"Playlist Title"}
            value={value}
            setValue={setValue}
          />
        </FormGroup>
        <Button onClick={handleSubmit}>Add Playlist</Button>
      </Form>
    </Root>
  );
};

export default NewPlayListForm;
