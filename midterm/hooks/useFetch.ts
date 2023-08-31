import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

export const useFetch = (url: string) => {
	const [data, setData] = useState<AxiosResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);

	useEffect(() => {
		const getData = async () => {
			setError(undefined);
			try {
				const response = await axios.get(`${url}`);
				setData(response);
			} catch (error: any) {
				console.log(error);
				setError(error);
			} finally {
				setLoading(false);
			}
		};
		getData();
	}, []);
	return { data, loading, error };
};
