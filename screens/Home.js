import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, Image } from 'react-native';
import { Avatar, Title, IconButton, TextInput, Button, List, index } from 'react-native-paper';
import LevelStatus from './LevelStatus'; // Import the LevelStatus component
//import { useNavigation } from '@react-navigation/native';
import Comment from './Comment';


/*const Post = ({ picture, description, reactions, comments, onReact, onComment }) => {
  const [newComment, setNewComment] = useState('');
  const navigation = useNavigation();
  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  }
  return (
    
    <div>
      <img src={picture} alt="Post" style={{ maxWidth: '100%' }} />
      <p>{description}</p>
      <button onClick={onReact}>React ({reactions})</button>

      <div>
        <input
          type="text"
          placeholder="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={() => onComment(newComment)}>Comment</button>
      </div>

      <div>
        <h4>Comments</h4>
        {comments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>

  );
};*/

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [level, setLevel] = useState(1); // Example level state
  const [xp, setXP] = useState(1000); // Example XP state

  // Example user and post data
  const users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];

  const examplePosts = [
    {
      id: 1,
      userId: 1,
      text: 'Hello, World!',
      isLiked: false,
      reactions: {
        like: 0,
        love: 0,
        wow: 0,
      },
      photo: 'https://images.squarespace-cdn.com/content/v1/61c4da8eb1b30a201b9669f2/70df54c2-bf1f-4230-a933-0b3344f541ca/Deep-Ecology-1.jpg?format=1500w',
      comments: [],
    },
    {
      id: 2,
      userId: 2,
      text: 'Nature',
      isLiked: false,
      reactions: {
        like: 0,
        love: 0,
        wow: 0,
      },
      photo: 'https://img.freepik.com/free-vector/ecology-environment-concept-design_98292-3893.jpg?w=740&t=st=1704364352~exp=1704364952~hmac=91c8bc9cf6d149c237a06915c69d84b38f65b03206087aa8bb26ab3912adc747',
      comments: [],
    },
    // Add more posts as needed
  ];

  useEffect(() => {
    // Set the initial state with example posts
    setPosts(examplePosts);
  }, []);

  const handleReact = (postId, reactionType) => {
    // Update the state to set the reaction for the given post
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
            ...post,
            reactions: {
              ...post.reactions,
              [reactionType]: post.reactions[reactionType] + 1,
            },
          }
          : post
      )
    );
  };

  const handleCommentSubmit = (postId, commentText) => {
    // Add the new comment to the post's comments array
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
            ...post,
            comments: [
              ...post.comments,
              { id: post.comments.length + 1, userId: 1, text: commentText },
            ],
          }
          : post
      )
    );
  };
  const handlePostPress = () => {
    navigation.navigate('Post');
  };
  const [buttonColor, setButtonColor] = useState('blue'); // Set the initial color



  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View >
            <Text style={styles.bigText}>Home</Text>
          </View>
          <View style={styles.header}>
              <IconButton
                icon="plus-circle"
                color="#000"
                size={30}
                onPress={handlePostPress}
                style={styles.postButton} // Apply styles to the button
              />
          </View>
        </View>
      <ScrollView style={{ backgroundColor: '#ecf9ec',}}>
          
        <LevelStatus level={level} xp={xp} />
        {posts.map((post) => (
          <View key={post.id} style={[styles.postContainer, index === posts.length - 1 && styles.lastPost]}>
            <Avatar.Text
              size={40}
              label={users.find((user) => user.id === post.userId).name[0]}
            />
            <View style={styles.postContent}>
              <Title>{users.find((user) => user.id === post.userId).name}</Title>
              <List.Item title={post.text} />
              {post.photo && (
                <Image source={{ uri: post.photo }} style={styles.postPhoto} />
              )}
              <View style={styles.actionsContainer}>
                <IconButton
                  icon="thumb-up"
                  color={post.reactions && post.reactions['like'] > 0 ? 'blue' : 'grey'}
                  size={20}
                  onPress={() => handleReact(post.id, 'like')}
                />
                <IconButton
                  icon="heart"
                  color={post.reactions && post.reactions['love'] > 0 ? 'red' : 'grey'}
                  size={20}
                  onPress={() => handleReact(post.id, 'love')}
                />
                <IconButton
                  icon="star"
                  color={post.reactions && post.reactions['wow'] > 0 ? 'orange' : 'grey'}
                  size={20}
                  onPress={() => handleReact(post.id, 'wow')}
                />
                {/* Replace the existing TextInput and Button with the Comment component */}
                <Comment postId={post.id} onCommentSubmit={handleCommentSubmit} />
              </View>
              <View style={styles.commentsContainer}>
                {post.comments.map((comment) => (
                  <List.Item key={comment.id} title={comment.text} />
                ))}
              </View>
            </View>
          </View>
        ))}
        <View style={styles.bottomRectangle}></View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#c4edc4',
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    paddingBottom:0,
    backgroundColor: '#c4edc4',
  },
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#c4edc4',
    height:40,
    //width: '100%', // Use '100%' to occupy the full width
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight:3,
    paddingBottom:0,
    alignItems: 'center', // Add this line to vertically align the text
   
    
  },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingLeft:20
  },
  postContent: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    marginTop: 1,
  },
  postPhoto: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 5,
  },
  commentsContainer: {
    marginTop: 10,
  },
  lastPost: {
    marginBottom: 100, // Adjust the value based on the desired space after the last post
  },
  postButton: {
    //position: 'absolute',
    right: 20, // Adjust the right value to control the button's position
    top: 0, // Adjust the top value to control the button's position
  },
  bottomRectangle: {
    height: 80, // Adjust the height as needed
    backgroundColor: '#ecf9ec', // Adjust the color as needed
  },
});

export default Home;