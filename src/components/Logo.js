import React from "react";
import Link from "next/link";
import styled from "styled-components";

const LogoImg = styled.img`
  width: 35px;
  margin-right: 0.1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e4e7ea;
`;
const Logo = () => {
  return (
    <Link href="/">
      <LogoContainer>
        <LogoImg src="/logo.svg" alt="Logo" />
        <div
          style={{
            marginLeft: "0.25rem",
            marginRight: "1rem",
          }}
        >
          <span style={{ color: "#9093f9" }}>Wee</span>
          <span style={{ color: "#24abaf" }}>Care</span>
          <strong>Music</strong>
        </div>
      </LogoContainer>
    </Link>
  );
};

export default Logo;
