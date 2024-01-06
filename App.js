import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Home, Settings, Planet, Articles, EditProfile, AdvancedSettings, PrivacyPolicy, TermsOfService, Logout  } from './screens';



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
});