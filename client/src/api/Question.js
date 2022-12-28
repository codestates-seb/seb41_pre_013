import axios from 'axios';

export const QUES_ENDPOINT =
	process.env.REACT_APP_API + process.env.REACT_APP_API_QUESTION_ENDPOINT;

// 질문 생성
export const questionCreate = () => {};

// 질문 수정
export const questionPatch = () => {};

// 질문 삭제
export const questionDelete = (id, callback) => {
	axios
		.delete(QUES_ENDPOINT, {
			data: { questionId: id },
		})
		.then((res) => {
			// setIsLogin(false);
		})
		.catch((e) => {
			console.log(e.response.statusText);
		});
};
