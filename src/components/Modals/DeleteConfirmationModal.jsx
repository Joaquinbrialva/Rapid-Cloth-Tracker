import React from 'react';
import { Alert } from 'react-native';

const DeleteConfirmationModal = ({ title, message, onCancel, onDelete }) => {
    return (
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                    onPress: onCancel,
                },
                { text: 'Eliminar', onPress: onDelete },
            ],
            { cancelable: false }
        )
    );
};

export default DeleteConfirmationModal;