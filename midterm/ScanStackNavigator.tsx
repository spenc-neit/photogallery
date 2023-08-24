import { createStackNavigator } from "@react-navigation/stack"
import { ScanStackParams } from "./types/ScanStackParams"
import { HomeScreen } from "./HomeScreen";
import { ProductDetails } from "./ProductDetails";

export const ScanStackNavigator = () => {
    const MidtermScanStack = createStackNavigator<ScanStackParams>();
    return(
        <MidtermScanStack.Navigator >
			<MidtermScanStack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
            <MidtermScanStack.Screen name="ProductDetails" component={ProductDetails} />
		</MidtermScanStack.Navigator>
    )
}