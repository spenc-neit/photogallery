import { AxiosResponse } from "axios";
import { Text, View, Image, StyleSheet, SafeAreaView } from "react-native";
import { useFetch } from "./hooks/useFetch";
import { useRoute } from "@react-navigation/native";
import React from "react";

interface ForecastWeatherData {
	forecast: {
		forecastDay: {
			date: string;
			day: {
				condition: string;
				maxTempF: Number;
				minTempF: Number;
			};
		};
	};
	location: {
		name: string;
		region: string;
	};
}

type RouteParams = {
	days: string;
};

const getForecast = (forecastList: any) => {
	return forecastList.map((entry: any) => {
		return (
			<View style={styles.container} key={entry.date}>
				<Text>{entry.date}</Text>
				<Text>
					{entry.day.minTempF}° | {entry.day.maxTempF}°
				</Text>
				<Text>{entry.day.condition.text}</Text>
				<Image
					source={{ uri: "https:" + entry.day.condition.icon }}
					alt={"icon to represent the weather: " + entry.day.condition.text}
					style={{ height: 50, width: 50 }}
				/>
			</View>
		);
	});
};

export const Forecast = () => {
	const { params } = useRoute();
	const typedParams = params as RouteParams;

	if (params == undefined) {
		return <Text>Params is undefined.</Text>;
		//to satisfy typescript
	}

	const { data, loading, error } = useFetch(`${typedParams.days}`);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (!data) {
		return <Text>An error occurred trying to get data.</Text>;
		//to satisfy typescript
	}

	const forecastData = mapResponseToForecastWeatherData(data);

	const forecastList = forecastData.forecast.forecastDay as any;
	console.log(forecastList);

	return (
		<SafeAreaView style={styles.maincontainer}>
			<Text style={styles.citystate}>
				Forecast for {forecastData.location.name},{" "}
				{forecastData.location.region}
			</Text>
			{getForecast(forecastList)}
		</SafeAreaView>
	);
};

const mapResponseToForecastWeatherData = (
	response: AxiosResponse<any>
): ForecastWeatherData => {
	const { forecast, location } = response.data;
	return {
		forecast: {
			forecastDay: forecast.forecastday.map((forecastDay: any) => {
				return {
					date: getDayOfWeek(forecastDay.date),
					// date:forecastDay.date,
					day: {
						condition: forecastDay.day.condition,
						maxTempF: Math.round(forecastDay.day.maxtemp_f),
						minTempF: Math.round(forecastDay.day.mintemp_f),
					},
				};
			}),
		},
		location: {
			name: location.name,
			region: location.region,
		},
	};
};

const getDayOfWeek = (date: string) => {
	let temp = new Date(date);

	temp.setHours(24, 0, 0, 0);
	//despite the date passed in being correctly, somehow the day being outputted is one day behind. I had to do this (offset the time by 24 hours aka move to the next day)
	//I couldn't figure out why this was happening to fix it properly, this was the best I could do

	return temp.toLocaleString("en-us", { weekday: "long" }).split(",")[0];
};

const styles = StyleSheet.create({
	image: {
		width: 50,
		height: 50,
	},
	container: {
		marginHorizontal: 20,
		paddingHorizontal: 10,
		flex: 1,
		flexDirection: "row",
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
	},
	maincontainer: {
		flex: 1,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	citystate: {
		fontSize: 24,
		width: "100%",
		textAlign: "center",
	},
});
