/*

TELA PARA CONECTAR AS PÁGINAS

*/
import React, {useEffect, useState} from 'react';
import {Alert, Linking, BackHandler} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import AndroidOpenSettings from 'react-native-android-open-settings';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import {auth} from './src/config/configFirebase';

import InitScreen from './src/pages/InitScreen/index';
import LoginScreen from './src/pages/LoginScreen/index';
import SinginScreen from './src/pages/SinginScreen/index';
import Stein from './src/pages/HomeMapScreen/';
import UserScreen from './src/pages/UserScreen/index';
import ConfingScreen from './src/pages/ConfingScreen/index';
import ShareToAFriendScreen from './src/pages/ShareToAFriendScreen/index';
import AddCharger from './src/pages/AddCharger/index';
import FaqScreen from './src/pages/FaqScreen/index';
import PersonalContentScreen from './src/pages/PersonalContentScreen/index';
import HouseAndWork from './src/pages/HouseAndWork/index';
import ChangeAccount from './src/pages/ChangeAccount/index';
import OQueFazemos from './src/pages/oQueFazemos/index';
import Objetivo from './src/pages/objetivo/index';
import QuemSomos from './src/pages/quemSomos/index';
import AddHome from './src/pages/AddAndEditHome/AddHouse';
import EditHome from './src/pages/AddAndEditHome/editingHouse';
import AddWork from './src/pages/AddAndEditWork/AddWork';
import EditWork from './src/pages/AddAndEditWork/editingWork';
import DataBox from './src/pages/HouseAndWork/boxData';

const Stack = createNativeStackNavigator();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    console.log(auth.currentUser)
    return subscriber; // unsubscribe on unmount
  }, []);
  
  var loading = true;

  if (initializing) return null;

  if(user){
    loading = false;
  } else {
    loading = true;
  }


  check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    .then(result => {
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('Permissão não disponível no dispositivo');
          break;
        case RESULTS.DENIED:
          console.log('Permissão de localização negada');
          break;
        case RESULTS.GRANTED:
          Geolocation.getCurrentPosition(
            verif => {
              console.log('TE PEGUEI HOMEM');
            },
            error => {
              Alert.alert(
                'Localização desligada',
                'Deseja ativar a localização?',
                [
                  {
                    text: 'Ativar',
                    onPress: () => AndroidOpenSettings.locationSourceSettings(),
                  },
                  {
                    text: 'Desativar',
                    onPress: () => BackHandler.exitApp(),
                    style: 'cancel', // Define este botão como o botão de cancelar (pode variar o nome)
                  },
                ],
                {cancelable: false}, // Define se o Alert pode ser cancelado tocando fora dele
              );
            },
          );
          break;
        case RESULTS.BLOCKED:
          console.log('Permissão de localização bloqueada');
          break;
      }
    })
    .catch(error => {
      console.log('Erro ao verificar a permissão de localização', error);
    });

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={loading? "InitScreen": "Stein"}>
        <Stack.Screen
          name="InitScreen"
          component={InitScreen}
          options={{
            title: 'STEIN',
            headerTransparent: true,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: scale(34),
              fontWeight: '600',
              color: '#000000',
            },
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: 'ENTRAR',
            headerTransparent: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
              color: '#563595',
            },
          }}
        />
        <Stack.Screen
          name="SinginScreen"
          component={SinginScreen}
          options={{
            title: 'Cadastrar',
            headerTransparent: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
              color: '#563595',
            },
          }}
        />
        <Stack.Screen
          name="Stein"
          component={Stein}
          options={{
            headerBackTitleVisible: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="OQueFazemos"
          component={OQueFazemos}
          options={{
            title: '',
            headerTransparent: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
              color: '#563595',
            },
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Objetivo"
          component={Objetivo}
          options={{
            title: '',
            headerTransparent: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
              color: '#563595',
            },
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="QuemSomos"
          component={QuemSomos}
          options={{
            title: '',
            headerTransparent: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
              color: '#563595',
            },
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="UserScreen"
          component={UserScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
              color: '#563595',
            },
          }}
        />
        <Stack.Screen
          name="ConfingScreen"
          component={ConfingScreen}
          options={{
            title: 'Configurações',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
            },

            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />

        <Stack.Screen
          name="ShareToAFriendScreen"
          component={ShareToAFriendScreen}
          options={{
            title: 'Convidar um amigo',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />

        <Stack.Screen
          name="AddCharger"
          component={AddCharger}
          options={{
            title: 'Adicionar carregador',
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
        <Stack.Screen
          name="FaqScreen"
          component={FaqScreen}
          options={{
            title: '',
            headerTransparent: true,
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontSize: 34,
              fontWeight: '900',
              color: '#563595',
            },
          }}
        />
        <Stack.Screen
          name="PersonalContentScreen"
          component={PersonalContentScreen}
          options={{
            title: 'Conteúdo pessoal',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
        <Stack.Screen
          name="HouseAndWork"
          component={HouseAndWork}
          options={{
            title: 'Casa e Trabalho',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
        <Stack.Screen
          name="ChangeAccount"
          component={ChangeAccount}
          options={{
            title: 'Alternar Conta',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />

        <Stack.Screen
          name="AddHome"
          component={AddHome}
          options={{
            title: 'Adicionar Casa',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
        <Stack.Screen
          name="EditHome"
          component={EditHome}
          options={{
            title: 'Editar casa',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />

        <Stack.Screen
          name="AddWork"
          component={AddWork}
          options={{
            title: 'Adicionar trabalho',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
        <Stack.Screen
          name="EditWork"
          component={EditWork}
          options={{
            title: 'Editar trabalho',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: '900',
            },
            headerStyle: {
              backgroundColor: '#ffffff',
            },
          }}
        />
        <Stack.Screen name="DataBox" component={DataBox} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
