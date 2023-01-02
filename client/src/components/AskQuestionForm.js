import styled from 'styled-components';
import Tag from './Tag';

const AskQuestionFormContainer = styled.div`
	width: 850px;
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

	.title,
	.content,
	.tag {
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
			padding: 7.8px 9.1px;
			resize: vertical;
			border: 1px solid #babfc3;
			border-radius: 4px;
			:focus {
				border: var(--border-input-focus);
				outline: var(--outline-input-focus);
			}
		}
	}

	.tagBox {
		height: 78px;
	}
`;

const Input = styled.input`
	width: 100%;
	padding: 7.8px 9.1px;
	border: 1px solid #babfc3;
	border-radius: 4px;

	::placeholder {
		color: #ccd2dc;
	}

	:focus {
		border: var(--border-input-focus);
		outline: var(--outline-input-focus);
	}
`;

const SubmitBtn = styled.button`
	width: 129px;
	height: 37px;
	background-color: #0a95ff;
	color: #ffffff;
	padding: 10.4px;
	font-size: 13px;
	border-radius: 4px;
`;

function AskQuestionForm({askTitle, setAskTitle, askContent, setAskContent, askTag, setAskTag, handleSubmit}) {
	return (
		<AskQuestionFormContainer>
				<AskQuestionBox className="titleContainer">
					<div className="titleBox">
						<label className="title" htmlFor="titleInput">
							Title
						</label>
						<label className="sub-info">
							Be specific and imagine you're asking a question to another
							person.
						</label>
						<Input
							type="text"
							placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
							id="titleInput"
							value={askTitle}
							onChange={(e) => setAskTitle(e.target.value)}
						/>
					</div>
				</AskQuestionBox>
				<AskQuestionBox className="contentContainer">
					<div className="contentBox">
						<label className="content" htmlFor="contentInput">
							What are the details of your problem?
						</label>
						<label className="sub-info">
							Introduce the problem and expand on what you put in the title.
							Minimum 20 characters.
						</label>
						<textarea 
							id="contentInput"
							value={askContent}
							onChange={(e) => setAskContent(e.target.value)}
						></textarea>
					</div>
				</AskQuestionBox>
				<AskQuestionBox className="tagContainer">
					<div className="tagBox">
						<label className="tag" htmlFor="tagInput">
							Tags
						</label>
						<label className="sub-info">
							Add up to 5 tags to describe what your question is about. Start
							typing to see suggestions.
						</label>
						<Tag
							value={askTag}
							askTag={askTag}
							setAskTag={setAskTag}
							onChange={(e) => setAskTag(e.target.value)}/>
					</div>
				</AskQuestionBox>
				<SubmitBtn>
					<div 
						className="submit"
						onClick={() => handleSubmit(askTitle, askContent, askTag)}
					>Post your question</div>
				</SubmitBtn>
		</AskQuestionFormContainer>
	);
}

export default AskQuestionForm;
