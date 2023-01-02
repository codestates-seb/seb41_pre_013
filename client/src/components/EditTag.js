import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { questionPatch } from '../api/Question';
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

function Tag({ tagList, askTag, setAskTag }) {
  const { questionId } = useParams(); 
  const [quesItem, isLoading, error] = useFetch(`${QUES_ENDPOINT}/${questionId}`);

  console.log("EditTag");
  console.log("tagList", tagList);
  console.log("ques Id", questionId);

  let initialTags = [];

  for(let i = 0; i < tagList.length; i++) {
		initialTags[i] = tagList[i].tagName;
	}
  console.log(initialTags);

  const [tags, setTags] = useState(initialTags);

  const removeTags = (indexToRemove) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  let newTagItem; 
  const addTags = (event) => {
    const filtered = tags.filter((el) => el === event.target.value);
    if (event.target.value !== '' && filtered.length === 0) {
      setTags([...tags, event.target.value]);
      //setAskTag([...initialTags, ...tags, event.target.value]);
      newTagItem = event.target.value;
      event.target.value = '';
    }
  };

  questionPatch(questionId, {
    tags: tags
  })

  return (
    <>
      <TagsInput>
        <ul id='tags'>
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