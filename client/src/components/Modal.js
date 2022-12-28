import styled from 'styled-components';
import { BasicButton, CancelButton } from './Button';

const ModalOuter = styled.div`
	position: absolute;
	top: 0px;
	left: 0px;
	right: 0px;
	bottom: 0px;
	/* background-color: rgba(0, 0, 0, 0.4); */
`;

const ModalInner = styled.div`
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
	border: 2px solid var(--line-color);
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	display: flex;
	flex-direction: column;
	align-items: space-around;
	padding: 30px 50px;

	.modal-message {
		width: 100%;
		text-align: center;
	}

	.modal-btn {
		margin-top: 20px;
		display: flex;
		justify-content: space-between;
	}
`;

const Modal = ({ message, confirmFn, cancelFn }) => {
	return (
		<>
			<ModalOuter>
				<ModalInner>
					<div className="modal-message">{message}</div>
					<div className="modal-btn">
						{confirmFn && (
							<BasicButton type="button" onClick={() => confirmFn()}>
								Confirm
							</BasicButton>
						)}
						<CancelButton type="button" onClick={() => cancelFn()}>
							Cancel
						</CancelButton>
					</div>
				</ModalInner>
			</ModalOuter>
		</>
	);
};

export default Modal;
