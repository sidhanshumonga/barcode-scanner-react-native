import * as React from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {Input, Button, Image} from 'react-native-elements';
import Barcode from 'react-native-barcode-builder';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Keyboard} from 'react-native';
import RNPrint from 'react-native-print';
import {captureScreen} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';
import ImageEditor from '@react-native-community/image-editor';
import ImgToBase64 from 'react-native-image-base64';

export default function CreateBarcode() {
  const image = React.useRef(null);
  const [name, setName] = React.useState('');
  const [randomNum, setRandomNum] = React.useState(
    Math.floor(Math.random() * 100000000),
  );
  const [barcode, setBarcode] = React.useState(null);
  const [prints, setNumberOfPrints] = React.useState(0);

  const [urlImg, setUrlImg] = React.useState(null);

  //   const [hasPermission, setHasPermission] = React.useState(null);

  const genrateBarcode = () => {
    setRandomNum(Math.floor(Math.random() * 100000000));
    setBarcode(name.substr(0, 4).toUpperCase() + randomNum);
    Keyboard.dismiss();
  };

  const changeName = (val) => {
    if (val === '') {
      setBarcode(null);
    }
    setName(val);
  };

  const getElement = () => {
    let cropOptions = {
      offset: {x: 180, y: 785},
      size: {width: 700, height: 350},
    };
    captureScreen({
      format: 'jpg',
      quality: 0.9,
    }).then((uri) =>
      ImageEditor.cropImage(uri, {...cropOptions}).then(
        (uriCropped) => {
          getBase64(uriCropped);
        },
        (error) => console.error('Oops, snapshot failed', error),
      ),
    );
    // printHTML()
  };

  const getBase64 = (img) => {
    ImgToBase64.getBase64String(img)
      .then((base64String) => printHTML(base64String))
      .catch((err) => console.log(err));
  };

  const printHTML = async (image) => {
    let str = passHtmltoPrinter({imgData: image});
    await RNPrint.print({
      html: str,
    });
  };

  const passHtmltoPrinter = ({imgData}) => {
    let img = 'data:image/png;base64,' + imgData;
    let outerDiv = '<div style="width:100%;display:flex;height:10%">';
    let html =
      outerDiv +
      '<div style="display:inline-block;padding:10px;width:25%"><img src="' +
      img +
      '" width="100%" height="100%" style="display:inline-block;border:1px solid dashed" /></div>' +
      '<div style="display:inline-block;padding:10px;width:25%"><img src="' +
      img +
      '" width="100%" height="100%" style="display:inline-block;border:1px solid dashed" /></div>' +
      '<div style="display:inline-block;padding:10px;width:25%"><img src="' +
      img +
      '" width="100%" height="100%" style="display:inline-block;border:1px solid dashed" /></div>' +
      '<div style="display:inline-block;padding:10px;width:25%"><img src="' +
      img +
      '" width="100%" height="100%" style="display:inline-block;border:1px solid dashed" /></div></div>';
      let htmltoreturn = '';
      for (let i = 0; i < ((parseInt(prints) + (4 - (prints % 4)))/4); i++) {
        htmltoreturn += html;
      }
    return htmltoreturn;
  };

  const checkAndroidPermission = async () => {
    try {
      const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
      const isPermissionAlreadyGranted = await PermissionsAndroid.check(
        permission,
      );
      if (isPermissionAlreadyGranted) {
        Promise.resolve();
      }
      await PermissionsAndroid.request(permission);
      Promise.resolve();
    } catch (error) {
      Promise.reject(error);
    }
  };

  async function savePicture(tag) {
    // if device is android you have to ensure you have permission
    if (Platform.OS === 'android') {
      await checkAndroidPermission();
    }
    CameraRoll.save(tag, 'photo')
      .then((res) => console.log(res + 'success'))
      .catch((err) => console.log(err));
  }

  return (
    <View style={styles.scene}>
      <Input
        value={name}
        onChangeText={(text) => changeName(text)}
        placeholder="Enter Customer Name"
      />
      <Input
        keyboardType="number-pad"
        onChangeText={(text) => setNumberOfPrints(text)}
        placeholder="Enter Items number"
      />
      {barcode ? (
        <View style={styles.centerContainer}>
          <Barcode
            ref={image}
            value={barcode}
            format="CODE128"
            text={barcode}
          />
          <Text style={styles.printNumberStyle}>
            Number of barcodes to be printed: {(parseInt(prints) + (4 - (prints % 4)))}
          </Text>
          <Button
            type="outline"
            buttonStyle={styles.printButton}
            icon={
              <Icon
                name="print"
                size={15}
                color="#2196f3"
                style={styles.printIcon}
              />
            }
            onPress={getElement}
            iconRight
            title="Print"
          />
        </View>
      ) : null}

      <TouchableHighlight
        onPress={genrateBarcode}
        style={styles.footer}
        underlayColor="white">
        <View>
          <Text style={styles.footerText}>GENERATE BARCODE</Text>
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
    // justifyContent: 'center',
    alignItems: 'center',
  },
  printButton: {
    width: '20%',
  },
  printIcon: {
    margin: 5,
  },
  printNumberStyle: {
    marginTop: 5,
    marginBottom: 10,
  },
  logo: {
    width: 800,
    height: 300,
  },
});
