import { createDrawerNavigator } from "@react-navigation/drawer";
import { Current } from "./Current";
import { ForecastTabNavigator } from "./ForecastTabNavigator";
import { WeatherDrawerParams } from "./types/WeatherDrawerParams";

export const WeatherDrawerNavigator = () => {
    const WeatherDrawer = createDrawerNavigator<WeatherDrawerParams>();
	return(
		<WeatherDrawer.Navigator>
			<WeatherDrawer.Screen name="Current" component={Current} />
            <WeatherDrawer.Screen name="Forecast" component={ForecastTabNavigator} />
		</WeatherDrawer.Navigator>
	);
}