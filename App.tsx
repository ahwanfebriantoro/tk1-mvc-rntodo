import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import StateListScreen from './src/views/State/StateList';
import Map from './src/views/State/Map';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {PaperProvider} from 'react-native-paper';
import BootSplash from 'react-native-bootsplash';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={{dark: false}}>
        <NavigationContainer
          onReady={() => {
            BootSplash.hide({fade: true});
          }}>
          <Stack.Navigator>
            <Stack.Screen
              name="StateList"
              component={StateListScreen}
              options={{title: '🇺🇸 States list'}}
            />
            <Stack.Screen
              name="Map"
              component={Map}
              options={({route}) => ({
                title: route.params?.selectedState
                  ? `Map of ${route.params?.selectedState}`
                  : 'Selected State',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
