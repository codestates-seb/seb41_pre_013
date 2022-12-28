import styled from 'styled-components';
import { BasicButton, CancelButton } from '../Button';
import Loading from '../Loading';
import { ANSWER_ENDPOINT } from '../../api/Answer';
import useFetch from '../../hooks/useFetch';
import { useNavigate, useParams } from 'react-router-dom';
import { answerUpdate } from '../../api/Answer';

const AnswerEditForm = styled.form`
	margin: 20px 0 10px;

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
		margin-bottom: 5px;

		:focus {
			border: var(--border-input-focus);
			outline: var(--outline-input-focus);
		}
	}
	.explain-02 {
		margin-bottom: 10px;
		p {
			font-size: var(--font-size-0-9rem);
			margin-bottom: 20px;
		}
	}
`;

const EditForm = ({ item }) => {
	const { questionId, answerId } = useParams();
	const navigate = useNavigate();
	const [answerItem, isLoading, error] = useFetch(
		ANSWER_ENDPOINT(questionId) + '/' + answerId
	);

	const handleSubmit = (e) => {
		e.preventDefault();
		const form = e.target;

		const successCb = () => (window.location.href = `/questions/${questionId}`);
		const failCb = () => alert('답변 수정에 실패했습니다.');
		answerUpdate(
			{
				memberId: 1,
				answerId: Number(answerId),
				questionId: Number(questionId),
				content: form.answer_text.value,
				updateAt: new Date(),
			},
			successCb,
			failCb
		);
	};
	return (
		<AnswerEditForm onSubmit={handleSubmit}>
			{error && <div>답변 정보 조회 실패</div>}
			{isLoading ? (
				<Loading />
			) : (
				<>
					<h3>Answer</h3>
					<textarea name="answer_text" defaultValue={answerItem[0].content} />
					<div className="explain-02">
						<p>
							I'd say it's not supported.{' '}
							<a href="https://fullcalendar.io/docs/selection/select_callback/">
								https://fullcalendar.io/docs/selection/select_callback/
							</a>{' '}
							indicates that when a selection is made, the callback will return
							a single "resource" object which will indicate the resource chosen
							by the user. This implies that selecting multiple resources via
							dragging the mouse on the timeline is not possible.
						</p>
						<p>
							You can create events via the "events" feeds which are associated
							with multiple resources (see{' '}
							<a href="https://fullcalendar.io/docs/resource_data/associating_events/">
								https://fullcalendar.io/docs/resource_data/associating_events/
							</a>
							) but it's not supported via the UI yet.
						</p>
						<p>
							You'd have to create your own UI to allow the user to specify
							this, and/or put in a feature request to the maintainer to add
							this support in future (it may already be on the roadmap, I
							haven't looked).
						</p>
					</div>
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
				</>
			)}
		</AnswerEditForm>
	);
};

export default EditForm;
