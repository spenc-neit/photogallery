import {
	View,
	Text,
	StyleSheet,
	Platform,
	StatusBar,
	SafeAreaView,
} from "react-native";
import * as Battery from "expo-battery";
import { Subscription } from "expo-battery";
import { useCallback, useEffect, useState } from "react";
import { Accelerometer } from "expo-sensors";

export const ShakeToCharge = () => {
	const [batteryLevel, setBatteryLevel] = useState<number | null>(null);

	const [subscriptionBattery, setSubscriptionBattery] =
		useState<Subscription | null>(null);

	const [accelSubscription, setAccelSubscription] =
		useState<Subscription | null>(null);

	const [accelerometerData, setAccelerometerData] = useState({
		x: 0,
		y: 0,
		z: 0,
	});

	const _subscribeBattery = async () => {
		const batteryLevel = await Battery.getBatteryLevelAsync();
		setBatteryLevel(batteryLevel);

		setSubscriptionBattery(
			Battery.addBatteryLevelListener(({ batteryLevel }) => {
				setBatteryLevel(batteryLevel);
				console.log("batteryLevel changed!", batteryLevel);
			})
		);
	};

	const _unsubscribeBattery = useCallback(() => {
		subscriptionBattery && subscriptionBattery.remove();
		setSubscriptionBattery(null);
	}, [subscriptionBattery]);

	useEffect(() => {
		return () => _unsubscribeBattery();
	}, [_unsubscribeBattery]);

	useEffect(() => {
		_subscribeBattery();
	}, []);

	useEffect(() => {
		const { x, y, z } = accelerometerData;
		// the number of G's the accelerometer detected.
		const magnitude = Math.sqrt(x * x + y * y + z * z);

		if (magnitude > 1.5) {
			setBatteryLevel((prevBatteryLevel) => {
				if (prevBatteryLevel !== null) {
					return Math.min(prevBatteryLevel + 0.01, 1);
				} else {
					return prevBatteryLevel;
				}
			});
		}
	}, [accelerometerData]);

	const _subscribeAccelerometer = () => {
		setAccelSubscription(Accelerometer.addListener(setAccelerometerData));
	};

	const _unsubscribeAccelerometer = () => {
		accelSubscription && accelSubscription.remove();
		setAccelSubscription(null);
	};

	useEffect(() => {
		_subscribeAccelerometer();
		return () => _unsubscribeAccelerometer();
	}, []);

	if (batteryLevel === null) {
		return (
			<SafeAreaView style={styles.androidSafeArea}>
				<Text>Battery is null</Text>
			</SafeAreaView>
		);
	}

	let bgColor: String;

	if (batteryLevel < 0.2) {
		bgColor = "red";
	} else if (batteryLevel < 0.5) {
		bgColor = "yellow";
	} else {
		bgColor = "green";
	}

	return (
		<SafeAreaView style={styles.androidSafeArea}>
			<View style={styles.battery}>
				<View
					style={{
						height: "100%",
						width: `${batteryLevel * 100}%`,
						backgroundColor: `${bgColor}`,
					}}
				>
					<View style={styles.dividerContainer}>
						<View style={styles.divider}></View>
						<View style={styles.divider}></View>
						<View style={styles.divider}></View>
						<View style={styles.divider}></View>
						<View style={styles.lastDivider}></View>
					</View>
				</View>
			</View>
			<Text>Battery level: {(batteryLevel * 100).toFixed(2)}%</Text>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	androidSafeArea: {
		flex: 1,
		backgroundColor: "white",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
		alignItems: "center",
		justifyContent: "center",
	},
	battery: {
		width: 350,
		borderWidth: 1,
		borderColor: "black",
		height: 100,
		boxSizing: "border-box",
	},
	text: {
		fontSize: 20,
	},
	divider: {
		width: 70,
		height: "100%",
		borderRightWidth: 1,
		borderColor: "black",
		boxSizing: "border-box",
	},
	lastDivider: {
		width: 70,
		height: "100%",
		borderColor: "black",
		boxSizing: "border-box",
	},
	dividerContainer: {
		flexDirection: "row",
		height: "100%",
		width: 350,
		boxSizing: "border-box",
	},
});
