//App.js cu streaks si tot
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  addDoc, // Import the addDoc function
} from 'firebase/firestore';
import { doc as firestoreDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { onSnapshot } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { query, where, orderBy, limit } from 'firebase/firestore';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo, Ionicons } from '@expo/vector-icons';
import LandingPage from './screens/LandingPage';
import Post from './screens/Post';
import { Home, Settings, Planet, Articles, EditProfile, AdvancedSettings, PrivacyPolicy, TermsOfService, Logout } from './screens';
import * as ImagePicker from 'expo-image-picker';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image, TextInput, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const stackOptions = {
  headerShown: false,
};

const firebaseConfig = {
  apiKey: "AIzaSyAcr04Np8vrcsiFUx89Aw2xNoEVsbGF9DA",
  type: "service_account",
  projectId: "prohumanity-42269",
  private_key_id: "d36ea265e86921f716da7d4fce511317d5b2a6dc",
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDyXnj56elV5SXf\n92RGJbf4/wtJgeRrY0EJAdeVeW75nkE3URiX/Y+q788uT+fgYPlflNa397PAzqLf\nGsTWFSmL00u7WAIcqZj52qS8hegYCYpxv0hXVCzAAE0oiv1pzv3PWSQzGBnSvkBI\n+GGxrdX7qu4FL/ULP5uR8ReuBPrRWyqWSgMC79WgkcmM4nCECLPdR2SMAQR9VsjW\nxG9YRv2CpRXfUHd8tOoowr0frZuxbAwiWZvWPfFxXBiB7uyX3wEmPfmtodw2qn8h\nbF6/S9zknsr9NLkUOYbxTsMa2b+2Muh1jOTCsX+bahgLdgiDZq94vAVM1kjbisdt\nly2p3ao7AgMBAAECggEAXdeEYcdWyCI8QvaHxb1O+ULO/PwlFAtPIAytizuEY3QJ\n7kAhFKBhox7NCjJ4JmGFzKNVa8+lsq6PU3EK65UwC+qY9QXDc5ObHoqwpCn4zm3L\nQ/V7LgzycrjrJxqBuhkiHsl2Aa6AOR/exiIduW0EYDgzhqCl8WAEfUJrF77n2m0A\nKhG0J6SOL3G1JG5zXq7ZdimGYEdzBTz4qXTMQbYgZ9uCdV/AI/Zu+v1aG/EWevnj\nC9U2qOn+romtIIPljqgF9DUo1PvcthBg1qmKFdCChBvjbPhNnufjSmOiEjqwZY6r\nw4PJfGfmesH/uVI5GqlU/tV0fA7H6dW5JEZgvk4qIQKBgQD9QsD7k3KEj22f7bwT\nfV0u6D7Sp2j7wsM5o+YOpUu3+Q8669WhoSKmBh/EYUgJAMocgo8yiXbk3v6ICTDy\n510k7d6S08F0tWGRw3urKUjTcbIoaBcr66z45894HmNaMiRZ4FN4GDEVw2fOlnHU\nw5xqqJ3PeBY0R7bP7N6LpsF/KwKBgQD0/Y+axuu9KC9TJ8O/psuPPMYuVwV2fyd6\n/zMvnNVBn4oHNhVHE12x1dFwZwl4Is1l1gEq6532R859fjCSYtGTIrN4Yjz1+lus\nRkIhNLXyMDQy3z/teQqZxws/ll4Ywj4kWOs0/qrguNcXrSZ6qeIaCQs4XkQr78UL\nwDQ4CKt5MQKBgQC7/bwQQj/ERE8EYsyzzt/HfN99MIVONCED/TQ89NfCxR5YB0z5\ngAmfIXadJ/T3sd1U0lkHE2DsvNZFFkV+WN0cF3GanZLBVg4JzAhVYfzL715mffWN\nRZCM5k1rhWsMPaIcENcEkziERhsdDzGJ1HWb+nPB2ArrXbxGlTYQhYSmJwKBgQDu\nZXMBXQJ2rgznMTG1ZDx/JNeArmN9fJxRftYzRbzrP7ET9VfdMwYgj/1fEJTRV6Rh\nrU6zklXDGvrfeRUQzaI8OC9GPOovPjFIwZGGOIG4q5mPy1is3/Ul0N+sP8lO9G19\n9xziE9L6HEQKIQ7pnDiNtzE459oUmxw2pBDsWdtqcQKBgQCIs1AMZYWp6Z9Xl+ru\njPBGZGYoKC1RK0lyBTZYpsN4iZ88TSnIoEyxWYopBQzPWicIrJsllBb9U2yG2/Yb\nCihHfustVMF2y4OWhFzr8Vsj6BntzZ+TCKxEYwvW9z3njssANO90njEtJUWRfzky\nTYsv+HqEHGCKxAWubS46r0NhIA==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-x5ngf@prohumanity-42269.iam.gserviceaccount.com",
  client_id: "108895893853066267556",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  storageBucket: "prohumanity-42269.appspot.com",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x5ngf%40prohumanity-42269.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

const FirebaseApp = initializeApp(firebaseConfig);
console.log('Firebase initialized successfully!');
// Set up Firestore after Firebase initialization
const firestore = getFirestore();

export default function App() {
  // State to track whether Firebase is initialized
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Check if Firebase is already initialized
    if (!firebaseInitialized) {
      // Set the flag to indicate Firebase is initialized
      setFirebaseInitialized(true);

      // Your existing code for fetching data or other initializations
      const fetchDataFromFirestore = async () => {
        try {
          // ... your existing Firestore data fetching logic
          const auth = getAuth();
          const currentUser = auth.currentUser;

          if (currentUser) {
            const querySnapshot = await getDocs(collection(firestore, 'Users'));
            querySnapshot.forEach((doc) => {
              console.log(currentUser.uid, ' => ', doc.data());
            });
          }
        } catch (error) {
          console.error('Error fetching data from Firestore:', error.message);
        }
      };

      fetchDataFromFirestore();
    }
  }, [firebaseInitialized]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage" screenOptions={stackOptions}>
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UsernameSetup" component={UsernameSetup} />
        <Stack.Screen name="Home" component={HomeTabNavigator} />
        <Stack.Screen name="Post" component={CreatePostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


// Moved outside the App component to avoid unnecessary re-renders
const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="AdvancedSettings" component={AdvancedSettings} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="TermsOfService" component={TermsOfService} />
    <Stack.Screen name="Logout" component={Logout} />
  </Stack.Navigator>
);
const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const auth = getAuth();
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log('createUserWithEmailAndPassword result:', result);

      // Use result.user.uid instead of user.uid
      const userDocRef = doc(getFirestore(), 'Users', result.user.uid);

      // Set the user data in the document
      await setDoc(userDocRef, {
        email: result.user.email,
        // Add other user data you want to store in the document
        streak: 0, 
      });

      console.log('User signed up successfully!');

      // Navigate to the next screen or perform any other necessary actions
      navigation.navigate('UsernameSetup');
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  return (
    <View style={styles.signin}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
      />


      <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.link, { marginTop: 16 }, { marginBottom: 30 },]}
      >
        <Text style={styles.linkText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Already have an account?{' '}
        <Text style={styles.small} onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </Text>
    </View>
  );

};

