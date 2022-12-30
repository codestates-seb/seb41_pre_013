import { useState } from 'react';
import styled from 'styled-components';
import { questionCreate } from '../api/Question';
import useFetch from '../hooks/useFetch';
import { QUES_ENDPOINT } from '../api/Question';
import { useParams } from 'react-router-dom';

const TagsInput = styled.div`
  // margin: 8rem auto;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  height: 37px;
  width: 480px;
  padding: 0 5px;
  border: 1px solid #babfc3;
  border-radius: 4px;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 5px 0 0 0;

    > .tag {
      width: auto;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #39739D;
      padding: 0 5px;
      font-size: 12px;
      font-weight: lighter;

      list-style: none;
      border-radius: 4px;
      margin: 0 4px 4px 0;
      background: #E1ECF4;;
      
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
        margin-left: 4px;
        color: #5A8AAD;
        border-radius: 50%;
        // background: #fff;
        cursor: pointer;
      }
    }
  }
  > input {
    flex: 1;
    border: none;
    height: 35px;
    font-size: 14px;
    // padding: 4px 0 0 0;
    :focus {
      outline: transparent;
    }
  }
  &:focus-within {
    border: var(--border-input-focus);
		outline: var(--outline-input-focus);
  }
`;

function Tag({ askTag, setAskTag }) {
  // askTag는 AskQuestion 질문 생성 페이지에서 생성된 값
  // 질문 수정 페이지에서는 undefined로 표시됨
  console.log("askTag", askTag);

  const { questionId } = useParams(); 
  const [quesItem, isLoading, error] = useFetch(`${QUES_ENDPOINT}/${questionId}`);

  const initialTags = [];

  const [tags, setTags] = useState(initialTags);
  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  const addTags = (event) => {
    const filtered = tags.filter((el) => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setTags([...tags, event.target.value]);
      setAskTag([...tags, event.target.value]);
      event.target.value = '';
    }
  };
  console.log("tag comp", tags);
  console.log("Tag askTag", askTag);

  return (
    <>
      <TagsInput id={quesItem.id}>
        <ul id='tags'>
          {/* {quesItem.tagList.map((item, index) => (
            <li key={quesItem.id} className='tag'>
              <span className='tag-title'>{item.tagName}</span>
              <span className='tag-close-icon' onClick={()=> removeTags(index)}>
                &times;
              </span>
            </li>
          ))} */}
          {tags.map((tag, index) => (
            <li key={index} className='tag'>
              <span className='tag-title'>{tag}</span>
              <span className='tag-close-icon' onClick={() => removeTags(index)}>
                &times;
              </span>
            </li>
          ))}
        </ul>
        <input 
          className='tag-input'
          type='text'
          onKeyUp={(event) => (event.key === 'Enter' ? addTags(event) : null)} 
          placeholder='Press enter to add tags'
        />
      </TagsInput>
    </>
  );
};

export default Tag;