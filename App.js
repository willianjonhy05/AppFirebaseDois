import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginApp from './screens/Login';
import TarefasApp from './screens/App';

const Stack = createStackNavigator();

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticação

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginApp">
                {!isAuthenticated ? (
                    <Stack.Screen name="LoginApp">
                        {props => <LoginApp {...props} setIsAuthenticated={setIsAuthenticated} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="TarefasApp" component={TarefasApp} />
                )}
                <Stack.Screen name="TarefasApp" component={TarefasApp} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
