import styled from "styled-components";
import { useState, useEffect } from "react";
import Input from "./Input";
import axios from "axios";
import videoService from "../services/video";
import XMarkIcon from "../components/XMarkIcon";

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

  @media (max-width: 750px) {
    width: calc(100% - 2rem);
    padding: 0.5rem 1rem 2.5rem;
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
  position: relative;
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

const Remove = styled(XMarkIcon)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  color: #fff;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1 !important;
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

  @media (max-width: 750px) {
    padding: 1.5rem 0 2.5rem;
    margin: 0;
    font-size: 15px;
  }
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: rgba(0, 0, 0);
  height: auto;
  position: absolute;
  top: 100%;
  transform: translateY(0%);
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 1rem;
  width: 100%;
  max-height: 25vh;
  overflow: auto;
`;

const SearchResultRoot = styled.div`
  color: #fff;
  font-size: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  padding-bottom: 0.5rem;
  pointer: cursor;
  cursor: pointer;

  &:hover {
    color: lightgreen;
  }
`;

const SearchResult = ({ result, setVideo, setResults }) => {
  const onClick = () => {
    const url = `https://www.youtube.com/watch?v=${result.id.videoId}`;
    setVideo(url);
    setResults([]);
  };
  return (
    <SearchResultRoot onClick={onClick}>
      {result.snippet.title}
    </SearchResultRoot>
  );
};

const NewVideoForm = ({ user, setVideos, videos, setShowForm }) => {
  const [video, setVideo] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [results, setResults] = useState([]);

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

  const closeForm = () => {
    setShowForm(false);
  };

  const getData = async (search_url) => {
    try {
      const { data } = await axios.get(search_url);
      setResults(data.items);
    } catch (e) {
      console.log(e);
    }
  };

  const onChangeCallback = (query) => {
    const apikey = `AIzaSyAxm8w2bNisg8AopAYteyPFEt91XW68eSY`;
    const search = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${video}&type=video&key=${apikey}`;

    if (query !== "") {
      getData(search);
    } else {
      setResults([]);
    }
  };

  return (
    <Root onClick={(e) => e.stopPropagation()}>
      <Heading>Add Youtube Video</Heading>

      <div onClick={closeForm}>
        <Remove />
      </div>

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
            onChangeCallback={onChangeCallback}
          />
          {results && results.length ? (
            <Results>
              {results.map((result) => (
                <SearchResult
                  setVideo={setVideo}
                  result={result}
                  setResults={setResults}
                ></SearchResult>
              ))}
            </Results>
          ) : null}
        </FormGroup>
        <Button onClick={handleSubmit}>Add Video</Button>
      </Form>
    </Root>
  );
};

export default NewVideoForm;
