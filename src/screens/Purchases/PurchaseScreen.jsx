import React, { useState, useEffect, useCallback } from 'react';
import { Text, ScrollView, StyleSheet, RefreshControl, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { removeAccents } from '../../utils/formatFunctions';
import { useNavigation, useFocusEffect } from '@react-navigation/native'; // Importa useFocusEffect
import APIURL from '../../api/API';
import Loading from '../../components/Loaders/Loading';
import FadeInView from '../../components/Animations/Animating';
import ProductCard from '../../components/Cards/ProductCard';

const PurchaseScreen = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        try {
            setRefreshing(true);
            const response = await fetch(`${APIURL}/clothes`);
            const data = await response.json();
            if (data.status === 'error') {
                throw new Error(data.message);
            }
            setProducts(data?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const goToProductDetail = (productId) => {
        navigation.navigate('PurchaseDetails', { id: productId })
    };

    const filteredProducts = products?.filter((product) =>
        removeAccents(product.title.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
    );

    useFocusEffect(
        useCallback(() => {
            fetchData(); // Llama a fetchData cuando el componente recibe foco
        }, [])
    );

    if (refreshing) return <Loading />;

    if (filteredProducts?.length === 0) {
        <View style={styles.noProductsContainer}>
            <Text style={styles.noProductsText}>No hay productos disponibles</Text>
        </View>
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
        >
            <View style={styles.cardContainer}>
                <Searchbar
                    style={styles.searchBar}
                    placeholder="Buscar producto"
                    onChangeText={(query) => setSearchQuery(query)}
                    value={searchQuery}
                />
                {filteredProducts?.map((product) => (
                    <FadeInView key={product._id}>
                        <ProductCard
                            product={product}
                            onPress={() => goToProductDetail(product._id)}
                        />
                    </FadeInView>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    cardContainer: {
        marginBottom: 10
    },
    noProductsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noProductsText: {
        fontSize: 18,
        color: 'gray',
    },
});

export default PurchaseScreen;