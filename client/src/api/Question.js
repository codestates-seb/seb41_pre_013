import axios from 'axios';

export const QUES_ENDPOINT =
	process.env.REACT_APP_API + process.env.REACT_APP_API_QUESTION_ENDPOINT;

// 질문 생성
export const questionCreate = (body) => {
	console.log("body", body);
	console.log(QUES_ENDPOINT);
	axios
		.post(QUES_ENDPOINT, body)
		.then((res) => {
			console.log(res);
			console.log("질문 생성");
		})
		.catch((e) => {
			console.log(e);
		});
};

// 질문 수정
export const questionPatch = (id, questionTitle, questionContent) => {
	console.log(id, questionTitle, questionContent);
	console.log(`${QUES_ENDPOINT}/${id}`);
	axios
		.patch(`${QUES_ENDPOINT}/${id}`, {
				title: questionTitle,
				content: questionContent
		})
		.then((res) => {
			console.log(res);
			console.log("질문 수정");
		})
		.catch((e) => {
			console.log(e);
		});
};

// 질문 삭제
export const questionDelete = (id) => {
	console.log(`${QUES_ENDPOINT}/${id}`);
	axios
		.delete(`${QUES_ENDPOINT}/${id}`)
		.then((res) => {
			console.log(res);
			console.log("질문 삭제");
		})
		.catch((e) => {
			console.log(e);
		});
};
