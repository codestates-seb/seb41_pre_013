import axios from 'axios';

export const ANSWER_ENDPOINT = (questionId) => {
	return (
		process.env.REACT_APP_API +
		process.env.REACT_APP_API_ANSWER_ENDPOINT.replace(':questionId', questionId)
	);
};
const API_CONNECT_TIMEOUT = 1000;

// 답변 생성
export const answerCreate = async (body, successCb, failCb) => {
	const api_url = process.env.REACT_APP_API + '/answers';

	try {
		await axios.post(api_url, body, {
			timeout: API_CONNECT_TIMEOUT,
		});
		successCb();
	} catch (err) {
		failCb();
		console.error('Error: ', err);
	}
};

// 답변 수정
export const answerUpdate = async (body, successCb, failCb) => {
	const api_url = process.env.REACT_APP_API + '/answers/' + body.answerId;
	console.log(api_url);
	try {
		await axios.patch(api_url, body, {
			timeout: API_CONNECT_TIMEOUT,
		});
		successCb();
	} catch (err) {
		failCb();
		console.error('Error: ', err);
	}
};

// 답변 삭제
export const answerDelete = async (answerId, successCb, failCb) => {
	const api_url = process.env.REACT_APP_API + '/answers/' + answerId;
	try {
		let result = await axios.delete(api_url, {
			timeout: API_CONNECT_TIMEOUT,
		});
		console.log(result);
		successCb();
	} catch (err) {
		failCb();
		console.error('Error: ', err);
	}
};
