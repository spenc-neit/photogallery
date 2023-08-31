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
import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from "react-native-reanimated";
const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) {
	imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

export function Home() {
	type HomeScreenNavigationProp = NativeStackNavigationProp<
		StackParamList,
		"Home"
	>;
	const navigation = useNavigation<HomeScreenNavigationProp>();
	const [searchQuery, setSearchQuery] = useState("");
	const [activeImages, setActiveImages] = useState(imageData);
	const marginVertical = useSharedValue(5);
	const borderRadius = useSharedValue(15)

	const search = (query: string) => {
		const filteredContacts = imageData.filter((image) =>
			image.id.toString().toLowerCase().includes(query.toLowerCase())
		);
		setActiveImages(filteredContacts);
		setSearchQuery(query);
	};

	const animatedStyle = useAnimatedStyle(() => {
		return {
			marginVertical: marginVertical.value,
			borderRadius: borderRadius.value
		};
	});

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			// set our updated margin by adding our base margin of 2 to the scroll offset divided by 30
			// 30 is an arbitrary number that I chose to make the animation feel right
			const newMargin = 5 + event.contentOffset.y / 30;

			// We don't want the margin to ever be less than what we set in our style sheet so don't allow it go below 2
			if (newMargin < 5) {
				marginVertical.value = 5;
				// This is our max margin. We don't want it to go above 20. Set it to whatever you'd like.
			} else if (newMargin > 30) {
				marginVertical.value = 30;
			} else {
				// If the new margin is between 2 and 20, set the shared value to the new margin
				marginVertical.value = newMargin;
			}

			const newRadius = 15 + event.contentOffset.y/30
			if (newRadius < 15) {
				borderRadius.value = 15;
				// This is our max margin. We don't want it to go above 20. Set it to whatever you'd like.
			} else if (newRadius > 50) {
				borderRadius.value = 50;
			} else {
				// If the new margin is between 2 and 20, set the shared value to the new margin
				borderRadius.value = newRadius;
			}
		},
	});

	return (
		<SafeAreaView style={styles.container}>
			<TextInput
				value={searchQuery}
				placeholder="search"
				style={styles.textinput}
				onChangeText={search}
			/>
			<Animated.FlatList
				data={activeImages}
				numColumns={3}
				renderItem={({ item }) => {
					return (
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("PhotoDetail", { url: item.url });
							}}
						>
							<Animated.Image
								sharedTransitionTag={`tag-${item.url}`}
								source={{ uri: item.url }}
								alt={item.id.toString()}
								style={[styles.image, animatedStyle]}
							/>
						</TouchableOpacity>
					);
				}}
				onScroll={scrollHandler}
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
		borderRadius: 15,
	},
	textinput: {
		borderColor: "black",
		borderWidth: 1,
		width: "50%",
		height: 35,
		marginVertical: 40,
	},
});
