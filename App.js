import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './src/screens/camera/CameraScreen';
import CanvasScreen from './src/screens/canvas/CanvasScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Camera" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Canvas" component={CanvasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}