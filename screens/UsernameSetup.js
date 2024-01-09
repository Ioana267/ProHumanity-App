import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import SignUp from './SignUp';
import * as ImagePicker from 'expo-image-picker';

const UsernameSetup = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
  
    const handleUsernameChange = (text) => {
      setUsername(text);
    };
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setProfilePicture(result.uri);
      }
    };
  
    const handleSubmit = () => {
      console.log('Username:', username);
      console.log('Profile Picture:', profilePicture);
      setUsername('');
      setProfilePicture('');
      navigation.navigate('Home');
    };
  
    return (
      <View style={styles.signin}>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={pickImage}
            style={[styles.circularButton, profilePicture && { display: 'none' }]}
          >
            <Text style={styles.buttonText}>Pick Picture</Text>
          </TouchableOpacity>
  
          {profilePicture && (
            <Image source={{ uri: profilePicture }} style={styles.previewImage} />
          )}
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Username:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={username}
            onChangeText={handleUsernameChange}
            required
          />
        </View>
        <TouchableOpacity onPress={handleSubmit} style={[styles.link, styles.button]}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    );
  };

export default UsernameSetup;