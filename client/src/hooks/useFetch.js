import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, params) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	const getFetch = async (url) => {
		try {
			const result = await axios.get(url);
			setIsLoading(false);
			setData(result.data);
		} catch (err) {
			setIsLoading(false);
			setError(err.message);
			console.error(err);
		}
	};

	useEffect(() => {
		getFetch(url);
	}, [url, params]);

	return [data, isLoading, error];
};

export default useFetch;
