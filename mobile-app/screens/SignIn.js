import { useState } from 'react';
import { Alert, View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { postRequest } from '../helpers/requests';
import { POST_AUTHENTICATION } from '../helpers/constants';
import { signIn } from '../redux/features/assignee';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch()
  const [assigneeName, setAssigneeName] = useState('')

  const handleSignIn = async () => {
    const body = {
      assignee: {
        name: assigneeName
      }
    }
    try {
      const res = await postRequest(POST_AUTHENTICATION, body)
      dispatch(signIn(res.data))
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert("An error occurred while signing in: ", error.message)
    }
  }

  const handleInput = (enteredText) => {
    setAssigneeName(enteredText)
  }

  return (
    <View>
      <View style={styles.container}>
      <Text> Enter your Assignee information </Text>
      <TextInput style={styles.textInput} placeholder='Assignee Name'  onChangeText={handleInput} value={assigneeName} />
      <Button title="Sign In" onPress={handleSignIn} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderStyle: 'solid',
    borderColor: '#ccc',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
  }
})

export default SignIn;
