import styled from 'styled-components';

const AskQuestionBox = styled.div`
  height: 200px;
  color: var(--font-color-title);
  border-radius: 2px;
  border: 1px solid #F0E6C5;
  box-shadow: 0 1px 2px hsla(0,0%,0%,0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05), 0 2px 8px hsla(0, 0%, 0%, 0.05);

  textarea {
    resize: vertical;
  }
`;

function AskQuestionForm() {
  return (
    <>
      <AskQuestionBox>
        <div className="question-form">
          <div>
            <div className="question-form-title">
              <label>Title</label>
              <label>Be specific and imagine you're asking a question to another person.</label>
              
            </div>
          </div>
        </div>
      </AskQuestionBox>
      <AskQuestionBox>
      <div className="question-form">
        <div>
          <div className="question-form-content">
            <label>What are the details of your problem?</label>
            <label>Introduce the problem and expand on what you put in the title. Minimum 20 characters.</label>
            <textarea name="question-content"></textarea>
          </div>
        </div>
      </div>
    </AskQuestionBox>
    <AskQuestionBox>
      <div className="question-form">
        <div>
          <div className="question-form-tag">
            <label>Tags</label>
            <label>Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</label>
            
          </div>
        </div>
      </div>
    </AskQuestionBox>
    
    </>
  );
}

export default AskQuestionForm;