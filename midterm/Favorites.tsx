import {
	useFocusEffect,
	useNavigation,
} from "@react-navigation/native";
import { useState } from "react";
import {
	SafeAreaView,
	Text,
	StyleSheet,
	View,
	Image,
} from "react-native";
import { TouchableOpacity } from "react-native";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { favoriteItem } from "./types/favoriteItem";
import { MidtermTabParamList } from "./types/MidtermTabParamList";
import { ScrollView } from "react-native-gesture-handler";

export const Favorites = () => {
	const [favoritesList, setFavoritesList] = useState<favoriteItem[]>([]);
	const { getItem } = useAsyncStorage("@storage_key");

	useFocusEffect(
		React.useCallback(() => {
			retrieveFavorites();
		}, [])
	);
	const retrieveFavorites = async () => {
		console.log("retrieveFavorites");
		const favs = await getItem();

		if (favs !== null) {
			setFavoritesList(JSON.parse(favs));
			//put in if statement to satisfy typescript
		}
	};

	type FavNavProp = StackNavigationProp<MidtermTabParamList, "Favorites">;
	const navigator = useNavigation<FavNavProp>();

	const handleItemPressed = (paramUrl: string) => {
		navigator.navigate("Scan", {
			screen: "ProductDetails",
			params: { url: paramUrl },
		});
	};

	return (
		<SafeAreaView style={styles.safeAreaView}>
            <ScrollView>
			{favoritesList.map((favorite, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => {
						handleItemPressed(favorite.url);
					}}
				>
					<View style={styles.favoriteItem}>
						<Image
							source={{ uri: favorite.image }}
							alt={favorite.title}
							style={styles.image}
							resizeMode="contain"
						/>
						<Text numberOfLines={1} style={styles.favoriteTitle}>{favorite.title}</Text>
					</View>
				</TouchableOpacity>
			))}
            </ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeAreaView: {
		flex: 1,
		// paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	image: {
		height: 75,
		width: 75,
        marginRight:5
	},
	favoriteItem: {
		// flex:1,
		flexDirection: "row",
		borderStyle: "solid",
		borderColor: "black",
		borderWidth: 1,
		borderRadius: 10,
		margin: 5,
		padding: 5,
		alignItems: "center",
	},
	favoriteTitle: {
		fontSize: 20,
        width:"80%"
	},
});
