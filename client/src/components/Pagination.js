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
	pageInfo = {
		page: 1,
		size: 15,
		totalCnt: 0,
		totalPage: 0,
		pageCnt: 5,
		perPage: false,
	},
	goPage,
}) => {
	// props
	const { page, size, totalPage, pageCnt, perPage } = pageInfo;

	// ---------------- page calc
	const prev = page > 1 ? true : false;
	const next = page < totalPage ? true : false;

	// 페이지가 1개일 때
	let sPage = 1,
		ePage = totalPage;
	let first = false,
		last = false;

	// 페이지가 2개 이상일 때
	if (totalPage >= pageCnt + 2) {
		if (page >= pageCnt) first = true;
		if (totalPage - pageCnt + 1 >= page) last = true;

		if (first) sPage = page - 2;
		if (page > totalPage - pageCnt + 1) sPage = totalPage - pageCnt + 1;
		if (sPage > 2) first = true;
		if (sPage + (pageCnt - 1) < totalPage) ePage = sPage + (pageCnt - 1);
	}

	// 페이지 리스트
	const pageList = new Array(ePage - sPage + 1)
		.fill()
		.map((el, idx) => sPage + idx);
	// ----------------

	// hook
	const handleChangePage = (e) => {
		const selectedPage = Number(e.target.value);
		goPage(selectedPage, size);
	};

	const handleChangeSize = (e) => {
		const selectedSize = Number(e.target.value);
		goPage(1, selectedSize);
	};

	return (
		<PaginationBox>
			<div>
				{/* 이전 버튼 */}
				{prev && (
					<PageButton onClick={handleChangePage} value={page - 1}>
						Prev
					</PageButton>
				)}
				{/* 첫 페이지 버튼 */}
				{first && (
					<>
						<PageButton onClick={handleChangePage} value="1">
							1
						</PageButton>
						<span className="more_page_text">...</span>
					</>
				)}
				{pageList.map((pageNum) => (
					<PageButton
						key={pageNum}
						onClick={handleChangePage}
						value={pageNum}
						selected={page === pageNum ? true : false}
					>
						{pageNum}
					</PageButton>
				))}
				{/* 마지막 페이지 버튼 */}
				{last && (
					<>
						<span className="more_page_text">...</span>
						<PageButton onClick={handleChangePage} value={totalPage}>
							{totalPage}
						</PageButton>
					</>
				)}
				{/* 다음 버튼 */}
				{next && (
					<PageButton onClick={handleChangePage} value={page + 1}>
						Next
					</PageButton>
				)}
			</div>
			{perPage && (
				<div>
					<PageButton
						value="15"
						selected={size === 15 ? true : false}
						onClick={handleChangeSize}
					>
						15
					</PageButton>
					<PageButton
						value="30"
						selected={size === 30 ? true : false}
						onClick={handleChangeSize}
					>
						30
					</PageButton>
					<PageButton
						value="50"
						selected={size === 50 ? true : false}
						onClick={handleChangeSize}
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
