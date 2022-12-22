// 천 단위 콤마 구분(10000 => 10,000)
export const AmountComma1000 = (number) => {
	return Number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 현재 시간 기준 날짜 변환(1 min ago, 2 mins ago, 1 sec ago)
export const DateConvert = (createAt) => {
	const milliSeconds = new Date() - createAt;

	const seconds = milliSeconds / 1000;
	if (seconds < 60) return `${Math.floor(seconds)} secs ago`;

	const minutes = seconds / 60;
	if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;

	const hours = minutes / 60;
	if (hours < 60) return `${Math.floor(hours)} hours ago`;

	const days = hours / 24;
	if (days < 7) return `${Math.floor(days)} days ago`;

	const weeks = days / 7;
	if (weeks < 5) return `${Math.floor(weeks)} weeks ago`;

	const months = days / 30;
	if (months < 12) return `${Math.floor(months)} months ago`;

	const years = days / 365;
	return `${Math.floor(years)} years ago`;
};
