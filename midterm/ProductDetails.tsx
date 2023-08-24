import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useFetch } from "./hooks/useFetch";
import { SafeAreaView } from "react-native-safe-area-context";
import { favoriteItem } from "./types/favoriteItem";

type RouteParams = {
	url: string;
};

export const ProductDetails = () => {
	const buttonPressed = useRef(false);
	const { params }: any = useRoute();
	const typedParams: RouteParams = params;

	const [favoritesList, setFavoritesList] = useState<favoriteItem[]>([]);

	const [inFavorites, setInFavorites] = useState(false);

	const { getItem, setItem } = useAsyncStorage("@storage_key");

	const { data, loading, error } = useFetch(typedParams.url);

	const heartButton = () => {
		return (
			<View style={styles.heartButtonContainer}>
				<TouchableOpacity
					onPress={() => {
						handleHeartPressed();
					}}
				>
					<Ionicons
						name={inFavorites ? "heart" : "heart-outline"}
						size={30}
						color={"indianred"}
					/>
				</TouchableOpacity>
			</View>
		);
	};

	const navigation = useNavigation();
	// navigation.setOptions({
	//     headerRight: heartButton,
	//     headerTitle: "Product Details"
	// })

	useEffect(() => {
		navigation.setOptions({
			headerRight: heartButton,
			headerTitle: "Product Details",
		});
	}, [inFavorites, navigation]);

	let zoomedInData: any;

	if (data !== null) {
		zoomedInData = data.data;
	}

	useEffect(() => {
		retrieveFavorites();
	}, []);

	useEffect(() => {
		const searchResult = favoritesList.findIndex((favorite) => {
			return favorite.url === typedParams.url;
		});

		if (searchResult !== -1) {
			setInFavorites(true);
		}
	}, [favoritesList, typedParams.url]);

	useEffect(() => {
		if (buttonPressed.current) {
			//if the button was actually pressed
			let tempObj: favoriteItem = {
				url: typedParams.url,
				title: zoomedInData.title,
				image: zoomedInData.image,
			};
			if (inFavorites) {
				setFavoritesList((prevFavoritesList) => [
					...prevFavoritesList,
					tempObj,
				]);
				setItem(JSON.stringify([...favoritesList, tempObj]));
				console.log("adding item");
			} else {
				let stringObj = JSON.stringify(tempObj);
				setFavoritesList((prevFavoritesList) =>
					prevFavoritesList.filter((item) => JSON.stringify(item) !== stringObj)
				);
				setItem(
					JSON.stringify(
						favoritesList.filter((item) => JSON.stringify(item) !== stringObj)
					)
				);
				console.log("removing item");
			}
		}
		buttonPressed.current = false;
	}, [inFavorites]);

	const retrieveFavorites = async () => {
		const favs = await getItem();

		if (favs !== null) {
			setFavoritesList(JSON.parse(favs));
			//put in if statement to satisfy typescript
		}
	};

	const handleHeartPressed = () => {
		buttonPressed.current = true;
		setInFavorites((prevValue) => !prevValue);
	};

	if (data === null || loading) {
		return (
			<View style={styles.loadingView}>
				{loading ? (
					<Image
						source={{
							uri: "https://i.gifer.com/ZKZg.gif",
						}}
						alt={"loading"}
						style={styles.loadingImage}
					/>
				) : null}
			</View>
		);
	} else if (data === null) {
		return <>{data === null ? <Text>Error: data is null</Text> : null}</>;
	} else {
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.sameLineContainer}>
					<Text style={styles.itemName}>{zoomedInData.title}</Text>
					<Text style={styles.category}>{zoomedInData.category}</Text>
				</View>

				<Image
					source={{ uri: zoomedInData.image }}
					alt={zoomedInData.title}
					style={styles.image}
					resizeMode="contain"
				/>
				<Text style={styles.description}>{zoomedInData.description}</Text>
				<View style={styles.sameLineContainer}>
					<Text style={styles.price}>${zoomedInData.price.toFixed(2)}</Text>
					<Text style={styles.rating}>
						{zoomedInData.rating.rate} stars ({zoomedInData.rating.count})
					</Text>
				</View>
			</SafeAreaView>
		);
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		paddingHorizontal: 20,
	},
	sameLineContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	itemName: {
		fontSize: 25,
		marginVertical: 15,
		width: "80%",
	},
	image: {
		height: 350,
		width: 350,
		marginVertical: 25,
	},
	price: {
		fontSize: 30,
		color: "green",
	},
	rating: {
		fontSize: 20,
	},
	description: {
		fontSize: 18,
		marginBottom: 15,
	},
	heartButtonContainer: {
		paddingRight: 15,
	},
	category: {
		backgroundColor: "#c4d8ff",
		paddingVertical: 2,
		paddingHorizontal: 7,
		borderWidth: 1,
		borderColor: "#c4d8ff",
		borderRadius: 10,
		textAlign: "center",
	}, loadingImage:{
        width:100,
        height:100
    },
    loadingView:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
});
