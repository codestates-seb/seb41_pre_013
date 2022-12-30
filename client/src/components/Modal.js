import styled from 'styled-components';
import { BasicButton, CancelButton } from './Button';

const ModalInner = styled.div`
	position: fixed;
	top: ${(props) => (props.pointY ? props.pointY + 'px' : '50%')};
	left: ${(props) => (props.pointX ? props.pointX + 'px' : '50%')};
	-webkit-transform: translate(-50%, -50%);
	-moz-transform: translate(-50%, -50%);
	-ms-transform: translate(-50%, -50%);
	-o-transform: translate(-50%, -50%);
	transform: translate(-50%, -50%);

	background-color: #fff;
	border-radius: 10px;
	border: 1px solid var(--line-color);
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
	display: flex;
	flex-direction: column;
	align-items: space-around;
	padding: 30px 50px;

	.modal-message {
		width: 100%;
		text-align: center;
		white-space: pre-wrap;
		line-height: 2rem;
	}

	.modal-btn {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}
`;

const Modal = ({
	message,
	confirmFn,
	cancelFn,
	viewPoint = { x: false, y: false },
}) => {
	return (
		<ModalInner pointX={viewPoint.x} pointY={viewPoint.y}>
			<div className="modal-message">{message}</div>
			<div className="modal-btn">
				{confirmFn && (
					<BasicButton type="button" onClick={() => confirmFn()}>
						Confirm
					</BasicButton>
				)}
				{cancelFn && (
					<CancelButton type="button" onClick={() => cancelFn()}>
						Cancel
					</CancelButton>
				)}
			</div>
		</ModalInner>
	);
};

export default Modal;
