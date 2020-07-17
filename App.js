/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {Text, View, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import {Header} from 'react-native-elements';
import CreateBarcode from './components/create-barcode/create-barcode';

const FirstRoute = () => (
  // <View style={[styles.scene, {backgroundColor: 'white'}]} />
  <CreateBarcode />
);

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#673ab7'}]} />
);

const initialLayout = {width: Dimensions.get('window').width};

export default function App() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'create', title: 'Create'},
    {key: 'scan', title: 'Scan'},
  ]);

  const renderScene = SceneMap({
    create: FirstRoute,
    scan: SecondRoute,
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        centerComponent={{text: 'BARCODE SCANNER', style: {color: '#fff'}}}
      />

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>{index === 0 ? 'GENERATE BARCODE' : 'SCAN BARCODE'}</Text>
      </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: '#2196f3',
    paddingTop:15,
  },
  footerText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16
  }
});
