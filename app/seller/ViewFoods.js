import {StatusBar} from 'expo-status-bar';
import {Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {faTrash, faAdd} from '@fortawesome/free-solid-svg-icons'
import {db} from '../../FirebaseDB'
import {doc, collection, onSnapshot, query, deleteDoc} from 'firebase/firestore'

export default function ViewFoods({navigation}) {

    const [foods, setFoods] = useState([])

    useEffect(() => {
        setFoodsItems()
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{alignItems: 'flex-end', marginRight: 23, marginBottom: 10}}>
                    <Button title="Add Food" onPress={() => navigation.navigate('AddFood')}>
                    </Button>
                </View>
                {
                    foods && foods.map((item, key) => {
                        return (
                            <View key={key}>
                                <TouchableOpacity onPress={() => navigation.navigate('UpdateFood', {
                                    foodId: item.id,
                                    foodName: item.name
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
                                                onPress={() => deleteFood(item.id)}>
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

    function deleteFood(id) {
        deleteDoc(doc(db, 'foods', id)).then(() => {

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
