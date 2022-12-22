import styled from 'styled-components';
import { PageButton } from './Button';

const PaginationStyle = styled.div`
	margin: 70px 0;
	color: var(--font-color-title);
	display: flex;
	justify-content: space-between;
	font-size: var(--font-size-0-8rem);
	font-family: var(--font-family-tag);
`;

const Pagination = ({ pageInfo }) => {
	// pageInfo = {currPage, totalPage, nextPage, ...}
	return (
		<PaginationStyle>
			<div>
				<PageButton selected={true}>1</PageButton>
				<PageButton>2</PageButton>
				<PageButton>3</PageButton>
				<PageButton>4</PageButton>
				<PageButton>5</PageButton>
				<span>...&nbsp;</span>
				<PageButton>100</PageButton>
				<PageButton>Next</PageButton>
			</div>
			<div>
				<PageButton selected={true}>15</PageButton>
				<PageButton>30</PageButton>
				<PageButton>50</PageButton>
				<span>&nbsp;per page</span>
			</div>
		</PaginationStyle>
	);
};

export default Pagination;
