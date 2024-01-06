//LevelStatus.js (level+xp)
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const LevelStatus = ({ level, xp }) => {
  const handlePress = () => {
    // You can implement the logic to show XP details or navigate to a separate XP screen
    console.log('XP pressed. Current XP:', xp);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.levelText}>Level {level}</Text>
        <Text style={styles.xpText}>{xp} XP</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#c4edc4',
    padding: 10,
    marginTop: 10,
    marginBottom: 30,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  xpText: {
    fontSize: 16,
  },
});

export default LevelStatus;