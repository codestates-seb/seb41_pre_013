import { useEffect } from 'react';
import styled from 'styled-components';

const ToestBox = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	-o-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);

	background-color: #fff;
	border-radius: 10px;
	border: 1px solid var(--line-color);
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
	padding: 30px 50px;

	.message {
		width: 100%;
		text-align: center;
		white-space: pre-wrap;
		line-height: 2rem;
	}
`;

const Toest = ({ message, callback }) => {
	useEffect(() => {
		const timerID = setTimeout(() => {
			callback();
		}, 1000);

		return () => {
			clearTimeout(timerID);
		};
	}, [message, callback]);

	return (
		<ToestBox>
			<div className="message">{message}</div>
		</ToestBox>
	);
};

export default Toest;
