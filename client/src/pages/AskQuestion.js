import styled from 'styled-components';
import AskQuestionForm from '../components/AskQuestionForm';

const MainContainer = styled.div`
  width: 100%;
  max-width: var(--max-width);  
  /* background: none; */
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  height: 100%;
`;

const MainContent = styled.main`
  max-width: calc(var(--max-width) - var(--nav-width));
  width: calc(100% - var(--nav-width));
  padding: var(--main-outline-margin);
  h2 {
    color: var(--font-color-title);
    padding-bottom: 70px;
  }

  h1 {
    color: var(--font-color-title);
  }

  .ask-question-info {
    background-color: #EBF4FB;
    padding: 24px;
    border-radius: 5px;
    border: 1px solid black;
  }
`;

/*
const Title = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
*/

function AskQuestion() {
  return (
    <MainContainer>
      <MainContent>
        <AskQuestionContainer>
          <AskQuestionDescription>
            <div className="ask-question-title">
              <h2>Ask a public question</h2>
            </div>
            <div className="ask-question-info">
              <h2>Writing a good question</h2>
              <p>
                You're ready to ask a programming-related question and this form will help guide you through the process.
              </p>
              <p className="second-info">
                Looking to ask a non-programming question? See the topics here to find a relevant site.
              </p>
              <h5>Steps</h5>
              <ul>
                <li>
                  Summarize your problem in a one-line title.
                </li>
                <li>
                  Describe your problem in more detail.
                </li>
                <li>
                  Describe what you tried and what you expected to happen.
                </li>
                <li>
                  Add "tags" which help surface your question to members of the community.
                </li>
                <li>
                  Review your question and post it to the site.
                </li>
              </ul>
            </div>
          </AskQuestionDescription>
        </AskQuestionContainer>
        <AskQuestionForm />
      </MainContent>
    </MainContainer>
  );
}

export default AskQuestion;
