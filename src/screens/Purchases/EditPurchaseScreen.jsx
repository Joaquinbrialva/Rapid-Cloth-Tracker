import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import APIURL from '../../api/API';
import categories from '../../utils/categories';
import { Picker } from '@react-native-picker/picker';
import COLOR_APP from '../../utils/colors';

const EditPurchase = () => {
  const route = useRoute();
  const { product } = route?.params;
  const [purchase, setPurchase] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigation();

  useEffect(() => {
    const purchaseData = {
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image
    };
    setPurchase(purchaseData);
  }, []);

  const updatePurchase = async () => {
    try {
      setLoading(true);
      // Aquí debes realizar una llamada a la API para actualizar la compra
      // Puedes utilizar la misma URL de la API y el método 'PUT'
      // No olvides enviar el ID de la compra para identificarla
      const response = await fetch(`${APIURL}/clothes/${purchaseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(purchase)
      });
      const data = await response.json();
      setLoading(false);

      if (data.status === 'error') {
        Alert.alert(data.message);
      } else {
        Alert.alert('Compra actualizada', 'La compra se ha actualizado con éxito');
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
          <Image source={{ uri: purchase.image }} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.sectionContainer}>
          <TextInput
            label="Título"
            value={purchase.title}
            onChangeText={text => setPurchase({ ...purchase, title: text })}
            mode='outlined'
            style={styles.input}
          />
          <TextInput
            label="Descripción"
            value={purchase.description}
            onChangeText={text => setPurchase({ ...purchase, description: text })}
            mode='outlined'
            style={styles.input}
          />
          <TextInput
            label="Precio"
            value={purchase?.price?.toString()}
            onChangeText={text => setPurchase({ ...purchase, price: text })}
            mode='outlined'
            keyboardType='numeric'
            style={styles.input}
          />
          <Picker
            selectedValue={purchase.category}
            onValueChange={itemValue => setPurchase({ ...purchase, category: itemValue })}
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
            onPress={updatePurchase}
            style={styles.button}
            loading={loading}
          >
            Actualizar
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

export default EditPurchase;