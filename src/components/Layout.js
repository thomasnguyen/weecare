import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { SearchProvider } from "../utils/SearchContext";

import styled from "styled-components";

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  @media (max-width: 900px) {
    flex-direction: column-reverse;
    & > *:first-child {
      display: none;
    }
  }

  .content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

const Layout = ({ children }) => {
  return (
    <SearchProvider>
      <LayoutWrapper>
        <Sidebar />
        <div className="content">
          <Header />
          {children}
        </div>
      </LayoutWrapper>
    </SearchProvider>
  );
};

export default Layout;
