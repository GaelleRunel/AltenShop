import { useState, useEffect } from 'react';

const useApiCall = (url) => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await fetch(url);
				const json = await response.json();
				setData(json);
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [url]);

	return { data, error, loading };
};

export default useApiCall;
