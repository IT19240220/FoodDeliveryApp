import {StatusBar} from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faTrash, faAdd} from '@fortawesome/free-solid-svg-icons'
import {db} from '../../FirebaseDB'
import {doc, collection, onSnapshot, query, deleteDoc, setDoc, getDocs} from 'firebase/firestore'
import SelectFoods from "./selectFoods";

export default function ViewOrdersBuyer({route, navigation}) {

    const [deliveries, setDeliveries] = useState([])
    // const [orderFoods] = route.params

    useEffect(() => {
        setDeliveryPersons()
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{alignItems: 'center', marginRight: 23, marginBottom: 10}}>
                    <Button title="New Order" onPress={() => newOrder()}>
                    </Button>
                </View>
                {
                    deliveries && deliveries.map((item, key) => {
                        return (
                            <View key={key}>
                                <TouchableOpacity onPress={() => navigation.navigate('AddDeliveryPerson', {
                                    orderId: item.id,
                                    orderName: item.name
                                })}>
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
                                                onPress={() => deleteTodo(item.id)}>
                                                <FontAwesomeIcon icon={faTrash} color={'red'} style={{margin: 6}}
                                                                 size={30}/>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    );

    function setDeliveryPersons() {
        onSnapshot(query(collection(db, "deliveries")), (querySnapshot) => {
            let tempDeliveries = []

            querySnapshot.forEach((doc) => {
                tempDeliveries.push(
                    {
                        id: doc.id,
                        name: doc.data()['txt']
                    }
                )
            });
            setDeliveries(tempDeliveries)
        });

    }

    function newOrder() {
        getDocs(collection(db, 'foodOrders')).then(querySnapshot => {
            let tempDeliveries = []

            querySnapshot.forEach((doc) => {
                tempDeliveries.push(
                    {
                        id: doc.id,
                        name: doc.data()['txt']
                    }
                )
            });

            let curDate = (tempDeliveries.length + 1).toString()
            setDoc(doc(db, 'foodOrders', curDate), {
                items:[]
            }).then(() => {
                navigation.navigate('SelectFoods', {orderId: curDate})
            })
        })
    }

    function deleteTodo(id) {
        deleteDoc(doc(db, 'deliveries', id)).then(() => {

        })
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
