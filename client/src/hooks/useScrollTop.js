import { useEffect } from 'react';

// 페이지 변경 시 스크롤을 맨 위로 올려준다.
const useScrollTop = () => {
	useEffect(() => {
		if (window) window.scrollTo(0, 0);
	}, []);
};

export default useScrollTop;
