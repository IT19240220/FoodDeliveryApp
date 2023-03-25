import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../FirebaseDB';
import {
  doc,
  collection,
  onSnapshot,
  query,
  deleteDoc,
} from 'firebase/firestore';

export default function ViewCustomerOrder({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [isChecked, setChecked] = useState(false);

  function setFoodsItems() {
    onSnapshot(query(collection(db, 'OrderDetails')), (querySnapshot) => {
      let tempFoods = [];

      querySnapshot.forEach((doc) => {
        tempFoods.push({
          id: doc.id,
          name: doc.data()['name'],
          location: doc.data()['location'],
          itemName: doc.data()['orderItems']['ItemName'],
          itemPrice: doc.data()['orderItems']['ItemPrice'],
          phoneNo: doc.data()['phoneNo'],
          time: doc.data()['time'],
        });
      });
      setFoods(tempFoods);
    });
  }

  function deleteFood(id) {
    deleteDoc(doc(db, 'OrderDetails', id)).then(() => {});
  }

  useEffect(() => {
    setFoodsItems();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {foods &&
          foods.map((item, key) => {
            return (
              <View key={key} style={{ flexDirection: 'row' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    borderStyle: 'solid',
                    borderRadius: 5,
                    minWidth: '50%',
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 10,
                    marginBottom: 10,
                    paddingLeft: 5,
                    paddingRight: 5,
                    flex: 0.1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                  }}
                >
                  <View
                    style={{
                      width: '50%',
                      flex: 1,
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      backgroundColor: 'white',
                    }}
                  >
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Item :{item.itemName}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Price :{item.itemPrice}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Name : {item.name}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Location : {item.location}
                    </Text>

                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Phone Number : {item.phoneNo}
                    </Text>
                    <Text style={{ fontSize: 16, marginTop: 8 }}>
                      Delivery Time : {item.time}
                    </Text>
                  </View>
                </View>
                <View style={{ flex: 0.3, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={{ marginTop: 70, marginLeft: 15 }}
                    onPress={() => deleteFood(item.id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      color={'red'}
                      faAlignCenter
                      size={30}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginTop: 70, marginLeft: 50 }}
                    onPress={() =>
                      navigation.navigate('UpdateCustomerDetails', {
                        customerID: item.id,
                        customerName: item.name,
                        customerLocation: item.location,
                        customerPhoneNo: item.phoneNo,
                        customerTime: item.time,
                        itemName: item.itemName,
                        itemPrice: item.itemPrice,
                      })
                    }
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      color={'green'}
                      faAlignCenter
                      size={30}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});
