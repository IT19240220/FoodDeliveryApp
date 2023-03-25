import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { useEffect, useState } from 'react';
import { db } from '../../FirebaseDB';
import { collection, onSnapshot, query } from 'firebase/firestore';

export default function ViewFoodsCustomer({ navigation }) {
  const [foods, setFoods] = useState([]);

  const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0');
    return `#${randomColor}`;
  };

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
                    backgroundColor: generateColor(),
                  }}
                >
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        margin: 10,
                        fontStyle: 'italic',
                        fontWeight: '900',
                      }}
                    >
                      {'Name : '}
                    </Text>
                    <Text style={{ fontSize: 24, fontWeight: '900' }}>
                      {item.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'row',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        margin: 10,
                        fontStyle: 'italic',
                        fontWeight: '900',
                      }}
                    >
                      {'Price : '}
                    </Text>
                    <Text style={{ fontSize: 24, fontWeight: '900' }}>
                      {item.price}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: '50%',
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        margin: 10,
                        fontStyle: 'italic',
                        fontWeight: '900',
                      }}
                    >
                      {'Description : '}
                    </Text>
                    <Text
                      style={{ fontSize: 24, margin: 10, fontWeight: '900' }}
                    >
                      {item.description}
                    </Text>
                  </View>
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
                        onPress={() =>
                          navigation.navigate('AddCustomerDetails', {
                            items: {
                              ItemName: item.name,
                              ItemPrice: item.price,
                            },
                          })
                        }
                        title="ADD ITEM"
                      />
                    </TouchableHighlight>
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
    backgroundColor: '246, 255, 140 0.1 ',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});
