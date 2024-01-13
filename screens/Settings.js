import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Paragraph, TextInput } from 'react-native';
import { getAuth, updateProfile } from 'firebase/auth';
import { doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const EditProfileScreen = () => (
  <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
    {/* Pagina EditProfile */}
    <Text style={styles.bigText}>Edit Profile</Text>
  </SafeAreaView>
);

const AdvancedSettingsScreen = () => (
  <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
    {/* Pagina EditProfile */}
    <Text style={styles.bigText}>Advanced Settings</Text>
  </SafeAreaView>
);

const PrivacyPolicyScreen = () => (
  <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
    <Text style={styles.bigText}>Privacy Policy </Text>
    <ScrollView style={{ backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}>

      <Text style={{ fontSize: 17, paddingBottom: 100 }}>
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
  <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
    <Text style={styles.bigText}>Terms of Service </Text>
    <ScrollView style={{ backgroundColor: '#fff', paddingLeft: 20, paddingRight: 20 }}>

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

const LogoutScreen = () => (
  <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
    {/* Pagina EditProfile */}
    <Text style={styles.bigText}> Log Out </Text>
  </SafeAreaView>
);

const Settings = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const [username, setUsername] = useState(user?.displayName || '');
  const [profilePicture, setProfilePicture] = useState(user?.photoURL || '');
  const navigation = useNavigation();

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };
  const handleSave = async () => {
    try {
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
    }
  };

  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="SettingsScreen" component={() => (
        <View style={styles.container}>
          <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
            <Text style={styles.bigText}>Settings</Text>
          </SafeAreaView>

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

          <TouchableOpacity onPress={() => navigateToScreen('EditProfile')} style={styles.burgers}>
            <Text style={styles.dividers}>Edit Profile -&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('AdvancedSettings')} style={styles.burgers}>
            <Text style={styles.dividers}>Advanced Settings -&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('PrivacyPolicy')} style={styles.burgers}>
            <Text style={styles.dividers}>Privacy and Policy -&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('TermsOfService')} style={styles.burgers}>
            <Text style={styles.dividers}>Terms of Service -&gt;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigateToScreen('Logout')} style={styles.burgers}>
            <Text style={styles.dividers}>Log Out -&gt;</Text>
          </TouchableOpacity>

          <Text style={styles.bottomTextContainer}>ProHumanity v.1.0</Text>
        </View>
      )} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="AdvancedSettings" component={AdvancedSettingsScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="TermsOfService" component={TermsOfServiceScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf9ec',
  },
  bottomTextContainer: {
    marginLeft: 140,
    bottom: 0,
    left: 0,
    right: 0,

    padding: 10,

  },
  dividers: {
    fontSize: 19,
    paddingLeft: 15,
  },
  burgers: {
    backgroundColor: "#cce6cc",
    paddingTop: 12,
    paddingBottom: 12,
    borderColor: "#fff",
    marginVertical: 1,
  },
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    backgroundColor: '#c4edc4',
    width: 600,
    paddingLeft: 10,
  },
  section: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#026440',
    marginLeft: 135,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginLeft: 10,
    paddingLeft: 5,
  },
  usernameStyle: {

  },
  profilePicture: {
    width: 150,
    height: 150,
    marginLeft: 10,
    borderRadius: 100,
    marginLeft: 120,
  },
});


export default Settings;
