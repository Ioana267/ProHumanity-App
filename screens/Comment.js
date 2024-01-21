import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
import { IconButton, List } from 'react-native-paper';

const Comment = ({ postId, onCommentSubmit, username, post }) => {
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = () => {
    if (commentText.trim() !== '') {
      // Pass the commentText to onCommentSubmit callback
      onCommentSubmit(postId, commentText);
      setCommentText('');
    }
  };

  return (
    <View style={styles.commentContainer}>
      <TextInput
        label="Add a comment"
        value={commentText}
        onChangeText={setCommentText}
        style={styles.commentInput}
      />
      <IconButton
        icon="send"
        color="black"
        size={20}
        onPress={handleCommentSubmit}
      />
      
      
      {post.comments.map((comment) => (
       <List.Item key={comment.id} title={`${comment.username}: ${comment.text}`} />
      ))}
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
    marginRight:15,
  },
  username: {
    fontWeight: 'bold',
  },
  commentText:{
    color:'black',
  }
});

export default Comment;