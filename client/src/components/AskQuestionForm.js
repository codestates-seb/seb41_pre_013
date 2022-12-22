import styled from 'styled-components';

const AskQuestionFormContainer = styled.div`
  width: 850px;
  height: 100%;
  // height: 20px;
`;

const AskQuestionBox = styled.div`
  padding: 24px;
  border: 1px solid var(--line-color);
  border-radius: 4px;
  margin: 20px 0;

  .sub-info {
    padding-bottom: 4px;
    color: black;
    font-size: 12px;
  }

  .title, .content, .tag {
    color: #0c0d0e;
    font-size: 16px;
    font-weight: 600;
  }

  > div {
    display: flex;
    flex-direction: column;
  }

  .titleBox {
    height: 77px;
  }

  .contentBox {
    height: 300px;

    textarea {
      height: 100%;
      resize: vertical;
      border: 1px solid #BABFC3;
      border-radius: 4px;
    }
  }

  .tagBox {
    height: 78px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 7.8px 9.1px;
  border: 1px solid #BABFC3;
  border-radius: 4px;
  
  ::placeholder {
    color: #CCD2DC;
  }

  :focus {
    outline: 1px solid #90CCF9;
    box-shadow: 15px 15px 5px 0px #DEEAF7;
  }
`;

const SubmitBtn = styled.button`
  width: 129px;
  height: 37px;
  background-color: #0A95FF;
  color: #FFFFFF;
  padding: 10.4px;
  font-size: 13px;
  border-radius: 4px;
`;

function AskQuestionForm() {
  return (
    <AskQuestionFormContainer>
      <form action="" method="get" class="form">
        <AskQuestionBox className="titleContainer">
          <div className="titleBox">
            <label className="title" for="title">Title</label>
            <label className="sub-info">Be specific and imagine you're asking a question to another person.</label>
            <Input type="text" placeholder="e.g. Is there an R function for finding the index of an element in a vector?"/>
          </div>
        </AskQuestionBox>
        <AskQuestionBox className="contentContainer">
          <div className="contentBox">
            <label className="content" for="content">What are the details of your problem?</label>
            <label className="sub-info">Introduce the problem and expand on what you put in the title. Minimum 20 characters.</label>
            <textarea></textarea>
          </div>
        </AskQuestionBox>
        <AskQuestionBox className="tagContainer">
          <div className="tagBox">
            <label className="tag" for="tag">Tags</label>
            <label className="sub-info">Add up to 5 tags to describe what your question is about. Start typing to see suggestions.</label>
            <Input type="text" placeholder="e.g. (css sql-server asp.net-mvc)" />
          </div>
        </AskQuestionBox>
        <SubmitBtn>
          <div className="submit">Post your question</div>
        </SubmitBtn>
      </form>
    </AskQuestionFormContainer>
  );
}

export default AskQuestionForm;