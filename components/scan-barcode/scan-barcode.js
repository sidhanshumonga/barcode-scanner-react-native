import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  Keyboard,
} from 'react-native';
import {Input, Icon} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export default function ScanBarcode() {
  const [alertPresent, setAlertPresent] = React.useState(false);
  const [torch, setTorch] = React.useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
  const [barcodeValue, setBarcodeValue] = React.useState('');

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const updateTorch = () => {
    console.log('here');
    if (torch) {
      setTorch(false);
    } else {
      setTorch(true);
    }
  };

  barcodeRecognized = ({barcodes}) => {
    if (!alertPresent) {
      if (!barcodes[0].data.includes('error')) {
        setBarcodeValue(barcodes[0].data);
      }
    }
  };

  scanBarcode = () => {
    if (barcodeValue) {
      setAlertPresent(true);
    }
  };

  React.useEffect(() => {
    if (alertPresent) {
      Alert.alert('Scanned barcode', barcodeValue, [
        {
          text: 'Okay',
          onPress: () => {
            setAlertPresent(false);
            setBarcodeValue('');
          },
          style: 'cancel',
        },
      ]);
    }
  }, [alertPresent, barcodeValue]);

  return (
    <View style={styles.scene}>
      <Input
        value={barcodeValue}
        placeholder="Search barcode"
      />
      <TouchableOpacity onPress={updateTorch} styles={styles.torchPlace}>
        <Icon
          name={torch ? 'flash-off' : 'flash-on'}
          size={25}
          color="#2196f3"
          iconStyle={styles.flashIcon}
        />
      </TouchableOpacity>
      {isKeyboardVisible ? null : (
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          type={RNCamera.Constants.Type.back}
          flashMode={
            torch
              ? RNCamera.Constants.FlashMode.torch
              : RNCamera.Constants.FlashMode.off
          }
          captureAudio={false}
          onGoogleVisionBarcodesDetected={barcodeRecognized}
          googleVisionBarcodeType={
            alertPresent
              ? 0
              : RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType
                  .CODE_128
          }
          style={styles.scanner}>
          <BarcodeMask edgeRadius={10} lineAnimationDuration={900} />
        </RNCamera>
      )}
      <TouchableHighlight
        onPress={scanBarcode}
        style={styles.footer}
        underlayColor="white">
        <View>
          <Text style={styles.footerText}>SCAN BARCODE</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    padding: 10,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: '#2196f3',
    paddingTop: 15,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  scanner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    zIndex:1,
    marginBottom: 70,
  },
  torchPlace: {
    marginBottom: 20,
  }
});
