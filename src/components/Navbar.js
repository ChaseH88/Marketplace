import React from "react";
import { Link } from "react-router-dom"; 
import styled from "styled-components";

// Styled Component
import { Container } from "./styled/Container";

const NavBarStyle = styled.section`
  padding: 1vw;
  margin: 0;
  background-color: #eee;
  &  > .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    & .links {
      & .link {
        margin: 0 5px;
      }
    }
    & .avatar {
  
    }
  }
`;

const Navbar = (props) => {
  const { username, signOut } = props;
  return(
    <NavBarStyle id="nav">
      <Container className="container">
        <ul className="links">
          <Link to="/" className="link">
            <span>Home</span>
          </Link>
          <Link to="/market" className="link">
            <span>Market</span>
          </Link>
        </ul>
        <div className="avatar">
          <span>Signed In As: 
          <Link to="/profile" className="link">
            {username}
          </Link>
          <button onClick={() => signOut()}>
            Sign Out
          </button>
          </span>
        </div>
      </Container>
    </NavBarStyle>
  )
};

export default Navbar;
