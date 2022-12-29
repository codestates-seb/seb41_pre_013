import styled from 'styled-components';
import { GrSearch } from 'react-icons/gr';
import { BasicButton, LoginButton } from './Button';
import { Link } from 'react-router-dom';
import axios from "axios";

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
	font-size: var(--font-size-0-8rem);
	border-top: 3px solid var(--line-color-top-orange);
	border-bottom: 2px solid #ececec;
	box-shadow: 0 5px 5px -5px #e5e5e5;
	background-color: #f8f9f9;
	z-index: 2;
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
		background-image: url('https://cdn.sstatic.net/Img/unified/sprites.svg?v=fcc0ea44ba27');
	}
	a {
		width: 164px;
		height: 100%;
		margin: 2px;
		text-align: center;
	}
	a:hover {
		background-color: #e4e6e8;
	}
	.header_menu {
		padding: 14px;
		font-size: 12px;
	}
	.top_buttons {
		margin-right: var(--main-outline-margin);
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
	border: 1px solid #b8bcc0;
	border-radius: 3px;
	background-color: white;

	:focus-within {
		border: var(--border-input-focus);
		outline: var(--outline-input-focus);
	}
	input {
		color: #848c95;
		border: none;
		outline: none;
		margin-left: 10px;
		margin-right: 10px;
		width: 100%;
		background: none;
	}
	svg {
		font-size: var(--font-size-1-2rem);
		color: red;
	}
`;

const DisNameStyle = styled.button`
	background-color: #465a65;
	color: white;
	padding: 8px;
	margin-right: 10px;
	margin-left: 0px;
	border-radius: 4px;
	width: 32px;
	height: 30px;
	text-align: center;
`;

function Header({ isLogin, setIsLogin }) {
	const disName = localStorage.getItem('displayName')

	// 로그아웃 요청
	const logout = async () => {
    try {
      const response = await axios
	  .get(process.env.REACT_APP_API_LOGOUT_ENDPOINT);
      const { status } = response;
      if (status === 200) {
        localStorage.removeItem("email");
        localStorage.removeItem("token");
        setIsLogin(false)
        alert("로그아웃되었습니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  	// 페이지 새로고침 onClick에 "location.reload"를 넣으면 warning뜨므로 함수로 만들기
	const onReloadLogin = () => {
      window.location.replace("/login");
    };

    const onReloadSignUp = () => {
      window.location.replace("/signup");
    };


	return (
    <HeaderContainer>
      <TopBarContainer>
        <a href="/">
          <span className="logo_img">stack overflow</span>
        </a>
        <span className="header_menu">About</span>
        <span className="header_menu">Products</span>
        <span className="header_menu">For Teams</span>
        <SearchBar>
          <GrSearch />
          <input
            name="q_text"
            type="text"
            role="combobox"
            aria-label="Search"
            aria-controls="top-search"
            aria-expanded="true"
            placeholder="Search…"
          />
        </SearchBar>

        {isLogin ? (
          <>
            <DisNameStyle>{disName.slice(0, 1)}</DisNameStyle>
            <div className="top_buttons">
              <LoginButton onClick={logout}>Logout</LoginButton>
            </div>
          </>
        ) : (
          <div className="top_buttons">
            <Link to="/login">
              <LoginButton onClick={onReloadLogin}>Login</LoginButton>
            </Link>
            <Link to="/signup">
              <BasicButton onClick={onReloadSignUp}>Sign up</BasicButton>
            </Link>
          </div>
        )}
      </TopBarContainer>
    </HeaderContainer>
  );
}
export default Header;
