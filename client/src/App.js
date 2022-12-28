import React, { Suspense } from 'react';
import GlobalStyle from './GlobalStyle';
import React, { Suspense, useState } from 'react';
import ScrollTop from './components/ScrollTop';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Questions = React.lazy(() => import('./pages/QuestionList'));
const QuestionDetail = React.lazy(() => import('./pages/QuestionDetail'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const AskQuestion = React.lazy(() => import('./pages/AskQuestion'));
const AskQuestionEdit = React.lazy(() => import('./pages/AskQuestionEdit'));
const AnswerEdit = React.lazy(() => import('./pages/AnswerEdit'));
const Loading = React.lazy(() => import('./components/Loading'));

function App() {
	const [isLogin, setIsLogin] = useState(false);

	const { pathname } = useLocation();
	const viewFooter = !(
		pathname.indexOf('/login') > -1 || pathname.indexOf('/signup') > -1
	);
	return (
		<>
			<GlobalStyle />
			<ScrollTop />
			<div className="app">
				<Header isLogin={isLogin} setIsLogin={setIsLogin}/>
				<Routes>
					<Route exact path="/" element={<Questions />} />
					<Route path="/questions" element={<Questions />} />
					<Route path="/questions/:questionId" element={<QuestionDetail />} />
					<Route path="/login" element={<LoginPage setIsLogin={setIsLogin}/>} />
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
				{viewFooter && <Footer />}
			</div>
		</>
	);
}

export default App;
