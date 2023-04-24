import styled from "styled-components";

import { useState, useEffect } from "react";
import MediaItem from "../components/MediaItem";
import { MediaItemsContainer } from "../pages/index";
const FavoritesPage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const getFavoritesFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites;
  } else {
    return [];
  }
};

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    console.log({ favoritesFromLocalStorage });
    setFavorites(favoritesFromLocalStorage);
  }, []);

  return (
    <FavoritesPage>
      {favorites.length === 0 && (
        <h3>You don't have any favorites yet. Go add some!</h3>
      )}
      <h3>Your favorites</h3>

      <MediaItemsContainer>
        {favorites.map((favorite) => (
          <MediaItem key={favorite.id} media={favorite} />
        ))}
      </MediaItemsContainer>
    </FavoritesPage>
  );
}
