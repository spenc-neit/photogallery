import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Forecast } from "./Forecast";
import { ForecastTabParams } from "./types/ForecastTabParams";
import {Text} from 'react-native'

export const ForecastTabNavigator = () => {
	const ForecastTab = createBottomTabNavigator<ForecastTabParams>();
	return (
		<ForecastTab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: any;

					if (route.name === "5 Day") {
						// iconName = focused ? "scan-circle" : "scan-circle-outline";
						iconName = "5"
					} else if (route.name === "7 Day") {
						// iconName = focused ? "heart-circle" : "heart-circle-outline";
						iconName = "7"
					}

					// You can return any component that you like here!
					// return <Ionicons name={iconName} size={size} color={color} />;
					return <Text style={{color: `${color}`, fontSize: size}}>{iconName}</Text>
				},
				tabBarActiveTintColor: "#69F",
				tabBarInactiveTintColor: "gray",
				headerShown: false
			})}
		>
			<ForecastTab.Screen name="5 Day" component={Forecast} initialParams = {{days: 5}} />
			<ForecastTab.Screen name="7 Day" component={Forecast} initialParams = {{days: 7}} />
		</ForecastTab.Navigator>
	);
};
