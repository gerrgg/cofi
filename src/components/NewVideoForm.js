import styled from "styled-components";
import { useState } from "react";
import Input from "./Input";
import axios from "axios";
import videoService from "../services/video";

const Root = styled.div`
  width: 600px;
  height: auto;
  padding: 3rem 2rem;
  background: rgba(0, 0, 0, 0.9);
  border: 1px solid lightgreen;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 15px;
  z-index: 10;
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

const NewVideoForm = ({ user, setVideos, videos, setShowForm }) => {
  const [video, setVideo] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  function youtube_parser(url) {
    var regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length == 11 ? match[7] : false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const key = youtube_parser(video);

    try {
      videoService.setToken(user.token);

      const { data } = await axios.get(
        `https://www.youtube.com/oembed?url=${video}&format=json`
      );

      const newVideo = {
        key,
        title: data.title,
        thumbnail: data.thumbnail_url,
      };

      const response = await videoService.create(newVideo);

      setVideos(videos.concat(response));
      setVideo("");
      setShowForm(false);

      setSuccessMessage(`Video Added`);
    } catch (e) {
      setErrorMessage("Something went wrong");
    }

    setTimeout(() => {
      setSuccessMessage(null);
      setErrorMessage(null);
    }, 3000);
  };

  return (
    <Root onClick={(e) => e.stopPropagation()}>
      <Heading>Add Youtube Video</Heading>

      <Form autoComplete="off">
        {errorMessage ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
        {successMessage ? (
          <SuccessMessage>{successMessage}</SuccessMessage>
        ) : null}
        <FormGroup>
          <Input
            type="text"
            label={"Video URL"}
            value={video}
            setValue={setVideo}
          />
        </FormGroup>
        <Button onClick={handleSubmit}>Add Video</Button>
      </Form>
    </Root>
  );
};

export default NewVideoForm;