const UsernameSetup = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const auth = getAuth();
  const userDocRef = doc(getFirestore(), 'Users', auth.currentUser.uid);

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
  
      if (!result.cancelled) {
        const storage = ref(
          getStorage(),
          `profilePictures/${auth.currentUser.uid}/${Date.now()}.jpg`
        );
        const response = await fetch(result.uri);
        const blob = await response.blob();
        await uploadBytes(storage, blob);
  
        const profilePictureURL = await getDownloadURL(storage);
        setProfilePicture(profilePictureURL);
      }
    } catch (error) {
      console.error('Error picking image:', error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      const user = auth.currentUser;

      const storage = ref(getStorage(), `profilePictures/${user.uid}/${Date.now()}.jpg`);
      const response = await fetch(profilePicture);
      const blob = await response.blob();
      await uploadBytes(storage, blob);

      const profilePictureURL = await getDownloadURL(storage);

      // Assuming you have the logic to calculate streak in fetchUserPosts function
      const streak = await fetchUserPosts(user);

      await updateProfile(user, {
        displayName: username,
        photoURL: profilePictureURL,
      });

      await setDoc(userDocRef, {
        username,
        profilePicture: profilePictureURL, // Set the profile picture URL
        streak: streak, // Include the streak field in the Users collection
      });

      console.log('Username:', user.displayName);
      console.log('Profile Picture:', user.photoURL);

      setUsername('');
      setProfilePicture('');

      navigation.navigate('Home');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
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
          <Image source={{ uri: profilePicture }} style={styles.circularProfilePicture} />
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

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const auth = getAuth();
      const signInResult = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in successfully!');

      // Get the user document reference
      const userDocRef = doc(getFirestore(), 'Users', signInResult.user.uid);

      // Get the user's data
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const lastPostTimestamp = userData.lastPostTimestamp || 0; // Assuming the field is in milliseconds

        // Check if the last post was made within the last 24 hours
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastPostTimestamp;
        const twentyFourHoursInMilliseconds = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (timeDifference > twentyFourHoursInMilliseconds) {
          // Reset the streak to 0 and update it in the Users collection
          await updateDoc(userDocRef, { streak: 0 });
        }
      }

      // Navigate to the next screen or perform any other necessary actions
      navigation.navigate('Home');
    } catch (error) {
      console.error('Sign-in error:', error.message);
    }
  };

  return (
    <View style={styles.signin}>
      <Text style={styles.title}>Sign In</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <TouchableOpacity
        onPress={handleSignIn}
        style={[styles.link, { marginTop: 16 }, { marginBottom: 30 }]}
      >
        <Text style={styles.linkText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.registerText}>
        Don't have an account?{' '}
        <Text style={styles.small} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
    </View>
  );
};
const fetchLastPostTimestamp = async (user) => {
  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'Users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData.lastPostTimestamp || 0;
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error fetching last post timestamp:', error.message);
    throw error;
  }
};
const fetchUserPosts = async (user) => {
  try {
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'Users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData.streak || 0; // Return the streak from the Users collection
    } else {
      return 0;
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    throw error;
  }
};
const CreatePostScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const [task, setTask] = useState('');
  const [currentStreak, setCurrentStreak] = useState(0);
  const [realTimeStreak, setRealTimeStreak] = useState(0);
  const [userProfilePicture, setUserProfilePicture] = useState('');

  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const unsubscribe = listenToStreakUpdates(user.uid);
    return () => unsubscribe();
  }, [user]);

  const listenToStreakUpdates = (userId) => {
    const userDocRef = doc(getFirestore(), 'Users', userId);

    // Set up a real-time listener
    const unsubscribe = onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        const userData = doc.data();
        setRealTimeStreak(userData.streak || 0);
        setUserProfilePicture(userData.profilePicture || ''); // Fetch user profile picture
      }
    });

    return unsubscribe;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setPhoto(result.uri);
    }
  };

  const handlePost = async () => {
    try {
      if (!user) {
        console.error('User not authenticated.');
        return;
      }

      // Fetch the user's current streak and last post timestamp separately
      const currentStreak = await fetchUserPosts(user);
      const lastPostTimestamp = await fetchLastPostTimestamp(user);

      // Calculate the new streak
      const newStreak = isNewDay(lastPostTimestamp) ? currentStreak + 1 : 1;

      // Update the last post timestamp
      const newLastPostTimestamp = new Date().getTime();

      // Upload photo to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `postPhotos/${user.uid}/${Date.now()}`);
      const response = await fetch(photo);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);

      // Get the download URL
      const photoURL = await getDownloadURL(storageRef);

      // Add logic to save the photo URL in Firestore
      const firestore = getFirestore();
      const postDocRef = collection(firestore, 'Posts');

      await addDoc(postDocRef, {
        userId: user.uid,
        username: user.displayName,
        profilePicture: userProfilePicture, // Use the fetched profile picture URL
        photo: photoURL,
        description: description,
        task: task,
        timestamp: serverTimestamp(),
        streak: newStreak, // Save the calculated streak
      });

      // Update the streak in the Users collection
      const userDocRef = doc(firestore, 'Users', user.uid);
      await updateDoc(userDocRef, {
        streak: newStreak,
        lastPostTimestamp: newLastPostTimestamp,
      });

      setCurrentStreak(newStreak);
      setRealTimeStreak(newStreak);

      console.log('Photo saved successfully:', photoURL);

      // Clear the fields after saving
      setPhoto('');
      setDescription('');
      setTask('');

      // Navigate back to the Home screen
      navigation.goBack();
    } catch (error) {
      console.error('Error saving photo:', error.message);
    }
  };
   // Function to check if the last post was made on a different day
   const isNewDay = (lastPostTimestamp) => {
    const lastPostDate = new Date(lastPostTimestamp).toLocaleDateString();
    const currentDate = new Date().toLocaleDateString();
    return lastPostDate !== currentDate;
  };


  return (
    <View style={styles.createPostContainer} >
      <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.squarePhotoContainer} />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>Pick a Photo</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Description"
        onChangeText={(text) => setDescription(text)}
        value={description}
      />

      <TextInput
        style={styles.input}
        placeholder="Task"
        onChangeText={(text) => setTask(text)}
        value={task}
      />

      <TouchableOpacity onPress={handlePost} style={styles.button}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 75,
    backgroundColor: '#3C683E',
  },
};

