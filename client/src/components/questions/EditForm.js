import styled from 'styled-components';
import { BasicButton, CancelButton } from '../Button';
import { useState } from 'react';
import AskQuestionEdit from '../../pages/AskQuestionEdit';
import { useNavigate, useParams } from 'react-router-dom';
import { questionPatch } from '../../api/Question';

const AskQuestionEditForm = styled.form`
	margin-bottom: 20px;

	h4 {
		margin-bottom: 5px;
	}

	.title,
	.body,
	.tag {
		color: #0c0d0e;
		font-size: 16px;
		font-weight: 600;
	}

	.titleBox,
	.bodyBox,
	.tagBox {
		margin-bottom: 20px;
	}

	.buttonBox {
		margin-top: 20px;
	}

	textarea {
		padding: 10px;
		font-size: 1rem;
		height: 200px;
		line-height: 1.3;
		width: 100%;
		tab-size: 4;
		margin-bottom: 5px;

		:focus {
			border: var(--border-input-focus);
			outline: var(--outline-input-focus);
		}
	}

	.explain {
		p {
			font-size: var(--font-size-0-9rem);
			margin-bottom: 15px;
		}
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
// questionId
const EditForm = ({ item, handleEditQuestion }) => {
	const defaultValue =
		'I\'d say it\'s not supported. https://fullcalendar.io/docs/selection/select_callback/ indicates that when a selection is made, the callback will return a single "resource" object which will indicate the resource chosen by the user. This implies that selecting multiple resources\n\n via dragging the mouse on the timeline is not possible.\n';

	const handleSubmit = (e) => {
		e.preventDefault();
		alert('submit');
	};


	const [editTitle, setEditTitle] = useState('');
	const [editContent, setEditContent] = useState('');
	const { questionId } = useParams();
	console.log(questionId);

	const handleEdit = (questionId, editTitle, editContent) => {
		console.log(questionId);
		questionPatch(questionId, editTitle, editContent);
		console.log("질문 수정");
	}

	return (
		<AskQuestionEditForm onSubmit={handleSubmit}>
			<div className="titleBox">
				<label className="title" htmlFor="title">
					<h4>Title</h4>
					<Input
						type="text"
						id="title"
						name="title_text"
						placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
					/>
				</label>
			</div>
			<div className="bodyBox">
				<label className="body" htmlFor="body">
					{/*onChange={(e) => setEditContent(e.target.value)}*/}
					<textarea id="body" name="body_text" defaultValue={defaultValue} value={editContent} onChange={(e) => setEditContent(e.target.value)}/>
				</label>
				<div className="explain">
					<p>
						I need to show the datepicker according to screen size if on a
						desktop window the datepicker will show normally that is already
						showing but when on a mobile screen i need to open a drawer and then
						the datepicker should show inside the drawer with inline style i
						have created the datepicker field outside the drawer .is there a way
						to do this i am using antd datepicker
					</p>
					<p>
						I have tried to create the custom drawer and when on mobile screen
						only the drawer is showing and not the datepicker because i do not
						know how to call the respective datepicker in a onclick function
						like in the jquery we have .datepicker() for custom styling and
						other stuff
					</p>
				</div>
			</div>
			<div className="tagBox">
				<label className="tag" htmlFor="tag">
					<h4>Tags</h4>
					<Input
						type="text"
						id="tag"
						name="tag_text"
						placeholder="e.g. (c# php objective-c)"
					/>
				</label>
			</div>
			<div className="buttonBox">
				<BasicButton type="submit" height="40" onClick={handleEdit}>
					Save edits
				</BasicButton>
				&nbsp;
				<CancelButton type="button" height="40">
					Cancel
				</CancelButton>
			</div>
		</AskQuestionEditForm>
	);
};

export default EditForm;
