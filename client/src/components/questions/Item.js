import styled from 'styled-components';
import { TagButton as Tag } from '../Button';
import data from '../../data/data.json';

const ItemStyle = styled.li`
	display: flex;
	list-style: none;
	padding: 16px;
	border-bottom: 1px solid var(--line-color);
	:first-child {
		border-top: 1px solid var(--line-color);
	}

	.list_stats {
		width: 108px;
		display: flex;
		flex-direction: column;
		flex-shrink: 0;
		flex-wrap: wrap;
		margin-top: 5px;
		margin-right: 16px;
		text-align: right;
		font-family: var(--font-family-tag);
		font-size: var(--font-size-0-9rem);

		span:first-child {
			color: #3b4043;
		}
		span {
			margin-bottom: 6px;
		}
	}
	.list_item_title {
		color: #0162be;
		margin-bottom: 4px;
	}
	.list_item_content {
		color: #3b4043;
		font-size: var(--font-size-0-8rem);
		margin-bottom: 6px;
	}
	.list_item_meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 6px;
		row-gap: 15px;
	}
	.list_item_meta_author {
		flex-grow: 1;
		font-size: var(--font-size-0-8rem);
		font-family: var(--font-family-tag);
		text-align: right;

		.author {
			color: #3286d2;
		}
		.ask_time {
		}
	}

	@media (max-width: 980px) {
		flex-direction: column;
		.list_stats {
			width: 100%;
			flex-direction: row;
			span {
				margin-right: 8px;
			}
		}
	}
`;

const Item = ({ item }) => {
	return (
		<ItemStyle>
			<div className="list_stats">
				<span>
					<strong>0</strong> votes
				</span>
				<span>
					<strong>1</strong> answers
				</span>
				<span>
					<strong>3</strong> views
				</span>
			</div>
			{/* {data.questions.map((question) => ( */}
			<div className="list_item">
				<h4 className="list_item_title">
					{/* {question.title} */}
					how to display
				</h4>
				<div className="list_item_content">
					I have restaurant data array , I should make another array by grouping
					items by category that belongs to , I should convert
				</div>
				<div className="list_item_meta">
					<div className="list_item_meta_tags">
						<Tag>javascript</Tag>
						<Tag>reactjs</Tag>
						<Tag>input</Tag>
						<Tag>submission</Tag>
					</div>
					<div className="list_item_meta_author">
						<span className="author">user20833621</span>
						<span className="ask_time">
							&nbsp;<strong>183</strong> asked 1 min ago
						</span>
					</div>
				</div>
			</div>
			{/* ))} */}
		</ItemStyle>
	);
};

export default Item;
