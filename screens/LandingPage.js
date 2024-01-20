import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity,Image } from 'react-native';
import * as Font from 'expo-font';

const LandingPage = ({ navigation }) => {
  /*useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navigate to your chat page
    }, 4000); // Adjust the duration as needed (in milliseconds)
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);*/
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'Montserrat': require('./montserrat.ttf'),
      // Add other fonts as needed
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  if (!fontsLoaded) {
    return null; // Render nothing until fonts are loaded
  }

  return (
    <View style={styles.container}>
      <Image source={require('./logo.png')} style={styles.image} />
      <Text style={styles.title}>ProHumanity</Text>
      <View style={{ height: 30 }} />
      <TouchableOpacity
        onPress={navigateToSignIn}
        style={[styles.button, { marginBottom: 20 }]}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      
      {/* Separation of 5 cm */}
      <View style={{ height: 7 }} />
      
      {/* Button to navigate to Sign Up screen */}
      <TouchableOpacity
        onPress={navigateToSignUp}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 100, // Adjust the width as needed
    height: 100, // Adjust the height as needed
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ADDFAD',
    fontFamily: 'Montserrat',
  },
  title: {
    fontSize: 40,
    fontWeight: 'semibold',
    fontFamily: 'Montserrat',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontFamily: 'Montserrat',
    fontSize:17,
  },
  button: {
    backgroundColor: '#355E38',
    padding: 10,
    width: '50%', // Adjust the width as needed
    alignItems: 'center',
    borderRadius: 15,
    margin:0,
    fontFamily: 'Montserrat',
},
});

export default LandingPage;
