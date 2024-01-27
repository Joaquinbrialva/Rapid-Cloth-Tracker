import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RegisterPurchase from '../screens/Purchases/RegisterPurchase';

const HomeStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName='HomeScreen' >
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='RegisterPurchase'
                component={RegisterPurchase}
                options={{
                    title: 'Registrar Compra'
                }}
            />
        </Stack.Navigator>
    )
}

export default HomeStack