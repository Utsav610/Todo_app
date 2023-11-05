import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import Login from '../screens/login';
import HomeNavigation from './homeNavigation';
import Task from '../screens/task';

const Stack = createNativeStackNavigator();

export default function TodoNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
       
        <Stack.Screen
          name="Home Navigation"
          component={HomeNavigation}
          options={{headerShown: false}}
        />
        
        <Stack.Screen
          name="Task"
          component={Task}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
