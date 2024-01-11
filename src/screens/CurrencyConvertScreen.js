import { StyleSheet, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const CurrencyConvertScreen = () => {
    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.text}>Pantalla en desarrollo</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
    }
})

export default CurrencyConvertScreen