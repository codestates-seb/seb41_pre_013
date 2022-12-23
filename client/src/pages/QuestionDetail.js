import styled from 'styled-components';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import Nav from '../components/Nav';
import { TagButton as Tag } from '../components/Button';
// import { BasicButton } from '../components/Button';
import Pagination from '../components/Pagination';
import Aside from '../components/Aside';

const Container = styled.div`
	width: 100%;
	max-width: var(--max-width);
	background: none;
	display: flex;
	justify-content: space-between;
	margin: 0 auto;

	.main-content {
    display: flex;
  }
`;

const MainContent = styled.div`
  max-width: calc(var(--max-width) - var(--nav-width));
  width: calc(100% - var(--nav-width));
  padding: var(--main-outline-margin);
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  .edit-delete-box {
    height: 76px;
    margin-top: 40px;

    button {
      background-color: transparent;
      font-size: 13px;
      margin-right: 10px;
      color: #6a737c;
    }
  }

  .content-box {
    flex-direction: column;
  }

  /* .comment-box { 
    .comment-box-content {
      border-top: 1px solid black;
      border-bottom: 1px solid black;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      font-size: 13px;
      margin-bottom: 10px;

      .comment-num {
        color: orange;
        padding: 6px 4px 6px 0;
      }

      .comment-content {
        padding: 6px;
      }
    }

    span {
      font-size: 13px;
    }
  } */

  .total-answer {
    height: 32px;

    span {
      line-height: 32px;
      font-size: 17px;
    }
  }

  .page {
    margin: -45px 0;
  }

  .content-wrapper {
    display: flex;
    justify-content: center;
    align-items: flex-start;

    .vote-box {
      width: 56px;
      margin-right: 10px;
      font-size: 20px;
      
      .vote-num {
        text-align: center;
        color: #6a737c;
      }

      .vote-icon {
        font-size: 60px;
        color: #babfc3;
      }
    }

    .sub-info {
      display: flex;
    }
  }

  .content-wrapper-title {
    width: 100%;
    margin-top: 17px;
    font-size: 14px;
    color: #232629;
  }
`;

const QuestionContent = styled.div`
  margin-bottom: 16px;

  .question-header {
    display: flex;
  }

  .title-box {
    border-bottom: 1px solid var(--line-color);
    padding-bottom: 16px;

    .question-title {
      height: 44px;

      h4 {
        font-size: 27px;
        font-weight: lighter;
        color: #3B4045;
      }
    }

    .question-info {
      .info-box {
        display: inline-block;
        margin-right: 12px;
        font-size: 12px;

        .info-title {
          padding-right: 6px;
        }

        .info-content {
          color: black;
        }
      }
    }
  }

  .tag-box {
    margin: 85px 0 24px 0;
  }
`;

const AnswerContent = styled.div`
  padding: 16px 0;

  .answer-content {
    h5 {
      font-size: 14px;
      font-weight: lighter;
    }
  }

  /* .comment-box {
    border-bottom: 1px solid black;
    padding-bottom: 16px;
  } */

  .content-wrapper {
    border-bottom: 1px solid var(--line-color);
  }

  .edit-delete-box {
    padding-top: 42px;
  }
`;

function QuestionDetail() {
  return (
    <Container>
      <Nav />
      <MainContent>
        <div className="main-content">
          <div className="content-box">
          <QuestionContent>
            <div className="question-header">
              <div className="title-box">
                <div className="question-title">
                  <h4>How do I undo the most recent local commits in Git?</h4>
                </div>
                <div className="question-info">
                  <div className="info-box">
                    <span className="info-title">Asked</span>
                    <span className="info-content">13 years, 6 months ago</span>
                  </div>
                  <div className="info-box">
                    <span className="info-title">Modified</span>
                    <span className="info-content">12 days ago</span>
                  </div>
                  <div className="info-box">
                    <span className="info-title">Viewed</span>
                    <span className="info-content">12.1m times</span>
                  </div>
                </div>
              </div>
              {/*<div className="create-question">
                <BasicButton height="38">Ask Question</BasicButton>
            </div>*/}
            </div>
            <div className="content-wrapper">
              <div className="vote-box">
                <RxTriangleUp className="vote-icon"/>
                <div className="vote-num">1234</div>
                <RxTriangleDown className="vote-icon" />
              </div>
              <div classNme="sub-info">
                <div className="content-wrapper-title">
                  I accidentally committed the wrong files to Git, but didn't push the commit to the server yet.
                </div>
                <div className="tag-box">
                  <Tag>git</Tag>
                  <Tag>version-control</Tag>
                  <Tag>git-commit</Tag>
                  <Tag>undo</Tag>
                </div>
                <div className="edit-delete-box">
                  <button className="question-edit-btn">Edit</button>
                  <button className="question-delete-btn">Delete</button>
                </div>
                {/* <div className="comment-box">
                  <div className="comment-box-content">
                    <span className="comment-num">543</span>
                    <span className="comment-content">
                      You know what git needs? git undo, that's it. Then the reputation git has for handling mistakes made
                      by us mere mortals disappears. Implement by pushing the current state on a git stack before executing
                      any git command. It would affect performance, so it would be best to add a config flag as to whether
                      to enable it. - Yimin Rong Mar 20, 2018 at 1:45
                    </span>
                  </div>
                  <span className="more-comments">show <strong>8</strong> more comments</span>
                </div> */}
              </div>
            </div>
          </QuestionContent>
          <div className="total-answer">
            <span>102 Answers</span>
          </div>
          <div className="page">
            <Pagination />
          </div>
          <AnswerContent>
            <div className="content-wrapper">
              <div className="vote-box">
                <RxTriangleUp className="vote-icon"/>
                <div className="vote-num">1234</div>
                <RxTriangleDown className="vote-icon" />
              </div>
              <div classNme="sub-info">
                <div className="content-wrapper-title">
                  I accidentally committed the wrong files to Git, but didn't push the commit to the server yet.
                </div>
                <div className="edit-delete-box">
                <button className="answer-edit-btn">Edit</button>
                  <button className="answer-delete-btn">Delete</button>
                </div>
              </div>
            </div>
          </AnswerContent>
          </div>
          <Aside />
        </div>
      </MainContent>
    </Container>
  );
}

export default QuestionDetail;