import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

// Import your screens
import {
  Home,
  Settings,
  Planet,
  Articles,
  EditProfile,
  AdvancedSettings,
  PrivacyPolicy,
  TermsOfService,
  Logout,
} from './screens';

import LandingPage from './screens/LandingPage';
import Post from './screens/Post';
import * as ImagePicker from 'expo-image-picker';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
    // Perform sign-in logic, e.g., using Firebase authentication
    // If sign-in is successful, navigate to Home
    try {
      // Your sign-in logic here, for example with Firebase
      // await firebase.auth().signInWithEmailAndPassword(email, password);

      navigation.navigate('UsernameSetup');
    } catch (error) {
      console.error('Sign-Up error:', error.message);
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
        <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
          Sign In
        </Text>
      </Text>
    </View>
  );

};

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

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Perform sign-in logic, e.g., using Firebase authentication
    // If sign-in is successful, navigate to Home
    try {
      // Your sign-in logic here, for example with Firebase
      // await firebase.auth().signInWithEmailAndPassword(email, password);

      // After successful sign-in, navigate to Home
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
        <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
          Sign Up
        </Text>
      </Text>
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
    height: 60,
    backgroundColor: '#c4edc4',
  },
};

function ArticleDetails({ route }) {
  const { article } = route.params;

  return (
    <View style={styles.bigDiv}>
      <ScrollView>
        <Image style={styles.imageStyle} source={article.source} />
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
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
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
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
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
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
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
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
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
            <Entypo name="home" size={24} color={focused ? '#4f6f52' : '#111'} />
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
            <Entypo name="globe" size={24} color={focused ? '#4f6f52' : '#111'} />
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
            <Entypo name="book" size={24} color={focused ? '#4f6f52' : '#111'} />
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
            <Ionicons name="settings" size={24} color={focused ? '#4f6f52' : '#111'} />
          </View>
        ),
      }}
    />
  </Tab.Navigator>
);
export default function App() {
  const [showLandingPage, setShowLandingPage] = React.useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage" headerMode="none">
        <Stack.Screen name="LandingPage" component={LandingPage} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="UsernameSetup" component={UsernameSetup} />
        <Stack.Screen name="Home" component={HomeTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#c4edc4',
    width: 600,
  },
  bigDiv: {
    backgroundColor: '#ecf9ec',
    paddingBottom: 80,
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
  },
  articleTitle: {
    backgroundColor: '#c4edc4',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 5,
  },
  imageStyle: {
    marginLeft: 25,
    marginRight: 25,
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
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
  },
  registerText: {
    marginTop: 16,
  },
  link: {
    backgroundColor: '#c4edc4',
    padding: 10,
    width: '50%', // Adjust the width as needed
    alignItems: 'center',

  },
  signin: {
    flex: 1,
    backgroundColor: '#ecf9ec',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 16,
    marginBottom: 16,
  },

  circularButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4f6f52',
    justifyContent: 'center',
    alignItems: 'center',
  },
});



/*import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Home, Settings, Planet, Articles, EditProfile, AdvancedSettings, PrivacyPolicy, TermsOfService, Logout  } from './screens';
import LandingPage from './screens/LandingPage';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const SettingsStack = () => (
  <Stack.Navigator>
   
    <Stack.Screen name="EditProfile" component={EditProfile} />
    <Stack.Screen name="AdvancedSettings" component={AdvancedSettings} />
    <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    <Stack.Screen name="TermsOfService" component={TermsOfService} />
    <Stack.Screen name="Logout" component={Logout} />
  </Stack.Navigator>
);

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 85,
    backgroundColor: '#c4edc4',
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
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
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
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
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
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
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
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
              <Text style={styles.articleTitle}>{route.params.article.title}</Text>
            </SafeAreaView>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>

      
      <Stack.Navigator initialRouteName="LandngPage" headerMode="none">
        <Stack.Screen name="LandingPage" component={LandingPage} />
       
       
      </Stack.Navigator>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Entypo name="home" size={24} color={focused ? '#4f6f52' : '#111'} />
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
                <Entypo name="globe" size={24} color={focused ? '#4f6f52' : '#111'} />
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
                <Entypo name="book" size={24} color={focused ? '#4f6f52' : '#111'} />
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
                <Ionicons name="settings" size={24} color={focused ? '#4f6f52' : '#111'} />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#c4edc4',
    width: 600,
  },
  bigDiv: {
    backgroundColor: '#ecf9ec',
    paddingBottom: 80,
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
  },
  articleTitle: {
    backgroundColor: '#c4edc4',
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop: 10,
    paddingLeft: 5,
  },
  imageStyle: {
    marginLeft: 25,
    marginRight: 25,
    width: '90%',
    marginTop: 20,
    borderRadius: 10,
  },
});*/
