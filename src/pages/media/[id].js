import { useRouter } from "next/router";
import styled from "styled-components";
import Image from "next/image";
import moment from "moment";
import AlbumSongs from "../../components/AlbumSongs";
import Link from "next/link";

const AlbumPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .album-image {
    margin-right: 1rem;
    border-radius: 5px;
  }
  .album-page-header {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 100%;
    flex: 1;
    margin-bottom: 2rem;
  }

  .album-page-header-back {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    margin: 2rem 0;
    font-size: 1.5rem;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: #3d3b42;
  }

  .album-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .album-artist {
    font-size: 0.8rem;
    font-weight: 500;
    color: #3d3b42;
  }
  .album-collection {
    font-size: 1.4rem;
    font-weight: 500;
    color: #3d3b42;
    margin-top: 0.5rem;
  }
  .album-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0.5rem;

    color: #999999;
    font-size: 0.6rem;
    font-weight: 400;

    & > * {
      margin-right: 0.5rem;

      &:after {
        content: "•";
        margin-left: 0.5rem;
      }

      &:last-child:after {
        content: "";
        margin-left: 0;
      }
    }
  }
`;

export default function Album({ album }) {
  const router = useRouter();
  const { id } = router.query;
  console.log({ album });

  const wrapperType = album?.wrapperType;

  if (!album) {
    return <div>loading...</div>;
  }
  return (
    <AlbumPage>
      <Link href="/">
        <div className="album-page-header-back">
          <span className="material-symbols-outlined">keyboard_backspace</span>
        </div>
      </Link>
      <div className="album-page-header">
        <Image
          className="album-image"
          width={100}
          height={100}
          src={album.artworkUrl100}
          alt={album.collectionName}
          priority
        />
        <div className="album-meta">
          <div className="album-artist">{album.artistName}</div>
          <div className="album-collection">{album.collectionName}</div>
          <div className="album-info">
            <div className="album-genre">{album.primaryGenreName}</div>
            <div className="album-year">
              {moment(album.releaseDate).format("YYYY")}
            </div>
            <div className="album-song-count">{album.trackCount} songs</div>
            <div className="album-price">${album.collectionPrice}</div>
          </div>
        </div>
      </div>

      {wrapperType === "collection" && <AlbumSongs albumId={id} />}
    </AlbumPage>
  );
}

export async function getStaticProps({ params }) {
  const albumId = params.id;
  const apiUrl = `https://itunes.apple.com/lookup?id=${albumId}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const album = data.results[0];
    return {
      props: { album },
    };
  } catch (error) {
    console.error(error);
    return {
      props: { album: null },
    };
  }
}

export async function getStaticPaths() {
  const apiUrl = "https://itunes.apple.com/us/rss/topalbums/limit=100/json";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const albums = data.feed.entry;
    const paths = albums.map((album) => ({
      params: { id: album.id.attributes["im:id"] },
    }));
    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
}
