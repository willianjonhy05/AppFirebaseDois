import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginApp from './screens/Login';
import TarefasApp from './screens/App';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="LoginApp" component={LoginApp} />
                <Stack.Screen name="TarefasApp" component={TarefasApp} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}