import styled from 'styled-components';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import Pagination from '../Pagination';

const AnswerContent = styled.div`
	width: 100%;
	margin: 30px 0 30px;

	.answer-total {
		margin: 18px 0 18px;

		h3 {
			line-height: 32px;
			font-size: 17px;
		}
	}

	.answer-content {
		h5 {
			font-size: 14px;
			font-weight: lighter;
		}
	}

	.answer-item {
		display: flex;
		justify-content: flex-start;
		margin: 16px 0 16px;
		border-bottom: 1px solid var(--line-color);

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

			.answer-item-content {
				margin: 17px 0 20px;
				font-size: 14px;
				color: #232629;
			}

			.answer-item-button-box {
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

		.answer-explain-text {
			border: 1px solid red;
			margin-top: 30px;
		}
	}
`;

const DetailList = () => {
	const answerList = new Array(12).fill().map((el, idx) => idx);
	const totalCnt = answerList.length;
	return (
		<AnswerContent>
			<div className="total-answer">
				<h3>{totalCnt} Answers</h3>
			</div>
			<div className="page">
				<Pagination pageInfo={{ viewPerPage: false, totalCnt }} />
			</div>
			{answerList.map((item) => (
				<div className="answer-item" key={item}>
					<div className="vote-box">
						<RxTriangleUp className="vote-icon" />
						<div className="vote-num">{item}</div>
						<RxTriangleDown className="vote-icon" />
					</div>
					<div className="sub-info">
						<div className="answer-item-content">
							I accidentally committed the wrong files to Git, but didn't push
							the commit to the server yet.
						</div>
						<div className="answer-item-button-box">
							<button type="button">Edit</button>
							<button type="button">Delete</button>
						</div>
					</div>
				</div>
			))}
			<div className="answer-explain-text">
				Know someone who can answer? Share a link to this question via email,
				Twitter, or Facebook.
			</div>
		</AnswerContent>
	);
};

export default DetailList;
