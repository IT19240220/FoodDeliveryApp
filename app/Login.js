import {StatusBar} from 'expo-status-bar';
import {Button, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import {doc, updateDoc, addDoc} from 'firebase/firestore'
import {db} from '../FirebaseDB'
// import auth from '@react-native-firebase/auth';

export default function Login({navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function loginDB() {
        // auth.signInWithEmailAndPassword(username, password).then((val) => {
        //     console.log(val)

            navigation.navigate('ViewFoods')

        // })
    }

    return (
        <View style={styles.container}>
            <Text style={{marginTop: 50}}>Enter Username</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
            />

            <Text style={{marginTop: 10}}>Enter Password</Text>
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                onChangeText={setPassword}
                value={password}
            />

            <View style={{marginTop: 80}}>
                <Button
                    title="Sign In"
                    onPress={() => {
                        loginDB()
                    }}
                />
            </View>

            <Text style={{marginTop: 40, textAlign: 'right'}} onPress={() => {
                navigation.navigate('SignUp')
            }}>
                Create Account
            </Text>
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
        // marginBottom: 80,
        borderWidth: 1,
        padding: 10,
    },
});