function ArticleDetails({ route }) {
  const { article } = route.params;

  return (
    <View style={styles.bigDiv}>
      <ScrollView>
        <Image style={styles.imageStyle} source={article.image} />
        <Text style={styles.contentsStyle}>{article.content}</Text>
      </ScrollView>
    </View>
  );
}

function ArticlesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          headerTitleStyle: styles.bigText,
          header: () => (
            <SafeAreaView style={{ backgroundColor: '#3C683E' }}>
              <Text style={styles.bigText}> Articles</Text>
            </SafeAreaView>
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitleStyle: styles.bigText,
          header: () => (
            <SafeAreaView style={{ backgroundColor: '#3C683E' }}>
              <Text style={styles.bigText}> Settings</Text>
            </SafeAreaView>
          ),
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitleStyle: styles.bigText,
          header: () => (
            <SafeAreaView style={{ backgroundColor: '#3C683E' }}>
              <Text style={styles.bigText}> Home</Text>
            </SafeAreaView>
          ),
        }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetails}
        options={({ route }) => ({
          header: () => (
            <SafeAreaView style={{ backgroundColor: '#3C683E' }}>
              <Text style={styles.articleTitle}>{route.params.article.title}</Text>
            </SafeAreaView>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
const HomeTabNavigator = () => (
  <Tab.Navigator screenOptions={screenOptions}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Entypo name="home" size={24} color={focused ? 'white' : '#6E9A62'} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Planet"
      component={Planet}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Entypo name="globe" size={24} color={focused ? 'white' : '#6E9A62'} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Articles"
      component={ArticlesStack}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Entypo name="book" size={24} color={focused ? 'white' : '#6E9A62'} />
          </View>
        ),
      }}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        tabBarIcon: ({ focused }) => (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="settings" size={24} color={focused ? 'white' : '#6E9A62'} />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);


const styles = StyleSheet.create({
  post2Button: {
    backgroundColor: '#c4edc4', // Set button color
    padding: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  createPostContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ecf9ec',
  },


  squarePhotoContainer: {
    backgroundColor: '#ccc',
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },

  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#3C683E',
    width: 600,
    color: 'white',
    paddingBottom: 10,
  },
  bigDiv: {
    backgroundColor: '#E0F6E1',
    paddingBottom: 80,
    paddingHorizontal: 5,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  contentsStyle: {
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 17,
    fontWeight: 'normal',
    textAlign: 'justify',
  },
  articleTitle: {
    backgroundColor: '#3C683E',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 15,
    color: 'white',
    paddingBottom: 10,
  },
  imageStyle: {
    marginLeft: 25,
    marginRight: 25,
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 37,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 7,
    backgroundColor: '#E5F1E1',
  },
  registerText: {
    marginTop: 16,

  },
  link: {
    backgroundColor: '#355E38',
    padding: 10,
    width: '50%', // Adjust the width as needed
    alignItems: 'center',

  },
  linkText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  small: {
    color: '#355E38',
  },
  signin: {
    flex: 1,
    backgroundColor: '#C3E3B9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 16,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  circularButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4f6f52',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularProfilePicture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center', // Half of the width and height to create a circle
  },
  photoContainer: {
    backgroundColor: '#ccc', // Gray square background color
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderRadius: 10, // Set the borderRadius to make it a rounded square
    overflow: 'hidden', // Clip the content to the rounded shape
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17
  },
  button: {
    backgroundColor: '#355E38',
    padding: 10,
    width: '50%', // Adjust the width as needed
    alignItems: 'center',
    borderRadius: 15,
    margin: 0
  },

});
