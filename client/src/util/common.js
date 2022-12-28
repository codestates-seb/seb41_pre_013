// 천 단위 콤마 구분(10000 => 10,000)
export const AmountDisplay = (number) => {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 현재 시간 기준 날짜 변환(1 min ago, 2 mins ago, 1 sec ago)
export const DateConvert = (createAt) => {
	let cDate = new Date(createAt);
	const milliSeconds = new Date() - cDate;
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

	const lastDayOfMonth = new Date(
		cDate.getFullYear(),
		cDate.getMonth() + 1,
		0
	).getDate();
	const months = days / lastDayOfMonth;
	if (months < 12) return `${Math.floor(months)} months ago`;

	const years = days / 365;
	return `${Math.floor(years)} years ago`;
};

// 날짜 표시 포맷(Jun 8, 2011 at 2:43)
export const DateFormat = (createAt) => {
	const strDate = new Date(createAt).toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
	});
	const arrDate = strDate.split(',');
	const time = arrDate[2].trim().split(' '); // '5:02 PM'
	let [hour, minute] = time[0].split(':');
	if (time[1] === 'PM') hour = Number(hour) + 12;

	return `${arrDate[0]}, ${arrDate[1]} at ${hour}:${minute}`;
};
