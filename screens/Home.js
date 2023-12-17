
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
        <Text style={styles.bigText}>Home</Text>
      </SafeAreaView>
      {/* Other settings content goes here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf9ec',
  },
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#c4edc4',
    width: 600,
    paddingLeft: 10, // Adjust as needed
  },
});

export default Home;
