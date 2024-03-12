import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PurchaseDetails from '../screens/Purchases/Details/PurchaseDetails';
import PurchaseScreen from '../screens/Purchases/PurchaseScreen';
import EditPurchase from '../screens/Purchases/EditPurchaseScreen';

const Stack = createStackNavigator();

const PurchaseStack = () => {
    return (
        <Stack.Navigator initialRouteName='PurchaseScreen' >
            <Stack.Screen
                name='PurchaseScreen'
                component={PurchaseScreen}
                options={{
                    title: 'Compras'
                }}
            />
            <Stack.Screen
                name='PurchaseDetails'
                component={PurchaseDetails}
                options={{
                    title: 'Detalle'
                }}
            />
            <Stack.Screen
                name='EditPurchase'
                component={EditPurchase}
                options={{
                    title: 'Editar prenda'
                }}
            />
        </Stack.Navigator>
    );
}

export default PurchaseStack;