import { useEffect, useState } from "react";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

const MediaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  max-width: 10rem;
  position: relative;

  &:hover {
    .heart-icon-background {
      opacity: 1;
    }

    transform: translateY(-5px);
  }

  img {
    border-radius: 5px;
  }
`;

const MediaInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.3rem;
  width: 100%;
`;

const MediaName = styled.h2`
  font-size: 0.8rem;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  white-space: nowrap;
  color: #3d3b42;
`;

const ArtistName = styled.h3`
  font-size: 0.6rem;
  margin: 0.1rem;
  color: #999999;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  white-space: nowrap;
  font-weight: 400;
`;

const HeartIconBackground = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 0.5rem;
  border-radius: 50%;
  background-color: white;
  padding: 0.2rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;

  &:hover {
    opacity: 1;
  }
`;

const HeartIcon = styled.span`
  font-size: 1rem;
  color: ${({ liked }) => (liked ? "red" : "gray")};
  transition: all 0.2s ease-in-out;

  ${HeartIconBackground}:hover & {
    color: red;
  }
`;

const Skeleton = styled.div`
  width: 100%;
  height: 160px;
  background-color: #e4e7ea;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  position: absolute;
`;

export default function Media({ media }) {
  const [liked, setLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    console.log("favorites", favorites);
    if (
      favorites.some(
        (fav) => fav.id.attributes["im:id"] === media.id.attributes["im:id"]
      )
    ) {
      setLiked(true);
    }
  }, [media.id.attributes["im:id"]]);

  const handleHeartClick = (event) => {
    event.stopPropagation(); // prevent click from bubbling up to MediaWrapper
    event.preventDefault(); // prevent Link component from being triggered
    setLiked(!liked);
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (liked) {
      const index = favorites.findIndex(
        (fav) => fav.id.attributes["im:id"] === media.id.attributes["im:id"]
      );
      if (index !== -1) {
        favorites.splice(index, 1);
      }
    } else {
      favorites.push(media);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <Link href={`/media/${media.id.attributes["im:id"]}`}>
      <MediaWrapper>
        {!imageLoaded && <Skeleton />}

        <Image
          width={160}
          height={160}
          src={media["im:image"][2].label.replace("170x170", "340x340")}
          alt={`${media["im:name"].label}  media cover`}
          onLoad={() => setImageLoaded(true)}
          priority
        />

        <MediaInfo>
          <MediaName>{media["im:name"].label}</MediaName>
          <ArtistName>{media["im:artist"].label}</ArtistName>
        </MediaInfo>
        <HeartIconBackground onClick={handleHeartClick}>
          <HeartIcon liked={liked}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "12px" }}
            >
              favorite
            </span>
          </HeartIcon>
        </HeartIconBackground>
      </MediaWrapper>
    </Link>
  );
}
