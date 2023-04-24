import React from "react";
import styled from "styled-components";
import Image from "next/image";

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 1rem;

  div {
    margin-right: 0.5rem;
    font-size: 14px;
    color: #848484;
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const ProfileDropdown = () => {
  return (
    <ProfileContainer>
      <div>Thomas</div>
      <Image
        width={25}
        height={25}
        style={{ borderRadius: "50%", marginRight: "0.5rem" }}
        src="/avatar.jpeg"
        alt="avatar"
      />
      <span className="material-symbols-outlined">expand_more</span>
    </ProfileContainer>
  );
};

export default ProfileDropdown;
