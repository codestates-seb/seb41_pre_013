import styled from 'styled-components';
import { TagButton as Tag } from '../Button';
import { DateConvert } from '../../util/common';
import { Link } from 'react-router-dom';

const ItemContent = styled.li`
	display: flex;
	list-style: none;
	padding: 16px;
	border-bottom: 1px solid var(--line-color);
	:first-child {
		border-top: 1px solid var(--line-color);
	}

	.list-stats {
		width: 108px;
		display: flex;
		flex-direction: column;
		/* flex-shrink: 0;
		flex-wrap: wrap; */
		margin-top: 5px;
		margin-right: 16px;
		font-family: var(--font-family-tag);
		font-size: var(--font-size-0-8rem);

		div {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 6px;

			:first-child {
				color: #3b4043;
			}
		}

		.answer-selected {
			color: #2e6f44;
			border: 1px solid #2e6f44;
			border-radius: 4px;
			padding: 4px;
		}
	}

	.list-item {
		width: 100%;
	}

	.list-item-title {
		color: #0162be;
		margin-bottom: 4px;
		font-weight: lighter;

		a,
		a:visited {
			color: #0162be;
		}
	}

	.list-item-content {
		color: #3b4043;
		font-size: var(--font-size-0-8rem);
		margin-bottom: 6px;
	}

	.list-item-meta {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		column-gap: 6px;
		row-gap: 15px;
	}

	.list-item-meta-author {
		flex-grow: 1;
		font-size: var(--font-size-0-8rem);
		font-family: var(--font-family-tag);
		text-align: right;

		.author {
			color: #3286d2;
		}
	}

	@media (max-width: 980px) {
		flex-direction: column;
		.list-stats {
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
		<ItemContent>
			<div className="list-stats">
				<div>
					<span></span>
					<span>
						<strong>0</strong> votes
					</span>
				</div>
				<div>
					<span></span>
					<span className={`${item.answers.length > 0 && 'answer-selected'}`}>
						<strong>{item.answers.length}</strong> answers
					</span>
				</div>
				<div>
					<span></span>
					<span>
						<strong>0</strong> views
					</span>
				</div>
			</div>
			<div className="list-item">
				<h4 className="list-item-title">
					<Link to={`/questions/${item.id}`}>{item.title}</Link>
				</h4>
				<div className="list-item-content">{item.content}</div>
				<div className="list-item-meta">
					<div className="list-item-meta-tags">
						{item.tags.map((tag) => (
							<Tag key={tag.id}>{tag.tagName}</Tag>
						))}
					</div>
					<div className="list-item-meta-author">
						<span className="author">{item.displayName}&nbsp;</span>
						<span className="ask-time">
							asked {DateConvert(item.createdAt)}
						</span>
					</div>
				</div>
			</div>
		</ItemContent>
	);
};

export default Item;