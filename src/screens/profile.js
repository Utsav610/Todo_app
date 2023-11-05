import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import colors from '../contants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
  const handleLogout = async () => {
    console.log('Logout clicked');
    await AsyncStorage.removeItem('accessToken');

    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../assets/profile.png')} style={styles.image} />
        <Text style={styles.profileName}>John Doe</Text>
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => handleLogout()}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  image: {
    width: 75,
    height: 75,
    borderRadius: 37,
  },
  profileName: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: colors.accentColor,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});
