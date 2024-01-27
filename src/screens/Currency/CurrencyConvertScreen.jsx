import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const CurrencyConvertScreen = () => {
    const [monto, setMonto] = useState('');
    const [monedaOrigen, setMonedaOrigen] = useState('ARS');
    const [monedaDestino, setMonedaDestino] = useState('USD');
    const [resultado, setResultado] = useState(null);

    const handleMontoChange = (value) => {
        setMonto(value);
    };

    const handleMonedaOrigenChange = (value) => {
        setMonedaOrigen(value);
    };

    const handleMonedaDestinoChange = (value) => {
        setMonedaDestino(value);
    };

    const convertirMonto = () => {
        // Tu lógica de conversión aquí
        // ...

        // Ejemplo de resultado (debes adaptarlo a tu lógica real)
        switch (monedaOrigen) {
            case 'ARS':
                if (monedaDestino === 'USD') {
                    resultadoConversion = monto / 65;
                } else if (monedaDestino === 'UYU') {
                    resultadoConversion = monto / 43;
                }
                break;
            case 'USD':
                if (monedaDestino === 'ARS') {
                    resultadoConversion = monto * 1200;
                } else if (monedaDestino === 'UYU') {
                    resultadoConversion = monto * 40;
                }
                break;
            case 'UYU':
                if (monedaDestino === 'ARS') {
                    resultadoConversion = monto * 43;
                } else if (monedaDestino === 'USD') {
                    resultadoConversion = monto / 40;
                }
                break;
            default:
                resultadoConversion = 0;
                break;
        }
        setResultado(resultadoConversion);
    };

    const closeKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={closeKeyboard}>
            <View style={{ padding: 20 }}>
                <TextInput
                    placeholder="Ingrese el monto"
                    keyboardType="numeric"
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, padding: 5 }}
                    value={monto}
                    onChangeText={handleMontoChange}
                />
                <Text>Moneda de Origen:</Text>
                <Picker selectedValue={monedaOrigen} onValueChange={handleMonedaOrigenChange}>
                    <Picker.Item label="Pesos Argentinos (ARS)" value="ARS" />
                    <Picker.Item label="Dólares (USD)" value="USD" />
                    <Picker.Item label="Pesos Uruguayos (UYU)" value="UYU" />
                </Picker>
                <Text>Moneda de Destino:</Text>
                <Picker selectedValue={monedaDestino} onValueChange={handleMonedaDestinoChange}>
                    <Picker.Item label="Pesos Argentinos (ARS)" value="ARS" />
                    <Picker.Item label="Dólares (USD)" value="USD" />
                    <Picker.Item label="Pesos Uruguayos (UYU)" value="UYU" />
                </Picker>
                <Button title="Convertir" onPress={convertirMonto} />
                {resultado && <Text style={{ marginTop: 10 }}>{`Resultado: ${resultado} ${monedaDestino}`}</Text>}
            </View>
        </TouchableWithoutFeedback>
    );
};

export default CurrencyConvertScreen;