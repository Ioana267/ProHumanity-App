
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

const LandingPage = ({ navigation }) => {
  /*useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navigate to your chat page
    }, 4000); // Adjust the duration as needed (in milliseconds)
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);*/

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProHumanity</Text>
      <View style={{ height: 50 }} />
      <TouchableOpacity
        onPress={navigateToSignIn}
        style={[styles.button, { marginBottom: 20 }]}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      
      {/* Separation of 5 cm */}
      <View style={{ height: 10 }} />
      
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf9ec',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#c4edc4',
    padding: 10,
    width: '50%', // Adjust the width as needed
    alignItems: 'center',
},
});

export default LandingPage;
