import styled from 'styled-components';
import Nav from '../components/Nav';
import Aside from '../components/Aside';

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
	border: 1px solid red;
`;

function SampleWithNav() {
	return (
		<ContentContainer>
			<Nav />
			<div className="content_wrapper">
				<MainContent>
					왼쪽 네비바가 존재할 때 샘플입니다.
					<br />
					여기에 컨텐츠를 추가하시면 됩니다.
				</MainContent>
				<Aside />
			</div>
		</ContentContainer>
	);
}

export default SampleWithNav;
