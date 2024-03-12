import React from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'

const Loading = () => {
    return (
        <ActivityIndicator size="large" style={styles.loader} />
    )
}

const styles = StyleSheet.create({
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Loading