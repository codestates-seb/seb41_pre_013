import styled from 'styled-components';
import { DiStackoverflow } from 'react-icons/di';
import { RxChatBubble } from 'react-icons/rx';
import { ImPencil } from 'react-icons/im';

const AsideBox = styled.div`
	width: var(--aside-width);
	color: #515659;
	font-size: var(--font-size-0-9rem);
	font-family: var(--font-family-tag);
	border-radius: 2px;
	border: 1px solid #f1e5bc;
	box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
		0 2px 8px hsla(0, 0%, 0%, 0.05);
	margin-bottom: 20px;

	.title {
		padding: 12px 15px 12px 15px;
		font-weight: bold;
		border-bottom: 1px solid #f1e5bc;
		background-color: #faf3d8;
	}
	ul {
		padding: 15px 10px 15px 10px;
		background-color: #fcf7e4;
	}
	ul > li {
		display: flex;
		margin-left: 5px;
		list-style: none;
		padding-bottom: 10px;

		:first-child {
			svg {
				color: #5eacd9;
			}
		}
		svg {
			margin-right: 5px;
		}
	}
`;

function Aside() {
	return (
		<aside>
			<AsideBox>
				<div className="title">The Overflow Blog</div>
				<ul>
					<li>
						<ImPencil />
						<span>Best practices to increase the speed for Next.js apps</span>
					</li>
					<li>
						<ImPencil />
						<span>
							I spent two years trying to do what Backstage does for free
						</span>
					</li>
				</ul>
			</AsideBox>
			<AsideBox>
				<div className="title">Featured on Meta</div>
				<ul>
					<li>
						<RxChatBubble />
						<span>Navigation and UI research starting soon</span>
					</li>
					<li>
						<DiStackoverflow />
						<span>2022 Community Moderator Election</span>
					</li>
					<li>
						<DiStackoverflow />
						<span>Temporary policy: ChatGPT is banned</span>
					</li>
					<li>
						<DiStackoverflow />
						<span>I'm standing down as a moderator</span>
					</li>
				</ul>
			</AsideBox>
		</aside>
	);
}

export default Aside;
