import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';
import { useState, useRef } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../FirebaseDB';
import PhoneInput from 'react-native-phone-number-input';

export default function AddCustomerDetails({ route, navigation }) {
  const [deliveryName, setDeliveryName] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [state, setState] = useState('');
  const [state1, setState1] = useState('');
  const [state2, setState2] = useState('');
  const [state3, setState3] = useState('');

  const { items } = route.params;
  //Place Order
  function placeOrder() {
    if (state.length === 0) {
      setState(() => ({ nameError: 'Name required.' }));
    } else if (state1.length === 0) {
      setState(() => ({ nameError: null }));
      setState1(() => ({ nameError: 'Delivery address required.' }));
    } else if (state2.length === 0) {
      setState1(() => ({ nameError: null }));
      setState(() => ({ nameError: null }));
      setState2(() => ({ nameError: 'Schedule time required.' }));
    } else if (state3.length === 0) {
      setState2(() => ({ nameError: null }));
      setState(() => ({ nameError: null }));
      setState3(() => ({ nameError: 'Phone number required.' }));
    } else {
      setState(() => ({ nameError: null }));
      setState1(() => ({ nameError: null }));
      setState2(() => ({ nameError: null }));
      setState3(() => ({ nameError: null }));
      setDoc(doc(db, 'OrderDetails', new Date().toString()), {
        name: deliveryName,
        location: location,
        time: time,
        phoneNo: phoneNo,
        orderItems: items,
        totalPrice: 30,
      }).then(() => {
        navigation.navigate('ViewCustomerOrder');
      });
    }
  }

  const [valid, setValid] = useState(false);
  const phoneInput = useRef();

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
        {!!state.nameError && (
          <Text style={{ color: 'red', marginBottom: 20 }}>
            {state.nameError}
          </Text>
        )}

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
        {!!state1.nameError && (
          <Text style={{ color: 'red', marginBottom: 20 }}>
            {state1.nameError}
          </Text>
        )}
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
        {!!state2.nameError && (
          <Text style={{ color: 'red', marginBottom: 20 }}>
            {state2.nameError}
          </Text>
        )}

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
        />
        {!!state3.nameError && (
          <Text style={{ color: 'red', marginBottom: 20 }}>
            {state3.nameError}
          </Text>
        )}
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

        <View style={{ marginTop: 80, marginLeft: '60%', borderRadius: 20 }}>
          <Button
            color="#A2B223"
            title="Log Out"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
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
    width: '100%',
    fontSize: 16,
    padding: 10,
  },
});
