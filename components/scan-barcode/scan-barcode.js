import * as React from 'react';
import {View, Text, StyleSheet, TouchableHighlight, Alert} from 'react-native';
import {Input} from 'react-native-elements';
import {RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

export default function ScanBarcode() {
  const [barcodes, setBarcodes] = React.useState([]);

  const [alertPresent, setAlertPresent] = React.useState(false);
  const [barcodeValue, setBarcodeValue] = React.useState('');

  const changeName = (val) => {
    if (val === '') {
      setBarcode(null);
    }
    setName(val);
  };

  barcodeRecognized = ({barcodes}) => {
    if (!alertPresent) {
      setBarcodes(barcodes[0].data.includes('error') ? [] : barcodes);
      if (!barcodes[0].data.includes('error')) {
        setBarcodeValue(barcodes[0].data);
      }
    }
  };

  const scanBarcode = () => {
    if(barcodeValue){setAlertPresent(true);}
  };

  React.useEffect(() => {
    if (alertPresent) {
      Alert.alert('Scanned barcode', barcodeValue, [
        {
          text: 'Okay',
          onPress: () => { setAlertPresent(false); setBarcodeValue('')},
          style: 'cancel',
        },
      ]);
    }
  }, [alertPresent, barcodeValue]);

  return (
    <View style={styles.scene}>
      <Input value={barcodeValue} placeholder="Search barcode" />
      <Text style={styles.textOr}>OR</Text>
      <RNCamera
        ref={(ref) => {
          this.camera = ref;
        }}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        captureAudio={false}
        onGoogleVisionBarcodesDetected={this.barcodeRecognized}
        googleVisionBarcodeType={
          alertPresent
            ? 0
            : RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType
                .CODE_128
        }
        style={styles.scanner}>
        <BarcodeMask />
      </RNCamera>
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
  textOr: {
    textAlign: 'center',
  },
  scanner: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 30,
    marginBottom: 60,
  },
});
