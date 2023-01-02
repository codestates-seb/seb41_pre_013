import styled from 'styled-components';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import Aside from '../components/Aside';
import EditForm from '../components/answers/EditForm';
import Modal from '../components/Modal';
import Toest from '../components/Toest';
import { getLoginInfo } from '../api/LoginInfo';

const ContentContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	background: none;
	display: flex;
	justify-content: space-between;

	.content_wrapper {
		max-width: calc(var(--max-width) - var(--nav-width));
		width: calc(100% - var(--nav-width));
		padding: var(--main-outline-margin);
		display: flex;
		justify-content: space-between;
	}

	@media (max-width: 640px) {
		.content_wrapper {
			width: 100%;
		}
	}
`;

const MainContent = styled.main`
	width: 100%;
	display: flex;
	flex-direction: column;
	margin-bottom: 20px;
`;

const NoticeBox = styled.div`
	padding: 16px;
	font-size: var(--font-size-0-8-5rem);
	border: 1px solid #dacfa8;
	background-color: #fdf7e3;

	p {
		margin-bottom: 1rem;
	}

	div {
		line-height: 1.1rem;
	}
`;

const QuestionContent = styled.section`
	.question-title {
		color: #0162be;
		margin: 16px 0 19px;

		a:visited {
			color: #0162be;
		}
	}

	.question-content {
		color: #3b4043;
		resize: vertical;
		height: 50px;
		overflow: hidden;
		/* border-bottom: 1px solid var(--line-color); */
		white-space: pre-wrap;
	}

	.grippie {
		border: 1px solid #d6d8dc;
		border-width: 0 1px 1px;
		height: 11px;
		overflow: hidden;
		background-color: #f0f2f4;
		margin-right: 0px;
		background-size: initial;
		background-repeat: no-repeat;
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
		text-align: right;
	}
`;

function AnswerEdit() {
	// hook
	const navigate = useNavigate();
	const locationState = useLocation().state;

	// state
	const [modal, setModal] = useState({ isOpen: false, msg: '' });
	const [toest, setToest] = useState({ isOpen: false, msg: '' });
	const [pageLoad, setPageLoad] = useState(false);

	// base info
	const loginMemberId = getLoginInfo().memberId;
	let answerItem, questionItem;
	if (locationState) {
		answerItem = locationState.answerItem;
		questionItem = locationState.questionItem;
	}

	// func
	const toestView = (isOpen, msg) => {
		setToest({ isOpen, msg });
	};

	useEffect(() => {
		if (!loginMemberId) {
			// 미 로그인
			setModal({
				isOpen: true,
				msg: '로그인이 필요한 메뉴입니다.\n 로그인 하시겠습니까?',
			});
		} else if (!locationState) {
			// 필수 파라미터가 없는 경우(AnswerDetailList 링크 state로 전달됨)
			toestView(true, '잘못된 요청입니다.');
		} else if (loginMemberId && locationState) {
			// 작성자가 아닌 경우
			if (Number(loginMemberId) !== answerItem.memberId) {
				toestView(true, '수정 권한이 없습니다.');
			} else {
				setPageLoad(true);
			}
		} else {
			setPageLoad(true);
		}
	}, [loginMemberId, answerItem, locationState]);

	return (
		<ContentContainer>
			{toest.isOpen && (
				<Toest
					message={toest.msg}
					callback={() => {
						setToest(false, '');
						navigate('/');
					}}
				/>
			)}
			{modal.isOpen && (
				<Modal
					message={modal.msg}
					confirmFn={() => navigate('/login')}
					cancelFn={() => navigate('/')}
				/>
			)}
			<Nav />
			{pageLoad && locationState && (
				<div className="content_wrapper">
					<MainContent>
						<NoticeBox>
							<p>
								Your edit will be placed in a queue until it is peer reviewed.
							</p>
							<div>
								We welcome edits that make the post easier to understand and
								more valuable for readers. Because community members review
								edits, please try to make the post substantially better than how
								you found it, for example, by fixing grammar or adding
								additional resources and hyperlinks.
							</div>
						</NoticeBox>
						<QuestionContent>
							<h4 className="question-title">
								<Link to={`/questions/${questionItem.id}`}>
									{questionItem.title}
								</Link>
							</h4>
							<div className="question-content">{questionItem.content}</div>
							<div className="grippie"></div>
						</QuestionContent>
						<EditForm answerItem={answerItem} questionId={questionItem.id} />
					</MainContent>
					<Aside />
				</div>
			)}
		</ContentContainer>
	);
}

export default AnswerEdit;
