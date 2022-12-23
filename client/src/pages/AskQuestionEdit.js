import styled from 'styled-components';
import Nav from '../components/Nav';
import Aside from '../components/Aside';
import EditForm from '../components/questions/EditForm';
import { useParams } from 'react-router-dom';

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
	font-size: var(--font-size-0-8rem);
	border: 1px solid #dacfa8;
	background-color: #fdf7e3;
	margin-bottom: 20px;

	p {
		margin-bottom: 20px;
	}
`;

function AskQuestionEdit() {
	const { questionId } = useParams();
	console.log('questionId', questionId);
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
					<EditForm />
				</MainContent>
				<Aside />
			</div>
		</ContentContainer>
	);
}

export default AskQuestionEdit;
