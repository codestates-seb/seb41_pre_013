import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, params) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const getFetch = async (url, params) => {
        try {
            console.log('## fetch url ##', url);
            let result;
            if (params !== undefined) {
                console.log('params', params);
                result = await axios.get(url, { params: params });
            } else result = await axios.get(url);
            console.log(result);
            setIsLoading(false);
            setData(result.data);
        } catch (err) {
            setIsLoading(false);
            setError(err.message);
            console.error(err);
        }
    };

    useEffect(() => {
        getFetch(url, params);
    }, [url, params]);

    return [data, isLoading, error];
};

export default useFetch;