import { StyleSheet, FlatList, Text, View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OrderItem from "../components/OrderItem";
import { GET_ORDERS } from "../helpers/constants";
import { allOrders } from "../redux/features/order";
import { getRequest } from "../helpers/requests";

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const orders = useSelector((state) => state.order.value)
  const { token } = useSelector((state) => state.assignee.value)

  const fetchData = async() => {
    try {
      const res = await getRequest(GET_ORDERS, token)
      dispatch(allOrders(res.data))
    } catch (error) {
      Alert.alert('An error occurred while fetching orders', error.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const renderOrderItem = (item) => {
    const handlePress = () => {
      navigation.navigate('Order', { order: item.item })
    }
  
    return <OrderItem order={item.item} handlePress={handlePress} />
  }

  return (
    <>
      <View>
        <Text style={styles.header} >Orders List</Text>
        <Button onPress={fetchData} title="Refresh orders" />
      </View>
      <FlatList style={styles.list} data={orders} keyExtractor={(item) => item.id} renderItem={renderOrderItem} />
    </>
  )
}

const styles = StyleSheet.create({
  container: {},
  header: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  list: {
    backgroundColor: 'white',
  }
})

export default Home;