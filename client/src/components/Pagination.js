import { useState } from 'react';
import styled from 'styled-components';
import { PageButton } from './Button';

const PaginationBox = styled.div`
	color: var(--font-color-title);
	display: flex;
	justify-content: space-between;
	font-size: var(--font-size-0-8rem);
	font-family: var(--font-family-tag);
	margin: 16px 0 16px;

	.more_page_text {
		vertical-align: top;
		margin: 0 10px 0 10px;
	}
`;

const Pagination = ({
	pageInfo = { viewPerPage: false, totalCnt: 0 },
	goPage,
}) => {
	console.log('-- Pagination --');
	const { viewPerPage, totalCnt } = pageInfo;
	const pageViewCnt = 5; // 보여지는 페이지 갯수

	const [nowPage, setNowPage] = useState(1);
	const [itemViewCnt, setItemViewCnt] = useState(15);

	// ------------------- 페이지 계산
	const totalPage = Math.ceil(totalCnt / itemViewCnt);

	// 이전(prev)/다음(next) 버튼
	let isPrev, isNext;
	if (nowPage <= totalPage && nowPage > 1) isPrev = true;
	if (nowPage < totalPage) isNext = true;

	// 처음(1)/마지막(totalPage) 페이지 버튼
	let isFirst, isLast;
	if (nowPage >= pageViewCnt && totalPage > pageViewCnt) isFirst = true;
	if (nowPage < totalPage && totalPage > pageViewCnt) isLast = true;
	// if (totalPage <= pageViewCnt) {
	// 	isFirst = true;
	// 	isLast = true;
	// } else {
	// 	if (nowPage < pageViewCnt) isFirst = true;
	// 	if (nowPage > totalPage - pageViewCnt + 2) isLast = true;
	// }

	// 페이지 리스트 [1,2,3,4,5]
	let sPageNum = isFirst ? 1 : nowPage - 2;
	let ePageNum =
		sPageNum + pageViewCnt - 1 > totalPage
			? totalPage
			: sPageNum + pageViewCnt - 1;
	if (isLast) sPageNum = totalPage - pageViewCnt + 1;
	const pageList = new Array(ePageNum - sPageNum + 1)
		.fill()
		.map((el, idx) => sPageNum + idx);

	// console.log(`isPrev=${isPrev}, isNext=${isNext}`);
	// console.log(`isFirst=${isFirst}, isLast=${isLast}`);
	// console.log(`sPageNum=${sPageNum}, ePageNum=${ePageNum}`);
	// -------------------

	const handlePageNum = (e) => {
		const pageNum = Number(e.target.value);
		setNowPage(pageNum);
		goPage(pageNum, itemViewCnt);
	};

	const handleItemViewCnt = (e) => {
		const perPage = Number(e.target.value);
		setItemViewCnt(perPage);
		goPage(nowPage, perPage);
	};

	return (
		<PaginationBox>
			<div>
				{/* 이전 버튼 */}
				{isPrev && (
					<PageButton onClick={handlePageNum} value={nowPage - 1}>
						Prev
					</PageButton>
				)}
				{/* 첫 페이지 버튼 */}
				{isFirst && (
					<>
						<PageButton onClick={handlePageNum} value="1">
							1
						</PageButton>
						<span className="more_page_text">...</span>
					</>
				)}
				{pageList.map((pageNum) => (
					<PageButton
						key={pageNum}
						onClick={handlePageNum}
						value={pageNum}
						selected={nowPage === pageNum ? true : false}
					>
						{pageNum}
					</PageButton>
				))}
				{/* 마지막 페이지 버튼 */}
				{isLast && (
					<>
						<span className="more_page_text">...</span>
						<PageButton onClick={handlePageNum} value={totalPage}>
							{totalPage}
						</PageButton>
					</>
				)}
				{/* 다음 버튼 */}
				{isNext && (
					<PageButton onClick={handlePageNum} value={nowPage + 1}>
						Next
					</PageButton>
				)}
			</div>
			{viewPerPage && (
				<div>
					<PageButton
						value="15"
						selected={itemViewCnt === 15 ? true : false}
						onClick={handleItemViewCnt}
					>
						15
					</PageButton>
					<PageButton
						value="30"
						selected={itemViewCnt === 30 ? true : false}
						onClick={handleItemViewCnt}
					>
						30
					</PageButton>
					<PageButton
						value="50"
						selected={itemViewCnt === 50 ? true : false}
						onClick={handleItemViewCnt}
					>
						50
					</PageButton>
					<span>&nbsp;per page</span>
				</div>
			)}
		</PaginationBox>
	);
};

export default Pagination;
