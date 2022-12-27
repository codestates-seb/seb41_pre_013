import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

export const QUES_ENDPOINT =
	process.env.REACT_APP_API_URL + process.env.REACT_APP_API_QUESTION_ENDPOINT;

// 질문 생성
export const questionCreate = (questionTitle, questionContent) => {
	console.log(QUES_ENDPOINT);
	axios
		.post(QUES_ENDPOINT, {
				title: questionTitle,
				content: questionContent
		})
		.then((res) => {
			console.log(res);
			console.log("질문 생성");
			// navigate('/');
		})
		.catch((e) => {
			console.log(e);
		});
};

// 질문 수정
export const questionPatch = (questionTitle, questionContent) => {
	axios
		.patch(QUES_ENDPOINT, {
				title: questionTitle,
				content: questionContent
		})
		.then((res) => {
			console.log(res);
			console.log("질문 수정");
			// navigate('/');
		})
		.catch((e) => {
			console.log(e);
		});
};

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
