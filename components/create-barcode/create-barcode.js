import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Barcode from 'react-native-barcode-builder';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Keyboard} from 'react-native';

export default function CreateBarcode() {
  const [name, setName] = React.useState('');
  const [randomNum, setRandomNum] = React.useState(
    Math.floor(Math.random() * 100000000),
  );
  const [barcode, setBarcode] = React.useState(null);
  const [prints, setNumberOfPrints] = React.useState(0);

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
          <Barcode value={barcode} format="CODE128" text={barcode} />
          <Text style={styles.printNumberStyle}>Number of pages to print: {prints}</Text>
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
  }
});
