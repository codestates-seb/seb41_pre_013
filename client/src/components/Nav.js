import styled from 'styled-components';
import { IoEarth } from 'react-icons/io5';
import { useLocation, Link } from 'react-router-dom';

const NavContainer = styled.div`
	width: 164px;
	border-right: 1px solid var(--line-color);

	nav {
		width: 164px;
		position: fixed;
		overflow-y: scroll;
		top: 74px;
		bottom: 0;
		/* flex-shrink: 0; */
		font-size: var(--font-size-0-8rem);

		font-family: BlinkMacSystemFont, sans-serif, -apple-system;

		.group {
			height: 24px;
			margin-top: 10px;
		}
		li {
			width: 100%;
			height: 34px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			padding-left: 10px;

			a {
				width: 100%;
			}
			svg {
				font-size: 1.2rem;
				margin-right: 3px;
				vertical-align: middle;
			}
			.sub_menu {
				padding-left: 22px;
			}
		}
		.selected {
			font-weight: bold;
			border-right: 3px solid var(--line-color-top-orange);
			background-color: #f1f2f3;
			a {
				color: var(--font-color-title);
			}
		}
	}
`;

function Nav() {
	const { pathname } = useLocation();
	return (
		<NavContainer>
			<nav>
				<ul>
					<li className={pathname === '/' ? 'selected' : ''}>
						<a href="/">Home</a>
					</li>
					<li className="group">PUBLIC</li>
					<li className={pathname.indexOf('/questions') > -1 ? 'selected' : ''}>
						<Link to="/questions">
							<IoEarth />
							Questions
						</Link>
					</li>
					<li className={pathname.indexOf('/users') > -1 ? 'selected' : ''}>
						<Link to="/users" className="sub_menu">
							Users
						</Link>
					</li>
					<li className={pathname.indexOf('/companies') > -1 ? 'selected' : ''}>
						<Link to="/companies" className="sub_menu">
							Companies
						</Link>
					</li>
				</ul>
			</nav>
		</NavContainer>
	);
}

export default Nav;
