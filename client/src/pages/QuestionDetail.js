import styled from 'styled-components';
import Nav from '../components/Nav';
import { TagButton as Tag } from '../components/Button';
import { BasicButton } from '../components/Button';
import Pagination from '../components/Pagination';
import Aside from '../components/Aside';
import { RxTriangleUp, RxTriangleDown } from 'react-icons/rx';
import { RiFileCodeFill, RiAlignCenter, RiAlignJustify, RiLinksLine } from 'react-icons/ri';
import { BsFillImageFill, BsBraces } from 'react-icons/bs';
import { MdFormatListNumbered, MdFormatListBulleted, MdHelp, MdFormatQuote } from 'react-icons/md';
import { ImUndo, ImRedo, ImBold, ImItalic } from 'react-icons/im';

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

  .content-wrapper {
    border-bottom: 1px solid var(--line-color);
  }

  .edit-delete-box {
    padding-top: 42px;
  }
`;

const CreateAnswer = styled.div`
  h3 {
    height: 44px;
    font-size: 18px;
    font-weight: lighter;
  }

  .post-editor {
    border: 1px solid #BABFC3;
    border-radius: 4px;
  }

  .post-style {
    border-bottom: 1px solid #BABFC3;
  }

  .style-btn-row {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    list-style-type: none;
    width: 719px;
    height: 44px;
    margin: 0 4px 0 8px;
    color: #535A60;
    
    .style-btn {
      height: 100%;
      width: 28px;
      font-size: 18px;
      align-items: center;
      line-height: 44px;
      cursor: pointer;
    }

    .space-btn {
      cursor: default;
    }

    .space-last-btn {
      width: 200px;
    }

    .help-btn {
      background-color: #F1F2F3;
      text-align: center;
    }
  }

  textarea {
    width: 100%;
    height: 200px;
    resize: vertical;
    padding: 10px;
    font-size: 14px;
    border: none;

    :focus {
      outline: solid 5px rgba(0, 164, 228, 0.2);
    }
  }

  .post-answer {
    margin: 30px 0;
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
          <CreateAnswer>
            <form id="post-answer" action="" method="post" className="answer-form">
              <h3>Your Answer</h3>
              <div className="post-editor">
                <div className="post-style">
                  <ul className="style-btn-row">
                    <li className="style-btn"><ImBold /></li>
                    <li className="style-btn"><ImItalic /></li>
                    <li className="style-btn space-btn"></li>
                    <li className="style-btn"><RiLinksLine /></li>
                    <li className="style-btn"><MdFormatQuote /></li>
                    <li className="style-btn"><BsBraces /></li>
                    <li className="style-btn"><BsFillImageFill /></li>
                    <li className="style-btn"><RiFileCodeFill /></li>
                    <li className="style-btn space-btn"></li>
                    <li className="style-btn"><MdFormatListNumbered /></li>
                    <li className="style-btn"><MdFormatListBulleted /></li>
                    <li className="style-btn"><RiAlignCenter /></li>
                    <li className="style-btn"><RiAlignJustify /></li>
                    <li className="style-btn space-btn"></li>
                    <li className="style-btn"><ImUndo /></li>
                    <li className="style-btn"><ImRedo /></li>
                    <li className="style-btn space-btn space-last-btn"></li>
                    <li className="style-btn help-btn"><MdHelp /></li>
                  </ul>
                </div>
                <div className="post-content">
                  <textarea></textarea>
                </div>
              </div>
              <div className="post-answer">
                <BasicButton height="38">Post Your Answer</BasicButton>
              </div>
            </form>
          </CreateAnswer>
          </div>
          <Aside />
        </div>
      </MainContent>
    </Container>
  );
}

export default QuestionDetail;