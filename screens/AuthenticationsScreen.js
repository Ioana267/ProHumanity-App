import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { getFirestore, collection, onSnapshot, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const AuthenticationsScreen = () => {
  const [authentications, setAuthentications] = useState([]);
  const navigation = useNavigation();
  const firestore = getFirestore();

  useEffect(() => {
    const fetchAuthentications = async () => {
      try {
        const authCollection = collection(firestore, 'Users');
        const authSnapshot = await getDocs(authCollection);

        const authData = authSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAuthentications(authData);
      } catch (error) {
        console.error('Error fetching authentications:', error);
      }
    };

    fetchAuthentications();

  }, [firestore]);

  const handleFollow = (userId) => {
    // Implement the logic to follow the user
    // You may want to update the current user's following list in Firestore
    // For simplicity, let's assume you have a followUser function
    // Replace it with your actual follow logic
    followUser(userId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Authentications</Text>
      <FlatList
        data={authentications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('UserProfile', { userId: item.id })}>
            <View style={styles.authenticationItem}>
              <Text>{item.username}</Text>
              <TouchableOpacity onPress={() => handleFollow(item.id)}>
                <Text style={styles.followButton}>Follow</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  authenticationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  followButton: {
    color: 'blue',
  },
});

export default AuthenticationsScreen;