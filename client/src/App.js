import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import React, { Suspense } from 'react';
import useScrollTop from './hooks/useScrollTop';

const Header = React.lazy(() => import('./components/Header'));
const Questoins = React.lazy(() => import('./pages/QuestionList'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const AskQuestion = React.lazy(() => import('./pages/AskQuestion'));
const Footer = React.lazy(() => import('./components/Footer'));
const Loading = React.lazy(() => import('./components/Loading'));

function App() {
	useScrollTop();
	return (
		<BrowserRouter basename={process.env.PUBLIC_URL}>
			<GlobalStyle />
			<Suspense fallback={<Loading />}>
				<>
					<div className="app">
						<Header />
						<Routes>
							<Route exact path="/" element={<Questoins />} />
							<Route path="/questions" element={<Questoins />} />
							<Route path="/login" element={<LoginPage />} />
							<Route path="/signup" element={<SignUpPage />} />
							<Route path="/askquestion" element={<AskQuestion />} />
							<Route path="/tags" element={<Questoins />} />
							<Route path="/users" element={<Questoins />} />
							<Route path="/companies" element={<Questoins />} />
						</Routes>
						<Footer />
					</div>
				</>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;