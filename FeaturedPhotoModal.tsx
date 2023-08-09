import { Button, Image, StyleSheet, View, Text } from "react-native";
import { StackParamList } from "./StackParamList";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

type FeaturedPhotoModalRouteProp = RouteProp<
	StackParamList,
	"FeaturedPhotoModal"
>;

type FeaturedPhotoModalNavigationProp = StackNavigationProp<
	StackParamList,
	"FeaturedPhotoModal"
>;

export const FeaturedPhotoModal = () => {
	const { params } = useRoute<FeaturedPhotoModalRouteProp>();
    const navigator = useNavigation<FeaturedPhotoModalNavigationProp>();
	return (
        <SafeAreaView style={styles.container}>
            <View style={styles.buttonview}>
                <Button title="Go back" color={"#69F"} onPress={()=>{
                    navigator.goBack();
                }}/>
            </View>
            <Image source={{ uri: params.url }} alt={params.url} style={styles.image} />
            <View style={styles.spacingview} />
        </SafeAreaView>
		
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
	},
	image: {
		width: 350,
		height: 350,
		margin: 5,
    },
    spacingview: {
        height:30,
        backgroundColor:"white"
    },
    buttonview:{
        alignItems:"flex-start",
        width:"100%",
        paddingLeft:10
    }
});
