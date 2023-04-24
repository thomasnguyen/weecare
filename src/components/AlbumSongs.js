import { useEffect, useState } from "react";
import styled from "styled-components";
import moment from "moment";

const AlbumSongsTable = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 2rem;

  .albumSongs-table-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;

    .albumSongs-table-header-item {
      font-size: 0.8rem;
      font-weight: 500;
      color: #3d3b42;
      width: 25%;
    }
  }

  .albumSongs-table-body-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e4e7ea;
  }

  .albumSongs-table-body-item {
    font-size: 0.8rem;
    font-weight: 400;
    color: #3d3b42;
    width: 25%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const AlbumSongs = ({ albumId }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const fetchAlbumSongs = async () => {
      const apiUrl = `/api/itunes?id=${albumId}&entity=song`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setSongs(data.results.slice(1)); // Exclude the first item which is the album itself
      } catch (error) {
        console.error(error);
        setSongs([]);
      }
    };
    fetchAlbumSongs();
  }, [albumId]);

  return (
    <div>
      <h4>Album Songs</h4>
      <AlbumSongsTable>
        <div className="albumSongs-table-header">
          <div className="albumSongs-table-header-item">Song</div>
          <div className="albumSongs-table-header-item">Artist</div>
          <div className="albumSongs-table-header-item">Genre</div>
          <div className="albumSongs-table-header-item">Time</div>
        </div>
        <div className="albumSongs-table-body">
          {songs.map((song) => (
            <div className="albumSongs-table-body-row" key={song.trackName}>
              <div className="albumSongs-table-body-item">{song.trackName}</div>
              <div className="albumSongs-table-body-item">
                {song.artistName}
              </div>
              <div className="albumSongs-table-body-item">
                {song.primaryGenreName}
              </div>
              <div className="albumSongs-table-body-item">
                {moment(song.trackTimeMillis).format("mm:ss")}
              </div>
            </div>
          ))}
        </div>
      </AlbumSongsTable>
    </div>
  );
};

export default AlbumSongs;
