import styled from 'styled-components';
import { useState } from 'react';
import { GoTriangleUp, GoTriangleDown } from 'react-icons/go';
import { TbBadge } from 'react-icons/tb';
import { GiBackwardTime } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { AmountDisplay, DateFormat } from '../util/common';
import useFetch from '../hooks/useFetch';
import useMoveScroll from '../hooks/useMoveScroll';
import { ANSWER_ENDPOINT, answerDelete } from '../api/Answer';
import Loading from '../components/Loading';
import Modal from '../components/Modal';
import Toest from '../components/Toest';
import Pagination from '../components/Pagination';
import AddForm from '../components/answers/AddForm';
import { getLoginInfo } from '../api/LoginInfo';

const AnswerContent = styled.div`
	width: 100%;
	margin-bottom: 30px;
	/* border: 1px solid red; */

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

				button,
				a {
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

const DetailList = ({ questionItem }) => {
	// hook
	const { element, onMoveToElement } = useMoveScroll();

	// base info
	const questionId = questionItem.id;
	const loginMemberId = getLoginInfo().memberId;

	// state
	const [modal, setModal] = useState({ isOpen: false, msg: '' });
	const [toest, setToest] = useState({ isOpen: false, msg: '' });
	const [delAnswerId, setDelAnswerId] = useState(null);
	const [clickPoint, setClickPoint] = useState({ x: 0, y: 0 });
	const [listReload, setListReload] = useState(false);
	const [params, setParams] = useState({
		'question-id': questionId,
		page: 1,
		size: 15,
	});

	// answer list
	const [data, isLoading, error] = useFetch(
		ANSWER_ENDPOINT,
		params,
		listReload
	);
	let list,
		pageInfo = {
			page: params.page,
			size: params.size,
			totalCnt: 0,
			totalPage: 0,
			pageCnt: 5,
			perPage: false,
		};
	if (data) {
		list = data.response;
		pageInfo.totalCnt = data.pageInfo.totalElements;
		pageInfo.totalPage = data.pageInfo.totalPages;
	}

	// func & handle
	const handleDelClick = (e) => {
		const answerId = e.target.value;

		setDelAnswerId(answerId);
		modalView(true, '정말 삭제하시겠습니까?');
	};

	// answer delete
	const answerRemove = async () => {
		modalView(false, '');

		const result = await answerDelete(delAnswerId);
		if (result.state === 'OK') alertAndMove(result.msg, true);
		else alertAndMove('답변 삭제에 실패했습니다.', false);
	};

	// 답변 입력, 삭제 후 메시지 안내 및 위치 이동
	// msg = 처리 안내 메시지, pointMove = answer list 상단 이동 여부
	const alertAndMove = (msg, pointMove) => {
		setListReload(!listReload);
		toestView(true, msg);
		if (pointMove && element != null) onMoveToElement();
	};

	const goPage = (page, size) => {
		setParams({ page, size });
	};

	const modalView = (isOpen, msg) => {
		setModal({ isOpen, msg });
	};

	const toestView = (isOpen, msg) => {
		setToest({ isOpen, msg });
	};

	const handleClickPoint = (e) => {
		setClickPoint({
			x: e.nativeEvent.clientX,
			y: e.nativeEvent.clientY,
		});
	};

	// 답변 수정 후 리스트 호출 시, 수정된 답변 위치로 이동 후 애니메이션 재생
	// const { editAnswerId } = useLocation().state;
	// const { editAnswerEl, moveToEditAnswerEl } = useMoveScroll();

	return (
		<AnswerContent ref={element} onClick={handleClickPoint}>
			{toest.isOpen && (
				<Toest message={toest.msg} callback={() => toestView(false, '')} />
			)}
			<div className="answer-blank"></div>
			<div className="answer-total">
				<h3>{AmountDisplay(pageInfo.totalCnt)} Answers</h3>
			</div>
			{error && <div>답변 리스트 조회 실패</div>}
			{isLoading && <Loading />}
			{data && (
				<>
					{modal.isOpen && (
						<Modal
							message={modal.msg}
							confirmFn={answerRemove}
							cancelFn={() => modalView(false, '')}
							viewPoint={clickPoint}
						/>
					)}
					{pageInfo.totalPage > 1 && (
						<div>
							<Pagination pageInfo={pageInfo} goPage={goPage} />
						</div>
					)}
					{list.map((item) => (
						<div className="answer-item" key={item.answerId}>
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
										{loginMemberId &&
											item.memberId === Number(loginMemberId) && (
												<>
													<Link
														to={`/questions/${questionId}/answers/${item.answerId}/edit`}
														state={{ answerItem: item, questionItem }}
													>
														Edit
													</Link>
													<button
														type="button"
														name="del-btn"
														value={item.answerId}
														onClick={handleDelClick}
													>
														Delete
													</button>
												</>
											)}
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
					{pageInfo.totalPage > 1 && (
						<div>
							<Pagination pageInfo={pageInfo} goPage={goPage} />
						</div>
					)}
				</>
			)}
			{loginMemberId && <AddForm alertAndMove={alertAndMove} />}
		</AnswerContent>
	);
};

export default DetailList;
