import { StatusBar } from 'expo-status-bar';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  DateP,
} from 'react-native';
import { useEffect, useState } from 'react';
import { doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../FirebaseDB';

export default function AddCustomerDetails({ route, navigation }) {
  const [deliveryName, setDeliveryName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [phoneNo, setPhoneNo] = useState('');

  const { items } = route.params;

  //Place Order
  function placeOrder() {
    setDoc(doc(db, 'OrderDetails', new Date().toString()), {
      name: deliveryName,
      location: location,
      time: time,
      phoneNo: phoneNo,
      orderItems: items,
      totalPrice: 30,
    }).then(() => {
      // console.log(456)
      navigation.navigate('ViewCustomerOrder');
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ marginTop: 100 }}>Enter Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDeliveryName}
          placeholder={'Enter name'}
          value={deliveryName}
        />

        <Text style={{ marginTop: 10 }}>Enter Location</Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
          placeholder={'Enter location'}
        />

        <Text style={{ marginTop: 10 }}>Enter Time</Text>
        <TextInput
          style={styles.input}
          onChangeText={setTime}
          placeholder={'Enter delivery time'}
          value={time}
        />

        <Text style={{ marginTop: 10 }}>Enter Phone Number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNo}
          value={phoneNo}
          placeholder={'Enter phone number'}
        />
        <Button
          title="Place Order"
          onPress={() => {
            placeOrder();
          }}
        />
      </ScrollView>
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
