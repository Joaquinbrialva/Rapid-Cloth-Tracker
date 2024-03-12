import React from 'react';
import { Card as PaperCard, Text } from 'react-native-paper';
import { formatDate, formatPrice } from '../../utils/formatFunctions';
import { StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress }) => {
    return (
        <PaperCard
            mode='elevated'
            style={styles.card}
            onPress={onPress}
        >
            <PaperCard.Cover source={{ uri: product.image }} />
            <PaperCard.Content style={styles.cardContent}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.description}>{product.description}</Text>
                <Text style={styles.price}>{formatPrice(product.price)}</Text>
                <Text style={styles.date}>Comprado el: {formatDate(product.createdAt)}</Text>
            </PaperCard.Content>
        </PaperCard>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        borderRadius: 10,
    },
    cardContent: {
        padding: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
        marginBottom: 5,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    date: {
        fontSize: 14,
        color: 'gray',
    },
});

export default ProductCard;
