import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Button, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
const Stack = createStackNavigator();

const EditProfileScreen = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [saveButtonText, setSaveButtonText] = useState('Save');
  const [username, setNewUsername] = useState(user?.displayName || '');
  const navigation = useNavigation();
  const [showAdditionalMessage, setShowAdditionalMessage] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
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
  const handleSave = async () => {
    try {
      setSaveButtonText('Saving...'); // Change the button text to "Saving..."

      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        // Update user profile
        await updateProfile(user, {
          displayName: username,
          photoURL: profilePicture,
        });

        // Update Firestore document
        const userDocRef = doc(getFirestore(), 'Users', user.uid);
        await updateDoc(userDocRef, {
          username,
          profilePicture,
        });

        console.log('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    } finally {
      // Reset the button text to "Save" regardless of success or failure
      // Optionally, you can add a delay before navigating to the settings page if needed
      setTimeout(() => {
        setSaveButtonText('Save');
        navigation.navigate('SettingsScreen');
      }, 1500);
    }
  };


  const handleAdditionalMessagePress = () => {
    // Handle the action when "Can't see the changes?" is pressed
    // For example, set a state to show the "Reopen the app" message
    setShowAdditionalMessage(true);
  };

  return (
    <SafeAreaView style={styles.container}>
    <CustomHeader3 />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#E0F6E1' }}>
        <View>
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
        <Text style={{ paddingTop: 10, paddingLeft: 10, fontSize: 16, fontWeight: '500', color: '#375F38' }}>New Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new username"
          value={username}
          onChangeText={(text) => setNewUsername(text)}
        />

        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>{saveButtonText}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAdditionalMessagePress}>
          <Text style={{ color: 'gray', fontSize: 13, textAlign: 'center', paddingTop: 6 }}>Can't see the changes?</Text>
        </TouchableOpacity>

        {showAdditionalMessage && (
          <View style={styles.additionalMessageContainer}>
            <Text style={styles.additionalMessageText}>Reopen the app</Text>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};



const CustomHeader1 = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.bigText}>Privacy Policy</Text>
    </SafeAreaView>
  );
};
const CustomHeader2 = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.bigText}>Terms of Service</Text>
    </SafeAreaView>
  );
};
const CustomHeader3 = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.bigText}>Edit Profile</Text>
    </SafeAreaView>
  );
};
const CustomHeader4 = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.bigText}>Settings</Text>
    </SafeAreaView>
  );
};

