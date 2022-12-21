import styled from 'styled-components';
// import { BasicButton } from "../components/Button";
import AskQuestionForm from "../components/question/AskQuestionForm";

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
        <div className="ask-question-container">
          <div className="ask-question-description">
            <div className="ask-question-title">
              <h2>Ask a public question</h2>
            </div>
            <div className="ask-question-info">
              <div className="good-question-tips">
                <h3>Writing a good question</h3>
                <p>
                  You're ready to ask a programming-related question and this form will help guide you through the process.
                  <br />
                  Looking to ask a non-programming question? See the topics here to find a relevant site.
                </p>
                <h4>Steps</h4>
                <p>
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
                </p>
              </div>
              {/*<div className="good-title-tips">
                <h3>Writing a good title</h3>
                <p>
                  <ul>
                    <li>
                      Your title should summarize the problem.
                    </li>
                    <li>
                      You might find that you have a better idea of your title after writing out the rest of the question.
                    </li>
                  </ul>
                </p>
              </div> */}
            </div>
          </div>
          <AskQuestionForm />
        </div>
      </MainContent>
    </MainContainer>
  );
}

export default AskQuestion;
