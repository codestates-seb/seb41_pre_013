import { Routes, Route, useLocation } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import React, { lazy, Suspense, useState } from 'react';
import ScrollTop from './components/ScrollTop';
import Header from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';

const Questions = lazy(() => import('./pages/QuestionList'));
const QuestionDetail = lazy(() => import('./pages/QuestionDetail'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const AskQuestion = lazy(() => import('./pages/AskQuestion'));
const AskQuestionEdit = lazy(() => import('./pages/AskQuestionEdit'));
const AnswerEdit = lazy(() => import('./pages/AnswerEdit'));

function App() {
	const [isLogin, setIsLogin] = useState(
		localStorage.getItem('token') !== null
	);

	const { pathname } = useLocation();
	const viewFooter = !(
		pathname.indexOf('/login') > -1 || pathname.indexOf('/signup') > -1
	);
	return (
		<>
			<GlobalStyle />
			<ScrollTop />
			<div className="app">
				<Header isLogin={isLogin} setIsLogin={setIsLogin} />
				<Suspense fallback={<Loading />}>
					<Routes>
						<Route exact path="/" element={<Questions />} />
						<Route path="/questions" element={<Questions />} />
						<Route path="/questions/:questionId" element={<QuestionDetail />} />
						<Route
							path="/login"
							element={<LoginPage setIsLogin={setIsLogin} />}
						/>
						<Route path="/signup" element={<SignUpPage />} />
						<Route path="/askquestion" element={<AskQuestion />} />
						<Route
							path="/questions/:questionId/edit"
							element={<AskQuestionEdit />}
						/>
						<Route
							path="/questions/:questionId/answers/:answerId/edit"
							element={<AnswerEdit />}
						/>
						<Route path="/tags" element={<Questions />} />
						<Route path="/users" element={<Questions />} />
						<Route path="/companies" element={<Questions />} />
					</Routes>
				</Suspense>
				{viewFooter && <Footer />}
			</div>
		</>
	);
}

export default App;
