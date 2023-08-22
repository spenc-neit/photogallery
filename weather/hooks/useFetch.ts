import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

const getFullUrl = (parameter: string) => {
	switch(parameter){
		case "5":
			console.log("5")
			return `http://api.weatherapi.com/v1/forecast.json?key=7011a2593c7b4e05b61183826231808&q=02818&days=5&aqi=no&alerts=no`
		case "7":
			console.log("7")
			return `http://api.weatherapi.com/v1/forecast.json?key=7011a2593c7b4e05b61183826231808&q=02818&days=7&aqi=no&alerts=no`
		case "current":
			return `http://api.weatherapi.com/v1/current.json?key=7011a2593c7b4e05b61183826231808&q=02818&aqi=no`
	}
}

export const useFetch = (url: string) => {
	const [data, setData] = useState<AxiosResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(undefined);

	//implement current location in this switch?
	const fullUrl = getFullUrl(url);

	useEffect(() => {
		const getData = async () => {
			setError(undefined);
			try {
				const response = await axios.get(`${fullUrl}`);
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
