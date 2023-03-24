import { StatusBar } from 'expo-status-bar';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faAdd } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../FirebaseDB';
import {
  doc,
  collection,
  onSnapshot,
  query,
  deleteDoc,
} from 'firebase/firestore';
import Checkbox from 'expo-checkbox';

export default function ViewFoodsCustomer({ navigation }) {
  const [foods, setFoods] = useState([]);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    setFoodsItems();
  }, []);

  function setFoodsItems() {
    onSnapshot(query(collection(db, 'foods')), (querySnapshot) => {
      let tempFoods = [];

      querySnapshot.forEach((doc) => {
        tempFoods.push({
          id: doc.id,
          name: doc.data()['name'],
          price: doc.data()['price'],
          description: doc.data()['description'],
        });
      });
      setFoods(tempFoods);
    });
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {foods &&
          foods.map((item, key) => {
            return (
              <View key={key}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: 'pink',
                    borderStyle: 'solid',
                    borderRadius: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 30,
                    marginBottom: 10,
                    padding: 20,
                    flex: 1,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'flex-start',
                  }}
                >
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                    }}
                  >
                    <Text style={{ fontSize: 12, margin: 10 }}>
                      {'Name : '}
                    </Text>
                    <Text style={{ fontSize: 24 }}>{item.name}</Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                    }}
                  >
                    <Text style={{ fontSize: 12, margin: 10 }}>
                      {'Price : '}
                    </Text>
                    <Text style={{ fontSize: 24 }}>{item.price}</Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Text style={{ fontSize: 12, margin: 10 }}>
                      {'Description : '}
                    </Text>
                    <Text style={{ fontSize: 24, margin: 10 }}>
                      {item.description}
                    </Text>
                  </View>
                  <View style={{ margin: 40 }}>
                    <Button
                      style={{ padding: 50 }}
                      title="Add Items"
                      onPress={() =>
                        navigation.navigate('AddCustomerDetails', {
                          items: { ItemName: item.name, ItemPrice: item.price },
                        })
                      }
                    ></Button>
                  </View>
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
