import styled from "styled-components";
import { useEffect, useState } from "react";
import Input from "./Input";
import axios from "axios";
import videoService from "../services/video";

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

  @media (max-width: 500px) {
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

const Result = styled.img`
  width: calc(50% - 3px);
  height: calc(20vh - 20px);
  object-fit: cover;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 101;

  &:hover {
    border-color: lightgreen;
  }
`;

const Gif = ({ result }) => {
  const handleClick = ({ target }) => {
    console.log(target.src);
  };

  return <Result onClick={handleClick} src={result.media_formats.gif.url} />;
};

const GifForm = ({ showGifForm, handleShowGifForm }) => {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);

  const getData = async (search_url) => {
    const { data } = await axios.get(search_url);
    setResults(data.results);
  };

  useEffect(() => {
    var apikey = " AIzaSyCNqelwphJXrYnLY-I-xbTNkiXgkwuwS_I";
    var clientkey = "my_test_app";
    var lmt = 16;

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
    }
  }, [value, setValue]);

  return (
    <Root showGifForm={showGifForm} onClick={(e) => e.stopPropagation()}>
      {results.length > 0 ? (
        <Results>
          {results.map((result) => (
            <Gif result={result}></Gif>
          ))}
        </Results>
      ) : null}
      <Form autoComplete="off">
        <FormGroup>
          <Input
            type="text"
            label={"Search Tenor"}
            value={value}
            setValue={setValue}
          />
        </FormGroup>
      </Form>
    </Root>
  );
};

export default GifForm;
