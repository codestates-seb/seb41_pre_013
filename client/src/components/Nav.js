import styled from "styled-components";
import { IoEarth } from "react-icons/io5";
import { useLocation } from "react-router-dom";

const NavContainer = styled.nav`
  width: 164px;
  flex-shrink: 0;
  height: 100vh;
  padding-top: 24px;
  border-right: 1px solid var(--line-color);

  li {
    width: 100%;
    height: 34px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 10px;

    svg {
      font-size: 1.3rem;
      margin-right: 3px;
      vertical-align: middle;
    }

    .sub_menu {
      padding-left: 22px;
    }
  }

  .selected {
    color: var(--font-color-title);
    font-weight: bold;
    border-right: 3px solid var(--line-color-top-orange);
    background-color: #F1F2F3;
  }
`;

function Nav() {
  const { pathname } = useLocation();
  //tags / users / companies
  return (
    <NavContainer>
      <ul>
        <li className="selected"><a href="/">Home</a></li>
        <li>PUBLIC</li>
        <li><a href="/"><IoEarth />Questions</a></li>
        <li><a href="/" className="sub_menu">Tags</a></li>
        <li><a href="/" className="sub_menu">Users</a></li>
        {/* <li><a href="/" className="sub_menu">Companies</a></li> */}
      </ul>
    </NavContainer>
  );
}

export default Nav;
