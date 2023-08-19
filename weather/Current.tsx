import { Image, SafeAreaView, StyleSheet, Text } from "react-native";
import { CurrentResponse } from "./types/CurrentResponse";
import { CurrentData } from "./types/CurrentData";
import { useFetch } from "./hooks/useFetch";

export const Current = () => {
	const { data, loading, error } = useFetch("current");

	if (loading) {
		return <Text>loading...</Text>;
	}

	if (!data) {
		return <Text>loading or problem with data</Text>;
	}

	const typedData = data.data as CurrentResponse;

	const output: CurrentData = {
		city: typedData["location"]["name"],
		state: typedData["location"]["region"],
		temp: typedData["current"]["temp_f"],
		feelslike: typedData["current"]["feelslike_f"],
		icon: typedData["current"]["condition"]["icon"],
		condition: typedData["current"]["condition"]["text"],
	};

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.citystate}>{output.city}, {output.state}</Text>
            <Image
				source={{ uri: "https:" + output.icon }}
				alt={output.condition}
				style={styles.image}
			/>
            <Text style={styles.condition}>{output.condition}</Text>
            <Text style={styles.temp}>{output.temp}°</Text>
            <Text style={styles.feelslike}>Feels like {output.feelslike}°</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 250
    },
    container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
    citystate:{
        fontSize:24
    },
    temp:{
        fontSize:48,
        marginVertical:10
    },
    condition: {
        fontSize:28
    },
    feelslike:{
        fontSize:30,
        color:"dimgrey"
    }
})