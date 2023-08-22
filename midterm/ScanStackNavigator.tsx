import { createStackNavigator } from "@react-navigation/stack"
import { ScanStackParams } from "./ScanStackParams"
import { HomeScreen } from "./HomeScreen";

export const ScanStackNavigator = () => {
    const MidtermScanStack = createStackNavigator<ScanStackParams>();
    return(
        <MidtermScanStack.Navigator screenOptions={{headerShown:false}}>
			<MidtermScanStack.Screen name="Home" component={HomeScreen}/>
		</MidtermScanStack.Navigator>
    )
}