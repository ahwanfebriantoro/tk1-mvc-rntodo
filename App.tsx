// App.js
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TodoScreen from './src/views/Todo';
// import HomeScreen from './src/views/Home';
import FarmScreen from './src/views/Farm/Home';
import Location from './src/views/Farm/Location';
import AnimalListScreen from './src/views/Farm/AnimalList';
import DetailScreen from './src/views/Farm/Detail';
import PremiumScreen from './src/views/Farm/Premium';
import AddDataScreen from './src/views/Farm/FormAdd';
import EditDataScreen from './src/views/Farm/FormEdit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Button, PaperProvider} from 'react-native-paper';
// import RandomPeople from './src/views/People';
// import RandomPeopleDetail from './src/views/People/Detail';

import BootSplash from 'react-native-bootsplash';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Login from './src/views/Auth/Login';
import {useAuthStore} from './src/db/authStore';

GoogleSignin.configure({
  webClientId: process.env.WEB_CLIENT_ID,
  offlineAccess: true,
});

const Stack = createNativeStackNavigator();

export default function App() {
  const [, setMenu] = useState<string>();
  const {user, signOut, loading, checkSignInStatus} =
    useAuthStore();

  const getDefaultAppMenu = async () => {
    const defaultMenu = (await AsyncStorage.getItem('defaultMenu')) || '';
    setMenu(defaultMenu);
  };

  useEffect(() => {
    getDefaultAppMenu();
    checkSignInStatus();
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={{dark: false}}>
        <NavigationContainer
          onReady={() => {
            BootSplash.hide({fade: true});
          }}>
          {loading ? null : (
            <Stack.Navigator>
              {/* <Stack.Screen
              name="Home"
              component={RandomPeople}
              options={{title: 'Fake User App'}}
            />
            <Stack.Screen
              name="DetailPerson"
              component={RandomPeopleDetail}
              options={({route}) => ({
                title: `${route?.params?.data?.name?.first} ${route?.params?.data?.name?.last}`,
              })}
            /> */}
              {!user ? (
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{title: 'Login', header: () => null}}
                />
              ) : (
                <>
                  <Stack.Screen
                    name="Farm"
                    component={FarmScreen}
                    options={{
                      title: 'My Farm',
                      headerRight: () => (
                        <Button onPress={signOut}>Logout</Button>
                      ),
                    }}
                  />
                  <Stack.Screen
                    name="Location"
                    component={Location}
                    options={{title: 'Farm Location'}}
                  />
                  <Stack.Screen
                    name="AnimalList"
                    component={AnimalListScreen}
                    options={{title: 'Animal List'}}
                  />
                  <Stack.Screen
                    name="Detail"
                    component={DetailScreen}
                    options={{title: 'Detail Ternak'}}
                  />
                  <Stack.Screen
                    name="AddData"
                    component={AddDataScreen}
                    options={({route}) => ({
                      title: 'Tambah Data ' + route?.params?.type,
                    })}
                  />
                  <Stack.Screen
                    name="Premium"
                    component={PremiumScreen}
                    options={{title: 'Premium', header: () => <></>}}
                  />
                  <Stack.Screen
                    name="EditData"
                    component={EditDataScreen}
                    options={({route}) => ({
                      title: 'Edit Data ' + route?.params?.type,
                    })}
                  />
                  <Stack.Screen
                    name="Todo"
                    component={TodoScreen}
                    options={{title: 'Todo'}}
                  />
                </>
              )}
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
