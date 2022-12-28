import styled from 'styled-components';
import Nav from '../components/Nav';
import Aside from '../components/Aside';
import EditForm from '../components/answers/EditForm';
import { useParams, Link } from 'react-router-dom';

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
		margin-bottom: 6px;
		border: 1px solid red;
		resize: vertical;
		height: 32px;
		overflow: hidden;
		margin-bottom: 3px;
	}

	.grippie {
		background-position: calc(50% + 34px) -364px;
		border: 1px solid #d6d8dc;
		border-width: 0 1px 1px;
		cursor: s-resize;
		height: 11px;
		overflow: hidden;
		background-color: #f0f2f4;
		margin-right: 0px;
		background-image: url(https://cdn.sstatic.net/Img/unified/sprites.svg?v=fcc0ea44ba27),
			none;
		background-size: initial;
		background-repeat: no-repeat;
		border-bottom-left-radius: 3px;
		border-bottom-right-radius: 3px;
	}
`;

function AnswerEdit() {
	const { answerId } = useParams();
	console.log('answerId', answerId);
	console.log('abcdefg');
	return (
		<ContentContainer>
			<Nav />
			<div className="content_wrapper">
				<MainContent>
					<NoticeBox>
						<p>
							Your edit will be placed in a queue until it is peer reviewed.
						</p>
						<div>
							We welcome edits that make the post easier to understand and more
							valuable for readers. Because community members review edits,
							please try to make the post substantially better than how you
							found it, for example, by fixing grammar or adding additional
							resources and hyperlinks.
						</div>
					</NoticeBox>
					<QuestionContent>
						<h4 className="question-title">
							<Link to={`/questions/`}>제목</Link>
						</h4>
						<div className="question-content">
							We welcome edits that make the post easier to understand and more
							valuable for readers. Because community members review edits,
							please try to make the post substantially better than how you
							found it, for example, by fixing grammar or adding additional
							resources and hyperlinks.
						</div>
						<div className="grippie"></div>
					</QuestionContent>
					<EditForm />
				</MainContent>
				<Aside />
			</div>
		</ContentContainer>
	);
}

export default AnswerEdit;
