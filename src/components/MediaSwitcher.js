import { useState } from "react";
import styled from "styled-components";

const LinkButton = styled.button`
  background: none;
  border: none;
  color: ${({ selected }) => (selected ? "#24abaf" : "gray")};
  cursor: pointer;
  font-size: 12px;
  text-decoration: none;
  margin: 0;
  padding: 0.25rem 0.75rem;
  border: solid 1px #e4e7ea;
  border-radius: 20px;
  &:hover {
    text-decoration: none;
  }

  .emojii-icon {
    margin-right: 0.25rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0;
  flex-wrap: wrap;
`;

const MediaSwitcher = ({ setSelectedMediaType }) => {
  const [selected, setSelected] = useState("albums");

  const handleClick = (mediaType) => {
    setSelected(mediaType);
    setSelectedMediaType(mediaType);
  };

  return (
    <ButtonGroup>
      <LinkButton
        selected={selected === "albums"}
        onClick={() => handleClick("albums")}
      >
        <span className="emojii-icon">💿</span> Albums
      </LinkButton>
      <LinkButton
        selected={selected === "songs"}
        onClick={() => handleClick("songs")}
      >
        <span className="emojii-icon">🎶</span> Songs
      </LinkButton>

      <LinkButton
        selected={selected === "podcasts"}
        onClick={() => handleClick("podcasts")}
      >
        <span className="emojii-icon">🎧</span> Podcasts
      </LinkButton>

      <LinkButton
        selected={selected === "audioBooks"}
        onClick={() => handleClick("audioBooks")}
      >
        <span className="emojii-icon">📙</span> Audio books
      </LinkButton>
    </ButtonGroup>
  );
};

export default MediaSwitcher;
