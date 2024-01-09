import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const Post = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [taskNumber, setTaskNumber] = useState('');

  const handleImagePicker = () => {
    ImagePicker.showImagePicker((response) => {
      if (!response.didCancel && !response.error) {
        setImage(response.uri);
      }
    });
  };

  return (
    <View style={{ backgroundColor: '#c4edc4', padding: 20, flex: 1 }}>
      <Text>Description:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <Text>Number of Tasks:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        onChangeText={(text) => setTaskNumber(text)}
        value={taskNumber}
      />

      <Button title="Pick Image" onPress={handleImagePicker} />

      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 10 }} />}

      {/* Add a button or functionality to submit the post with the selected image, description, and task number */}
      {/* Example: <Button title="Post" onPress={() => handlePost(image, description, taskNumber)} /> */}
    </View>
  );
};

export default Post;