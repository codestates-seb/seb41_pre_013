import { Routes, Route, useLocation } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import React, { Suspense } from 'react';
import useScrollTop from './hooks/useScrollTop';
import SampleWithNav from './pages/SampleWithNav';
import SampleNoneNav from './pages/SampleNoneNav';

const Header = React.lazy(() => import('./components/Header'));
const Questoins = React.lazy(() => import('./pages/QuestionList'));
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const SignUpPage = React.lazy(() => import('./pages/SignUpPage'));
const AskQuestion = React.lazy(() => import('./pages/AskQuestion'));
const AskQuestionEdit = React.lazy(() => import('./pages/AskQuestionEdit'));
const AnswerEdit = React.lazy(() => import('./pages/AnswerEdit'));
const Footer = React.lazy(() => import('./components/Footer'));
const Loading = React.lazy(() => import('./components/Loading'));

function App() {
	useScrollTop();
	const { pathname } = useLocation();
	const viewFooter = !(
		pathname.indexOf('/login') > -1 || pathname.indexOf('/signup') > -1
	);
	return (
		<Suspense fallback={<Loading />}>
			<GlobalStyle />
			<div className="app">
				<Header />
				<Routes>
					<Route exact path="/" element={<Questoins />} />
					<Route path="/questions" element={<Questoins />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignUpPage />} />
					<Route path="/askquestion" element={<AskQuestion />} />
					<Route
						path="/questions/:questionId/edit"
						element={<AskQuestionEdit />}
					/>
					<Route path="/answers/:answerId/edit" element={<AnswerEdit />} />
					<Route path="/tags" element={<Questoins />} />
					<Route path="/users" element={<SampleNoneNav />} />
					<Route path="/companies" element={<SampleWithNav />} />
				</Routes>
				{viewFooter && <Footer />}
			</div>
		</Suspense>
	);
}

export default App;