import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import SplashScreen from "./components/SplashScreen"
import HomeScreen from "./components/HomeScreen"
import CameraScreen from './components/CameraScreen';
import BigPhotoScreen from './components/BigPhotoScreen';
import SettingsScreen from './components/SettingsScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options ={{headerShown: false}}
                />
                <Stack.Screen
                  name="HomeScreen"
                  component={HomeScreen}
                  options= {{
                    title: 'Zdjęcia z folderu DCIM',
                    headerStyle: { backgroundColor: '#ea1e63'},
                    headerTintColor: '#ffffff',
                    headerTintStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen
                  name="CameraScreen"
                  component={CameraScreen}
                  options ={{headerShown: false}}
                />
                <Stack.Screen
                  name="BigPhotoScreen"
                  component={BigPhotoScreen}
                  options= {{
                    title: 'Wybrane zdjęcie',
                    headerStyle: { backgroundColor: '#ea1e63'},
                    headerTintColor: '#ffffff',
                    headerTintStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
                <Stack.Screen
                  name="SettingsScreen"
                  component={SettingsScreen}
                  options= {{
                    title: 'Ustawienia',
                    headerStyle: { backgroundColor: '#ea1e63'},
                    headerTintColor: '#ffffff',
                    headerTintStyle: {
                      fontWeight: 'bold',
                    },
                  }}
                />
            </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#ea1e63"
  }
});

export default App;
