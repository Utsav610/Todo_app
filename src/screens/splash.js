import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import colors from '../contants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Splash({ navigation }) {
  useEffect(() => {
    const checkAccessToken = async () => {
      try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (accessToken && refreshToken) {
          navigation.replace('Home Navigation');
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('AsyncStorage error:', error);
      }
    };

    const timeout = setTimeout(() => {
      checkAccessToken();
    }, 1500);

    return () => {
      clearTimeout(timeout);
    };

  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Todo List</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 35,
    color: colors.whiteColor,
    fontWeight: '600'
  }
});

