import styled from 'styled-components';
import { useState } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { TbBadge } from 'react-icons/tb';
import { GiBackwardTime } from 'react-icons/gi';
import { useParams, useNavigate } from 'react-router-dom';
import { AmountDisplay, DateFormat } from '../util/common';
import useFetch from '../hooks/useFetch';
import useMoveScroll from '../hooks/useMoveScroll';
import { ANSWER_ENDPOINT, answerDelete } from '../api/Answer';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import Pagination from '../components/Pagination';
import AddForm from '../components/answers/AddForm';

const AnswerContent = styled.div`
	width: 100%;
	margin-bottom: 30px;

	.answer-blank {
		height: 50px;
	}

	.answer-total {
		margin: 18px 0 18px;

		h3 {
			line-height: 32px;
			font-weight: lighter;
		}
	}

	.answer-item {
		display: flex;
		justify-content: flex-start;
		border-bottom: 1px solid var(--line-color);

		.vote-box {
			margin: 10px 10px 0 0;
			font-size: 20px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-direction: column;

			.vote-num {
				text-align: center;
				color: #6a737c;
			}

			.vote-icon {
				font-size: 44px;
				color: #babfc3;
			}

			.vote-icon2 {
				font-size: 25px;
				color: #babfc3;
				margin-bottom: 6px;
			}
		}

		.sub-info {
			width: 100%;
			display: flex;
			flex-direction: column;

			.answer-item-content {
				margin: 17px 0 20px;
				font-size: var(--font-size-0-9-3rem);
				line-height: 1.3rem;
				vertical-align: top;
				color: #232629;
				white-space: pre-wrap;
			}

			.answer-item-meta {
				display: flex;
				justify-content: space-between;
				margin-bottom: 20px;
			}

			.answer-item-meta-button {
				vertical-align: top;

				button {
					background-color: transparent;
					font-size: var(--font-size-0-8rem);
					margin-right: 10px;
					color: #6a737c;
				}
			}

			.answer-item-meta-user {
				width: 200px;
				height: 65px;
				padding: 6px;
				color: #69747b;
				border-radius: 4px;
				font-size: var(--font-size-0-8rem);

				.answer-createat {
					letter-spacing: 0;
				}
			}

			.answer-user-profile {
				display: flex;

				img {
					width: 32px;
					height: 32px;
					margin-top: 5px;
					vertical-align: top;
					border-radius: 3px;
				}

				.answer-user-info {
					width: calc(100% - 40px);
					margin: 3px 0 0 10px;
					font-size: var(--font-size-0-8-5rem);
					display: flex;
					flex-direction: column;

					.author {
						color: #3286d2;
						margin-bottom: 3px;
					}

					.reputation {
						span {
							padding: 0 5px 0 5px;
						}
					}

					.point-gold {
						color: #ffcc01;
					}
					.point-badge {
						color: #d2a683;
					}
					.point-silver {
						color: #b4b8be;
					}
				}
			}
		}
	}
`;

const DetailList = () => {
	const { questionId } = useParams();
	const navigate = useNavigate();
	const { element, onMoveToElement } = useMoveScroll();

	// status
	const [modal, setModal] = useState({ isOpen: false, msg: '' });
	const [reload, setReload] = useState(false);
	const [delAnswerId, setDelAnswerId] = useState(null);

	// answer list
	const [answerList, isLoading, error] = useFetch(
		ANSWER_ENDPOINT(questionId),
		reload
	);
	const totalCnt = isLoading ? 0 : answerList.length;

	const handleBtnClick = (e) => {
		const btnType = e.target.name;
		const answerId = e.target.value;

		if (btnType === 'edit-btn')
			navigate(`/questions/${questionId}/answers/${answerId}/edit`);
		else if (btnType === 'del-btn') {
			setDelAnswerId(answerId);
			setModal({ isOpen: true, msg: '정말 삭제하시겠습니까?' });
		}
	};

	const answerRemove = () => {
		modalClose();

		const successCb = () => rerender();
		const failCb = () => alert('답변 삭제에 실패했습니다.');
		answerDelete(delAnswerId, successCb, failCb);
	};

	const modalClose = () => {
		setModal({ isOpen: false, msg: '' });
	};

	const rerender = () => {
		setReload(!reload);
		if (element != null) onMoveToElement();
	};

	const goPage = (pageNum) => {
		rerender();
	};

	return (
		<AnswerContent ref={element}>
			<div className="answer-blank"></div>
			<div className="answer-total">
				<h3>{AmountDisplay(totalCnt)} Answers</h3>
			</div>
			{error && <div>답변 리스트 조회 실패</div>}
			{isLoading ? (
				<Loading />
			) : (
				<>
					{modal.isOpen && (
						<Modal
							message={modal.msg}
							confirmFn={answerRemove}
							cancelFn={modalClose}
						/>
					)}
					{totalCnt > 1 && (
						<div>
							<Pagination
								pageInfo={{ viewPerPage: false, totalCnt }}
								goPage={goPage}
							/>
						</div>
					)}
					{answerList.map((item) => (
						<div className="answer-item" key={item.id}>
							<div className="vote-box">
								<GoTriangleUp className="vote-icon" />
								<div className="vote-num">0</div>
								<GoTriangleDown className="vote-icon" />
								<TbBadge className="vote-icon2" />
								<GiBackwardTime className="vote-icon2" />
							</div>
							<div className="sub-info">
								<div className="answer-item-content">{item.content}</div>
								<div className="answer-item-meta">
									<div className="answer-item-meta-button">
										<button
											type="button"
											name="edit-btn"
											value={item.id}
											onClick={handleBtnClick}
										>
											Edit
										</button>
										<button
											type="button"
											name="del-btn"
											value={item.id}
											onClick={handleBtnClick}
										>
											Delete
										</button>
									</div>
									<div className="answer-item-meta-user">
										<div className="answer-createat">
											answered {DateFormat(item.createdAt)}
										</div>
										<div className="answer-user-profile">
											<img
												src="https://www.gravatar.com/avatar/cab253e189e0f34e97bcc22686784d33?s=64&d=identicon&r=PG"
												alt="user avata"
											/>
											<div className="answer-user-info">
												<span className="author">{item.displayName}</span>
												<span className="reputation">
													<strong>6,473</strong>
													<span className="point-gold">●</span>2
													<span className="point-silver">●</span>55
													<span className="point-badge">●</span>44
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					))}
					{totalCnt > 30 && (
						<div>
							<Pagination
								pageInfo={{ viewPerPage: false, totalCnt }}
								goPage={goPage}
							/>
						</div>
					)}
				</>
			)}
			<AddForm rerender={rerender} />
		</AnswerContent>
	);
};

export default DetailList;
