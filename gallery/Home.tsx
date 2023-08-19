import { useState } from "react";
import { ImageData } from "./ImageData";
import {
	SafeAreaView,
	TouchableOpacity,
	Image,
	TextInput,
	FlatList,
	StyleSheet,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "./GalleryStackParamList";
import { useNavigation } from "@react-navigation/native";
const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) {
	imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

export function Home() {
	type HomeScreenNavigationProp = StackNavigationProp<StackParamList, "Home">;
	const navigation = useNavigation<HomeScreenNavigationProp>();
	const [searchQuery, setSearchQuery] = useState("");
	const [activeImages, setActiveImages] = useState(imageData);

	const search = (query: string) => {
		const filteredContacts = imageData.filter((image) =>
			image.id.toString().toLowerCase().includes(query.toLowerCase())
		);
		setActiveImages(filteredContacts);
		setSearchQuery(query);
	};

	return (
		<SafeAreaView style={styles.container}>
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
								navigation.navigate("PhotoDetail", { url: item.url });
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
		</SafeAreaView>
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
	textinput: {
		borderColor: "black",
		borderWidth: 1,
		width: "50%",
		height: 35,
		marginVertical: 40,
	},
});
