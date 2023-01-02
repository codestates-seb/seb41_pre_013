export const getLoginInfo = () => {
	const token = localStorage.getItem('token');
	const displayName = localStorage.getItem('displayName');
	const memberId = localStorage.getItem('id');

	return { token, displayName, memberId };
};
