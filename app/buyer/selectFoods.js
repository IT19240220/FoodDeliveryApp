import {StatusBar} from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faArrowRight} from '@fortawesome/free-solid-svg-icons'
import {db} from '../../FirebaseDB'
import {doc, collection, onSnapshot, query, deleteDoc, updateDoc} from 'firebase/firestore'
// import Foods from 'Foods'

export default function SelectFoods({navigation,route}) {

    const [foods, setFoods] = useState([])
    // const [newOrderId] = route.params

    useEffect(() => {
        setFoodsItems()
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView>
                {
                    foods && foods.map((item, key) => {
                        return (
                            <View key={key}>
                                    <View
                                        style={{
                                            borderWidth: 1,
                                            borderColor: 'gray',
                                            borderStyle: 'solid',
                                            borderRadius: 5,
                                            minWidth: '90%',
                                            marginLeft: 20,
                                            marginRight: 20,
                                            marginTop: 10,
                                            marginBottom: 10,
                                            paddingLeft: 5,
                                            paddingRight: 5,
                                            flex: 1,
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            alignItems: 'flex-start'
                                        }}>
                                        <View style={{
                                            width: '50%'
                                        }}>
                                            <Text style={{fontSize: 16, marginTop: 8}}>{item.name}</Text>
                                        </View>
                                        <View style={{
                                            width: '50%',
                                            alignItems: 'flex-end'
                                        }}>
                                            <TouchableOpacity
                                                onPress={() => setFoodToOrder(item)}>
                                                <FontAwesomeIcon icon={faArrowRight} color={'green'} style={{margin: 6}}
                                                                 size={30}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );

    function setFoodsItems() {
        onSnapshot(query(collection(db, "foods")), (querySnapshot) => {
            let tempFoods = []

            querySnapshot.forEach((doc) => {
                tempFoods.push(
                    {
                        id: doc.id,
                        name: doc.data()['name']
                    }
                )
            });
            setFoods(tempFoods)
        });

    }

    function setFoodToOrder(item) {
        onSnapshot(query(collection(db, "orders", route.params?.orderId)), (querySnapshot) => {
            let tempFoods = []

            // querySnapshot.child('items').forEach((doc) => {
            //     tempFoods.push(
            //         {
            //             id: doc.id,
            //             name: doc.data()['name']
            //         }
            //     )
            // });

            tempFoods.push(
                {
                    id: item.id,
                    name: item.name
                }
            )

            updateDoc(doc(db, 'foodOrders', route.params?.orderId), {
                items: tempFoods
            }).then(() => {
                navigation.navigate('SelectFoods')
            })
        });
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginTop: 20
    },
});
