import styled from 'styled-components';
import Nav from '../components/Nav';
import Aside from '../components/Aside';
import { BasicButton } from "../components/Button";

const MainContainer = styled.div`
  width: 100%;
  max-width: var(--max-width);  
  /* background: none; */
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const MainContent = styled.main`
  max-width: calc(var(--max-width) - var(--nav-width));
  width: calc(100% - var(--nav-width));
  padding: var(--main-outline-margin);

  h1 {
    color: var(--font-color-title);
  }
  li {
    list-style: none;
  }
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

function QuestionList() {
  return (
    <MainContainer>
      <Nav />
      <MainContent>
        {/* 여기에 작업해 주세요. */}
      </MainContent>      
      <Aside />
    </MainContainer>
  );
}

export default QuestionList;
