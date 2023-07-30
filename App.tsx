import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
	StyleSheet,
	View,
	FlatList,
	Image,
	TouchableOpacity,
	TextInput,
} from "react-native";
import { ImageData } from "./ImageData";

const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) {
	imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

export default function App() {
	const [displayLgImg, setDisplayLgImg] = useState(false);
	const [featuredImgUrl, setFeaturedImgUrl] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [activeImages, setActiveImages] = useState(imageData);

	const search = (query: string) => {
		const filteredContacts = imageData.filter((image) =>
			image.id.toString().toLowerCase().includes(query.toLowerCase())
		);
		setActiveImages(filteredContacts);
		setSearchQuery(query);
	};

	const showLgImg = (source: string) => {
		setFeaturedImgUrl(source);
		setDisplayLgImg(true);
	};

	const hideLgImg = () => {
		setDisplayLgImg(false);
	};

	if (displayLgImg) {
		return (
			<View style={styles.featuredImageView}>
				<TouchableOpacity onPress={hideLgImg}>
					<Image
						source={{ uri: featuredImgUrl }}
						style={styles.featuredImage}
					/>
				</TouchableOpacity>
			</View>
		);
	}
	return (
		<View style={styles.container}>
			<TextInput
				value={searchQuery}
				placeholder="search"
				style={styles.textinput}
				onChangeText={search}
			/>
			<FlatList
				data={activeImages}
				numColumns={3}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								showLgImg(item.url);
							}}
						>
							<Image
								source={{ uri: item.url }}
								alt={item.id.toString()}
								style={styles.image}
							/>
						</TouchableOpacity>
					);
				}}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 100,
		height: 100,
		margin: 5,
	},
	featuredImage: {
		width: 200,
		height: 200,
	},
	featuredImageView: {
		height: "100%",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "black",
	},
	textinput: {
		borderColor: "black",
		borderWidth: 1,
		width: "50%",
		height: 35,
		marginVertical: 40,
	},
});
