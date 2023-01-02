import styled from 'styled-components';
import { IoEarth } from 'react-icons/io5';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNavMenuView } from '../redux/globalSlice';
import { useEffect } from 'react';

const NavContainer = styled.div`
	width: 164px;
	border-right: 1px solid var(--line-color);

	a {
		width: 100%;
		:hover {
			font-weight: 450;
			color: var(--font-color-title);
		}
		:visited {
			color: var(--font-color-base);
		}
	}

	nav {
		width: 164px;
		border-right: 1px solid var(--line-color);
		position: fixed;
		top: 74px;
		bottom: 0;
		font-size: var(--font-size-0-8rem);
		font-family: var(--font-fmaily-nav);

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
				font-size: var(--font-size-1-2rem);
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

	@media (max-width: 640px) {
		position: absolute;
		background-color: #fff;
		display: ${(props) =>
			props.isNavView !== null && !props.isNavView ? 'none' : 'block'};
		height: 220px;
		box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
			0 2px 8px hsla(0, 0%, 0%, 0.05);

		nav {
			border-right: none;
		}
	}
`;

function Nav() {
	const { pathname } = useLocation();

	// 좌측 네비메뉴 보이기 전역 상태 설정
	const dispatch = useDispatch();
	const isNavMenuView = useSelector((state) => state.global.isNavMenuView);

	useEffect(() => {
		dispatch(setNavMenuView(false));
	}, [pathname, dispatch]);

	return (
		<NavContainer isNavView={isNavMenuView}>
			<nav>
				<ul>
					<li className={pathname === '/' ? 'selected' : ''}>
						<Link to="/">Home</Link>
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
