import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, Image, ScrollView, Alert } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import APIURL from '../../../api/API';
import Loading from '../../../components/Loaders/Loading';
import { formatDate, formatPrice } from '../../../utils/formatFunctions';
import COLOR_APP from '../../../utils/colors';
import DeleteConfirmationModal from '../../../components/Modals/DeleteConfirmationModal';

const PurchaseDetails = ({ route }) => {
  const { id } = route.params;
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [currency, setCurrency] = useState([]);
  const [error, setError] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigation();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${APIURL}/clothes/${id}`);
      const data = await response.json();
      if (data && data.data) {
        setProduct(data.data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrency = async () => {
    try {
      const response = await fetch(`${APIURL}/currency`);
      const data = await response.json();
      if (data && data.data) {
        setCurrency(data.data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      fetchCurrency();
    }, [id])
  );

  const deleteProduct = async (productId) => {
    try {
      setDeleting(true);
      const response = await fetch(`${APIURL}/clothes/${productId}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if (data.status === 'success') {
        Alert.alert('Éxito', 'El producto ha sido eliminado correctamente.');
        navigate.goBack();
      } else {
        Alert.alert('Error', 'Ha ocurrido un erro al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Ha ocurrido un error al eliminar el producto. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setDeleting(false);
    }
  };

  const confirmDelete = () => {
    DeleteConfirmationModal({
      title: 'Eliminar producto',
      message: '¿Estás seguro que quieres eliminar este producto?',
      onDelete: () => deleteProduct(id),
    });
  };

  const calculateExchange = (price, currency) => {
    return price / currency;
  }

  const roundPrice = (price) => {
    return Math.round(price);
  }

  if (loading) return <Loading />;
  if (error) return <Text style={styles.errorText}>Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.</Text>;
  if (!product || !currency.length) return null;

  const usdCurrency = currency.find(item => item.code === 'USD');
  const uyuCurrency = currency.find(item => item.code === 'UYU');

  const usdPrice = calculateExchange(product.price, usdCurrency.valueToUSD);
  const uyuPrice = calculateExchange(product.price, uyuCurrency.valueToUYU);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer} >
        <Image source={{ uri: product.image }} style={styles.image} resizeMode='contain' />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.roundedPrice}>ARS: {formatPrice(product.price)}</Text>
        <Text style={styles.roundedPrice}>USD: {formatPrice(roundPrice(usdPrice))} <Text style={styles.price}> = {formatPrice(usdPrice)}</Text></Text>
        <Text style={styles.roundedPrice}>UYU: {formatPrice(roundPrice(uyuPrice))} <Text style={styles.price}> = {formatPrice(uyuPrice)}</Text></Text>
        <Text style={styles.category}>Categoría: {product.category}</Text>
        <Text style={styles.date}>Comprado el: {formatDate(product.createdAt)}</Text>
      </View>
      <View style={styles.actionsButtonsContainer} >
        <Button
          style={styles.editButton}
          icon="pencil"
          mode="elevated"
          textColor='white'
          onPress={() => navigate.navigate('EditPurchase', { id: product.id, product })}
        >
          Editar
        </Button>
        <Button
          style={styles.sellButton}
          mode="elevated"
          icon='cart-check'
          textColor='white'
          onPress={() => console.log('Vendido')} // Aquí puedes manejar la acción de "Vendido"
        >
          Vender
        </Button>
        <Button
          style={styles.deleteButton}
          icon="delete"
          mode="elevated"
          textColor='white'
          onPress={confirmDelete} // Llamar a la función confirmDelete al presionar el botón
          loading={deleting}
        >
          Eliminar
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center'
  },
  imageContainer: {
    backgroundColor: COLOR_APP.blacks[10], // Fondo negro para el contenedor de la imagen
    width: '100%',
    height: 350,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    overflow: 'hidden',

  },
  image: {
    height: '100%',
    width: '100%'
  },
  detailsContainer: {
    width: '90%',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    opacity: 0.6,
  },
  roundedPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: 'gray',
  },
  editButton: {
    backgroundColor: COLOR_APP.primaryLight,
  },
  deleteButton: {
    backgroundColor: COLOR_APP.deepRed,
  },
  sellButton: {
    backgroundColor: COLOR_APP.green,
  },
  buttonLabel: {
    color: 'white',
  },
  actionsButtonsContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PurchaseDetails;