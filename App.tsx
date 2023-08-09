import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StackParamList } from "./StackParamList";

const Stack = createStackNavigator<StackParamList>();

import { ImageData } from "./ImageData";
import { Home } from "./Home";
import { PhotoDetail } from "./PhotoDetail";
import { FeaturedPhotoModal } from "./FeaturedPhotoModal";
const imageData: ImageData[] = [];
for (let i = 1; i < 70; i++) {
	imageData.push({ id: i, url: `https://picsum.photos/id/${i}/200` });
}

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					component={Home}
					options={{
						headerTitle: "Photo Gallery",
						headerStyle: { backgroundColor: "#69F" },
					}}
				/>
				<Stack.Screen
					name="PhotoDetail"
					options={{
						headerTitle: "This should not be seen",
						headerStyle: { backgroundColor: "#69F" },
					}}
					component={PhotoDetail}
				/>
				<Stack.Screen
					name="FeaturedPhotoModal"
					component={FeaturedPhotoModal}
					options={{
						presentation: "modal",
						headerTintColor: "white",
						headerTitle: "",
						headerStyle: { backgroundColor: "black" },
						cardStyle: { backgroundColor: "black" },
						headerShown:false,
						headerShadowVisible:false
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
