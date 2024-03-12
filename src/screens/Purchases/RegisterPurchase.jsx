import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import APIURL from '../../api/API';
import categories from '../../utils/categories';
import { Picker } from '@react-native-picker/picker';
import COLOR_APP from '../../utils/colors';

const RegisterPurchase = () => {
    const route = useRoute();
    const { image } = route.params;
    const [inputsData, setInputsData] = useState({ image });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigation();

    const registerProduct = async (product) => {
        try {
            setLoading(true);
            const response = await fetch(`${APIURL}/clothes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
            const data = await response.json();
            setLoading(false);

            if (data.status === 'error') {
                Alert.alert(data.message);
            } else {
                Alert.alert('Compra registrada', 'Compra registrada con éxito');
                navigate.navigate('HomeScreen');
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            Alert.alert('Error', 'Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
            <ScrollView>
                <View style={styles.sectionContainer}>
                    {image &&
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.image} resizeMode="contain" />
                        </View>
                    }
                </View>

                <View style={styles.sectionContainer}>
                    <TextInput
                        label="Título"
                        value={inputsData.title}
                        onChangeText={text => setInputsData({ ...inputsData, title: text })}
                        mode='outlined'
                        style={styles.input}
                    />
                    <TextInput
                        label="Descripción"
                        value={inputsData.description}
                        onChangeText={text => setInputsData({ ...inputsData, description: text })}
                        mode='outlined'
                        style={styles.input}
                    />
                    <TextInput
                        label="Precio"
                        value={inputsData.price}
                        onChangeText={text => setInputsData({ ...inputsData, price: text })}
                        mode='outlined'
                        keyboardType='numeric'
                        style={styles.input}
                    />
                    <Picker
                        selectedValue={inputsData.category}
                        onValueChange={itemValue => setInputsData({ ...inputsData, category: itemValue })}
                        mode="dropdown"
                        style={styles.input}
                    >
                        <Picker.Item label="Selecciona una categoría" color={COLOR_APP.grey} />
                        {categories.map(category => (
                            <Picker.Item key={category} label={category} value={category} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        icon='check'
                        onPress={() => {
                            registerProduct(inputsData);
                        }}
                        style={styles.button}
                        loading={loading}
                    >
                        Listo
                    </Button>
                    <Button
                        mode="contained"
                        icon='close'
                        onPress={() => navigate.navigate('HomeScreen')}
                        style={[styles.button, { backgroundColor: '#f44336' }]}
                        disabled={loading}
                    >
                        Cancelar
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    sectionContainer: {
        marginBottom: 15,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8
    },
    input: {
        marginBottom: 16,
    },
    buttonContainer: {
        marginTop: 15
    },
    button: {
        marginBottom: 20
    }
});

export default RegisterPurchase;