import styled from 'styled-components';
import { BiFilter } from 'react-icons/bi';
import { AiFillCaretDown } from 'react-icons/ai';
import { BasicButton } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import useFetch from '../hooks/useFetch';
import { AmountDisplay } from '../util/common';
import { useState } from 'react';
import { QUES_ENDPOINT } from '../api/Question';
import Nav from '../components/Nav';
import Aside from '../components/Aside';
import Toest from '../components/Toest';
import Item from '../components/questions/Item';
import Pagination from '../components/Pagination';

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

	.content_title {
		display: flex;
		justify-content: space-between;
		margin-bottom: 24px;
	}
`;

const ListOption = styled.div`
	height: 35px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: right;
	margin-bottom: 15px;

	h4 {
		font-weight: lighter;
	}

	.content_option_btns {
		height: 100%;
		display: flex;
		align-items: center;
	}
	.content_optoin_btn_general {
		height: 100%;
		border: 1px solid #9fa6ad;
		border-radius: 4px;
		margin-right: 10px;

		button {
			height: 100%;
			color: var(--font-color-base);
			background: none;
			padding: 7px;

			:hover {
				background-color: #f8f9f9;
			}
			:not(:last-child) {
				border-right: 1px solid #9fa6ad;
			}
			svg {
				font-size: var(--font-size-0-8rem);
				vertical-align: middle;
			}
		}
		.selected {
			background-color: #e4e6e8;
		}
	}
	.content_option_btn_filter {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #3a739d;
		border: 1px solid #79a7c7;
		background-color: #e1ecf4;
		border-radius: 4px;
		padding: 6px;

		:hover {
			background-color: #b9d2e8;
		}
		svg {
			font-size: var(--font-size-1-2rem);
		}
	}
`;

const List = styled.ul`
	margin: 12px 0 20px -24px;
`;

function QuestionList() {
	const navigate = useNavigate();

	// state
	const [params, setParams] = useState({ page: 1, size: 15 });
	const [toest, setToest] = useState({ isOpen: false, msg: '' });

	// question list
	const [data, isLoading, error] = useFetch(QUES_ENDPOINT, params);
	let list,
		pageInfo = {
			page: params.page,
			size: params.size,
			totalCnt: 0,
			totalPage: 0,
			pageCnt: 5,
			perPage: true,
		};
	if (data) {
		list = data.response;
		pageInfo.totalCnt = data.pageInfo.totalElements;
		pageInfo.totalPage = data.pageInfo.totalPages;
	}

	// handle
	const goPage = (page, size) => {
		setParams({ page, size });
	};

	const toestView = (isOpen, msg) => {
		setToest({ isOpen, msg });
	};

	return (
		<ContentContainer>
			<Nav />
			<div className="content_wrapper">
				{toest.isOpen && (
					<Toest message={toest.msg} callback={toestView(false, '')} />
				)}
				<MainContent>
					<div className="content_title">
						<h2>All Questions</h2>
						<BasicButton height="38" onClick={() => navigate('/askquestion')}>
							Ask Question
						</BasicButton>
					</div>
					{error && <div>질문 리스트 조회 실패</div>}
					{isLoading && <Loading />}
					{data && (
						<>
							<ListOption>
								<h4>
									{AmountDisplay(pageInfo.totalCnt)} questions with bounties
								</h4>
								<div className="content_option_btns">
									<div className="content_optoin_btn_general">
										<button>Newest</button>
										<button>Active</button>
										<button>Bountied</button>
										<button>Unanswered</button>
										<button>
											More&nbsp;
											<AiFillCaretDown />
										</button>
									</div>
									<button className="content_option_btn_filter">
										<BiFilter />
										Filter
									</button>
								</div>
							</ListOption>
							{pageInfo.totalCnt === 0 && <div>등록된 질문이 없습니다.</div>}
							<List>
								{list.map((item) => (
									<Item key={item.id} item={item} />
								))}
							</List>
							<Pagination pageInfo={pageInfo} goPage={goPage} />
						</>
					)}
				</MainContent>
				<Aside />
			</div>
		</ContentContainer>
	);
}

export default QuestionList;
