import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from "./app/Login";
import ViewOrders from "./app/admin/ViewOrders";
import AddDeliveryPerson from "./app/admin/AddDeliveryPerson";
import ViewFoods from "./app/seller/ViewFoods";
import UpdateFood from "./app/seller/UpdateFood";
import AddFood from "./app/seller/AddFood";
import SignUp from "./app/SignUp";
import ViewOrdersBuyer from "./app/buyer/ViewOrdersBuyer";
import AddOrderBuyer from "./app/buyer/AddOrderBuyer";
import ViewFoodsBuyer from "./app/buyer/ViewFoodsBuyer";
import SelectFoods from "./app/buyer/selectFoods";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{title: 'Login'}}
                />
                <Stack.Screen
                    name="ViewOrders"
                    component={ViewOrders}
                    options={{title: 'View Orders'}}
                />
                <Stack.Screen
                    name="AddDeliveryPerson"
                    component={AddDeliveryPerson}
                    options={{title: 'Add Delivery Person'}}
                />
                <Stack.Screen
                    name="ViewFoods"
                    component={ViewFoods}
                    options={{title: 'View Food'}}
                />
                <Stack.Screen
                    name="AddFood"
                    component={AddFood}
                    options={{title: 'Add Food'}}
                />
                <Stack.Screen
                    name="UpdateFood"
                    component={UpdateFood}
                    options={{title: 'Update Food'}}
                />
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{title: 'Create Account'}}
                />
                <Stack.Screen
                    name="ViewOrdersBuyer"
                    component={ViewOrdersBuyer}
                    options={{title: 'View Orders'}}
                />
                <Stack.Screen
                    name="AddOrderBuyer"
                    component={AddOrderBuyer}
                    options={{title: 'New Order'}}
                />
                <Stack.Screen
                    name="ViewFoodsBuyer"
                    component={ViewFoodsBuyer}
                    options={{title: 'View Food'}}
                />
                <Stack.Screen
                    name="SelectFoods"
                    component={SelectFoods}
                    options={{title: 'Select Food'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}