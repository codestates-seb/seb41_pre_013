import styled from 'styled-components';
import Nav from '../components/Nav';
import { BasicButton, TagButton as Tag } from '../components/Button';
import Aside from '../components/Aside';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import AnswerDetailList from './AnswerDetailList';
import { useNavigate, useParams } from 'react-router-dom';
import { questionDelete } from '../api/Question';
import { QUES_ENDPOINT } from '../api/Question';
import useFetch from '../hooks/useFetch';
import Loading from '../components/Loading';
import { DateConvert } from '../util/common';

const Container = styled.div`
	width: 100%;
	max-width: var(--max-width);
	background: none;
	display: flex;
	justify-content: space-between;

	.main-content {
		max-width: calc(var(--max-width) - var(--nav-width));
		width: calc(100% - var(--nav-width));
		padding: var(--main-outline-margin);
		display: flex;
		flex-direction: column;

		.content-wrapper {
			width: 100%;
			display: flex;
		}
	}
`;

const QuestionHeader = styled.section`
	width: 100%;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid var(--line-color);
	margin-bottom: 16px;

	.title-box {
		padding-bottom: 16px;

		.question-title {
			height: 44px;

			h4 {
				font-size: 27px;
				font-weight: lighter;
				color: #3b4045;
			}
		}

		.question-info {
			.info-box {
				display: inline-block;
				margin-right: 12px;
				font-size: 12px;

				.info-title {
					padding-right: 6px;
				}

				.info-content {
					color: black;
				}
			}
		}
	}
`;

const ContentBox = styled.section`
	display: flex;
	flex-direction: column;
`;

const QuestionContent = styled.section`
	display: flex;
	justify-content: flex-start;

	.vote-box {
		width: 56px;
		margin-right: 10px;
		font-size: 20px;

		.vote-num {
			text-align: center;
			color: #6a737c;
		}
		.vote-icon {
			font-size: 60px;
			color: #babfc3;
		}
	}

	.sub-info {
		display: flex;
		flex-direction: column;

		.question-body {
			margin: 17px 0 20px;
			font-size: 15px;
			color: #232629;
			line-height: 1.5;
			overflow-wrap: break-word;
		}

		.tag-box {
			height: 45px;
			vertical-align: top;
			margin-bottom: 20px
		}

		.edit-delete-box {
			/* height: 75px; */
			vertical-align: top;

			button {
				background-color: transparent;
				font-size: 13px;
				margin-right: 10px;
				color: #6a737c;
			}
		}
	}
`;

function QuestionDetail() {
	const { questionId } = useParams();
	
	const [quesList, isLoading, error] = useFetch(`${QUES_ENDPOINT}/${questionId}`);
	console.log(quesList.createdAt);

	const navigate = useNavigate();

	const handleEditClick = (e) => {
		navigate(`/questions/${questionId}/edit`);
	}

	const handleDelClick = (e) => {
		console.log("questionId", questionId);
		questionDelete(questionId);
	}

	return (
		<Container>
			<Nav />
			{error && <div>질문 리스트 조회 실패</div>}
			{isLoading ? (
				<Loading />
			) : (
			<div className="main-content">
				<QuestionHeader>
					<div className="title-box">
						<div className="question-title">
							<h4>{quesList.title}</h4>
						</div>
						<div className="question-info">
							<div className="info-box">
								<span className="info-title">Asked</span>
								<span className="info-content">{DateConvert(quesList.createdAt)}</span>
							</div>
							<div className="info-box">
								<span className="info-title">Modified</span>
								<span className="info-content">12 days ago</span>
							</div>
							<div className="info-box">
								<span className="info-title">Viewed</span>
								<span className="info-content">12.1m times</span>
							</div>
						</div>
					</div>
					<BasicButton height="38" onClick={() => navigate('/askquestion')}>
						Ask Question
					</BasicButton>
				</QuestionHeader>
				<div className="content-wrapper">
					<ContentBox>
						<QuestionContent>
							<div className="vote-box">
								<RxTriangleUp className="vote-icon" />
								<div className="vote-num">1234</div>
								<RxTriangleDown className="vote-icon" />
							</div>
							<div className="sub-info">
								<div className="question-body">
									{quesList.content}
								</div>
								<div className="tag-box">
									{quesList.tagList.map((tag) => (
                    <Tag key={tag.id}>{tag.tagName}</Tag>
                  ))}
								</div>
								<div className="edit-delete-box">
									<button className="question-edit-btn" onClick={handleEditClick}>Edit</button>
									<button className="question-delete-btn" onClick={handleDelClick}>Delete</button>
								</div>
							</div>
						</QuestionContent>
						{/* 답변 조회, 작성 */}
						<AnswerDetailList />
					</ContentBox>
					<Aside />
				</div>
			</div>
			)}
		</Container>
	);
}

export default QuestionDetail;
