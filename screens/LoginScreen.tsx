import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { RootStackParamList, authenticateUser } from '../utils'

export const LoginScreen: React.FC<
  NativeStackScreenProps<RootStackParamList, 'Login'>
> = ({ navigation }) => {
  const handleLogin = async () => {
    const isAuthenticated = await authenticateUser()

    if (isAuthenticated) {
      navigation.push('TodoList', {})
    } else {
      // TODO: Handle authentication failure (e.g., show an error message)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Authenticate to access the TODO list</Text>
      <Button title='Login' onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
})
