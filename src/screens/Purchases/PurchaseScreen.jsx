import { useState, useEffect } from 'react';
import { Text, ScrollView, StyleSheet, RefreshControl, View } from 'react-native';
import { Card, Searchbar } from 'react-native-paper';
import { formatDate, formatPrice, removeAccents } from '../../utils/formatFunctions';
import { useNavigation } from '@react-navigation/native';
import APIURL from '../../api/API';
import Loading from '../../components/Loading';
import COLOR_APP from '../../utils/colors';
import FadeInView from '../../components/Animating';

const ShoppingScreen = () => {
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchData = async () => {
        try {
            setRefreshing(true);
            const response = await fetch(`${APIURL}/clothes`);
            const data = await response.json();
            setProducts(data?.data);
        } catch (error) {
            console.log(error);
        } finally {
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData();
    };

    const goToProductDetail = (productId) => {
        navigation.navigate('PurchaseDetails', { id: productId });
    };

    const filteredProducts = products.filter((product) =>
        removeAccents(product.title.toLowerCase()).includes(removeAccents(searchQuery.toLowerCase()))
    );

    if (refreshing) return <Loading />

    return (
        <ScrollView
            style={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        >
            <Searchbar
                style={styles.searchBar}
                placeholder="Buscar producto"
                onChangeText={(query) => setSearchQuery(query)}
                value={searchQuery}
            />
            {filteredProducts.map((product) => (
                <FadeInView key={product._id} >
                    <Card
                        key={product._id}
                        mode='elevated'
                        style={styles.card}
                        onPress={() => goToProductDetail(product._id)}
                    >
                        <Card.Cover source={{ uri: product.image }} />
                        <Card.Title title={product.title} />
                        <Card.Content>
                            <Text variant='titleLarge'>{product.description}</Text>
                            <Text variant="titleLarge">{formatPrice(product.price)}</Text>
                            <Text variant="titleLarge">
                                Comprado el: {formatDate(product.boughtDate)}
                            </Text>
                        </Card.Content>
                    </Card>
                </FadeInView>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    card: {
        margin: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBar: {
        backgroundColor: COLOR_APP.blacks[20],
        margin: 10,
        alignSelf: 'center',
        shadowColor: '#000'
    }
});

export default ShoppingScreen;