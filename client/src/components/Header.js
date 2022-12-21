import styled from "styled-components";
import { GrSearch } from "react-icons/gr";
import { BasicButton, LoginButton } from "./Button";

const HeaderContainer = styled.header`
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  min-width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 3px solid var(--line-color-top-orange);
  border-bottom: 2px solid #ECECEC;
  box-shadow: 0 5px 5px -5px #E5E5E5;
  background-color: #F8F9F9;
`;

const TopBarContainer = styled.div`
  width: 100%;
  max-width: var(--max-width);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .logo_img {
    display: inline-block;
    text-indent: -9999em;
    height: 30px;
    width: 146px;
    margin-top: 5px;
    margin-left: 0;
    background-position: 0 -500px;
    background-image: url("https://cdn.sstatic.net/Img/unified/sprites.svg?v=fcc0ea44ba27");
  }
  a {
    width: 164px;
    height: 100%;
    margin-right: 20px;
    text-align: center;
  }
  a:hover {
    background-color: #E4E6E8;
  }
`;

const SearchBar = styled.div`
  flex-grow: 1;
  height: 32px;
  display: flex;
  align-items: center;
  margin-left: 10px;
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #B8BCC0;
  border-radius: 3px;

  input {
    color: var(--font-color-base);
    border: none;
    outline: none;
    margin-left: 10px;
    margin-right: 10px;
  }
  svg {
    font-size: 1.3rem;
    color: red;   
  }
`;



function Header() {
return (
  <HeaderContainer>
    <TopBarContainer>
      <a href="/"><span className="logo_img">stack overflow</span></a>
      <span>About</span>
      <span>Products</span>
      <SearchBar>
        <GrSearch />        
        <input 
          name="q_text" 
          type="text" 
          role="combobox"
          autocomplete="off"
          maxlength="240" 
          aria-label="Search" 
          aria-controls="top-search" 
          aria-expanded="true"
          placeholder="Search…" 
        />        
      </SearchBar>
      <div className="top_buttons">
        <LoginButton>Log in</LoginButton>&nbsp;
        <BasicButton>Sign up</BasicButton>&nbsp;&nbsp;
      </div>      
    </TopBarContainer>
  </HeaderContainer>
  );
}

export default Header;
