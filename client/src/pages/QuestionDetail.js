import styled from 'styled-components';
import Nav from '../components/Nav';
import { BasicButton, TagButton as Tag } from '../components/Button';
import Aside from '../components/Aside';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import { default as AnswerDetailList } from '../components/answers/DetailList';
import { default as AnswerAddForm } from '../components/answers/AddForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { questionDelete } from '../api/Question';

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
			font-size: 14px;
			color: #232629;
			line-height: 1.5;
			overflow-wrap: break-word;
		}

		.tag-box {
			height: 45px;
			vertical-align: top;
			margin-bottom: 20px;
		}

		.edit-delete-box {
			height: 75px;
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

function QuestionDetail({ handleDeleteQuestion }) {
	const id = useParams();
	console.log(id);
	let saveId = id.questionId;

	const navigate = useNavigate();

	const handleDeleteClick = (saveId) => {
		questionDelete(saveId.detail);
		navigate(-1);
	}

	return (
		<Container>
			<Nav />
			<div className="main-content">
				<QuestionHeader>
					<div className="title-box">
						<div className="question-title">
							<h4>How do...</h4>
						</div>
						<div className="question-info">
							<div className="info-box">
								<span className="info-title">Asked</span>
								<span className="info-content">13 years, 6 months ago</span>
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
									This program prints the values stored inside vector num.
									<br />
									<br />
									What I want to ask is, why we used const keyword for 'i' in
									the for loop. Can't we use pointer variable? And why we don't
									need to increment i?
								</div>
								<div className="tag-box">
									<Tag>git</Tag>
									<Tag>version-control</Tag>
									<Tag>git-commit</Tag>
									<Tag>undo</Tag>
									<Tag>git</Tag>
									<Tag>git-commit</Tag>
									<Tag>undo</Tag>
									<Tag>git</Tag>
									<Tag>git-commit</Tag>
									<Tag>undo</Tag>
								</div>
								<div className="edit-delete-box">
									<button className="question-edit-btn" onClick={() => navigate(`/questions/${saveId}/edit`)}>Edit</button>
									<button className="question-delete-btn" onClick={handleDeleteClick}>Delete</button>
								</div>
							</div>
						</QuestionContent>
						{/* 답변 조회 */}
						<AnswerDetailList />
					</ContentBox>
					<Aside />
				</div>
			</div>
		</Container>
	);
}

export default QuestionDetail;
