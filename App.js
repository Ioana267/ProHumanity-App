import { View,ScrollView, StyleSheet, SafeAreaView, Text,Image } from 'react-native';
import { Home, Settings, Planet,Articles } from "./screens";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import articlesData from './screens/Articles'

const Stack = createStackNavigator();

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
        name="ArticleDetail"
        component={ArticleDetails} // Corrected component name here
        options={({ route }) => ({
          //title: route.params.article.title,
          
          header: () => (
            <SafeAreaView style={{ backgroundColor: '#c4edc4' }}>
              <Text style={styles.articleTitle}> {route.params.article.title}</Text>
            </SafeAreaView>
          ),
          
        })}
      />
    </Stack.Navigator>
  );
}

// Rest of your code remains unchanged
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

// Thanks for watching
const Tab = createBottomTabNavigator();
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 85,
    backgroundColor: "#c4edc4",
  }
};

// The rest of your code remains the same
export default function App() {
  return (
     <NavigationContainer>
       <Tab.Navigator screenOptions={screenOptions}>
          <Tab.Screen 
          name="Home" 
          component={Home} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                  <Entypo name="home" size={24} color={focused ? "#4f6f52": "#111"} />
                  
                </View>
              )
            }
          }}
          />
          <Tab.Screen 
          name="Planet" 
          component={Planet} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="globe" size={24} color={focused ? "#4f6f52": "#111"} />
                  
                </View>
              )
            }
          }}
          />
          
          <Tab.Screen
           name="Articles" 
           component={ArticlesStack}
           options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Entypo name="book" size={24} color={focused ? "#4f6f52": "#111"} />
                  
            </View>
              )
            }
          }}
           />
          <Tab.Screen 
          name="Settings" 
          component={Settings} 
          options={{
            tabBarIcon: ({focused})=>{
              return (
                <View style={{alignItems: "center", justifyContent: "center"}}> 
                 <Ionicons name="settings" size={24}  color={focused ? "#4f6f52": "#111"} />
                </View>
              )
            }
          }}
          />
       </Tab.Navigator>
     </NavigationContainer>
)
}
const styles = StyleSheet.create({
  bigText: {
    fontSize: 35,
    fontWeight: 'bold',
    //fontFamily: 'monteserrat',
    backgroundColor:"#c4edc4",
    width:600,
    
    
  },
 bigDiv:{
    backgroundColor: '#ecf9ec',
    paddingBottom:80,
  },
  articleImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  contentsStyle: {
    paddingLeft:30,
    paddingRight: 30,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 17,
    fontWeight: 'normal',
  },
  articleTitle: {
    backgroundColor: "#c4edc4",
    fontWeight: 'bold',
    fontSize: 30,
    paddingTop:10,
    paddingLeft:5,
  },
  imageStyle: {
      marginLeft:25,
      marginRight:25,
      width:'90%',
      marginTop: 20,
      borderRadius: 10,
  }
}); 