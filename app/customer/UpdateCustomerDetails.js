import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { useEffect, useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../FirebaseDB';
import PhoneInput from 'react-native-phone-number-input';

export default function UpdateCustomerDetails({ route, navigation }) {
  const [deliveryName, setDeliveryName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [state, setState] = useState('');
  const [state1, setState1] = useState('');
  const [state2, setState2] = useState('');
  const [state3, setState3] = useState('');

  const {
    customerID,
    customerName,
    customerLocation,
    customerTime,
    customerPhoneNo,
  } = route.params;

  const phoneInput = useRef();
  const [valid, setValid] = useState(false);

  useEffect(() => {
    setDeliveryName(customerName);
    setLocation(customerLocation);
    setTime(customerTime);
    setPhoneNo(customerPhoneNo);
  }, []);

  //Place Order
  function updateDetails() {
    updateDoc(doc(db, 'OrderDetails', customerID), {
      name: deliveryName,
      location: location,
      time: time,
      phoneNo: phoneNo,
    }).then(() => {
      navigation.navigate('ViewCustomerOrder');
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ marginTop: 100, marginBottom: 20, fontSize: 20 }}>
          Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setDeliveryName}
          placeholder={'Enter your name'}
          value={deliveryName}
          backgroundColor={'white'}
        />

        <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 20 }}>
          Delivery Address
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={setLocation}
          value={location}
          placeholder={'Enter your address'}
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
          Phone Number
        </Text>
        <PhoneInput
          style={styles.input}
          ref={phoneInput}
          defaultValue={phoneNo}
          defaultCode="SL"
          onChangeFormattedText={(text) => {
            setPhoneNo(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
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
                updateDetails();
              }}
              title="UPDATE DETAILS"
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
    width: 325,
    marginBottom: 60,
    fontSize: 16,
    padding: 10,
  },
});
