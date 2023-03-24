import { StatusBar } from 'expo-status-bar';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { useEffect, useState } from 'react';
import { doc, setDoc, addDoc } from 'firebase/firestore';
import { db } from '../../FirebaseDB';
import { faBold } from '@fortawesome/free-solid-svg-icons';

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
        <Text style={{ marginTop: 100, marginBottom: 20, fontSize: 20 }}>
          Enter Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setDeliveryName}
          placeholder={'Enter name'}
          value={deliveryName}
          backgroundColor={'white'}
        />

        <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 20 }}>
          Enter Location
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
          placeholder={'Enter location'}
          backgroundColor={'white'}
        />

        <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 20 }}>
          Schedule Delivery Time
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setTime}
          placeholder={'Enter delivery time'}
          value={time}
          backgroundColor={'white'}
        />

        <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 20 }}>
          Enter Phone Number
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setPhoneNo}
          value={phoneNo}
          placeholder={'Enter phone number'}
          backgroundColor={'white'}
        />
        <View style={{ margin: 40 }}>
          <TouchableHighlight
            style={{
              height: 40,
              width: 160,
              borderRadius: 10,
              backgroundColor: 'yellow',
              marginLeft: 50,
              marginRight: 50,
            }}
          >
            <Button
              color="#841584"
              onPress={() => {
                placeOrder();
              }}
              title="PLACE ORDER"
            />
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 60,
    // margin: 12,
    width: 300,
    marginBottom: 60,
    fontSize: 16,
    borderWidth: 1,
    padding: 10,
  },
});