const PrivacyPolicyScreen = () => (
  <SafeAreaView style={styles.container}>
      <CustomHeader1 />
    <ScrollView style={{ backgroundColor: '#E0F6E1', paddingLeft: 20, paddingRight: 20, }}>

      <Text style={{ fontSize: 17, paddingBottom: 80 }}>
        <Text style={{ fontWeight: 'bold' }}>Last updated:</Text> 1/6/2024 {'\n'}
        {'\n'}
        Welcome to ProHumanity, an app created to [provide a brief description of the app's purpose and functionality]. This Privacy Policy outlines how we collect, use, disclose, and safeguard your personal information. By using the ProHumanity app, you agree to the terms outlined in this policy. {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Information We Collect {'\n'} </Text>
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>1. Account Information  {'\n'} </Text>
        When you sign up for ProHumanity, we collect the following information: {'\n'}

        - Full name {'\n'}
        - Email address {'\n'}
        - Password {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>2. Photos {'\n'} </Text>
        ProHumanity allows you to upload and share photos. By using this feature, you grant us permission to access, store, and process your photos. {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>How We Use Your Information {'\n'} </Text>
        We use the collected information for the following purposes: {'\n'}

        - To create and manage your ProHumanity account {'\n'}
        - To enable you to log in and use the app's features {'\n'}
        - To enhance user experience and personalize content {'\n'}
        - To improve our app and services {'\n'}
        - To communicate with you regarding updates, news, and promotions {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Data Security {'\n'} </Text>
        We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, please be aware that no method of transmission over the internet or electronic storage is completely secure. {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Sharing Your Information {'\n'} </Text>
        We do not sell, trade, or rent your personal information to third parties. We may share your information in the following cases: {'\n'}

        - With your consent {'\n'}
        - To comply with legal obligations {'\n'}
        - To protect our rights, privacy, safety, or property {'\n'}
        - Your Choices {'\n'}
        - You can manage your account settings and preferences within the ProHumanity app. You may also opt-out of promotional communications by following the instructions provided in the emails. {'\n'}
        {'\n'}

        <Text style={{ fontWeight: 'bold' }}>Changes to this Privacy Policy  {'\n'} </Text>
        We reserve the right to update this Privacy Policy at any time. We will notify you of any changes by posting the new policy on this page.  {'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Contact Us {'\n'} </Text>
        If you have any questions about these Terms, please contact us at code4futuretechno@gmail.com.{'\n'}
      </Text>
    </ScrollView>
  </SafeAreaView>
);

const TermsOfServiceScreen = () => (
  <SafeAreaView style={styles.container}>
      <CustomHeader2 />
    <ScrollView style={{ backgroundColor: '#E0F6E1', paddingLeft: 20, paddingRight: 20 }}>

      <Text style={{ fontSize: 17, paddingBottom: 100 }}>
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Terms of Service for ProHumanity{'\n'}</Text>
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>Effective Date:</Text> 1/6/2024{'\n'}
        {'\n'}
        These Terms of Service ("Terms") govern your use of ProHumanity ("the App"), provided by ProHumanity ("we" or "us"). By accessing or using the App, you agree to be bound by these Terms.{'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>1. Acceptance of Terms{'\n'}</Text>

        By accessing or using the App, you agree to comply with and be bound by these Terms. If you do not agree with any part of these Terms, you must not use the App.{'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>2. User Accounts{'\n'}</Text>

        a. You may need to create an account to use certain features of the App. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.{'\n'}

        b. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your account. You accept responsibility for all activities that occur under your account.{'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>3. Use of the App{'\n'}</Text>

        a. You agree to use the App for lawful purposes only and not for any illegal or unauthorized purpose.{'\n'}

        b. You must not, in your use of the App, violate any applicable laws, including but not limited to copyright laws.{'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>4. Intellectual Property{'\n'}</Text>

        a. The App and its original content, features, and functionality are owned by ProHumanity and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.{'\n'}

        b. You may not reproduce, modify, rent, lease, loan, sell, distribute, mirror, frame, republish, download, transmit, or create derivative works of the App or any portion thereof.{'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>5. Privacy Policy{'\n'}</Text>

        Your use of the App is also governed by our Privacy Policy, which is available at [link to your privacy policy]. By using the App, you consent to the terms of our Privacy Policy.{'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>6. Termination{'\n'}</Text>

        We may terminate or suspend your account and access to the App immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.{'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>7. Changes to Terms{'\n'}</Text>

        We reserve the right to modify or replace these Terms at any time. Your continued use of the App after any such changes constitutes your acceptance of the new Terms.{'\n'}
        {'\n'}
        <Text style={{ fontWeight: 'bold' }}>8. Contact Us{'\n'}</Text>

        If you have any questions about these Terms, please contact us at code4futuretechno@gmail.com.{'\n'}
      </Text>
    </ScrollView>
  </SafeAreaView>

);


const LogoutScreen = ({ setShowLogoutModal }) => (
  <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
    <Text style={styles.bigText}> Log Out </Text>
    <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
      <Text style={styles.dividers}>Logout</Text>
    </TouchableOpacity>
  </SafeAreaView>
);

const LogoutConfirmationModal = ({ visible, onClose, onLogout }) => (
  <SafeAreaView>
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Are you sure you want to log out?</Text>
          <TouchableOpacity onPress={onLogout} style={styles.buttonss}>
            <Text style={styles.typa}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.buttonss}>
            <Text style={styles.typa}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  </SafeAreaView>
);

const Settings = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [username, setUsername] = useState(user?.displayName || '');
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || '');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const [updatedUsername, setUpdatedUsername] = useState(route.params?.updatedUsername || '');
  const [streak, setStreak] = useState(0); // Add this line to initialize streak state

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };
  useEffect(() => {
    // Fetch the streak information from Firestore
    const fetchStreak = async () => {
      try {
        const userDocRef = doc(getFirestore(), 'Users', user.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          const userData = doc.data();
          if (userData && userData.streak) {
            setStreak(userData.streak);
          }
        });

        // Clean up the listener when the component is unmounted
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching streak:', error.message);
      }
    };

    // Call the fetchStreak function
    fetchStreak();

    // Call the fetchStreak function
    fetchStreak();
    if (route.params?.updatedUsername) {
      setUsername(route.params.updatedUsername);  // Update the username state
      setUpdatedUsername(route.params.updatedUsername);
    }
  }, [route.params?.updatedUsername]);

  const handleSave = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        // Update user profile
        await updateProfile(user, {
          displayName: updatedUsername,
          photoURL: profilePicture,
        });

        // Update Firestore document
        const userDocRef = doc(getFirestore(), 'Users', user.uid);
        await updateDoc(userDocRef, {
          updatedUsername,
          profilePicture,
        });

        console.log('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };

  const handleLogout = () => {
    // Perform logout action here
    // For example, redirect to the landing page
    navigation.navigate('LandingPage');
  };

  return (
    <>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="SettingsScreen" component={() => (
          <View style={styles.container}>
            
            <CustomHeader4 />
            

            <View style={styles.section}>
              <View style={styles.row}>
                <Image
                  style={styles.profilePicture}
                  source={{ uri: profilePicture || user?.photoURL }}
                />
              </View>
              <View style={styles.row}>
                <Text style={styles.nameStyle}>
                  {username || user?.displayName}
                </Text>
              </View>
            </View>
            <View style={styles.streakContainer}>
              <Text style={styles.streakText}>Streak: {streak}</Text>
            </View>
            <TouchableOpacity onPress={() => navigateToScreen('EditProfile')} style={styles.burgers}>
              <Text style={styles.dividers}>Edit Profile -&gt;</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('PrivacyPolicy')} style={styles.burgers}>
              <Text style={styles.dividers}>Privacy and Policy -&gt;</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToScreen('TermsOfService')} style={styles.burgers}>
              <Text style={styles.dividers}>Terms of Service -&gt;</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowLogoutModal(true)} style={styles.burgers}>
              <Text style={styles.dividers}>Log Out -&gt;</Text>
            </TouchableOpacity>

            <Text style={styles.bottomTextContainer}>ProHumanity v.1.0</Text>

            <LogoutConfirmationModal
              visible={showLogoutModal}
              onClose={() => setShowLogoutModal(false)}
              onLogout={handleLogout}
            />
          </View>
        )} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#E0F6E1',
  },
  bottomTextContainer: {
    marginLeft: 140,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    ...Platform.select({
      ios: {
        // iOS specific styles
        marginLeft: 140,
      },
      android: {
        // Android specific styles
        marginLeft: 120,
      }
    })
  },
  dividers: {
    fontSize: 19,
    paddingLeft: 15,
    color: 'black',
    fontWeight: '500'
  },
  burgers: {
    backgroundColor: "#70A873",
    paddingTop: 12,
    paddingBottom: 12,

    marginVertical: 1,
  },
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#3C683E',
    width: 600,
    paddingLeft: 10,
    color: 'white',
    
    ...Platform.select({
      ios: {
        // iOS specific styles
        paddingBottom: 10,
      },
      android: {
        // Android specific styles
        paddingBottom: 5,
      }
    })
  },
  typa: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3C683E', // Color of the streak zone
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  streakText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#026440',
    marginLeft: 135,
    ...Platform.select({
      ios: {
        // iOS specific styles
        marginLeft: 160,
      },
      android: {
        // Android specific styles
        marginLeft: 145,
      }
    })
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#375F38',
    borderWidth: 2,
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  usernameStyle: {

  },
  buttonText: {
    marginTop: 10,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 17,
  },
  buttonss: {
    paddingBottom: 3,
    paddingTop: 3,
  },
  pp: {
    width: 150,
    height: 150,
    marginLeft: 10,
    borderRadius: 100,
    marginLeft: 120,
  },
  previewImage: {
    width: '50%'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  modalContent: {
    backgroundColor: '#ecf9ec',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 10,
    borderColor: '#026440',
    borderWidth: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,

  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 100,
    
    ...Platform.select({
      ios: {
        // iOS specific styles
        marginLeft: 120,
      },
      android: {
        // Android specific styles
        marginLeft: 110,
      }
    })
  },
  saveButton: {
    width: '40%',
    backgroundColor: '#70A873',
    paddingHorizontal: 7,
    paddingVertical: 10,
    borderRadius: 10,
    alignSelf: 'center'
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  additionalMessageContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  additionalMessageText: {
    color: '#70A873',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 0,
    
    backgroundColor: '#3C683E',
    ...Platform.select({
      ios: {
        // iOS specific styles
        paddingBottom: 5,
      },
      android: {
        // Android specific styles
        height: 80, 
        alignItems: 'flex-end',
        paddingBottom: 0,
      }
    })
  },
});

export default Settings;