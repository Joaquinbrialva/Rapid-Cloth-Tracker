import { View, StyleSheet, Image, Pressable, Alert, TouchableOpacity, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import defaultStyles from '../styles/defaultStyles';

const ShoppingScreen = () => {
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
            MediaLibrary.requestPermissionsAsync();
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('Acceso a la biblioteca de medios no concedido');
            }
        })();
    }, []);

    const takePicture = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync();
            setImage(result.assets[0].uri);
        } catch (error) {
            console.error('Error al tomar la foto:', error);
        }
    };

    const pickImageFromGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync();
            if (result.canceled) return;
            setImage(result.assets[0].uri);
        } catch (error) {
            console.error('Error al seleccionar la imagen desde la galería:', error);
        }
    };

    const saveImage = async (imageUri) => {
        if (imageUri) {
            try {
                await MediaLibrary.saveToLibraryAsync(imageUri);
            } catch (error) {
                console.error('Error al guardar la imagen:', error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[defaultStyles.button, styles.customButton]} onPress={takePicture}>
                <Entypo name="camera" size={24} color="#fff" />
                <Text style={defaultStyles.buttonText}>Registar prenda</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[defaultStyles.button, styles.customButton]} onPress={pickImageFromGallery}>
                <Entypo name="folder-images" size={24} color="#fff" />
                <Text style={defaultStyles.buttonText}>Seleccionar desde galería</Text>
            </TouchableOpacity>
            <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    customButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    }
});

export default ShoppingScreen;