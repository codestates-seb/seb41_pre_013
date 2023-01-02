import axios from 'axios';
import { getLoginInfo } from './LoginInfo';

// api url
export const ANSWER_ENDPOINT =
	process.env.REACT_APP_API + process.env.REACT_APP_API_ANSWER_ENDPOINT;

const API_CONNECT_TIMEOUT = 2000;

// 답변 생성
export const answerCreate = async (questionId, body) => {
	const { token } = getLoginInfo();
	// console.log(ANSWER_ENDPOINT);

	try {
		let result = await axios.post(ANSWER_ENDPOINT, body, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			params: { 'question-id': Number(questionId) },
			timeout: API_CONNECT_TIMEOUT,
			params: { 'question-id ': Number(questionId) },
		});
		// console.log(result);
		return { state: 'OK', data: result.data.response };
	} catch (err) {
		console.error('Error: ', err);
		return { state: 'error' };
	}
};

// 답변 수정
export const answerUpdate = async (answerId, body) => {
	const { token } = getLoginInfo();
	const path = `${ANSWER_ENDPOINT}/${answerId}`;
	// console.log(path);

	try {
		let result = await axios.patch(path, body, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			timeout: API_CONNECT_TIMEOUT,
		});
		// console.log(result);
		return { state: 'OK', data: result.data.response };
	} catch (err) {
		console.error('Error: ', err);
		return { statusText: 'error' };
	}
};

// 답변 삭제
export const answerDelete = async (answerId) => {
	const { token } = getLoginInfo();
	const path = `${ANSWER_ENDPOINT}/${answerId}`;
	// console.log(path);

	try {
		let result = await axios.delete(path, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			timeout: API_CONNECT_TIMEOUT,
		});
		// console.log(result);
		return { state: 'OK', msg: result.data };
	} catch (err) {
		console.error('Error: ', err);
		return { state: 'error' };
	}
};
