import { StatusBar } from 'expo-status-bar';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../FirebaseDB';

export default function DeliveryStart({ navigation }) {
  const [orderID, setOrderID] = useState('');
  const [deliveryName, setDeliveryName] = useState('');
  const [startLocation, setStartLocation] = useState('');
  const [time, setTime] = useState('');

  function checkIn() {
    setDoc(doc(db, 'DeliveryCheckIn', new Date().toString()), {
      name: deliveryName,
      location: location,
      time: time,
    }).then(() => {
      // console.log(456)
      navigation.navigate('ViewFoods');
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    height: 40,
    // margin: 12,
    width: 300,
    marginBottom: 80,
    borderWidth: 1,
    padding: 10,
  },
});
