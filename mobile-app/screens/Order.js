import { Button, View, Alert, Image, Text , StyleSheet, FlatList } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { putRequest } from '../helpers/requests';
import { PUT_ORDER } from '../helpers/constants';
import { useState } from 'react';

const renderImagesToList = (item) => {
  return <Image style={styles.image} source={{ uri: item.item.url }} />
}

const Order = ({ route }) => {
  const { order } = route.params
  
  const [images, setImages] = useState(order.images)
  const [cameraPermission, requestPermission] = useCameraPermissions()
  const { token } = useSelector((state) => state.assignee.value)
  
  const verifyPermissions = async () => {
    if (cameraPermission.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    if (cameraPermission.status === PermissionStatus.DENIED) {
      Alert.alert('Insufficient permissions', 'You need to grant permission to use this feature')

      const permissionResponse = await requestPermission()

      return permissionResponse.granted
    }

    return true
  }

  const handleTakePicture = async () => {
    const hasPermissions = await verifyPermissions()

    if (!hasPermissions) {
      return
    }
    
    const image = await launchCameraAsync({
      allowsEditing: true,
      allowsMultipleSelection: true,
      aspectRatio: [16, 9],
      quality: 0.5,
    })

    setImages((prevState) => [...prevState, { ...image, url: image.uri }])
  }

  const submitImages = async () => {
    if (images.length === 0) {
      return Alert.alert('Invalid operation', 'To submit images there must be taken at least one image.')
    }
    
    const formData = new FormData()
      images.forEach((image, index) => {
        formData.append('order[images][]', {
          uri: image.uri,
          type: 'image/jpeg',
          name: `photo${index}.jpg`,
        })
     })
     
     try {
      const res = await putRequest(`${PUT_ORDER}/${order.id}}`, formData, token)
      Alert.alert(res.data.status, 'Images uploaded successfully')
     } catch (error) {
      Alert.alert('an error occurred', error.message)
     }
    }

  return (
    <>
    <View>
      <View style={styles.container}>
        <View style={styles.orderInfo}>
          <Text>Address: {order.address}</Text>
          <Text>Status: {order.status}</Text>
        </View>
      </View>
      {
        order.status === 'Pending' &&
        <View style={styles.buttonsContainer} >
          <Button style={styles.button} title='Submit Photos' onPress={submitImages} />    
          <Button style={styles.button} title='Take Photo' onPress={handleTakePicture} />
        </View>
      }
    </View>
    <FlatList data={images} keyExtractor={(item) => item.url} renderItem={renderImagesToList} />
    </>
  ) 
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imagePreview: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  image:{
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  buttonsContainer: {
    marginVertical: 20,
    justifyContent: 'space-around',
    width: '100%',
    flexDirection: 'row',
  },
  button: {
    marginLeft: 50,
  },
  orderInfo: {
    alignItems:  'center',
    justifyContent: 'center',
    width: '60%',
    height: 100,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
  }
})

export default Order;
