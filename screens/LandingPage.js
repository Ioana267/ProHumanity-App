
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home'); // Navigate to your chat page
    }, 4000); // Adjust the duration as needed (in milliseconds)
    
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProHumanity</Text>
      {/* Add any other content for your landing page */}
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
});

export default LandingPage;
