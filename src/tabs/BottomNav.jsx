import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PurchaseStack from '../stacks/PurchaseStack';
import SalesScreen from '../screens/Sales/SalesScreen';
import CurrencyConvertScreen from '../screens/Currency/CurrencyConvertScreen';
import { MaterialIcons } from '@expo/vector-icons';
import AnalyticsScreen from '../screens/Analytics/AnalyticsScreen';
import HomeStack from '../stacks/HomeStack';

const Tab = createBottomTabNavigator();

function BottomNav() {
    return (
        <Tab.Navigator initialRouteName="Home">
            <Tab.Screen
                name='Compras'
                component={PurchaseStack}
                options={{
                    headerShown: false,
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
                name='Home'
                component={HomeStack}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="home" color={color} size={size} />
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
                component={AnalyticsScreen}
                options={{
                    tabBarLabel: 'Reportes',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="analytics" color={color} size={size} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default BottomNav;