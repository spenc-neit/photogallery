import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScanStackParams } from './types/ScanStackParams';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  type ScanNavigationProp = StackNavigationProp<ScanStackParams, "Home">;
	const navigation = useNavigation<ScanNavigationProp>();

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  type Params = {
    type: string,
    data: string
  }

  const handleBarCodeScanned = ({ type, data }: Params) => {
    setScanned(true);
    navigation.navigate("ProductDetails", {url: data})
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
