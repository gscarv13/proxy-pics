import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

const OrderItem = ({ order, handlePress }) => {
  return (
    <View style={styles.container} >
      <Text>Address: {order.address}</Text>
      <Text>Status: {order.status}</Text>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttonText}>
             Details
          </Text>
        </TouchableOpacity>
    </View>
  )    
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flex: 1,
    margin: 15,
    padding: 5,
    height: 150,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 4,
    borderWidth: 1,
  },
  button: {
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})

export default OrderItem;