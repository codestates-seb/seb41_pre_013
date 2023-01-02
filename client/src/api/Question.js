import axios from 'axios';
import { getLoginInfo } from './LoginInfo';

export const QUES_ENDPOINT =
	process.env.REACT_APP_API + process.env.REACT_APP_API_QUESTION_ENDPOINT;

const API_CONNECT_TIMEOUT = 2000;

// 질문 생성
export const questionCreate = (body) => {
	const { token } = getLoginInfo();
	console.log('token', token);
	axios
		.post(QUES_ENDPOINT, body, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			timeout: API_CONNECT_TIMEOUT,
		})
		.then((res) => {
			console.log(res);
			console.log('질문 생성');
		})
		.catch((e) => {
			console.log(e);
		});
};

// 질문 수정
export const questionPatch = (questionId, body) => {
	console.log(`${QUES_ENDPOINT}/${questionId}`);
	console.log('question id', questionId);
	console.log('body', body);
	const { token } = getLoginInfo();
	console.log('token', token);
	axios
		.patch(`${QUES_ENDPOINT}/${questionId}`, body, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			timeout: API_CONNECT_TIMEOUT,
		})
		.then((res) => {
			console.log(res);
			console.log('질문 수정');
		})
		.catch((e) => {
			console.log(e);
		});
};

// 질문 삭제
export const questionDelete = (id) => {
	const { token } = getLoginInfo();
	console.log(`${QUES_ENDPOINT}/${id}`);
	axios
		.delete(`${QUES_ENDPOINT}/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
			timeout: API_CONNECT_TIMEOUT,
		})
		.then((res) => {
			console.log(res);
			console.log('질문 삭제');
		})
		.catch((e) => {
			console.log(e);
		});
};
