import React, { useEffect, useState, useMemo } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import APIURL from '../../../api/API';
import { formatDate, formatPrice } from '../../../utils/formatFunctions';
import Loading from '../../../components/Loading';

const PurchaseDetails = () => {
    const route = useRoute();
    const { id } = route.params;
    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});
    const [productNotFound, setProductNotFound] = useState(false); // Nuevo estado

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${APIURL}/clothes/${id}`);
                const data = await response.json();
                if (data && data.data) {
                    setProduct(data.data);
                } else {
                    setProductNotFound(true);
                }
            } catch (error) {
                console.error(error);
                setProductNotFound(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    const formattedPrice = useMemo(() => {
        return product.price ? formatPrice(product.price) : null;
    }, [product.price]);

    if (loading) return <Loading />

    return (
        <View style={styles.container}>
            {productNotFound ? (
                <Text style={styles.notFoundText}>El producto no existe.</Text>
            ) : (
                <>
                    {product && product.image && (
                        <Image source={{ uri: product.image }} style={styles.image} />
                    )}
                    <Text style={styles.text}>Nombre: {product.title}</Text>
                    <Text style={styles.text}>Precio: {formattedPrice}</Text>
                    <Text style={styles.text}>
                        Fecha de compra: {formatDate(product.createdAt)}
                    </Text>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: '100%',
        height: '50%',
        borderRadius: 10,
        marginBottom: 16,
        objectFit: 'scale-down'
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    }
});

export default PurchaseDetails;