import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

//Screens
import HomeScreen from '../screens/HomeScreen';
import StackScreen from '../screens/StackScreen';
import SalesScreen from '../screens/SalesScreen';
import ShoppingScreen from '../screens/ShoppingScreen';
import CurrencyConvertScreen from '../screens/CurrencyConvertScreen';
import ReportsScreen from '../screens/ReportsScreen';
import CameraScreen from '../screens/CameraScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MyStack() {
    return (
        <Stack.Navigator initialRouteName="HomeScreen" >
            <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Stack" component={StackScreen} />
            <Stack.Screen name='Camera' component={CameraScreen} />
        </Stack.Navigator>
    )
}

function MyTabs() {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            tabBarActiveTintColor: '#a496e2',
            tabBarStyle: {
                backgroundColor: 'white',
            }
        }}>
            <Tab.Screen
                name="Inicio"
                component={MyStack}
                options={{
                    tabBarLabel: 'Inicio',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen
                name='Compras'
                component={ShoppingScreen}
                options={{
                    tabBarLabel: 'Compras',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="shopping-cart" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name="Ventas"
                component={SalesScreen}
                options={{
                    tabBarLabel: 'Ventas',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="point-of-sale" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name='Conversión'
                component={CurrencyConvertScreen}
                options={{
                    tabBarLabel: 'Conversión',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="attach-money" color={color} size={size} />
                    )
                }}
            />
            <Tab.Screen
                name='Reportes'
                component={ReportsScreen}
                options={{
                    tabBarLabel: 'Reportes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="analytics" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    )
}