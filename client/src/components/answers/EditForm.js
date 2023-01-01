import styled from 'styled-components';
import { BasicButton, CancelButton } from '../Button';
import { useNavigate } from 'react-router-dom';
import { answerUpdate } from '../../api/Answer';
import Toest from '../Toest';
import { useState } from 'react';

const AnswerEditForm = styled.form`
	margin-top: 30px;

	h3 {
		margin-bottom: 24px;
		font-weight: lighter;
	}
	textarea {
		padding: 10px;
		font-size: 1rem;
		height: 200px;
		line-height: 1.3;
		width: 100%;
		tab-size: 4;
		resize: vertical;

		:focus {
			border: var(--border-input-focus);
			outline: var(--outline-input-focus);
		}
	}

	.answer-preview {
		max-width: 730px;
		font-family: var(--font-family-body);
		color: var(--font-color-title);
		line-height: 1.3;
		margin: 20px 0 30px;
		white-space: pre-wrap; /* CSS3*/
		white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
		white-space: -pre-wrap; /* Opera 4-6 */
		white-space: -o-pre-wrap; /* Opera 7 */
		word-wrap: break-all; /* Internet Explorer 5.5+ */
	}

	button {
		margin-bottom: 20px;
	}
`;

const EditForm = ({ answerItem, questionId }) => {
	// hook
	const navigate = useNavigate();

	// state
	const [toest, setToest] = useState({ isOpen: false, msg: '' });
	const [content, setContent] = useState(answerItem.content);

	// handle
	const handleSubmit = async (e) => {
		e.preventDefault();
		const form = e.target;

		const result = await answerUpdate(answerItem.answerId, {
			content: form.answer_text.value,
		});
		// console.log('## result=', result);
		if (result.state === 'OK') {
			toestView(true, '답변이 수정되었습니다.');
		} else toestView(true, '답변 수정에 실패했습니다.');
	};

	const toestView = (isOpen, msg) => {
		setToest({ isOpen, msg });
	};

	return (
		<AnswerEditForm onSubmit={handleSubmit}>
			{toest.isOpen && (
				<Toest
					message={toest.msg}
					callback={() => {
						toestView(false, '');
						navigate(`/questions/${questionId}`, {
							state: { editAnswerId: answerItem.answerId },
						});
					}}
				/>
			)}
			<h3>Answer</h3>
			<textarea
				name="answer_text"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
			<div className="answer-preview">{content}</div>
			<div>
				<BasicButton type="submit" height="40">
					Save edits
				</BasicButton>
				&nbsp;
				<CancelButton
					type="button"
					height="40"
					onClick={() => navigate(`/questions/${questionId}`)}
				>
					Cancel
				</CancelButton>
			</div>
		</AnswerEditForm>
	);
};

export default EditForm;
