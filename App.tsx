import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from 'utils'
import { LoginScreen, TodoListScreen } from './screens'

const Stack = createStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='TodoList' component={TodoListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
