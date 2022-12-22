import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, params) => {
	const [data, setData] = useState(null);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState(null);

	const getFetch = async (url) => {
		try {
			const result = await axios.get(url);
			setIsPending(false);
			setData(result.data);
		} catch (err) {
			setError(err.message);
			console.error(err);
		}
	};

	useEffect(() => {
		getFetch(url);
	}, [url, params]);

	return [data, isPending, error];
};

export default useFetch;
