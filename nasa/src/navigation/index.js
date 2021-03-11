import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import { Home, AsteroidInfo } from '../screens'

const Stack = createStackNavigator();


const AppStack = () => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AsteroidInfo" component={AsteroidInfo} />
        </Stack.Navigator>
    )
}

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppStack />
        </NavigationContainer>
    )
}

export default AppNavigator