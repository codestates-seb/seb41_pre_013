import styled from 'styled-components';
import Nav from '../components/Nav';
import Aside from '../components/Aside';
import EditForm from '../components/answers/EditForm';
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

	a,
	a:visited {
		color: #0162be;
		text-decoration: underline;
	}

	.explain_01 {
		margin-bottom: 40px;

		h4 {
			margin-bottom: 24px;
		}
		p {
			font-size: var(--font-size-0-9rem);
		}
	}
`;

const NoticeBox = styled.div`
	padding: 16px;
	font-size: var(--font-size-0-8rem);
	border: 1px solid #dacfa8;
	background-color: #fdf7e3;
	margin-bottom: 40px;

	p {
		margin-bottom: 15px;
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
					<div className="explain_01">
						<h4>
							Fullcalendar: How is possible to select multiple resource and days
							in timelive view
						</h4>
						<p>
							I'm using fullcalendar and I need to let user select multiple rows
							for create a multi-resource event (
							<a
								href="https://fullcalendar.io/docs/resource_data/associating_events/"
								rel="nofollow noreferrer"
							>
								documentation
							</a>
							) but I not find how to do so. Anyone have any idea?
						</p>
					</div>
					<EditForm />
				</MainContent>
				<Aside />
			</div>
		</ContentContainer>
	);
}

export default AnswerEdit;
