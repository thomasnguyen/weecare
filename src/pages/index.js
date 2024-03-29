import MediaItem from "../components/MediaItem";
import Head from "next/head";
import { useState } from "react";
import styled from "styled-components";
import MediaSwitcher from "../components/MediaSwitcher";
import { fetchMediaData } from "../utils/api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const MediaItemsContainer = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1rem;
  width: 100%;
`;

const StyledHeaderText = styled.h3`
  margin-bottom: 0.5rem;
  margin-top: 1.2rem;
`;

const Home = ({ albums }) => {
  const [mediaData, setMediaData] = useState(albums);

  const setMediaType = async (mediaType) => {
    const mediaData = await fetchMediaData(mediaType);
    setMediaData(mediaData);
  };

  return (
    <Container>
      <Head>
        <title>WeeCare Music</title>
        <meta name="description" content="Music for all" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <StyledHeaderText>Top media for you</StyledHeaderText>
      <MediaSwitcher setSelectedMediaType={setMediaType} />
      <MediaItemsContainer>
        {mediaData.map((media) => (
          <MediaItem key={media.id.label} media={media} />
        ))}
      </MediaItemsContainer>
    </Container>
  );
};

export default Home;

export async function getStaticProps() {
  const apiUrl = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

  const cacheSeconds = 60 * 60 * 24; // cache for one day
  const cacheControl = `public, max-age=${cacheSeconds}, stale-while-revalidate`;

  try {
    const response = await fetch(apiUrl, {
      headers: {
        "Cache-Control": cacheControl,
      },
    });
    const data = await response.json();
    const albums = data.feed.entry;
    return {
      props: { albums },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { albums: [] },
    };
  }
}
