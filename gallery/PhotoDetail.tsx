import { StackParamList } from "./GalleryStackParamList";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import {
	SafeAreaView,
	TouchableOpacity,
	Image,
	StyleSheet,
	Text,
} from "react-native";

type PhotoDetailNavigationProp = StackNavigationProp<
	StackParamList,
	"PhotoDetail"
>;
type PhotoDetailRouteProp = RouteProp<StackParamList, "PhotoDetail">;

export function PhotoDetail() {
	const navigation = useNavigation<PhotoDetailNavigationProp>();
	const { params } = useRoute<PhotoDetailRouteProp>();

	const id = params.url.split("/")[4];

	useEffect(() => {
		navigation.setOptions({ headerTitle: params.url });
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate("FeaturedPhotoModal", { url: params.url });
				}}
			>
				<Image
					source={{ uri: params.url }}
					alt={params.url}
					style={styles.image}
				/>
			</TouchableOpacity>
			<Text>Tap the image to enlarge it.</Text>
			<Text style={styles.header}>{params.url}</Text>
			<Text style={styles.details}>
				This is photo number {id} of the collection. It, like all of them, was
				generated from a public API for dummy photos.
			</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
	},
	image: {
		width: 250,
		height: 200,
		margin: 10,
		borderRadius: 15,
	},
	header: {
		fontSize: 25,
		marginVertical: 10,
		fontWeight: "bold",
	},
	details: {
		fontSize: 18,
		marginHorizontal: 20,
	},
});
