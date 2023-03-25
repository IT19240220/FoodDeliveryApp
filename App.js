import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/Login';
import ViewOrders from './app/admin/ViewOrders';
import AddDeliveryPerson from './app/admin/AddDeliveryPerson';
import ViewFoods from './app/seller/ViewFoods';
import UpdateFood from './app/seller/UpdateFood';
import AddFood from './app/seller/AddFood';
import SignUp from './app/SignUp';
import ViewOrdersBuyer from './app/buyer/ViewOrdersBuyer';
import AddOrderBuyer from './app/buyer/AddOrderBuyer';
import ViewFoodsBuyer from './app/buyer/ViewFoodsBuyer';
import SelectFoods from './app/buyer/selectFoods';
import DeliveryCheckIn from './app/DeliveryPerson/DeliveryCheckIn';
import DeliveryStart from './app/DeliveryPerson/DeliveryStart';
import ViewFoodsCustomer from './app/customer/ViewFoodsCustomer';
import AddCustomerDetails from './app/customer/AddCustomerDetails';
import ViewCustomerOrder from './app/customer/ViewCustomerOrder';
import ViewCustomerDetails from './app/customer/ViewCustomerDetails';
import UpdateCustomerDetails from './app/customer/UpdateCustomerDetails';
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
                    options={{title: 'View Cake'}}
                />
                <Stack.Screen
                    name="AddFood"
                    component={AddFood}
                    options={{title: 'Add Cake'}}
                />
                <Stack.Screen
                    name="UpdateFood"
                    component={UpdateFood}
                    options={{title: 'Update Cake'}}
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
        {/* Delivery Person */}
        <Stack.Screen
          name="DeliveryCheckIn"
          component={DeliveryCheckIn}
          options={{ title: 'Delivery Check In' }}
        />
        <Stack.Screen
          name="DeliveryStart"
          component={DeliveryStart}
          options={{ title: 'Delivery Start' }}
        />
        <Stack.Screen
          name="ViewFoodsCustomer"
          component={ViewFoodsCustomer}
          options={{ title: 'Add Cake Item' }}
        />

        <Stack.Screen
          name="AddCustomerDetails"
          component={AddCustomerDetails}
          options={{ title: 'Add Delivery Details' }}
        />
        <Stack.Screen
          name="ViewCustomerOrder"
          component={ViewCustomerOrder}
          options={{ title: 'My Orders' }}
        />

        <Stack.Screen
          name="ViewCustomerDetails"
          component={ViewCustomerDetails}
          options={{ title: 'My Profile' }}
        />

        <Stack.Screen
          name="UpdateCustomerDetails"
          component={UpdateCustomerDetails}
          options={{ title: 'Update Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
