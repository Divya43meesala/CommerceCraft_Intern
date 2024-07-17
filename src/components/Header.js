import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { FaShoppingBag } from "react-icons/fa"; // Import a different shopping icon
import Nav from "./Nav";

const Header = () => {
  return (
    <MainHeader>
      <NavLink to="/" className="logo-container">
        <FaShoppingBag className="logo-icon" />
        <span className="logo-text">Commerce_Craft</span>
      </NavLink>
      <Nav />
    </MainHeader>
  );
};

const MainHeader = styled.header`
  padding: 0 4.8rem;
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.bg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .logo-container {
    display: flex;
    align-items: center;
    text-decoration: none;

    .logo-icon {
      height: 3rem;
      width: 3rem;
      color: ${({ theme }) => theme.colors.primary};
      margin-right: 1rem;
    }

    .logo-text {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
      text-transform: uppercase;
    }
  }
`;

export default Header;
