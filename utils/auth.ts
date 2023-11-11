import { hasHardwareAsync, authenticateAsync } from 'expo-local-authentication'

export const authenticateUser = async (): Promise<boolean> => {
  try {
    const isHardwareAsync = await hasHardwareAsync()
    if (!isHardwareAsync) {
      throw new Error('Biometric/PIN not supported')
    }

    const isAuthorized = await authenticateAsync({
      promptMessage: 'Authenticate to access the TODO list',
    })

    return isAuthorized.success
  } catch (error) {
    console.error('Authentication error:', error)
    return false // Handle errors and return false
  }
}
