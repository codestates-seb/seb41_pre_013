import styled from 'styled-components';
import { BasicButton } from '../Button';
import {
	RiFileCodeFill,
	RiAlignCenter,
	RiAlignJustify,
	RiLinksLine,
} from 'react-icons/ri';
import { BsFillImageFill, BsBraces } from 'react-icons/bs';
import {
	MdFormatListNumbered,
	MdFormatListBulleted,
	MdHelp,
	MdFormatQuote,
} from 'react-icons/md';
import { ImUndo, ImRedo, ImBold, ImItalic } from 'react-icons/im';

const CreateAnswerForm = styled.form`
	width: 100%;

	h3 {
		height: 44px;
		font-weight: lighter;
	}

	.editor-box {
		border: 1px solid #babfc3;
		border-radius: 4px;
	}

	.editor-row {
		width: 100%;
		height: 44px;
		color: #535a60;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		list-style-type: none;
		border-bottom: 1px solid #babfc3;

		.editor-btn {
			width: 28px;
			height: 100%;
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
			border: var(--border-input-focus);
			outline: var(--outline-input-focus);
		}
	}

	button {
		margin: 30px 0 30px;
	}
`;

const AddForm = () => {
	return (
		<CreateAnswerForm>
			<h3>Your Answer</h3>
			<div className="editor-box">
				<ul className="editor-row">
					<li className="editor-btn">
						<ImBold />
					</li>
					<li className="editor-btn">
						<ImItalic />
					</li>
					<li className="editor-btn space-btn"></li>
					<li className="editor-btn">
						<RiLinksLine />
					</li>
					<li className="editor-btn">
						<MdFormatQuote />
					</li>
					<li className="editor-btn">
						<BsBraces />
					</li>
					<li className="editor-btn">
						<BsFillImageFill />
					</li>
					<li className="editor-btn">
						<RiFileCodeFill />
					</li>
					<li className="editor-btn space-btn"></li>
					<li className="editor-btn">
						<MdFormatListNumbered />
					</li>
					<li className="editor-btn">
						<MdFormatListBulleted />
					</li>
					<li className="editor-btn">
						<RiAlignCenter />
					</li>
					<li className="editor-btn">
						<RiAlignJustify />
					</li>
					<li className="editor-btn space-btn"></li>
					<li className="editor-btn">
						<ImUndo />
					</li>
					<li className="editor-btn">
						<ImRedo />
					</li>
					<li className="editor-btn space-btn space-last-btn"></li>
					<li className="editor-btn help-btn">
						<MdHelp />
					</li>
				</ul>
				<textarea name="answer-content"></textarea>
			</div>
			<BasicButton height="38">Post Your Answer</BasicButton>
		</CreateAnswerForm>
	);
};

export default AddForm;
