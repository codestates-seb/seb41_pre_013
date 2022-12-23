import styled from 'styled-components';

const ContentContainer = styled.div`
	width: 100%;
	max-width: var(--max-width);
	background: none;
`;

const MainContent = styled.main`
	margin: 0 var(--main-outline-margin) 80px var(--main-outline-margin);
	border: 1px solid red;
`;

function SampleNoneNav() {
	return (
		<ContentContainer>
			<MainContent>
				왼쪽 네비바가 없을 때 샘플입니다.
				<br />
				여기에 컨텐츠를 추가하시면 됩니다.
			</MainContent>
		</ContentContainer>
	);
}

export default SampleNoneNav;
