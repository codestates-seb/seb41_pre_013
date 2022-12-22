import styled from 'styled-components';

const LoadingBar = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;

	span {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		display: inline-block;
		position: relative;
		border: 10px solid;
		border-color: rgba(0, 0, 0, 0.15) rgba(0, 0, 0, 0.25) rgba(0, 0, 0, 0.35)
			rgba(0, 0, 0, 0.5);
		animation: rotation 1s linear infinite;

		@keyframes rotation {
			0% {
				transform: rotate(0deg);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
`;

export default function Loading() {
	return (
		<LoadingBar>
			<span />
		</LoadingBar>
	);
}
