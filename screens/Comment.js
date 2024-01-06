//Comment.js (comments pt postari feed)
import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Title } from 'react-native';
import { Avatar, List} from 'react-native-paper';

const Comment = ({ postId, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      onCommentSubmit(postId, commentText);
      setCommentText('');
    }
  };

  return (
    <View style={styles.commentContainer}>
      <TextInput
        style={styles.commentInput}
        placeholder='Write a comment'
        value={commentText}
        onChangeText={(text) => setCommentText(text)}
      />
      <Button title="Post Comment" onPress={handleCommentSubmit} color={'#c4edc4'}/>
    </View>
  );
};

const styles = StyleSheet.create({
  commentContainer: {
    marginTop: 10,
  },
  commentInput: {
    borderBottomWidth: 1,
    marginBottom: 5,
    padding: 5,
  },
});

export default Comment;