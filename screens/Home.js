//Home.js 
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Text, Image,  Platform  } from 'react-native';
import { Avatar, Title, IconButton, List } from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { getFirestore, collection, onSnapshot, query, doc, getDoc, orderBy } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import Comment from './Comment';
import { useNavigation } from '@react-navigation/native';
import { setDoc } from 'firebase/firestore';


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isMounted, setIsMounted] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const firestore = getFirestore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          const userDocRef = doc(firestore, 'Users', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          const currentUserData = userDocSnapshot.data();
  
          const postsCollection = collection(firestore, 'Posts');
          const allPostsQuery = query(postsCollection, orderBy('timestamp', 'desc'));
  
          const unsubscribe = onSnapshot(allPostsQuery, async (snapshot) => {
            if (isMounted) {
              const fetchedPosts = [];
  
              for (const doc of snapshot.docs) {
                try {
                  const postData = doc.data();
                  const postWithComments = {
                    id: doc.id,
                    user: {
                      userId: postData.userId,
                      profilePicture: postData.profilePicture,
                      username: postData.username,
                    },
                    totalLikes: postData.totalLikes || 0,
                    currentUserLike: postData.reactions?.[currentUser.uid] || 0,
                    profilePicture: postData.profilePicture || '',
                    username: postData.newUsername || '',
                    description: postData.description || '',
                    text: postData.text || '',
                    photo: postData.photo || '',
                    comments: postData.comments || [], // Include comments in the post object
                  };
  
                  fetchedPosts.push(postWithComments);
                } catch (error) {
                  console.error('Error fetching post data:', error);
                }
              }
  
              setPosts(fetchedPosts);
            }
          });
  
          return () => {
            // Unsubscribe from the Firestore listener when the component unmounts
            unsubscribe();
          };
        } else {
          console.warn('User not signed in.');
        }
      } catch (error) {
        console.error('Error setting up Firestore listener:', error);
      }
    };
  
    fetchData();
  
    return () => {
      setIsMounted(false);
    };
  }, [firestore, isMounted, auth, currentUser]);

  const handleReact = async (postId, reactionType) => {
    try {
      // Find the post in the local state
      const postIndex = posts.findIndex((post) => post.id === postId);

      // If the post is found, check the current state of the reaction
      if (postIndex !== -1) {
        const post = posts[postIndex];

        // Update the reactions in Firestore
        const postRef = doc(firestore, 'Posts', postId);
        await setDoc(postRef, {
          totalLikes: post.totalLikes + (post.currentUserLike === 0 ? 1 : -1),
          reactions: {
            ...post.reactions,
            [currentUser.uid]: post.currentUserLike === 0 ? 1 : 0,
          },
        }, { merge: true });

        // Update the reactions in the local state
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          updatedPosts[postIndex] = {
            ...post,
            totalLikes: post.totalLikes + (post.currentUserLike === 0 ? 1 : -1),
            currentUserLike: post.currentUserLike === 0 ? 1 : 0,
          };
          return updatedPosts;
        });
      }
    } catch (error) {
      console.error('Error updating reactions:', error);
    }
  };

  const handlePostPress = () => {
    console.log('Post button pressed');
    navigation.navigate('Post', { currentUserId: currentUser.uid });
  };

  const handleCommentSubmit = async (postId, commentText) => {
    try {
      // Find the post in the local state
      const postIndex = posts.findIndex((post) => post.id === postId);
  
      // If the post is found, update the comments in Firestore
      if (postIndex !== -1) {
        const post = posts[postIndex];
  
        const postRef = doc(firestore, 'Posts', postId);
        await setDoc(postRef, {
          comments: [
            ...post.comments,
            {
              id: post.comments.length + 1,
              text: commentText,
              username: currentUser.displayName, // Include the username in the comment object
            },
          ],
        }, { merge: true });
  
        // Update the comments in the local state
        setPosts((prevPosts) => {
          const updatedPosts = [...prevPosts];
          updatedPosts[postIndex] = {
            ...post,
            comments: [
              ...post.comments,
              {
                id: post.comments.length + 1,
                text: commentText,
                username: currentUser.displayName,
              },
            ],
          };
          return updatedPosts;
        });
      }
    } catch (error) {
      console.error('Error updating comments:', error);
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.bigText}>Home</Text>
        </View>
        <View style={styles.header}>
          <IconButton
            icon="plus"
            color="white"
            size={25}
            onPress={handlePostPress}
            style={styles.postButton}
          />
        </View>
      </View>
      <ScrollView style={{ backgroundColor: '#E0F6E1' }}>
        {posts.map((post) => (
          <View key={post.id} style={[styles.postContainer]}>
            <Avatar.Image size={40} source={{ uri: post.user?.profilePicture || '' }} />
            
            <View style={styles.postContent}>
              <Title>{post.user?.username || 'Unknown User'}</Title>
              <Text>{post.description}</Text>

              {post.photo && post.photo.trim() !== '' && (
                <Image source={{ uri: post.photo }} style={styles.postPhoto} />
              )}
              <View style={styles.reactionContainer}>
                  <IconButton
                    icon={() => (
                      <FontAwesomeIcon
                        name="heart"
                        size={20}
                        color={post.currentUserLike === 1 ? 'red' : 'grey'}
                      />
                    )}
                    onPress={() => handleReact(post.id, 'like')}
                  />
                  <Text style={styles.reactionCount}>{post.totalLikes}</Text>
                </View>
              <View style={styles.actionsContainer}>
                <Comment
                  postId={post.id}
                  onCommentSubmit={handleCommentSubmit}
                  username={post.user.username}
                  post={post}
                />
              </View>
              
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3C683E',
    ...Platform.select({
      ios: {
        // iOS specific styles
        paddingBottom: 130,
      },
      android: {
        // Android specific styles
        paddingBottom: 150,
      }
    })
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    paddingBottom: 5,
    backgroundColor: '#3C683E',
    ...Platform.select({
      ios: {
        // iOS specific styles
        
      },
      android: {
        // Android specific styles
        height: 80, 
        alignItems: 'flex-end',
      }
    })
  },
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#3C683E',
    height: 40,
    paddingTop: 0,
    paddingLeft: 15,
    paddingRight: 3,
    
    alignItems: 'center',
    color: 'white',
    ...Platform.select({
      ios: {
        // iOS specific styles
        marginBottom: 3,
      },
      android: {
        // Android specific styles
        marginBottom: 5,
      }
    })
  },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 0,
    paddingLeft: 20,
    marginTop: 10,
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
  reactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  reactionCount: {
    marginLeft: 5,
    color: 'grey',
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
    marginBottom: 10,
  },
  postButton: {
    right: 20,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    ...Platform.select({
      ios: {
        // iOS specific styles
      },
      android: {
        // Android specific styles
        marginTop: 100,
        marginBottom: -3,
      }
    })
  },
});

export default Home;