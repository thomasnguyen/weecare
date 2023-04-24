import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { SearchContext } from "../utils/SearchContext";
import debounce from "lodash/debounce";
import { getMediaIcon } from "../utils";
import ProfileDropdown from "./ProfileDropdown";
import Link from "next/link";

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;

  input {
    border-radius: 5px;
    border: 0;
    outline: 0;
    background: white;

    padding: 0.5rem 1rem;
    font-size: 0.8rem;

    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.02);

    margin: 0;
    border: solid 1px #e4e7ea;
    color: #3e3f5d;

    font-size: 15px;
    flex: 1;
    width: 100%;
  }

  .suggestions {
    position: absolute;
    top: 100%;
    margin-bottom: -10px;
    width: 100%;
    background: white;
    margin: 0;
    z-index: 100;
    border: solid 1px #e4e7ea;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.02);
    padding: 0;

    li {
      list-style: none;
      padding: 0.5rem 0.5rem;
      font-size: 0.8rem;
      font-weight: 500;
      color: #4a484f;
      border-bottom: solid 1px #e4e7ea;

      &:hover {
        background: #f1f1f5;
        cursor: pointer;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }

  .search {
    width: 100%;
    flex: 1;
    position: relative;
  }

  .menu-icon {
    display: none;

    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 900px) {
    .menu-icon {
      display: block;
      margin-right: 0.5rem;
    }
  }

  .mobileMenu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    background: white;

    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    z-index: 10000;

    .mobileMenu-close {
      margin-bottom: 1rem;
      align-self: flex-end;

      &:hover {
        cursor: pointer;
      }
    }

    .mobileMenu-item {
      margin-bottom: 1rem;
      font-size: 1.2rem;
      font-weight: 500;
      color: #4a484f;
      padding-bottom: 0.5rem;
      width: 100%;
    }
  }
`;

const Header = () => {
  const { searchQuery, handleSearchQueryChange } = useContext(SearchContext);
  const [suggestedQuery, setSuggestedQuery] = useState(searchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `https://itunes.apple.com/search?term=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data.results.slice(0, 5)); // limit to first 5 items
      } catch (error) {
        console.error(error);
      }
    };

    const debouncedFetchSearchResults = debounce(fetchSearchResults, 500);

    debouncedFetchSearchResults();

    return () => {
      debouncedFetchSearchResults.cancel();
    };
  }, [searchQuery]);

  const handleChange = (event) => {
    const value = event.target.value;
    handleSearchQueryChange(value);
    setSuggestedQuery(value);
  };

  const handleMenuClick = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  return (
    <SearchBarWrapper>
      <span
        className="material-symbols-outlined menu-icon"
        onClick={handleMenuClick}
      >
        menu
      </span>
      {showMobileMenu && (
        <div className="mobileMenu">
          <div
            className="mobileMenu-close material-symbols-outlined"
            onClick={handleMenuClick}
          >
            close
          </div>

          <Link href="/" onClick={handleMenuClick}>
            <div className="mobileMenu-item">Home</div>
          </Link>
          <Link href="/favorites" onClick={handleMenuClick}>
            <div className="mobileMenu-item">Favorites</div>
          </Link>
        </div>
      )}
      <div className="search">
        <input
          type="text"
          placeholder="Search albums, songs, podcasts, or audiobooks"
          value={suggestedQuery}
          onChange={handleChange}
        />

        {suggestedQuery && searchQuery && (
          <ul className="suggestions">
            {searchResults.map((result) => (
              <Link
                href={`/media/${result?.collectionId}`}
                key={result.trackId}
              >
                <li onClick={() => setSuggestedQuery("")}>
                  <span style={{ marginRight: "0.5rem" }}>
                    {getMediaIcon(result.wrapperType)}
                  </span>
                  <a
                    href={result.trackViewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    [{result.wrapperType}] {result.artistName} -{" "}
                    {result.trackName}
                  </a>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
      <ProfileDropdown />
    </SearchBarWrapper>
  );
};

export default Header;
