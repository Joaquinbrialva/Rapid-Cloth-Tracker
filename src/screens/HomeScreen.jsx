import { View, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import { chooseImage, takePhoto } from '../utils/media_functions';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

    const navigation = useNavigation();

    const uploadImage = async () => {
        try {
            const result = await chooseImage();
            if (result !== null) {
                navigation.navigate('RegisterPurchase', { image: result });
            }
            return
        } catch (error) {
            console.error('Error al subir la imagen:', error);
        }
    };

    const launchCamera = async () => {
        try {
            const result = await takePhoto();
            if (result !== null) {
                navigation.navigate('RegisterPurchase', { image: result });
            }
            return
        } catch (error) {
            console.error('Error al tomar la foto:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Button icon='camera' mode="elevated" onPress={launchCamera}>
                Registrar prenda
            </Button>
            <Button icon='upload' mode="elevated" onPress={uploadImage}>
                Seleccionar de galería
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    customButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    }
});

export default HomeScreen;