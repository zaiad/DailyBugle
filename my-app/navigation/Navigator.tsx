import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Text, View } from 'react-native'
import NewsOverview from '../components/NewsOverview'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function HomeScreen() {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={() => <Text>Home</Text>}/>
            <Tab.Screen name='Saved' component={() => <Text>Saved</Text>}/>
        </Tab.Navigator>
    )
}

export default function AppNavigator() {

    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName='NewsOverview'>
                <Stack.Screen  name="HomeScreen" component={HomeScreen}/>
                <Stack.Screen  name="NewsOverview" component={NewsOverview}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
