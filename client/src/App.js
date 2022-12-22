import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Header from './components/Header';
import QuestionList from './pages/Sample';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AskQuestion from './pages/AskQuestion';

const GlobalStyle = createGlobalStyle`
  :root {
    --line-color-top-orange: #EC8A3C;
    --line-color: #E1E3E6;
    --font-color-base: #737A82;
    --font-color-title: #242629;
    --max-width: 1264px; /* 164(left) / 24+730+24(main) / 298(aside) */
    --nav-width: 164px;
    --aside-width: 298px;
    --main-outline-margin: 24px;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;    
  }
  body {
    font-size: 0.9rem;
    color: var(--font-color-base);
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    overflow: hidden;
  }
  .app {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    color: black;
  }
  button {
    cursor: pointer;
    outline: none;
    border: none;
  }
  aside {
    width: var(--aside-width);
    margin-top: var(--main-outline-margin);
  }
`;

function App() {
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<GlobalStyle />
			<div className="app">
				<Header />
				<Routes>
					<Route exact path="/" element={<QuestionList />} />
					<Route path="/question/:questionId" element={<QuestionList />} />
					<Route path="/question" element={<QuestionList />} />
					<Route path="/companies" element={<QuestionList />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/users" element={<SignUpPage />} />
					<Route path="/askquestion" element={<AskQuestion />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
