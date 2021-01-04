import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/auth-context";

interface Props {
  children: React.ReactNode;
}

const Layout: FunctionComponent<Props> = ({ children }) => {
  const auth = useAuth();

  return (
    <>
      <Nav>
        <Link to="/">
          <h1 id="logo">Travel</h1>
        </Link>
        <ul>
          <Link to="/">
            <li>Home</li>
          </Link>
          {auth?.user.me ? (
            <Link to="/account">
              <li>Account</li>
            </Link>
          ) : (
            <Link to="/login">
              <li>Sign In</li>
            </Link>
          )}
        </ul>
      </Nav>
      <LayoutStyle>{children}</LayoutStyle>
    </>
  );
};

const LayoutStyle = styled.div`
  padding: 4rem 20rem;
`;

const Nav = styled.nav`
  width: 100%;
  min-height: 5rem;
  display: flex;
  align-items: center;
  padding: 0 20rem;
  background-color: var(--primary);
  justify-content: space-between;
  color: #fff;

  h1 {
    font-size: 2rem;
  }

  ul {
    display: flex;
    align-items: center;
    list-style: none;

    li {
      font-size: 1.1rem;
      margin-left: 2rem;
    }
  }
`;

export default Layout;
