import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Logo from "./Logo";
import { useRouter } from "next/router";

const SidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  min-width: 200px;
  position: relative;
  background: #f1f1f5;
  height: 100vh;
  nav {
    ul {
      margin: 0;
      padding: 0;
    }
  }
`;

const StyledCategoryText = styled.h5`
  color: #4a484f;
  font-weight: 400;
  margin: 0.8rem 0;
`;
const MenuContainer = styled.div`
  width: 100%;
`;
// li without bullet points
const MenuItem = styled.li`
  list-style: none;
  font-size: 0.8rem;
  font-weight: 500;

  padding: 0.25rem 0.5rem;
  margin-bottom: 0.5rem;
  color: #4a484f;

  &.active {
    background: white;
    border-radius: 5px;
    color: #24abaf;
  }

  .menu-button-flex {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
  }

  .menu-icon {
    margin-right: 0.5rem;
    padding-top: 0.1rem;
  }
`;

const Menu = () => {
  const router = useRouter();

  return (
    <MenuContainer>
      <StyledCategoryText>Menu</StyledCategoryText>
      <nav>
        <ul>
          <MenuItem className={router.pathname === "/" ? "active" : ""}>
            <Link href="/">
              <div className="menu-button-flex">
                <div className="menu-icon">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    home
                  </span>
                </div>
                <div>Home</div>
              </div>
            </Link>
          </MenuItem>

          <MenuItem
            className={router.pathname === "/favorites" ? "active" : ""}
          >
            <Link href="/favorites">
              <div className="menu-button-flex">
                <div className="menu-icon">
                  <span style={{ fontSize: "18px" }}>&#x2661;</span>
                </div>
                <div>Favorites</div>
              </div>
            </Link>
          </MenuItem>
        </ul>
      </nav>
    </MenuContainer>
  );
};

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Logo />
      <Menu />
    </SidebarWrapper>
  );
};

export default Sidebar;
