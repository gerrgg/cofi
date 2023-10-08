import styled from "styled-components";
import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import gifService from "../services/gif";
import CheckMarkIcon from "./CheckMarkIcon";
import XMarkIcon from "./XMarkIcon";

const Root = styled.div`
  height: auto;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  bottom: calc(100% + 1rem);
  left: 0%;
  width: 100%;
  transform: translate(0%, 0%);
  z-index: 101;
  cursor: auto;
  opacity: ${(props) => (props.showGifForm ? "1" : "0")};
  pointer-events: ${(props) => (props.showGifForm ? "all" : "none")};
  box-sizing: border-box;

  @media (max-width: 550px) {
    width: calc(100% - 1rem);
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

  input {
    border-radius: 0;
  }

  label {
    z-index: 1000;
  }
`;

const Results = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 5px;
  padding: 5px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  max-height: calc(60vh - 20px);
  overflow: auto;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-bottom: 0;
  padding: 5px;
`;

const Result = styled.div`
  width: calc(50% - 3px);
  height: calc(20vh - 20px);
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 101;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::after {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    content: "";
    display: ${(props) => (props.added ? "block" : "none")};
  }

  &:hover {
    border-color: lightgreen;
  }
`;

const Icon = styled(CheckMarkIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${(props) => (props.added ? "block" : "none")};
  z-index: 100;
`;

const Remove = styled(XMarkIcon)`
  position: absolute;
  right: 5px;
  top: 5px;
  color: #fff;
  opacity: 0;
  transition: all 0.3s ease;
  z-index: 100;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 500px) {
    // width: 15px;
    // height: 15px;
  }
`;

const MyGifRoot = styled(Result)`
  &:hover {
    svg {
      opacity: 0.5;
    }
  }

  svg:hover {
    opacity: 1;
  }
`;

const Gif = ({ result, user, setGifs, gifs, setActiveGifIndex, setValue }) => {
  const [added, setAdded] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (user) {
      gifService.setToken(user.token);
    }

    try {
      const data = {
        url: result.media_formats.gif.url,
        title: result.content_description,
      };

      if (user) {
        const response = await gifService.create(data);
        setGifs(gifs.concat(response));
      } else {
        setGifs(gifs.concat(data));
      }

      setValue("");

      setActiveGifIndex(gifs.length);
      setAdded(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Result added={added} onClick={handleClick}>
      <img
        src={result.media_formats.gif.url}
        alt={result.content_description}
      />
      <Icon added={added} />
    </Result>
  );
};

const MyGif = ({ user, setGifs, result, setActiveGifIndex, gifs }) => {
  const handleRemove = async (e) => {
    e.stopPropagation();
    const newGifs = gifs.filter((gif) => gif.id !== result.id);

    if (result === gifs[gifs.length - 1]) {
      setActiveGifIndex(0);
    }

    setGifs(newGifs);

    try {
      gifService.setToken(user.token);
      await gifService.remove(result.id);
      setGifs(newGifs);
    } catch (e) {
      console.log(e);
    }
  };

  const handleClick = async (e) => {
    gifs.forEach((g, i) => {
      if (g.id === result.id) {
        setActiveGifIndex(i);
      }
    });
  };

  return (
    <MyGifRoot onClick={handleClick}>
      <img src={result.url} alt={result.title} />
      {user && result.user === user.id ? (
        <div onClick={handleRemove}>
          <Remove />
        </div>
      ) : null}
    </MyGifRoot>
  );
};

const GifForm = ({
  showGifForm,
  handleShowGifForm,
  user,
  gifs,
  setGifs,
  setActiveGifIndex,
}) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const getData = async (search_url) => {
    const { data } = await axios.get(search_url);
    setResults(data.results);
  };

  const onChangeCallback = (query) => {
    var apikey = "AIzaSyCNqelwphJXrYnLY-I-xbTNkiXgkwuwS_I";
    var clientkey = "my_test_app";
    var lmt = 25;

    // test search term
    var search_term = value;

    // using default locale of en_US
    var search_url =
      "https://tenor.googleapis.com/v2/search?q=" +
      search_term +
      "&key=" +
      apikey +
      "&client_key=" +
      clientkey +
      "&limit=" +
      lmt;

    if (value !== "") {
      getData(search_url);
    } else {
      setResults([]);
    }
  };

  return (
    <Root showGifForm={showGifForm} onClick={(e) => e.stopPropagation()}>
      {results.length > 0 ? (
        <Results>
          {results.map((result) => (
            <Gif
              setGifs={setGifs}
              gifs={gifs}
              user={user}
              key={result.id}
              result={result}
              setActiveGifIndex={setActiveGifIndex}
            ></Gif>
          ))}
        </Results>
      ) : (
        <Results>
          {gifs.map((result) => (
            <MyGif
              setGifs={setGifs}
              gifs={gifs}
              user={user}
              key={result.id}
              result={result}
              setActiveGifIndex={setActiveGifIndex}
            ></MyGif>
          ))}
        </Results>
      )}
      <Form autoComplete="off">
        <FormGroup>
          <Input
            onChangeCallback={onChangeCallback}
            type="text"
            label={"Search Tenor"}
            setValue={setValue}
          />
        </FormGroup>
      </Form>
    </Root>
  );
};

export default GifForm;
