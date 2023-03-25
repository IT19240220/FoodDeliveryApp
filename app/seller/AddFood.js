import { StatusBar } from 'expo-status-bar';
import { Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from "react";
import { doc, setDoc, addDoc } from 'firebase/firestore'
import { db } from '../../FirebaseDB'

export default function AddFood({ navigation }) {

    const [text, onChangeText] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    function addCake() {
        setDoc(doc(db, 'foods', new Date().toString()), {
            name: text,
            price: price,
            description: description,
        }).then(() => {
            // console.log(456)
            navigation.navigate('ViewFoods')
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: 100 }}>
            <Text style={styles.topic}>Update Cake</Text>
                <Text style={{ marginTop: 10 }}>Enter Food</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
                <Text style={{ marginTop: 10 }}>Enter Price</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setPrice}
                    value={price}
                />
                <Text style={{ marginTop: 10 }}>Enter Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDescription}
                    value={description}
                />
                <Button
                    color={'#0A3875'}
                    title="Add Cake"
                    onPress={() => {
                        // console.log(45677)
                        addCake()
                    }}
                />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#51D6CA',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    input: {
        height: 40,
        width: 300,
        borderRadius: 5,
        borderColor: '#094742',
        // margin: 12,
        marginBottom: 10,
        borderWidth: 1,
        padding: 1
    },
    button: {
        color: '#C71585',
        marginTop: 70,
        padding: 10,
        borderRadius: 15,
    },
    topic: {
       marginTop: 10,
       marginBottom: 50,
       fontSize: 35,
       alignSelf: 'center',
    },
    title:{
        fontWeight: 'bold',
    }
});
