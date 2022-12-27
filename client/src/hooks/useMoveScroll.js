import { useRef } from 'react';

const useMoveScroll = () => {
	const element = useRef(null);
	const onMoveToElement = () => {
		element.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
	};

	return { element, onMoveToElement };
};

export default useMoveScroll;
