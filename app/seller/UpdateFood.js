import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import {doc, setDoc, addDoc, updateDoc} from 'firebase/firestore'
import {db} from '../../FirebaseDB'

export default function AddFood({route, navigation}) {

    const [text, onChangeText] = useState('');
    const {foodId, foodName} = route.params;

    useEffect(() => {
        onChangeText(foodName)
    }, [])

    function addDelivery() {
        updateDoc(doc(db, 'foods', foodId), {
            name: text
        }).then(() => {
            // console.log(456)
            navigation.navigate('ViewFoods')
        })
    }

    return (
        <View style={styles.container}>
            <Text style={{marginTop: 50}}>Enter Food</Text>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />
            <Button
                title="Update Food"
                onPress={() => {
                    // console.log(45677)
                    addDelivery()
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        marginLeft: 10, marginRight: 10,
    },
    input: {
        height: 40,
        // margin: 12,
        marginBottom: 80,
        borderWidth: 1,
        padding: 10,
    },
});
