import axios from 'axios';
import { getLoginInfo } from './LoginInfo';

export const ANSWER_ENDPOINT = (questionId) => {
	return (
		process.env.REACT_APP_API +
		process.env.REACT_APP_API_ANSWER_ENDPOINT.replace(':questionId', questionId)
	);
};
const API_CONNECT_TIMEOUT = 1000;

// 답변 생성
export const answerCreate = async (questionId, body) => {
	const api_url = process.env.REACT_APP_API + '/answer';
	console.log(api_url);
	const { token } = getLoginInfo();

	try {
		let result = await axios.post(api_url, body, {
			headers: { Authorization: token },
			timeout: API_CONNECT_TIMEOUT,
			params: { 'question-id ': Number(questionId) },
		});
		console.log(result);
		const { statusText, data } = result;
		return { statusText };
	} catch (err) {
		console.error('Error: ', err);
		return { statusText: 'error' };
	}
};

// 답변 수정
export const answerUpdate = async (answerId, body) => {
	const api_url = process.env.REACT_APP_API + '/answer/' + answerId;
	console.log(api_url);
	const { token } = getLoginInfo();

	try {
		let result = await axios.patch(api_url, body, {
			headers: { Authorization: token },
			timeout: API_CONNECT_TIMEOUT,
		});
		console.log(result);

		const { statusText, data } = result;
		console.log('statusText=', statusText);
		return { statusText, data };
	} catch (err) {
		console.error('Error: ', err);
		return { statusText: 'error' };
	}
};

// 답변 삭제
export const answerDelete = async (answerId) => {
	const api_url = process.env.REACT_APP_API + '/answer/' + answerId;
	console.log(api_url);
	const { token } = getLoginInfo();

	try {
		let result = await axios.delete(api_url, {
			headers: { Authorization: token },
			timeout: API_CONNECT_TIMEOUT,
		});
		console.log(result);
		const { statusText, data } = result;
		return { statusText, msg: '해당 답변이 성공적으로 삭제되었습니다.' };
	} catch (err) {
		console.error('Error: ', err);
		return { statusText: 'error', msg: '' };
	}
};
