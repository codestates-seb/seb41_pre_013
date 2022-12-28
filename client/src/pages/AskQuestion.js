import { useState } from 'react';
import styled from 'styled-components';
import AskQuestionForm from '../components/AskQuestionForm';
import { useNavigate, useParams } from 'react-router-dom';
import { questionCreate } from '../api/Question';

const ContentContainer = styled.div`
	width: 100%;

	max-width: var(--max-width);
	background: none;
`;

const MainContent = styled.main`
	margin: 0 var(--main-outline-margin) 80px var(--main-outline-margin);
	background-image: url('https://cdn.sstatic.net/Img/ask/background.svg?v=2e9a8205b368');
	background-repeat: no-repeat;
	background-position: right top;
	background-size: 550px;

	h2 {
		color: var(--font-color-title);
	}

	h1 {
		color: var(--font-color-title);
	}

	.ask-question-info {
		color: #374f51;
		background-color: #ebf4fb;
		padding: 24px;
		border-radius: 5px;
		border: 1px solid #bbd9f1;
		margin-top: 40px;

> h2 {
			font-weight: 400;
			color: #374f51;
			margin-bottom: 8px;
		}

		.second-info {
			margin-bottom: 15px;
		}

> h5 {
			color: #374f51;
			margin-bottom: 8px;
		}
	}

	li {
		list-style-position: inside;
		margin-left: 15px;
		font-size: 13px;
	}
`;

const AskQuestionContainer = styled.div`
	width: 850px;
`;

const AskQuestionDescription = styled.div`
	.ask-question-title {
		height: 86px;
		margin-top: 20px;

		h2 {
			font-size: 27px;
			line-height: 86px;
		}
	}
`;

function AskQuestion() {
	const [askTitle, setAskTitle] = useState('');
	const [askContent, setAskContent] = useState('');
	const [askTag, setAskTag] = useState('');

	const navigate = useNavigate();

	const handleSubmit = (askTitle, askContent, askTag) => {
		//const data = { askTitle, askContent };
		questionCreate(askTitle, askContent, askTag);
		console.log("질문 post");
		console.log(askTitle);
		console.log(askContent);
		console.log(askTag);
		// navigate('/');
	}

	return (
		<ContentContainer>
			<MainContent>
				<AskQuestionContainer>
					<AskQuestionDescription>
						<div className="ask-question-title">
							<h2>Ask a public question</h2>
						</div>
						<div className="ask-question-info">
							<h2>Writing a good question</h2>
							<p>
								You're ready to ask a programming-related question and this form
								will help guide you through the process.
							</p>
							<p className="second-info">
								Looking to ask a non-programming question? See the topics here
								to find a relevant site.
							</p>
							<h5>Steps</h5>
							<ul>
								<li>Summarize your problem in a one-line title.</li>
								<li>Describe your problem in more detail.</li>
								<li>
									Describe what you tried and what you expected to happen.
								</li>
								<li>
									Add "tags" which help surface your question to members of the
									community.
								</li>
								<li>Review your question and post it to the site.</li>
							</ul>
						</div>
					</AskQuestionDescription>
				</AskQuestionContainer>
				<AskQuestionForm 
					askTitle = {askTitle}
					setAskTitle = {setAskTitle}
					askContent = {askContent}
					setAskContent = {setAskContent}
					askTag = {askTag}
					setAskTag = {setAskTag}
					handleSubmit = {handleSubmit}
				/>
			</MainContent>
		</ContentContainer>
	);
}

export default AskQuestion;
