import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomButton from '../components/customButton';
import colors from '../contants/colors';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = ({ navigation }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async data => {
    console.log(data);
    // AsyncStorage.setItem('user', data.email);
    try {
      const response = await axios.post(
        'https://api.escuelajs.co/api/v1/auth/login',
        {
          email: data.email,
          password: data.password,
        },
      );

      if (response) {
        const { access_token, refresh_token } = response.data;

        AsyncStorage.setItem('accessToken', access_token);
        AsyncStorage.setItem('refreshToken', refresh_token);

        navigation.navigate('Home Navigation');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
            />
            <Text style={styles.errorText}>{errors.email?.message}</Text>
          </>
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={styles.label}>Password:</Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={styles.passwordInput}
                onChangeText={onChange}
                value={value}
                secureTextEntry={!showPassword}
              />
              <Icon
                name={showPassword ? 'eye' : 'eye-off'}
                size={20}
                color="gray"
                onPress={togglePasswordVisibility}
              />
            </View>
            <Text style={styles.errorText}>{errors.password?.message}</Text>
          </>
        )}
        name="password"
        defaultValue=""
      />

      <CustomButton
        title="Login"
        style={{ width: '90%' }}
        color={colors.primaryColor}
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
  },
});

export default Login;
